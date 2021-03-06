defmodule TimesheetsSpaWeb.JobController do
  use TimesheetsSpaWeb, :controller

  plug TimesheetsSpaWeb.Plugs.RequireAuth when action in [:show, :create, :delete]
  alias TimesheetsSpa.Jobs
  alias TimesheetsSpa.Jobs.Job

  action_fallback TimesheetsSpaWeb.FallbackController

  def index(conn, _params) do
    jobs = Jobs.list_jobs()
    render(conn, "index.json", jobs: jobs)
  end

  def create(conn, %{"job" => job_params}) do
    manager = TimesheetsSpa.Users.get_manager!(job_params["manager_id"])
    with {:ok, %Job{} = job} <- Jobs.create_job(job_params) do
      conn
      |> put_status(:created)
      |> render("show.json", job: Map.put(job, :manager, manager))
    end
  end

  def show(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)
    render(conn, "show.json", job: job)
  end

  def update(conn, %{"id" => id, "job" => job_params}) do
    job = Jobs.get_job!(id)

    with {:ok, %Job{} = job} <- Jobs.update_job(job, job_params) do
      render(conn, "show.json", job: job)
    end
  end

  def delete(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)

    with {:ok, %Job{}} <- Jobs.delete_job(job) do
      send_resp(conn, :no_content, "")
    end
  end
end
