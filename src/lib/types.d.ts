export interface Goal {
    text: string,
    created: string,
    past: boolean,
}

export interface Task {
    text: string,
    created: string,
    past: boolean,
    completed: boolean,
    id: string,
}