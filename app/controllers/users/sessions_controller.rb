class Users::SessionsController < Devise::SessionsController
  respond_to :html, :inertia

  def new
    render inertia: "Auth/Login"
  end

  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      flash[:notice] = "Signed in successfully."
      sign_in(user)
      redirect_to root_path
    else
      flash[:alert] = "Invalid email or password."
      redirect_to new_user_session_path
    end
  end
end
