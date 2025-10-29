class ApplicationController < ActionController::Base
  # Share authentication + roles + flash messages globally
  inertia_share auth: -> {
    if current_user
      {
        user: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name,
          roles: current_user.roles.pluck(:name) # Rolify roles
        }
      }
    else
      { user: nil }
    end
  }

  inertia_share flash: -> { flash.to_hash }
end
