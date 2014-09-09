App.Books = DS.Model.extend(App.SharedModelLogic,{
	book_records: DS.hasMany("book"),
	command: DS.belongsTo("command"),

	init: function(){
		this._super();
		this.model_name = "books";
	},	

	get_books_from_goodreads: function(){
		var request_url = this.get_request_url("books.json");
		return $.getJSON(request_url);
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
