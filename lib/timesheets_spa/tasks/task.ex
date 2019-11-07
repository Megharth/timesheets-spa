defmodule TimesheetsSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :hours, :float
    field :job_code, :string
    belongs_to :timesheet, TimesheetsSpa.Timesheets.Timesheet

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:job_code, :hours, :timesheet_id])
    |> validate_required([:job_code, :hours, :timesheet_id])
  end
end
