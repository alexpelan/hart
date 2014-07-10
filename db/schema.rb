# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140709034506) do

  create_table "projects", :force => true do |t|
    t.string   "name"
    t.integer  "watchers_count"
    t.integer  "stargazers_count"
    t.string   "project_url"
    t.string   "repo_url"
    t.string   "language"
    t.string   "description"
    t.text     "extra_display_information"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

end