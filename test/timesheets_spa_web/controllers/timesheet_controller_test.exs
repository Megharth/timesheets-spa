defmodule TimesheetsSpaWeb.TimesheetControllerTest do
  use TimesheetsSpaWeb.ConnCase

  alias TimesheetsSpa.Timesheets
  alias TimesheetsSpa.Timesheets.Timesheet

  @create_attrs %{
    approved: true,
    date: ~D[2010-04-17]
  }
  @update_attrs %{
    approved: false,
    date: ~D[2011-05-18]
  }
  @invalid_attrs %{approved: nil, date: nil}

  def fixture(:timesheet) do
    {:ok, timesheet} = Timesheets.create_timesheet(@create_attrs)
    timesheet
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timesheets", %{conn: conn} do
      conn = get(conn, Routes.timesheet_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create timesheet" do
    test "renders timesheet when data is valid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "approved" => true,
               "date" => "2010-04-17"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.timesheet_path(conn, :create), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update timesheet" do
    setup [:create_timesheet]

    test "renders timesheet when data is valid", %{conn: conn, timesheet: %Timesheet{id: id} = timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.timesheet_path(conn, :show, id))

      assert %{
               "id" => id,
               "approved" => false,
               "date" => "2011-05-18"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, timesheet: timesheet} do
      conn = put(conn, Routes.timesheet_path(conn, :update, timesheet), timesheet: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete timesheet" do
    setup [:create_timesheet]

    test "deletes chosen timesheet", %{conn: conn, timesheet: timesheet} do
      conn = delete(conn, Routes.timesheet_path(conn, :delete, timesheet))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.timesheet_path(conn, :show, timesheet))
      end
    end
  end

  defp create_timesheet(_) do
    timesheet = fixture(:timesheet)
    {:ok, timesheet: timesheet}
  end
end
