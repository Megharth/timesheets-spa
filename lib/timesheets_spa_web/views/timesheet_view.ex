defmodule TimesheetsSpaWeb.TimesheetView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.TimesheetView
  alias TimesheetsSpaWeb.TaskView

  def render("index.json", %{timesheets: timesheets}) do
    %{data: render_many(timesheets, TimesheetView, "timesheet.json")}
  end

  def render("show.json", %{timesheet: timesheet}) do
    %{data: render_one(timesheet, TimesheetView, "timesheet.json")}
  end

  def render("timesheet.json", %{timesheet: timesheet}) do
    %{
      id: timesheet.id,
      date: timesheet.date,
      approved: timesheet.approved,
    }
  end

  def render("timesheets_tasks.json", %{timesheet: timesheet}) do
    %{
      id: timesheet.id,
      date: timesheet.date,
      approved: timesheet.approved,
      tasks: render_many(timesheet.tasks, TaskView, "task.json")
    }
  end
end
