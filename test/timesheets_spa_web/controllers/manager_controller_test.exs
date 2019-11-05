defmodule TimesheetsSpaWeb.ManagerControllerTest do
  use TimesheetsSpaWeb.ConnCase

  alias TimesheetsSpa.Users
  alias TimesheetsSpa.Users.Manager

  @create_attrs %{
    email: "some email",
    name: "some name",
    password_hash: "some password_hash"
  }
  @update_attrs %{
    email: "some updated email",
    name: "some updated name",
    password_hash: "some updated password_hash"
  }
  @invalid_attrs %{email: nil, name: nil, password_hash: nil}

  def fixture(:manager) do
    {:ok, manager} = Users.create_manager(@create_attrs)
    manager
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all managers", %{conn: conn} do
      conn = get(conn, Routes.manager_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create manager" do
    test "renders manager when data is valid", %{conn: conn} do
      conn = post(conn, Routes.manager_path(conn, :create), manager: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.manager_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some email",
               "name" => "some name",
               "password_hash" => "some password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.manager_path(conn, :create), manager: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update manager" do
    setup [:create_manager]

    test "renders manager when data is valid", %{conn: conn, manager: %Manager{id: id} = manager} do
      conn = put(conn, Routes.manager_path(conn, :update, manager), manager: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.manager_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some updated email",
               "name" => "some updated name",
               "password_hash" => "some updated password_hash"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, manager: manager} do
      conn = put(conn, Routes.manager_path(conn, :update, manager), manager: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete manager" do
    setup [:create_manager]

    test "deletes chosen manager", %{conn: conn, manager: manager} do
      conn = delete(conn, Routes.manager_path(conn, :delete, manager))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.manager_path(conn, :show, manager))
      end
    end
  end

  defp create_manager(_) do
    manager = fixture(:manager)
    {:ok, manager: manager}
  end
end
