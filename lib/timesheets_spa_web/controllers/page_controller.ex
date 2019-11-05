defmodule TimesheetsSpaWeb.PageController do
  use TimesheetsSpaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
