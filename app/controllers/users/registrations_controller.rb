class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :inertia

  def new
    render inertia: "Auth/Register"
  end

  def create
    @user = User.new(sign_up_params)

    if @user.save
      sign_in(@user)
      flash[:notice] = "Signed up successfully."
      redirect_to root_path
    else
      # send errors back to Inertia
      render inertia: "Auth/Register", props: { errors: @user.errors.full_messages }
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
