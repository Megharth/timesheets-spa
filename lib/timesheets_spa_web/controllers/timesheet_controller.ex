defmodule TimesheetsSpaWeb.TimesheetController do
  use TimesheetsSpaWeb, :controller

  alias TimesheetsSpa.Timesheets
  alias TimesheetsSpa.Timesheets.Timesheet

  action_fallback TimesheetsSpaWeb.FallbackController

  def index(conn, _params) do
    timesheets = Timesheets.list_timesheets()
    render(conn, "index.json", timesheets: timesheets)
  end

  def create(conn, %{"timesheet" => timesheet_params}) do
    record = Timesheets.get_by_date(timesheet_params["date"], timesheet_params["worker_id"])
    if length(record) >= 1 do
      resp = %{errors: ["Timesheet Already Exists for the given date."]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    else
      with {:ok, %Timesheet{} = timesheet} <- Timesheets.create_timesheet(timesheet_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.timesheet_path(conn, :show, timesheet))
        |> render("show.json", timesheet: timesheet)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    timesheet = Timesheets.get_timesheet!(id)
    render(conn, "timesheets_tasks.json", timesheet: timesheet)
  end

  def update(conn, %{"id" => id, "timesheet" => timesheet_params}) do
    timesheet = Timesheets.get_timesheet!(id)

    with {:ok, %Timesheet{} = timesheet} <- Timesheets.update_timesheet(timesheet, timesheet_params) do
      render(conn, "show.json", timesheet: timesheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    timesheet = Timesheets.get_timesheet!(id)

    with {:ok, %Timesheet{}} <- Timesheets.delete_timesheet(timesheet) do
      send_resp(conn, :no_content, "")
    end
  end
end
