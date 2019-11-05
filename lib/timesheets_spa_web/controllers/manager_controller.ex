defmodule TimesheetsSpaWeb.ManagerController do
  use TimesheetsSpaWeb, :controller

  alias TimesheetsSpa.Users
  alias TimesheetsSpa.Users.Manager

  action_fallback TimesheetsSpaWeb.FallbackController

  def index(conn, _params) do
    managers = Users.list_managers()
    render(conn, "index.json", managers: managers)
  end

  def create(conn, %{"manager" => manager_params}) do
    with {:ok, %Manager{} = manager} <- Users.create_manager(manager_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.manager_path(conn, :show, manager))
      |> render("show.json", manager: manager)
    end
  end

  def show(conn, %{"id" => id}) do
    manager = Users.get_manager!(id)
    render(conn, "show.json", manager: manager)
  end

  def update(conn, %{"id" => id, "manager" => manager_params}) do
    manager = Users.get_manager!(id)

    with {:ok, %Manager{} = manager} <- Users.update_manager(manager, manager_params) do
      render(conn, "show.json", manager: manager)
    end
  end

  def delete(conn, %{"id" => id}) do
    manager = Users.get_manager!(id)

    with {:ok, %Manager{}} <- Users.delete_manager(manager) do
      send_resp(conn, :no_content, "")
    end
  end
end
