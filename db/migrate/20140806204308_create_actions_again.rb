class CreateActionsAgain < ActiveRecord::Migration
  def change
	  create_table :actions do |t|
		t.string :input
		t.string :output
		t.string :session_id

		t.timestamps
	  end
  end

end
