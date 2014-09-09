class CreateUserActions < ActiveRecord::Migration
	def change
		create_table :leads do |t|
			t.string :action

			t.timestamps
		end
	end
end
