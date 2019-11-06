defmodule TimesheetsSpaWeb.Plugs.RequireAuth do
  import Plug.Conn

  def init(args), do: args

  def call(conn, _args) do
    token = List.first(get_req_header(conn, "x-auth"))
    case Phoenix.Token.verify(TimesheetsSpaWeb.Endpoint, "session", token, max_age: 86400) do
      {:ok, user_id} ->
        assign(conn, :user_id, user_id)
      {:error, err} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unprocessable_entity, Jason.encode!(%{"error" => err}))
        |> halt()
    end
  end
end
