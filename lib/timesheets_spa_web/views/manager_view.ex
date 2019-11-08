defmodule TimesheetsSpaWeb.ManagerView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.ManagerView
  alias TimesheetsSpaWeb.WorkerView

  def render("index.json", %{managers: managers}) do
    %{data: render_many(managers, ManagerView, "manager.json")}
  end

  def render("show.json", %{manager: manager}) do
    %{data: render_one(manager, ManagerView, "manager.json")}
  end

  def render("manager.json", %{manager: manager}) do
    %{id: manager.id,
      email: manager.email,
      name: manager.name,
      workers: render_many(manager.workers, WorkerView, "worker_manager.json")
    }
  end

  def render("manager_job.json", %{manager: manager}) do
    %{
      id: manager.id,
      email: manager.email,
      name: manager.name
    }
  end

end
