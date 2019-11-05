defmodule TimesheetsSpaWeb.WorkerController do
  use TimesheetsSpaWeb, :controller

  alias TimesheetsSpa.Users
  alias TimesheetsSpa.Users.Worker

  action_fallback TimesheetsSpaWeb.FallbackController

  def index(conn, _params) do
    workers = Users.list_workers()
    render(conn, "index.json", workers: workers)
  end

  def create(conn, %{"worker" => worker_params}) do
    with {:ok, %Worker{} = worker} <- Users.create_worker(worker_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.worker_path(conn, :show, worker))
      |> render("show.json", worker: worker)
    end
  end

  def show(conn, %{"id" => id}) do
    worker = Users.get_worker!(id)
    render(conn, "show.json", worker: worker)
  end

  def update(conn, %{"id" => id, "worker" => worker_params}) do
    worker = Users.get_worker!(id)

    with {:ok, %Worker{} = worker} <- Users.update_worker(worker, worker_params) do
      render(conn, "show.json", worker: worker)
    end
  end

  def delete(conn, %{"id" => id}) do
    worker = Users.get_worker!(id)

    with {:ok, %Worker{}} <- Users.delete_worker(worker) do
      send_resp(conn, :no_content, "")
    end
  end
end
