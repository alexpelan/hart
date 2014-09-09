class RenameUserActionsToActions < ActiveRecord::Migration
  def up
  	rename_table :user_actions, :actions
  end

  def down
	rename_table :actions, :user_actions
  end
end
