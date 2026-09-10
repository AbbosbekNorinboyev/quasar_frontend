export type Status =
    | 'PENDING'
    | 'ACTIVE'
    | 'INACTIVE'
    | 'DELETED'

export const statusOptions: Status[] = [
    'PENDING',
    'ACTIVE',
    'INACTIVE',
    'DELETED'
]