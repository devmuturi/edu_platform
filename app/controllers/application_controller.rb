class ApplicationController < ActionController::Base
  include InertiaRails::Controller
  before_action :configure_permitted_parameters, if: :devise_controller?

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

  inertia_share flash: -> {
    {
      success: flash[:notice],
      error: flash[:alert]
    }
  }

  # layout -> { inertia? ? "inertia_meta" : "application" }

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name ])
  end
end
