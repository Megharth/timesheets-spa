defmodule TimesheetsSpa.Users.Worker do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workers" do
    field :email, :string
    field :name, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :pay, :float

    belongs_to :manager, TimesheetsSpa.Users.Manager
    has_many :timesheets, TimesheetsSpa.Timesheets.Timesheet
    timestamps()
  end

  @doc false
  def changeset(worker, attrs) do
    worker
    |> cast(attrs, [:email, :name, :pay, :password, :manager_id])
    |> hash_password()
    |> validate_required([:email, :name, :pay, :password_hash, :manager_id])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    if pw do
      change(cset, Argon2.add_hash(pw))
    else
      cset
    end
  end
end
