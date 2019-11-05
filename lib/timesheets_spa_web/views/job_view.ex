defmodule TimesheetsSpaWeb.JobView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.JobView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "job.json")}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      job_code: job.job_code,
      name: job.name,
      budget: job.budget,
      description: job.description}
  end
end
