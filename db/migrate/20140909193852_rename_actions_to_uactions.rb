class RenameActionsToUactions < ActiveRecord::Migration
  def up
  	rename_table :actions, :uactions
  end

  def down
	rename_table :uactions, :actions
  end
end
