App.Song =  DS.Model.extend({
	//attributes
	is_now_playing: DS.attr('string'),
	name: DS.attr('string'),
	artist_name: DS.attr('string'),
	album_name: DS.attr('string'),
	url: DS.attr('string'),

	//relationships
	songs: DS.belongsTo("songs"),
});
