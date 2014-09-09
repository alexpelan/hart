App.Songs = DS.Model.extend(App.SharedModelLogic, {

	command: DS.belongsTo("command"),
	song_records: DS.hasMany("song"),

	init: function(){
		this._super();
		this.model_name = "songs";
	},

	//potentially refactor all of the get_X_from_Y functions to a mixin?
	get_songs_from_lastfm: function(number_of_songs){
		var number_of_songs_string = "songs.json?count=" + number_of_songs;
		var request_url = this.get_request_url(number_of_songs_string);
		return $.getJSON(request_url);
	},	

	populate_attributes: function(response){
		songs = response["alex_pelan"]; //rails sillyness since that's the name of my controller
		var i;
		for (i=0; i < songs.length; i++){
			var is_now_playing = songs[i].nowplaying;
			if(is_now_playing === "true"){
				is_now_playing = true;
			}
			var title = songs[i].name;
			var artist_name = songs[i].artist.content;
			var album_name = songs[i].album.content;
			var url = songs[i].url;
			var song = this.store.createRecord("song", {is_now_playing: is_now_playing, title: title, artist_name: artist_name, album_name: album_name, url: url});
			this.get("song_records").addObject(song);
			song.save();
		}

		this.save();

	},	


});
