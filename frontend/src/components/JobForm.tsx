import { useState } from 'react'
import type { Job } from '../types/job'

interface JobFormProps {
  onJobCreated: (job: Job) => void
}

function JobForm({ onJobCreated }: JobFormProps) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!title.trim() || !type.trim()) {
      return
    }

    const newJob: Job = {
      id: Date.now(),
      title: title.trim(),
      type: type.trim(),
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    onJobCreated(newJob)

    setTitle('')
    setType('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Job type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <button type="submit">Create Job</button>
    </form>
  )
}

export default JobForm