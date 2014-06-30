Hart::Application.routes.draw do

	namespace :api do
		namespace :v1 do
			get 'portfolio', to: 'alex_pelan#portfolio', as: 'portfolio'
			get 'tweets(/:count)', to: 'alex_pelan#tweets', as: 'tweets'
			get 'currently_reading', to: 'alex_pelan#currently_reading', as: 'currently_reading'
		end
	end

	root to: 'home#index'

	get '*path', to: 'home#index'
end
