class AddBlogPostUrlToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :blog_post_url, :string
  end
end
