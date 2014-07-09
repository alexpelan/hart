class CreateProjects < ActiveRecord::Migration
	
	def change
		create_table :projects do |t|
			t.string :name
			t.integer :watchers_count
			t.integer :stargazers_count
			t.string :project_url
			t.string :repo_url
			t.string :language
			t.string :description
			t.text :extra_display_information

			t.timestamps
		
		end
	end

end
