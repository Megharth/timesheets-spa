defmodule TimesheetsSpa.Repo.Migrations.CreateManagers do
  use Ecto.Migration

  def change do
    create table(:managers) do
      add :email, :string
      add :name, :string
      add :password_hash, :string

      timestamps()
    end

  end
end
