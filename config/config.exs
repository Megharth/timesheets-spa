# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :timesheets_spa,
  ecto_repos: [TimesheetsSpa.Repo]

# Configures the endpoint
config :timesheets_spa, TimesheetsSpaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "hy0X9cwXk5Vr6UESKT4120ka50gmnNT6217MX+0tbTWg082ASW77hHANhhT3h1cx",
  render_errors: [view: TimesheetsSpaWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TimesheetsSpa.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
