App.Books = DS.Model.extend({
	book_records: DS.hasMany("book"),
	command: DS.belongsTo("command"),

	get_books_from_goodreads: function(){
		return $.getJSON("http://localhost:3000/api/v1/books.json");
	},

	populate_attributes: function(response){
		books = response["books"];
		var i;
		for(i = 0; i < books.length; i++){
			var book_json = books[i].book;
			var title = book_json.title;
			var url = book_json.link;
			var image_url = book_json.image_url;
			var author = book_json.authors.author.name //okay with the primary author for now
			var book = this.store.createRecord("book", {title: title, url: url, image_url: image_url, author: author});
			this.get("book_records").addObject(book);
			book.save();
		}
	
		this.save();
	},

});
