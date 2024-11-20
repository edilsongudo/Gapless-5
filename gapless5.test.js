const xhrMockClass = () => ({
  open            : jest.fn(),
  send            : jest.fn(),
  setRequestHeader: jest.fn(),
  abort           : jest.fn(),
});
XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

const audioMockClass = () => ({
  addEventListener: jest.fn(),
  load: jest.fn(),
  pause: jest.fn(),
  play: jest.fn(() => Promise.resolve(jest.fn())),
});
Audio = jest.fn().mockImplementation(audioMockClass);

const audioContextMockClass = () => ({
  createGain: () => ({
    gain: { value: 1 },
    connect: jest.fn(),
  }),
});

window = {
  clearTimeout     : jest.fn(),
  setTimeout       : jest.fn(),
  AudioContext     : jest.fn().mockImplementation(audioContextMockClass),
};

const { Gapless5, LogLevel } = require('./gapless5.js');

/** test data **/

const TRACKS = [ '0.mp3', '1.mp3', '2.mp3', '3.mp3', '4.mp3' ];
const INIT_OPTIONS = {
  logLevel: LogLevel.None,
  useWebAudio: false,
  useHTML5Audio: false,
};

/** test suite **/

describe('Gapless-5 object', () => {
  let player = null;

  beforeEach(() => {
    player = new Gapless5(INIT_OPTIONS);
  });

  it('has correct initial state', () => {
    expect(player.getTracks()).toStrictEqual([]);
    expect(player.totalTracks()).toBe(0);
    expect(player.getIndex()).toBe(-1);
    expect(player.getPosition()).toBe(0);
    expect(player.canShuffle()).toBe(false);
    expect(player.initialized).toBe(true);
    expect(player.hasGUI).toBe(false);
  });

  it('can manipulate tracklist and position', () => {
    player.addTrack(TRACKS[1]);
    expect(player.getIndex()).toBe(0);
    player.insertTrack(0, TRACKS[0]);
    expect(player.getTracks()).toStrictEqual([ TRACKS[0], TRACKS[1] ]);
    expect(player.findTrack(TRACKS[1])).toBe(1);
    player.setPlaybackRate(0.1);
    player.setPosition(10);
    expect(player.getPosition()).toBe(10);

    player.removeTrack(0);
    expect(player.getTracks()).toStrictEqual([ TRACKS[1] ]);
    player.removeAllTracks();
    expect(player.getTracks()).toStrictEqual([]);
    player.setPosition(10);
    expect(player.getPosition()).toBe(0); // setPosition should do nothing without a track
  });
});

