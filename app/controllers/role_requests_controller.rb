class RoleRequestsController < ApplicationController
  before_action :authenticate_user!

  def create
    if current_user.role_request_status.present?
      return redirect_back fallback_location: root_path, alert: "Request already sent."
    end

    current_user.update(role_request_status: "pending")
    redirect_back fallback_location: root_path, status: "Your request to become an educator has been submitted."
  end

  def approve
    user = User.find(params[:id])
    user.add_role(:educator)
    user.update(role_request_status: nil)

    redirect_back fallback_location: root_path, notice: "User has been approved as an educator."
  end
end
