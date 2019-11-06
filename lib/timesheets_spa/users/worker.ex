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
    |> cast(attrs, [:email, :name, :pay, :password_hash, :manager_id])
    |> validate_required([:email, :name, :pay, :password_hash, :manager_id])
    |> hash_password()
  end

  def hash_password(cset) do
    pw = get_change(cset, :password_hash)
    Map.put(cset, :password_hash, Argon2.add_hash(pw).password_hash)
  end
end
