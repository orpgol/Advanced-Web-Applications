
var curr = "content";  		// current starts with 'content'
var currMenu = null;		// global var that tells me if a menu item is active
var addPicIndicator = false;
var settingsIndicator = false;
var globIndex = 0;				// data-base index. start from first database

$(function() 
{
	var active = false;
	$( "input[type=submit], a, button" )			// types of our buttons
      //.button()
      .click(function( event ) 
      {
      	if(this.id == 'local' || this.id == 'tourist'){
      	
	      	if (this.id == 'local'){					// decide wich function to call
	      	
	      		if(!active){
	      			$('#bigContent').css('display','block');
	      			$('#content').css('display','none');
	      			$('#bigContent').empty();		// clear content of bigContent
		      		$("#main-nav").find("li:first-child").css("display", "none");	// make the second link disapear
		      		$("#main-nav").find("li:nth-child(2)").css("width", "100%");	// current class width changes to full width
		      		active = true;
		      		curr = "bigContent"
	      		}
	      		else{
	      			$('#bigContent').css('display','none');
	      			$("#main-nav").find( "li:nth-child(2)" ).css( "width", "49.5%" );
	      			$("#main-nav").find( "li:first-child" ).css( "display", "block" );
	      			$('#tourist').css('display','block');
	      			$('#content').css('display','block');
	      			active = false;
	      			curr = "content"
	      		}
	      	}
	      	if (this.id == 'tourist'){
	      	
	      		if(!active){
	      			$('#bigContent').css('display','block');
	      			$('#content').css('display','none');	
	      			$('#bigContent').empty();
		      		$("#main-nav" ).find( "li:nth-child(2)" ).css( "display", "none" );
		      		$("#main-nav" ).find( "li:first-child" ).css( "width", "100%" );
		      		
		      		active = true;
		      		curr = "bigContent"
	      		}
	      		else{
	      			$('#bigContent').css('display','none');
	      			$('#main-nav').find( "li:first-child" ).css( "width", "49.5%" );
	      			$('#main-nav').find( "li:nth-child(2)" ).css( "display", "block" );
	      			$('#local').css('display','block');
	      			$('#content').css('display','block');
	      			active = false;
	      			curr = "content"
	      		}
	      	} 		
      	}
        event.preventDefault();
      });
      
      // if user clicks the "tourist" button - pull data from JSON
	$('#tourist').click(function() {
		sIndex = 0;
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				if(active){
					while(sIndex < val[globIndex].images.length){
						if(val[globIndex].images[sIndex].local == false){		// instead of 0 we should put an indicator that determines the current Location
							$("#bigContent").append( "<article id='bigArticle" + sIndex + "'> <img src='" + val[globIndex].images[sIndex].mdlImg + "' id='bigImg" + sIndex + "'> </article>" );
						}
						sIndex++;	
					}	
				}
				
			});	
		});
	});
	
   	// if user clicks the "local" button - pull data from JSON
   	$('#local').click(function() {
		sIndex = 0;
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				if(active){
					while(sIndex < val[globIndex].images.length){
						if(val[globIndex].images[sIndex].local == true){		// instead of 0 we should put an indicator that determines the current Location
							$("#bigContent").append( "<article id='bigArticle" + sIndex + "'> <img src='" + val[globIndex].images[sIndex].mdlImg + "' id='bigImg" + sIndex + "'> </article>" );
						}
						sIndex++;	
					}	
				}
				
			});	
		});
   	});
   	
   	$('.back').click(function(){
   		
		$('#settings').css('display','none');
		$('#savedLocations').css('display','none');
		$("#main-page" ).css( "display", "block" );
		$('#'+curr).css('display','block');
		$(currMenu).css("background-color","");					// reset css
		$('#favoriteHolder').empty();
		settingsIndicator = false;
		currMenu = null;
    });
      

    $('footer li a').click(function() {
    	var str;												
    	
    	if(this.id == 'savedLocationsButton')
    	{
    		if(currMenu == null || currMenu.id != 'savedLocationsButton')
			{	
				$('#favoriteHolder').empty();
				$(currMenu).css("background-color","");					// reset css
				$("#main-page" ).css( "display", "none" );
				$("#settings" ).css( "display", "none" );
				$('#'+curr).css('display','none');
				$('#savedLocations').css('display','block');
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
    			$(currMenu).css("background-color","");					// reset css
    			$('#'+curr).css('display','none');
    			$('#main-page').css('display','none');
    			$('#savedLocations').css('display','none');
    			$('#settings').css('display','block');
    			settingsIndicator = true;
    			$(this).css("background-color","#212121");				// css pressed
    			$('#favoriteHolder').empty();
				currMenu = this;
    		}
    	}
    	
   	});  
   	
   	var loadFavoritesFromJSON = function(){
		var index = 0;
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				while(index < val.length){	// this while is running all over the json file
					if(val[index].favorite){
						$("#favoriteHolder").append( "<section class='greyRectangle'> </section> <article class='favs' id='place" + index + "'> <p> " + val[index].name + ", " + val[index].city + "</p> </article>");
					}
					index++;
				}
			});
		});
	}
	
	var loadFromFavorites = function(index){
		globIndex = index;
		var max = index; max++;
		var sIndex = 0;					// second index of loop
		var picIndex = 1;				// index of picture's id
		var namesOfPlaces = [];			// array of places
		$.getJSON("includes/db.json",function(data){
			$.each(data,function(key,val){
				// checks if location's favorite flag is on/off
				$("header > section:nth-child(2)").empty();
				$("#content > section:nth-child(2)").empty();
				$("#content > section:first-child").empty();
				$("header > section:nth-child(3) a").css("background-image", "url(images/new-design/like.png)");
				
				while(index < max){	// this while is running all over the json file
					$("header > section:nth-child(2)").append("<h2>" + val[index].name + ", " + val[index].city + "</h2>");
					while(sIndex < val[index].images.length){		// this while is running over each Location in json and takes its parameters
						var ID = key + picIndex;
						if(val[index].images[sIndex].local == true){
							$("#content > section:nth-child(2)").append( "<article id='" + ID + "' draggable='true' ondragstart='return dragStart(event)'> <img src='" + val[index].images[sIndex].thumbImg + "' id='" + ID + "'> </article>" );
							picIndex++;
						}
						else if(val[index].images[sIndex].local == false){
							$("#content > section:first-child").append( "<article id='" + ID + "' draggable='true' ondragstart='return dragStart(event)'> <img src='" + val[index].images[sIndex].thumbImg + "' id='" + ID + "'> </article>" );
							picIndex++;
						}
						sIndex++;
					}
					namesOfPlaces[index] = val[index].name + ", " + val[index].city;
					sIndex = 0;		// intialize to first value
					picIndex = 1;	// intialize to first value
					
					index++;
				}
			});
		});
		$('#savedLocations').css('display','none');
		$("#main-page" ).css( "display", "block" );
	}
	
	$('#turOrLoc article').click(function() {
		if($(this).is(':first-child'))
		{
			$(this).css('background-image','url(images/new-design/pressed-tourist.png)');
			$(this).next().css('background-image','url(images/new-design/unpressed-local.png)');
		}
		else
		{
			$(this).css('background-image','url(images/new-design/pressed-local.png)');
			$(this).prev().css('background-image','url(images/new-design/unpressed-tourist.png)');
		}
	});
	
	$(".onOff ").click(function(){
   		if ( !$( this ).is('activeButton') ) {
   			$(this).addClass('activeButton');
   			
   			if($(this).is(':nth-child(2)')){
   				$(this).next().removeClass('activeButton');
   			}
   			else{
   				$(this).prev().removeClass('activeButton');	
   			}
   		}
   	});
   	$("#favoriteHolder").on('click' ,'article', function(event){
		var id = this.id;
		id = id[5];
		loadFromFavorites(id);
		$(currMenu).css("background-color","");					// reset css
		$("#main-nav").find( "li:nth-child(2)" ).css( "width", "49.5%" );
		$('#main-nav').find( "li:first-child" ).css( "width", "49.5%" );
		$('#content').css('display','block');
		active = false;
		currMenu = null;
		curr = "content"
	});
     
});

$(window).load(function () {					//splash function & also works only if everything loaded
    $('#splashscreen').fadeOut(1000);
});