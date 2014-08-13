class RenameActionsToCommands < ActiveRecord::Migration
  def up
	  rename_table :actions, :commands
  end

  def down
  	  rename_table :commands, :actions
  end
end
