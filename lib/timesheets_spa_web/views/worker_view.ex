defmodule TimesheetsSpaWeb.WorkerView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.WorkerView

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
    }
  end
end
