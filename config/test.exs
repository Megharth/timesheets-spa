use Mix.Config

# Configure your database
config :timesheets_spa, TimesheetsSpa.Repo,
  username: "timesheets_spa",
  password: "UYi5eesahY5O",
  database: "timesheets_spa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :timesheets_spa, TimesheetsSpaWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
