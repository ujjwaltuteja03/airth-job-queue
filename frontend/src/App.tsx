import JobCard from "./components/JobCard";
import type { Job, JobStatus } from "./types/job";
import { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import { API_URL } from "./config";

function App() {
  // states
  const [jobs, setJobs] = useState<Job[]>([]);
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // fetch jobs when app first loads
  useEffect(() => {
    async function fetchJobs() {
      setFetchError("");
      try {
        const response = await fetch(`${API_URL}/jobs`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch jobs: ${response.status} ${response.statusText}`,
          );
        }

        const data: Job[] = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setFetchError("Could not load jobs. Please try again.");
      } finally {
        setIsLoading(false);
      }
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
    <main className="app-container">
      <header className="app-header">
        <h1>Job Queue</h1>
        <p>Manage and monitor your jobs</p>
      </header>

      <JobForm
        onJobCreated={(job) =>
          setJobs((currentJobs) => [job, ...currentJobs])
        }
      />

      <div className="filter-section">
        <label htmlFor="status-filter">Filter by status</label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as JobStatus | "all")
          }
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {isLoading && <p>Loading jobs...</p>}

      {fetchError && <p className="error-message">{fetchError}</p>}

      {!isLoading && !fetchError && filteredJobs.length === 0 && (
        <p>No jobs found.</p>
      )}

      {!isLoading &&
        !fetchError &&
        filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onJobUpdated={(updatedJob) =>
              setJobs((currentJobs) =>
                currentJobs.map((currentJob) =>
                  currentJob.id === updatedJob.id ? updatedJob : currentJob,
                ),
              )
            }
            onJobDeleted={(deletedId) =>
              setJobs((currentJobs) =>
                currentJobs.filter(
                  (currentJob) => currentJob.id !== deletedId,
                ),
              )
            }
          />
        ))}
    </main>
  );
}

export default App;