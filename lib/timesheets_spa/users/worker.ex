defmodule TimesheetsSpa.Users.Worker do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :pay, :float

    belongs_to :manager, TimesheetsSpa.Users.Manager

    timestamps()
  end

  @doc false
  def changeset(worker, attrs) do
    worker
    |> cast(attrs, [:email, :name, :pay, :password_hash])
    |> validate_required([:email, :name, :pay, :password_hash])
  end
end
