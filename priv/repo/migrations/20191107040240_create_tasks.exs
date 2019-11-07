defmodule TimesheetsSpa.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :job_code, :string
      add :hours, :float
      add :timesheet_id, references(:timesheets, on_delete: :delete_all)
      timestamps()
    end

    create index(:tasks, [:timesheet_id])
  end
end
