defmodule TimesheetsSpa.Repo do
  use Ecto.Repo,
    otp_app: :timesheets_spa,
    adapter: Ecto.Adapters.Postgres
end
