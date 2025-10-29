class User < ApplicationRecord
  rolify
  after_create :assign_default_role

  def requested_educator?
    role_request_status == "pending"
  end

  def educator?
    has_role?(:educator)
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  private

  def assign_default_role
    self.add_role(:student) if self.roles.blank?
  end
end
