$(document).ready(function(){
	var index = 0;					// first index of loop
	var sIndex = 0;					// second index of loop
	var picIndex = 1;				// index of picture's id
	var namesOfPlaces = [];			// array of places
	$.getJSON("includes/db.json",function(data){
		$.each(data,function(key,val){
			while(index < 1){	// this while is running all over the json file
				$("header > section:nth-child(2)").append("<h2>" + val[index].name + ", " + val[index].city + "</h2>");
				while(sIndex < val[index].images.length){		// this while is running over each Location in json and takes its parameters
					var ID = key + picIndex;
					if(val[index].images[sIndex].local == true){
						$("#content > section:nth-child(2)").append( "<article id='" + ID + "' draggable='true' ondragstart='return dragStart(event)'> <img src='" + val[index].images[sIndex].thumbImg + "' id='" + ID + "'> </article>" );
						console.log("Local image URL : " + val[index].images[sIndex].thumbImg + " ID : " + ID + " has added\n");
						picIndex++;
					}
					else if(val[index].images[sIndex].local == false){
						$("#content > section:first-child").append( "<article id='" + ID + "' draggable='true' ondragstart='return dragStart(event)'> <img src='" + val[index].images[sIndex].thumbImg + "' id='" + ID + "'> </article>" );
						console.log("Tourist image URL : " + val[index].images[sIndex].thumbImg + " ID : " + ID + " has added\n");
						picIndex++;
					}
					sIndex++;
				}
				console.log(val[index].name + ", " + val[index].city + "\n");
				namesOfPlaces[index] = val[index].name + ", " + val[index].city;
				sIndex = 0;		// intialize to first value
				picIndex = 1;	// intialize to first value
				index++;
			}
					
		});
	});
	
	
});

