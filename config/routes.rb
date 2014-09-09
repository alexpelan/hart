Hart::Application.routes.draw do

	namespace :api do
		namespace :v1 do
			get 'portfolio', to: 'alex_pelan#portfolio', as: 'portfolio'
			get 'tweets(/:count)', to: 'alex_pelan#tweets', as: 'tweets'
			get 'books', to: 'alex_pelan#currently_reading', as: 'currently_reading'
			get 'songs', to: 'alex_pelan#recently_played', as: 'recently_played'
			get 'beers', to: 'alex_pelan#recently_drank', as: 'recently_drank'
			resources :uactions
		end
	end

	root to: 'home#index'

	mount QUnit::Rails::Engine => 'qunit'
	get '*path', to: 'home#index'
end
