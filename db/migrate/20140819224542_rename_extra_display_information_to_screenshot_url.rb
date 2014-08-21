class RenameExtraDisplayInformationToScreenshotUrl < ActiveRecord::Migration

	def change
		rename_column :projects, :extra_display_information, :screenshot_url
		change_column :projects, :screenshot_url, :string
	end

end
