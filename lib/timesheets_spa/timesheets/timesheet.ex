defmodule TimesheetsSpa.Timesheets.Timesheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "timesheets" do
    field :approved, :boolean, default: false
    field :date, :string

    belongs_to :worker, TimesheetsSpa.Users.Worker
    has_many :tasks, TimesheetsSpa.Tasks.Task
    timestamps()
  end

  @doc false
  def changeset(timesheet, attrs) do
    timesheet
    |> cast(attrs, [:date, :approved, :worker_id])
    |> validate_required([:date, :approved, :worker_id])
  end
end
