import JobCard from "./components/JobCard";
import type { Job, JobStatus } from "./types/job";
import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";



function App() {
  // states
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  // fetch jobs when app first loads
  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs`);

      const data: Job[] = await response.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

  // filtered jobs
  const filteredJobs =
    statusFilter === "all"
      ? jobs
      : jobs.filter((job) => job.status === statusFilter);

  // Rendering UI
  return (
    <main>
      <h1>Job Queue</h1>
      <p>Manage and monitor jobs</p>
      <JobForm
        onJobCreated={(job) => setJobs((currentJobs) => [job, ...currentJobs])}
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as JobStatus | "all")}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>

      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </main>
  );
}

export default App;
