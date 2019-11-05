defmodule TimesheetsSpaWeb.Plugs.RequireAuth do
  import Plug.Conn

  def init(args), do: args

  def call(conn, _args) do
    token = List.first(get_req_header(conn, "x-auth"))
    case Phoenix.Token.verify(LensWeb.Endpoint, "session", token, max_age: 86400) do
      {:ok, %{:user_type => user_type, :user_id => user_id}} ->
        if user_type == "worker" do
          assign(conn, :current_user, TimesheetsSpa.Users.get_worker!(user_id))
        else
          assign(conn, :current_user, TimesheetsSpa.Users.get_manager!(user_id))
        end
      {:error, err} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unprocessable_entity, Jason.encode!(%{"error" => err}))
        |> halt()
    end
  end
end
