require 'spec_helper'

describe Project do

	it "is valid with a name, watchers count, stargazers count, repo url, and language" do
		project = Project.new(
			name: "Test repo",
			watchers_count: 5,
			stargazers_count: 5,
			repo_url: "http://localhost",
			language: "Ruby")
		expect(project).to be_valid
	end

	it "is invalid without a name" do
		expect(Project.new(name: nil)).to have(1).errors_on(:name)
	end

	it "is invalid without a watchers count" do
		expect(Project.new(watchers_count: nil)).to have(1).errors_on(:watchers_count)
	end

	it "is invalid without a stargazers count" do
		expect(Project.new(stargazers_count: nil)).to have(1).errors_on(:stargazers_count)
	end

	it "is invalid without a repo url" do
		expect(Project.new(repo_url: nil)).to have(1).errors_on(:repo_url)
	end

	it "is invalid without a language" do
		expect(Project.new(language: nil)).to have(1).errors_on(:language)
	end
end
