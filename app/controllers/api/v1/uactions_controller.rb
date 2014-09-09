class Api::V1::UactionsController < ApplicationController
	respond_to :json
	
	def create
		respond_with :api, :v1, Uaction.create(params[:uaction])
	end

	def index
	end

	def show
	end

end
