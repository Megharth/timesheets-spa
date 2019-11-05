defmodule TimesheetsSpaWeb.Router do
  use TimesheetsSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", TimesheetsSpaWeb do
    pipe_through :ajax

    resources "/managers", ManagerController
    resources "/workers", WorkerController
    resources "/jobs", JobController
    resources "/sessions", SessionController, only: [:create], singleton: true

  end

  scope "/", TimesheetsSpaWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimesheetsSpaWeb do
  #   pipe_through :api
  # end
end
