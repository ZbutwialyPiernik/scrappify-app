export enum LoadingState {
    IDLE = "IDLE", LOADING = "LOADING", ERROR = "ERROR", LOADED = "LOADED"
}

export class Loadable<T> {

    constructor(props: { state: LoadingState, data?: T; error?: string }) {
        this.state = props.state;
        this.data = props.data;
        this.error = props.error;
    }

    state: LoadingState
    data?: T | undefined
    error?: string
    isError = () => this.state === LoadingState.ERROR
    isIdle = () => this.state === LoadingState.IDLE
    isLoaded = () => this.state === LoadingState.LOADED
    isLoading = () => this.state === LoadingState.LOADING
}

export function loadingSuccess<T>(data: T): Loadable<T> {
    return new Loadable<T>({state: LoadingState.LOADED, data: data})
}

export function loadingIdle<T>(): Loadable<T> {
    return new Loadable<T>({state: LoadingState.IDLE})
}

export function loadingInProgress<T>(): Loadable<T> {
    return new Loadable<T>({state: LoadingState.LOADING})
}

export function loadingError<T>(error: string): Loadable<T> {
    return new Loadable<T>({state: LoadingState.ERROR, error: error})
}

export interface Page<T> {
    index: number,
    size: number,
    totalItems: number,
    items: T[]
}

export interface PageRequest {
    index: number,
    size: number,
}

export interface Identified {
    id: number
}