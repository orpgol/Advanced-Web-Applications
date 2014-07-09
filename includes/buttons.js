
var curr = "content";  		// current starts with 'content'
var currMenu = null;		// global var that tells me if a menu item is active
var addPicIndicator = false;
var settingsIndicator = false;

$(function() 
{
	var active = false;
	$( "input[type=submit], a, button" )			// types of our buttons
      //.button()
      .click(function( event ) 
      {
      	if(this.id == 'local' || this.id == 'tourist'){
     		console.log(this.id + " was pressed");		// print pressed type to console
     		console.log("curr " + curr);
	      	document.getElementById('bigContent').style.display='block';
	      	document.getElementById('content').style.display='none';
	      	if (this.id == 'local'){					// decide wich function to call
	      		if(!active){
	      			$('#bigContent').empty();		// clear content of bigContent
		      		$("#main-nav" ).find( "li:first-child" ).css( "display", "none" );	// make the second link disapear
		      		$("#main-nav" ).find( "li:nth-child(2)" ).css( "width", "100%" );	// current class width changes to full width
		      		active = true;
		      		$("#main-nav").css("background-image","");
		      		curr = "bigContent"
	      		}
	      		else{
	      			document.getElementById('bigContent').style.display='none';
	      			$("#main-nav" ).find( "li:nth-child(2)" ).css( "width", "49.5%" );
	      			$( "#main-nav" ).find( "li:first-child" ).css( "display", "block" );
	      			document.getElementById('tourist').style.display='block';
	      			document.getElementById('content').style.display='block';
	      			active = false;
	      			curr = "content"
	      		}
	      	}
	      	if (this.id == 'tourist'){
	      		if(!active){
	      			$('#bigContent').empty();
		      		
		      		$("#main-nav" ).find( "li:nth-child(2)" ).css( "display", "none" );
		      		$("#main-nav" ).find( "li:first-child" ).css( "width", "100%" );
		      		
		      		active = true;
		      		curr = "bigContent"
	      		}
	      		else{
	      			document.getElementById('bigContent').style.display='none';
	      			
	      			$("#main-nav" ).find( "li:first-child" ).css( "width", "49.5%" );
	      			$( "#main-nav" ).find( "li:nth-child(2)" ).css( "display", "block" );
	      			document.getElementById('local').style.display='block';
	      			document.getElementById('content').style.display='block';
	      			active = false;
	      			curr = "content"
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
   	
   	
   	$('.back').click(function(){
   		
   		console.log("current " + currMenu);
		document.getElementById('savedLocations').style.display='none';
		document.getElementById('settings').style.display='none';
		$("#main-page" ).css( "display", "block" );
		document.getElementById(curr).style.display='block';
		$(currMenu).css("background-color","");					// reset css
		$('#favoriteHolder').empty();
		settingsIndicator = false;
		currMenu = null;
    });
      

    $('footer li a').click(function() {
    	var str;												
    	// for(var i =1; i <= 4; i++){							
//     		str = "footer > nav > ul > li:nth-child(" + i + ") a";
//     		//$(str).removeClass("currentBottomLink");
//     		$(str).css("background-color","#2D2D2D");			// this should be in the button function
//     	}
    	
    	
    	if(this.id == 'savedLocationsButton')
    	{
    		console.log("current " + currMenu);
    		if(currMenu == null || currMenu.id != 'savedLocationsButton')
			{	
				$(currMenu).css("background-color","");					// reset css
				//$("#main-nav" ).css( "display", "none" );	// make the links disapear
				//$("header" ).css( "display", "none" );		// make the links disapear
				$("#main-page" ).css( "display", "none" );
				$("#settings" ).css( "display", "none" );
				document.getElementById(curr).style.display='none';
				document.getElementById('savedLocations').style.display='block';
				$(this).css("background-color","#212121");				// css pressed
				settingsIndicator = false;
				currMenu = this;
				loadFavoritesFromJSON();
			}
    	}
    	
    	
    	if(this.id == 'addPictureButton'){
    		if(addPicIndicator){
    			$('#addPicture').css("display","none");
    			$(this).css("background-color","");				// css pressed
    			addPicIndicator = false;	
    		}
    		else{
    			$('#addPicture').css("display","block");
    			$(this).css("background-color","#212121");				// css pressed
    			addPicIndicator = true;	
    		}    		
    	}
    	
    	if(this.id == 'settingsButton'){
    		if(!settingsIndicator){
    			document.getElementById('savedLocations').style.display='none';
    			document.getElementById('main-page').style.display='none';
    			document.getElementById('settings').style.display='block';
    			settingsIndicator = true;
    			$(currMenu).css("background-color","");					// reset css
    			$(this).css("background-color","#212121");				// css pressed
    			$('#favoriteHolder').empty();
				currMenu = this;
    		}
    	}
    	
   	});  
   	
   	var loadFavoritesFromJSON = function(){
		var index = 0;
		console.log("iteration");
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				while(index < val.length){	// this while is running all over the json file
					if(val[index].favorite){
						$("#favoriteHolder").append( "<section class='greyRectangle'> </section> <article> <p> " + val[index].name + ", " + val[index].city + "</p> </article>");
					}
					index++;
				}
							
			});
		});
	}
     
});


$(window).load(function () {					//splash function
    $('#splashscreen').fadeOut(500);
});