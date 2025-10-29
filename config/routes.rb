Rails.application.routes.draw do
  root "home#index"

  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  get "inertia-example", to: "inertia_example#index"
  post "/request-educator", to: "role_requests#create", as: "request_eductor"
  post "/request_eductor/:id", to: "role_requests#approve", as: "approve_educator"
end
