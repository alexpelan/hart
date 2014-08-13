class Api::V1::CommandsController < ApplicationController
	respond_to :json

	def create
		result = Command.create(params[:command])
		respond_with :api, :v1, result
	end

	def index
		respond_with Command.all
	end



end
