import type { Job, JobStatus } from "../types/job";
import { useState } from "react";
import { API_URL } from "../config";

interface JobCardProps {
  job: Job;
  onJobUpdated: (job: Job) => void;
  onJobDeleted: (id: number) => void;
}

function JobCard({ job, onJobUpdated, onJobDeleted }: JobCardProps) {
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(newStatus: JobStatus) {
    setError("");
    setIsUpdating(true);

    try {
      const response = await fetch(`${API_URL}/jobs/${job.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `failed to update job: ${response.status} ${response.statusText}`,
        );
      }
      const updatedJob: Job = await response.json();

      onJobUpdated(updatedJob);
    } catch (error) {
      console.error("Failed to update job:", error);
      setError("Could not update job status. Please try again");
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteJob() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${job.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsUpdating(true);

    try {
      const response = await fetch(`${API_URL}/jobs/${job.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete job: ${response.status} ${response.statusText}`,
        );
      }

      onJobDeleted(job.id);
    } catch (error) {
      console.error("Failed to delete job:", error);
      setError("Could not delete job. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <article className="job-card">
      <div className="job-card-header">
        <div>
          <h2>{job.title}</h2>
          <p className="job-type">{job.type}</p>
        </div>

        <span className={`status-badge status-${job.status}`}>
          {job.status}
        </span>
      </div>

      <p className="job-created">
        Created {new Date(job.created_at).toLocaleString()}
      </p>

      <div className="job-actions">
        {/* Pending can only move to running */}
        {job.status === "pending" && (
          <button
            className="action-button primary-button"
            onClick={() => updateStatus("running")}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Start"}
          </button>
        )}

        {/* Running can either complete or fail */}
        {job.status === "running" && (
          <>
            <button
              className="action-button primary-button"
              onClick={() => updateStatus("completed")}
              disabled={isUpdating}
            >
              Complete
            </button>

            <button
              className="action-button secondary-button"
              onClick={() => updateStatus("failed")}
              disabled={isUpdating}
            >
              Fail
            </button>
          </>
        )}

        <button
          className="action-button delete-button"
          onClick={deleteJob}
          disabled={isUpdating}
        >
          Delete
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </article>
  );
}

export default JobCard;
