export function Gapless5(options?: {}, deprecated?: {}): void;
export class Gapless5 {
    constructor(options?: {}, deprecated?: {});
    hasGUI: boolean;
    scrubWidth: string | number;
    scrubPosition: number;
    isScrubbing: boolean;
    tickMS: number;
    avgTickMS: number;
    initialized: boolean;
    uiDirty: boolean;
    playlist: Gapless5FileList;
    loop: any;
    singleMode: any;
    exclusive: any;
    queuedTrack: string | number;
    fadingTrack: any;
    volume: any;
    crossfade: any;
    crossfadeShape: any;
    onPlayAllowed: () => void;
    useWebAudio: boolean;
    useHTML5Audio: boolean;
    playbackRate: any;
    id: any;
    context: any;
    keyMappings: {};
    onprev: () => void;
    onplayrequest: () => void;
    onplay: () => void;
    onpause: () => void;
    onstop: () => void;
    onnext: () => void;
    onerror: () => void;
    onloadstart: () => void;
    onload: () => void;
    onunload: () => void;
    onfinishedtrack: () => void;
    onfinishedall: () => void;
    getIndex: (sourceIndex?: boolean) => any;
    /**
     * @returns {number}
     */
    totalTracks: () => number;
    /**
     * @returns {boolean}
     */
    isSingleLoop: () => boolean;
    /**
     * @param {Record<string, string>} keyOptions - key is the Action, value is the key to press
     */
    mapKeys: (keyOptions: Record<string, string>) => void;
    /**
     * @returns {number}
     */
    getPosition: () => number;
    /**
     * @param {number} position - in milliseconds
     */
    setPosition: (position: number) => void;
    /**
     * @param {number} volume - normalized between 0 and 1
     */
    setVolume: (volume: number) => void;
    setGain: (uiPos: any) => void;
    scrub: (uiPos: any, updateTransport?: boolean) => void;
    /**
     * @param {number} percent - between 0 and 1
     */
    setLoadedSpan: (percent: number) => void;
    getSeekablePercent: () => number;
    onEndedCallback: () => void;
    onStartedScrubbing: () => void;
    onFinishedScrubbing: () => void;
    /**
     * @param {string} audioPath - path to audio file(s) or blob URL(s)
     */
    addTrack: (audioPath: string) => void;
    /**
     * @param {number} point - playlist index where to insert track
     * @param {string} audioPath - path to audio file(s) or blob URL(s)
     */
    insertTrack: (point: number, audioPath: string) => void;
    /**
     * @returns {string[]}
     */
    getTracks: () => string[];
    /**
     * @returns {string[]} - audio path for current track, '' if none
     */
    getTrack: () => string[];
    /**
     * @param {string} path - audio path for track to find
     * @returns {number} - index in playlist, -1 if not found
     */
    findTrack: (path: string) => number;
    /**
     * @param {number | string} pointOrPath - audio path or playlist index
     */
    removeTrack: (pointOrPath: number | string) => void;
    /**
     * @param {number} point - playlist index where to replace track
     * @param {string} audioPath - path to audio file(s) or blob URL(s)
     */
    replaceTrack: (point: number, audioPath: string) => void;
    removeAllTracks: (flushPlaylist?: boolean) => void;
    /**
     * @returns {boolean}
     */
    isShuffled: () => boolean;
    /**
     * @param {boolean} preserveCurrent - true to keep current playing track in place
     */
    shuffle: (preserveCurrent?: boolean) => void;
    toggleShuffle: () => void;
    shuffleToggle: () => void;
    currentSource: () => Gapless5Source;
    currentLength: () => number;
    currentPosition: () => number;
    /**
     * @param {number} rate - default = 1.0, higher = plays faster, lower = plays slower
     */
    setPlaybackRate: (rate: number) => void;
    /**
     * @param {number} duration - in milliseconds
     */
    setCrossfade: (duration: number) => void;
    /**
     * @param {CrossfadeShape} shape - sets the crossfade curve shape
     */
    setCrossfadeShape: (shape: {
        None: number;
        Linear: number;
        EqualPower: number;
    }) => void;
    /**
     * @param {number | string} pointOrPath - audio path or playlist index to play next
     */
    queueTrack: (pointOrPath: number | string) => void;
    /**
     * @param {number | string} pointOrPath - audio path or playlist index to play
     * @param {boolean} forcePlay - true to start playing even if player was stopped
     * @param {boolean} allowOverride - internal use only
     * @param {boolean} crossfadeEnabled - internal use only
     */
    gotoTrack: (pointOrPath: number | string, forcePlay: boolean, allowOverride?: boolean, crossfadeEnabled?: boolean) => void;
    prevtrack: () => void;
    prev: (uiEvent: any, forceReset: any) => void;
    next: (_uiEvent: any, forcePlay: any, crossfadeEnabled: any) => void;
    play: () => void;
    playpause: () => void;
    cue: () => void;
    pause: () => void;
    stop: () => void;
    isPlaying: () => boolean;
    canShuffle: () => boolean;
    startingTrack: string | number;
}
export namespace LogLevel {
    let Debug: number;
    let Info: number;
    let Warning: number;
    let Error: number;
    let None: number;
}
export namespace CrossfadeShape {
    let None_1: number;
    export { None_1 as None };
    export let Linear: number;
    export let EqualPower: number;
}
declare function Gapless5FileList(parentPlayer: any, parentLog: any, inShuffle: any, inLoadLimit?: number, inTracks?: any[], inStartingTrack?: number): void;
declare class Gapless5FileList {
    constructor(parentPlayer: any, parentLog: any, inShuffle: any, inLoadLimit?: number, inTracks?: any[], inStartingTrack?: number);
    sources: Gapless5Source[];
    startingTrack: number;
    trackNumber: number;
    shuffledIndices: any[];
    shuffleMode: boolean;
    shuffleRequest: any;
    preserveCurrent: boolean;
    loadLimit: number;
    setStartingTrack: (newStartingTrack: any) => void;
    currentSource: () => Gapless5Source;
    isLastTrack: (index: any) => boolean;
    setCrossfade: (crossfadeIn: any, crossfadeOut: any) => void;
    gotoTrack: (pointOrPath: any, forcePlay: any, allowOverride: any, crossfadeEnabled: any) => number;
    lastIndex: (index: any, newList: any, oldList: any) => number;
    stopAllTracks: (resetPositions: any, excludedTracks?: any[]) => void;
    removeAllTracks: (flushList: any) => void;
    setPlaybackRate: (rate: any) => void;
    setShuffle: (nextShuffle: any, preserveCurrent?: boolean) => void;
    isShuffled: () => any;
    numTracks: () => number;
    getTracks: () => any[];
    indexFromTrack: (pointOrPath: any) => any;
    findTrack: (path: any) => number;
    getSourceIndexed: (index: any) => {
        index: any;
        source: Gapless5Source;
    };
    getPlaylistIndex: (index: any) => any;
    loadableTracks: () => Set<any>;
    updateLoading: () => void;
    add: (index: any, audioPath: any) => void;
    remove: (index: any) => void;
}
declare function Gapless5Source(parentPlayer: any, parentLog: any, inAudioPath: any): void;
declare class Gapless5Source {
    constructor(parentPlayer: any, parentLog: any, inAudioPath: any);
    audioPath: any;
    trackName: any;
    setCrossfade: (amountIn: any, amountOut: any, resetEndedCallback?: boolean) => void;
    calcFadeAmount: (percent: any) => number;
    getVolume: () => number;
    getState: () => number;
    unload: (isError: any) => void;
    stop: (resetPosition?: boolean) => void;
    inPlayState: (checkStarting: any) => boolean;
    isPlayActive: (checkStarting: any) => boolean;
    getPosition: () => number;
    getLength: () => number;
    play: (syncPosition: any) => void;
    setPlaybackRate: (rate: any) => void;
    tick: (updateLoopState: any) => number;
    getSeekablePercent: () => number;
    setPosition: (newPosition: any, bResetPlay: any) => void;
    load: () => void;
}
export {};
