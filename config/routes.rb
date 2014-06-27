Hart::Application.routes.draw do

	namespace :api do
		namespace :v1 do
			get 'portfolio', to: 'alex_pelan#portfolio', as: 'portfolio'
			get 'tweets(/:count)', to: 'alex_pelan#tweets', as: 'tweets'
		end
	end

	root to: 'home#index'

	get '*path', to: 'home#index'
end
