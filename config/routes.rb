Rails.application.routes.draw do
  devise_for :users
  get "inertia-example", to: "inertia_example#index"
  post "/request-educator", to: "role_requests#create", as: "request_eductor"
  post "/request_eductor/:id", to: "role_requests#approve", as: "approve_educator"
end
