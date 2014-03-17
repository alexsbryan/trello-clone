class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.float :rank, null: false
      t.integer :board_id, null: false

      t.timestamps
    end
  end
end
