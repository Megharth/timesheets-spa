defmodule TimesheetsSpa.Users.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managers" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    has_many :workers, TimesheetsSpa.Users.Worker
    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [:email, :name, :password_hash])
    |> hash_password()
    |> validate_required([:email, :name, :password_hash])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
