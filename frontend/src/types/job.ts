export type JobStatus = "pending" | "running" | "completed" | "failed";
export interface Job {
    id: number
    title: string
    type: string
    status: JobStatus
    created_at: string
}