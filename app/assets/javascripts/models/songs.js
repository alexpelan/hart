App.Songs = DS.Model.extend({

	command: DS.belongsTo("command"),
	song_records: DS.hasMany("song"),

	//potentially refactor all of the get_X_from_Y functions to a mixin?
	get_songs_from_lastfm: function(number_of_songs){
		var number_of_songs_string = "?count=" + number_of_songs;
		var request_url = "http://localhost:3000/api/v1/songs.json" + number_of_songs_string;
		return $.getJSON(request_url);
	},	

	populate_attributes: function(response){
		songs = response["alex_pelan"]; //rails sillyness since that's the name of my controller
		var i;
		for (i=0; i < songs.length; i++){
			var nowplaying = songs[i].nowplaying;
			var title = songs[i].name;
			var artist_name = songs[i].artist.content;
			var album_name = songs[i].album.content;
			var url = songs[i].url;
			var song = this.store.createRecord("song", {nowplaying: nowplaying, title: title, artist_name: artist_name, album_name: album_name, url: url});
			this.get("song_records").addObject(song);
			song.save();
		}

		this.save();

	},	


});
