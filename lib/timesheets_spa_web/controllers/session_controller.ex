defmodule TimesheetsSpaWeb.SessionController do
  use TimesheetsSpaWeb, :controller
  alias TimesheetsSpa.Users

  action_fallback TimesheetsSpaWeb.FallbackController

  def create(conn, %{"email" => email, "password" => password, "type" => type}) do
    user = Users.authenticate(email, password, type)
    if user do
      token = Phoenix.Token.sign(conn, "session", user.id)
      resp = %{token: token, user_id: user.id, user_name: user.name, user_type: type}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end
end
