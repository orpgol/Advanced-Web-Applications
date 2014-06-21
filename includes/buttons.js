$(function() 
{
	var active = false;
	$( "input[type=submit], a, button" )			// types of our buttons
      //.button()
      .click(function( event ) 
      {
      	if(this.id == 'local' || this.id == 'tourist'){
     		 	console.log(this.id + " was pressed");		// print pressed type to console
      	document.getElementById('bigContent').style.display='block';
      	document.getElementById('content').style.display='none';
      	if (this.id == 'local'){					// decide wich function to call
      		if(!active){
      			$('#bigContent').empty();		// clear content of bigContent
	      		$("#main-nav > ul > li:first-child").removeClass("currentLink");	// remove class from the second link
	      		$("#main-nav" ).find( "li:first-child" ).css( "display", "none" );	// make the second link disapear
	      		$("#main-nav" ).find( "li:nth-child(2)" ).css( "width", "636px" );	// current class width changes to full width
	      		$("#main-nav li:nth-child(2)").addClass("currentLink");				// add currntLink class to current link.
	      		active = true;
      		}
      		else if(active){
      			document.getElementById('bigContent').style.display='none';
      			$("#main-nav > ul > li:nth-child(2)").removeClass("currentLink");
      			$("#main-nav" ).find( "li:nth-child(2)" ).css( "width", "316px" );
      			$( "#main-nav" ).find( "li:first-child" ).css( "display", "block" );
      			document.getElementById('tourist').style.display='block';
      			document.getElementById('content').style.display='block';
      			active = false;
      		}
      	}
      	if (this.id == 'tourist'){
      		if(!active){
      			$('#bigContent').empty();
	      		$("#main-nav li:nth-child(2)").removeClass("currentLink");
	      		$("#main-nav" ).find( "li:nth-child(2)" ).css( "display", "none" );
	      		$("#main-nav" ).find( "li:first-child" ).css( "width", "636px" );
	      		$("#main-nav > ul > li:first-child").addClass("currentLink");
	      		active = true;
      		}
      		else if(active){
      			document.getElementById('bigContent').style.display='none';
      			$("#main-nav li:first-child").removeClass("currentLink");
      			$("#main-nav" ).find( "li:first-child" ).css( "width", "316px" );
      			$( "#main-nav" ).find( "li:nth-child(2)" ).css( "display", "block" );
      			document.getElementById('local').style.display='block';
      			document.getElementById('content').style.display='block';
      			active = false;
      		}
      	} 		
      	}
     
        event.preventDefault();
      });
      
      // if user clicks the "tourist" button - pull data from JSON
	$('#tourist').click(function() {
		index = 0;
		sIndex = 0;
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				if(active){
					while(sIndex < val[0].images.length){
						if(val[0].images[sIndex].local == false){		// instead of 0 we should put an indicator that determines the current Location
							$("#bigContent").append( "<article id='bigArticle" + sIndex + "'> <img src='" + val[0].images[sIndex].mdlImg + "' id='bigImg" + sIndex + "'> </article>" );
							console.log("Tourist image URL : " + val[0].images[sIndex].mdlImg + " ID : bigImg" + sIndex + " has added\n");
						}
						sIndex++;	
					}	
				}
				
			});	
		});
	});
   	// if user clicks the "local" button - pull data from JSON
   	$('#local').click(function() {
    	index = 0;
		sIndex = 0;
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				if(active){
					while(sIndex < val[0].images.length){
					if(val[0].images[sIndex].local == true){		// instead of 0 we should put an indicator that determines the current Location
						$("#bigContent").append( "<article id='bigArticle" + sIndex + "'> <img src='" + val[0].images[sIndex].mdlImg + "' id='bigImg" + sIndex + "'> </article>" );
						console.log("Local image URL : " + val[0].images[sIndex].mdlImg + " ID : bigImg" + sIndex + " has added\n");
					}
					sIndex++;	
				}	
				}
				
			});	
		});
   	});
      
});