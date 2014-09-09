class Api::V1::UserActionsController < ApplicationController
	respond_to :json
	
	def create
		respond_with :api, :v1, UserAction.create(params[:user_action])
end
