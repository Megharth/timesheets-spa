defmodule TimesheetsSpaWeb.TaskView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      job_code: task.job_code,
      hours: task.hours
    }
  end
end
