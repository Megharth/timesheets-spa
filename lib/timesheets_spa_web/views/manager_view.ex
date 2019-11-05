defmodule TimesheetsSpaWeb.ManagerView do
  use TimesheetsSpaWeb, :view
  alias TimesheetsSpaWeb.ManagerView

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
      password_hash: manager.password_hash}
  end
end
