/*
reference for javascript Date object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

want to add an approimate format too (nearly an hour, about an hour, just over an hour) etc...
*/
var fancyDT={
	/*
	when a Date object is expected, really need to check the type at teh top of the function
	*/
	
	formatDate: function (val){
	/*
		its a simple version for now, will be expanded to support a format string
	*/
	
		if(fancyDT.isToday(val)){
			fancy = "Today";
		}else if(fancyDT.isTomorrow(val)){
			fancy = "Tomorrow";
		}else if(fancyDT.isYesterday(val)){
			fancy = "Yesterday";
		}else{
			fancy = fancyDT.dayOfWeek(val.getDay()) + ", "
					+ val.getDate()+fancyDT.dateSuffix( val.getDay())+" "
					+ fancyDT.monthName(val.getMonth(), true) + " " 
					+ val.getFullYear();// ie ', 24th may 1972'
		}
			
		return fancy;
		
	},//function formatDate
	formatDateTime: function(val){
		
		/*
			this is just a short cut, but wont be needed when formatDate supports a formatting string
		*/
		fancy  = fancyDT.formatDate(val);	
		fancy += " "+fancyDT.formatTime(val);
		return fancy;
	},//function formatDateTime
	formatTime: function (val){
		/* tempoary until formatDate supports a format string */
		fancy = padDigits(val.getHours(),2)
				+":"+ padDigits(val.getMinutes(),2)
				+":"+ padDigits(val.getSeconds(),2);
		return fancy;
	},//function formatTime
	
	relativeFormatTime: function($val1, $val2){
		
		 $val2 = typeof $val2 !== 'undefined' ? $val2 : new Date();
		 
		 $diff = $val1.getTime() - $val2.getTime();//in milliseconds
		 $diff = Math.floor($diff/1000); // in seconds	
		 	 
		 $fancy = "";
		 $suffix = "";
		 
		 if($diff<0){
			 //a  positive diff means $val1 is AFTER $val2
			 $suffix = " ago";
			 $diff = $diff * -1;
		 }
		 		 
		 if($diff>=3600){
			 $hours = Math.floor($diff/3600);
			 $diff = $diff - $hours*3600;
			 
			 $fancy += $hours+" hour";
			 if($hours>1){
				$fancy +="s"; 
			 }
		 }
		 
		 if($diff>60){
			 $mins = Math.floor($diff/60);
			 $diff= $diff -$mins*60;

			 if($fancy!=""){
				 $fancy += ", ";
			 }
			 $fancy += $mins+" min";
			 if($mins>1){
				 $fancy +="s";
			 }			 
		 }
		 
		 if($diff>0){
			 if($fancy!=""){
				 $fancy += ", ";
			 }
			 $fancy += $diff + " second";
			 if($diff>1){
				 $fancy +="s";
			 }
		 }

		 return $fancy+$suffix;

	},//function relativeFormatTime

	daysBetween: function (val1, val2){
		val1Day = new Date(val1.getFullYear(), val1.getMonth(), val1.getDate());//ignore the time
		val2Day = new Date(val2.getFullYear(), val2.getMonth(), val2.getDate());//ignore the time
		diff = val1Day.getTime() - val2Day.getTime();//in milliseconds
		diff = diff / (1000*60*60*24);//in days
		return diff;
	},//function daysBetween
	isToday: function (val){
		today = new Date();
		if(val.getDate()==today.getDate() && val.getMonth()==today.getMonth() && val.getYear()==today.getYear()){
			return true;	
		}else{
			return false;
		}	
	},//function isToday
	
	
	isTomorrow: function (val){
		tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		
		if(val.getDate()==tomorrow.getDate() && val.getMonth()==tomorrow.getMonth() && val.getYear()==tomorrow.getYear()){
			return true;	
		}else{
			return false;
		}	
	},//function isTomorrow	
	
	isYesterday: function (val){
		yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		
		if(val.getDate()==yesterday.getDate() && val.getMonth()==yesterday.getMonth() && val.getYear()==yesterday.getYear()){
			return true;	
		}else{
			return false;
		}	
	},//function isYesterday		
	
	monthName: function ($val, $abbreviate){
		
		$abbreviate = typeof $abbreviate !== 'undefined' ? $abbreviate : false;

		var full = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
		var abbr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if($abbreviate){
			return abbr[$val];
		}else{
			return full[$val];
		}

	},//function monthName
	dateSuffix: function (val){
		switch(val){
			case 1,21,31:
				return "st";
				break;
			case 2,22:
				return "nd";
				break;
			case 3,23: 
				return "rd";
				break;
			default:
				return "th";
				break;
		}
	},//function dateSuffix
	dayOfWeek: function (val){
		//converts day of week number of the description fothe day
		var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
		return dayNames[val];
	},//function dayOfWeek
	dateFromMySQL: function (val){
		//convert a mySQL date time string ot a javascript Date object
		var date = new Date();  
		var parts = String(val).split(/[- :]/);  
		  
		date.setFullYear(parts[0]);  
		date.setMonth(parts[1] - 1);  
		date.setDate(parts[2]);  
		date.setHours(parts[3]);  
		date.setMinutes(parts[4]);  
		date.setSeconds(parts[5]);  
		date.setMilliseconds(0);  
		  
		return date;  
	}//function dateFromMySQL
	
}//fancyDT namespace
