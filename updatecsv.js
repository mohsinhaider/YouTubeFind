var fullTranscript;
var times = [];
var seconds = [];

function get(vid) {
	var timedTextRequest = new XMLHttpRequest();
	timedTextRequest.open("GET", "https://video.google.com/timedtext?lang=en&v=" + vid, false);
	timedTextRequest.send();
	if(timedTextRequest.status)
	
	var mydoc = [];
	
	var timedTextXML = timedTextRequest.responseXML;
	fullTranscript = timedTextXML.childNodes[0];
}

function seconds(){
	return seconds;
}

function search(){
	var string = document.getElementById("searchBar").value;
	
	containsWords(string);
	
	if(!Array.isArray(times)){
		times = [];
		return "not found";
	}
	else
		seconds = times;
	
	var result = times.map(function(num){
		num /= 3600;
		var hours = Math.floor(num);
		num -= hours;
		num *= 60;
		var minutes = Math.floor(num);
		num -= minutes;
		num *= 60;
		var seconds = Math.floor(num);

		var date = new Date(0, 0, 0, hours, minutes, seconds, 0);
		var output;
		
		if(hours)
			output = date.toISOString().substr(11, 8);
		else if(minutes)
			output = date.toISOString().substr(14, 5);
		else if(seconds)
			output = date.toISOString().substr(14, 5);
		else
			output = "00:00";

		return output;
	});
	
	console.log("String found at: ");
	if(Array.isArray(result))
		console.log(result.join("\n"));
	else
		console.log("none found");
	
	times = [];
	return result;
}


function containsWord(word){
	var i = 0;
	var j = 0;
	while(fullTranscript.childNodes[i]){
		mydoc = fullTranscript.childNodes[i];
		if(mydoc.innerHTML.includes(word)){
			times[j] = mydoc.getAttribute("start");
			j++;
		}
		i++;
	}
}


function containsWords(line){
	var i = 0;
	var j = 0;
	var k = 0;
	var w = 0;
	var flag = false;
	var includeEnd = false;
	var next;
	var string = line.split(" ");
	var word;
	
	while(fullTranscript.childNodes[i]){
		next = i + 1;
		mydoc = fullTranscript.childNodes[i];
		times[j] = mydoc.getAttribute("start");
		j++;
		
		for(w = 0; w < string.length; w++){
			if(mydoc.innerHTML.includes(string[w])){
				
				if(i == fullTranscript.childNodes.length - 1){
					includeEnd = true;
				}
				
				continue;
			}
			else if((w > 0) && (fullTranscript.childNodes[next].innerHTML.includes(string[w]))){
				mydoc = fullTranscript.childNodes[next];
				next++;
				j--;
				
				if(i == fullTranscript.childNodes.length - 1){
					includeEnd = true;
				}
				
				continue;
			}
			else{
				break;
			}
		}
		if(w != string.length){
			j--;
		}
		else{
			flag = true;
		}
		
		i++;
	}
	if(!includeEnd){
		if(times)
			times.pop();
	}
	if(!flag){
		times = null;
	}
}
