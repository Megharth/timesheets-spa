defmodule TimesheetsSpa.Repo.Migrations.CreateTimesheets do
  use Ecto.Migration

  def change do
    create table(:timesheets) do
      add :date, :string
      add :approved, :boolean, default: false, null: false
      add :worker_id, references(:workers, on_delete: :delete_all)

      timestamps()
    end

    create index(:timesheets, [:worker_id])
  end
end
