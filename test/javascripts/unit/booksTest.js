var store;
var books;

module("Unit Test: Books", {

	setup: function(){
		store = App.__container__.lookup("store:main");
		Ember.run(function(){
			books = store.createRecord("books", {});	
		});
	},	
		
});

test("are_books_populated property tells whether there are books or not", function(){

	
	Ember.run(function(){
		book = store.createRecord("book", {});
		strictEqual(books.get("are_books_populated"), false, "Are_books_populated is not true for books record without any associated book records");
	});


	Ember.run(function(){	
		books.get("book_records").addObject(book);
		strictEqual(books.get("are_books_populated"), true, "Are_books_populated is true once there are associated book records");
	});

});


