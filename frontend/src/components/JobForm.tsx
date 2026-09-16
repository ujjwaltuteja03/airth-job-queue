import { useState } from "react";
import type { Job } from "../types/job";
import { API_URL } from "../config";

interface JobFormProps {
  onJobCreated: (job: Job) => void;
}

function JobForm({ onJobCreated }: JobFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !type.trim()) {
      setError("Title and type are required");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          type: type.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create job: ${response.status} ${response.statusText}`,
        );
      }

      const newJob: Job = await response.json();

      onJobCreated(newJob);

      setTitle("");
      setType("");
    } catch (error) {
      console.error("Failed to create job:", error);
      setError("Could not create job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job title"
        value={title}
        maxLength={255}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Job type"
        value={type}
        maxLength={100}
        onChange={(e) => setType(e.target.value)}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Job"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default JobForm;