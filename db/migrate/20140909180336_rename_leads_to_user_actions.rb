class RenameLeadsToUserActions < ActiveRecord::Migration
  def up
  	rename_table :leads, :user_actions
  end

  def down
	rename_table :user_actions, :leads
  end
end
