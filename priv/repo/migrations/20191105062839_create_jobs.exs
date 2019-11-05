defmodule TimesheetsSpa.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :job_code, :string
      add :name, :string
      add :budget, :float
      add :description, :text
      add :manager_id, references(:managers, on_delete: :delete_all)

      timestamps()
    end

    create index(:jobs, [:manager_id])
  end
end
