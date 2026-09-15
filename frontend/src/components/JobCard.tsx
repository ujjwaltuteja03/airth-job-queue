import type { Job } from "../types/job";

interface JobCardProps {
    job: Job
}

function JobCard({job}: JobCardProps) {
    return (
        <div>
            <h2>{job.title}</h2>
            <p>Type: {job.type}</p>
            <p>Status: {job.status}</p>
            <p>Created: {new Date(job.created_at).toLocaleString()}</p>
        </div>
    )
}

export default JobCard