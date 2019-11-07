defmodule TimesheetsSpaWeb.WorkerView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.WorkerView
  alias TimesheetsSpaWeb.TimesheetView

  def render("index.json", %{workers: workers}) do
    %{data: render_many(workers, WorkerView, "worker.json")}
  end

  def render("show.json", %{worker: worker}) do
    %{data: render_one(worker, WorkerView, "worker.json")}
  end

  def render("worker.json", %{worker: worker}) do
    %{id: worker.id,
      email: worker.email,
      name: worker.name,
      pay: worker.pay,
      timesheets: render_many(worker.timesheets, TimesheetView, "timesheet.json")
    }
  end
end
