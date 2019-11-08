defmodule TimesheetsSpaWeb.TimesheetChannel do
  use TimesheetsSpaWeb, :channel

  def join("timesheet:timesheet", _payload, socket) do
    {:ok, %{"message" => "Channel Joined"}, socket}
  end

  def handle_in("notify_manager", %{"name" => name, "hours" => hours}, socket) do
    broadcast!(socket, "notification", %{name: name, hours: hours})
    {:reply, {:ok, %{"message" => "manager notified", "name" => name}}, socket}
  end
end
