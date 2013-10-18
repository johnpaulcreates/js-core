

function fancyFormatDateTime(val){

	fancy = "";
	
	if(fancyDT.isToday(val)){
		//today	
		fancy = fancyRelativeTime(val);
	}
	
	fancy += fancyDT.formatDate(val);
	
	
	return fancy;
	
}//function fancyFormatDateTime
function fancyTime(val){
	
	
	if(fancyDT.isToday(val)){
		fancy = fancyRelativeTime(val);
	}else{
		fancy = val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds(); //time
	}
	
	return fancy;
	
}//function fancyTime

function fancyRelativeTime(val){
	
	//show the time difference between now and the target value;
	//ignoring any difference between the days
	dateNow = new Date();
	dateNow = new Date(val.getFullYear(), val.getMonth(), val.getDate(), dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());//set it to the dame date as the target value
	diff = dateNow.getTime() - val.getTime();//in milliseconds
	diff = dateNow/1000;//in seconds
console.log("Diff="+ diff);
	
	fancy= diff + " seconds";
	return fancy;
}




function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}




function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}



