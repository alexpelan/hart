Hart::Application.routes.draw do

	namespace :api do
		namespace :v1 do
			get 'portfolio', to: 'alex_pelan#portfolio', as: 'portfolio'
		end
	end

	root to: 'home#index'

	get '*path', to: 'home#index'
end
