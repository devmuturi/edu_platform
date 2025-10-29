class AddRoleRequestStatusToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :role_request_status, :string
  end
end
