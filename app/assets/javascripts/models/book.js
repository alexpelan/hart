App.Book = DS.Model.extend({
	//attributes
	title: DS.attr("string"),
	image_url: DS.attr("string"),
	url: DS.attr("string"),
	author_name: DS.attr("string"),

	//relationships
	books: DS.belongsTo("books"),
});
