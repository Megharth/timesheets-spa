defmodule TimesheetsSpaWeb.JobView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.JobView
  alias TimesheetsSpaWeb.ManagerView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "job.json")}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    IO.inspect job
    %{id: job.id,
      job_code: job.job_code,
      name: job.name,
      budget: job.budget,
      description: job.description,
      manager: render_one(job.manager, ManagerView, "manager_job.json")
  }
  end
end
