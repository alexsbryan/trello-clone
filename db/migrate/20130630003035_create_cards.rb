class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.text :description
      t.float :rank, null: false

      t.timestamps
    end
  end
end