describe('Gapless-5 object with tracklist', () => {
  let player = null;

  beforeEach(() => {
    player = new Gapless5({
      ...INIT_OPTIONS,
      tracks: TRACKS,
    });
  });

  it('has correct initial state', () => {
    expect(player.getTracks()).toStrictEqual(TRACKS);
    expect(player.getIndex()).toBe(0);
    expect(player.getPosition()).toBe(0);
    expect(player.initialized).toBe(true);
    expect(player.hasGUI).toBe(false);
  });

  it('can shuffle and un-shuffle tracklist', () => {
    expect(player.canShuffle()).toBe(true);
    expect(player.isShuffled()).toBe(false);
    player.shuffle();
    expect(player.isShuffled()).toBe(true);

    // shouldn't actually shuffle until we change tracks
    expect(player.getTracks()).toStrictEqual(TRACKS);
    player.next();
    expect(player.getTracks()).not.toStrictEqual(TRACKS);
    expect(player.totalTracks()).toBe(TRACKS.length);

    // shouldn't actually unshuffle until we change tracks
    player.toggleShuffle();
    expect(player.isShuffled()).toBe(false);
    expect(player.getTracks()).not.toStrictEqual(TRACKS);
    player.next();
    expect(player.getTracks()).toStrictEqual(TRACKS);
  });

  it('can navigate the tracklist', () => {
    expect(player.getIndex()).toBe(0);
    player.next();
    expect(player.getIndex()).toBe(1);
    player.prev();
    expect(player.getIndex()).toBe(0);
    player.gotoTrack(2);
    expect(player.getIndex()).toBe(2);

    // should loop around
    player.loop = true;
    TRACKS.forEach(() => player.next());
    expect(player.getIndex()).toBe(2);

    // should not loop around
    player.loop = false;
    TRACKS.forEach(() => player.next());
    expect(player.getIndex()).toBe(TRACKS.length - 1);
  });

  it('triggers navigation callbacks', () => {
    player.onprev = jest.fn();
    player.onnext = jest.fn();
    player.onplayrequest = jest.fn();
    player.onpause = jest.fn();
    player.onstop = jest.fn();

    player.next();
    expect(player.onnext).toHaveBeenCalledWith(TRACKS[0], TRACKS[1]);
    player.prev();
    expect(player.onprev).toHaveBeenCalledWith(TRACKS[1], TRACKS[0]);
    player.play();
    expect(player.onplayrequest).toHaveBeenCalledWith(TRACKS[0]);
    player.pause();
    expect(player.onpause).toHaveBeenCalledWith(TRACKS[0]);
    player.stop();
    expect(player.onstop).toHaveBeenCalledWith(TRACKS[0]);
  });

  it('regression: maintains correct index after removing tracks that come after the current track', () => {
    const testTracks = ['track1.mp3', 'track2.mp3', 'track3.mp3'];
    const player = new Gapless5({
      ...INIT_OPTIONS,
      tracks: testTracks,
    });

    // Verify initial state
    expect(player.getIndex()).toBe(0);
    expect(player.getTracks()).toStrictEqual(testTracks);

    // Move to track 1
    player.gotoTrack(1);
    expect(player.getIndex()).toBe(1);

    // Remove track at index 2
    player.removeTrack(2);

    // Check index is still 1 and track list is updated
    expect(player.getIndex()).toBe(1);
    expect(player.getTracks()).toStrictEqual(['track1.mp3', 'track2.mp3']);
  });

  it('regression: maintains correct index when removing the currently playing track', () => {
    const testTracks = ['track1.mp3', 'track2.mp3', 'track3.mp3'];
    const player = new Gapless5({
      ...INIT_OPTIONS,
      tracks: testTracks,
    });

    // Verify initial state
    expect(player.getIndex()).toBe(0);
    expect(player.getTracks()).toStrictEqual(testTracks);

    // Move to track 1
    player.gotoTrack(1);
    expect(player.getIndex()).toBe(1);
    player.play();

    // Remove the currently playing track
    player.removeTrack(1);

    // Check index is still 1 and track list is updated, therefore we move to the next available track
    expect(player.getIndex()).toBe(1);
    expect(player.getTracks()).toStrictEqual(['track1.mp3', 'track3.mp3']);

    player.play();

    // Remove the currently playing track
    player.removeTrack(1);

    // Check index is still 0 and track list is updated, therefore we move to the next available track
    expect(player.getIndex()).toBe(0);
    expect(player.getTracks()).toStrictEqual(['track1.mp3']);

    player.play();

    // Remove the only remaining track
    player.removeTrack(0);

    // Check index is still 0 and track list is updated
    expect(player.getIndex()).toBe(0);
    expect(player.getTracks()).toStrictEqual([]);
  });
});

describe('Gapless-5 object with load limit', () => {
  it('obeys load limit', () => {
    const player = new Gapless5({
      ...INIT_OPTIONS,
      loadLimit: 2,
    });
    const loadedTracks = new Set([]);
    player.onloadstart = (audioPath) => {
      loadedTracks.add(audioPath);
    };
    player.onunload = (audioPath) => {
      loadedTracks.delete(audioPath);
    };

    TRACKS.forEach((track) => player.addTrack(track));
    expect(player.totalTracks()).toBe(TRACKS.length);
    expect(loadedTracks.size).toBe(2);
    player.next();
    expect(loadedTracks.size).toBe(2);
    player.next();
    expect(loadedTracks.size).toBe(2);
    player.removeAllTracks();
    expect(loadedTracks.size).toBe(0);
  });
});


