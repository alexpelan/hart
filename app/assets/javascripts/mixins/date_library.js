App.DateLibrary = Ember.Mixin.create({
	
	adjust_for_user_timezone: function(parsed_date){
        	var hour = parseInt(parsed_date["hour"]);
	        var day = parseInt(parsed_date["day"]);
		var unused_date = new Date();
		var timezone_offset_in_hours = - (unused_date.getTimezoneOffset() / 60); //negative because this returns positive for areas behind GMT, which is weird to me
		hour = hour + timezone_offset_in_hours;
		
		if(hour > 24){
			hour = hour % 24;
		        day = day + 1;
		}
                else if(hour < 0){
                        hour = 24 + hour;
                        day = day - 1;
                }

                parsed_date["hour"] = this.prepend_leading_zero(hour);
                parsed_date["day"] = this.prepend_leading_zero(day);
                return parsed_date;
        },

  	prepend_leading_zero: function(date_value){
		if(date_value < 10){
			date_value = "0" + date_value;
		}
		return date_value
	},

	convert_month_name_to_month_number: function(month_name){
		var months = {
	       		'Jan': 1,
			'Feb': 2,
		        'Mar': 3,
		        'Apr': 4,
		        'May': 5,
		        'Jun': 6,
		        'Jul': 7,
		        'Aug': 8,
		        'Sep': 9,
		        'Oct': 10,
	       		'Nov': 11,
			'Dec': 12
															       };
	      return months[month_name];
       },



});
