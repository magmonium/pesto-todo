export enum TaskStatus {
    NEW,
    TO_DO,
    IN_PROGRESS,
    DONE
}

export interface Task {
    name?: string
    description?: string
    status: TaskStatus
    id?: string
    date: number
}

export const TASK_STATUS_ARR = [{
    name: 'To do',
    key: TaskStatus.TO_DO
},{
    name: 'In progress',
    key: TaskStatus.IN_PROGRESS
},{
    name: 'Done',
    key: TaskStatus.DONE
}]