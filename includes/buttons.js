$(function() 
{
	$( "input[type=submit], a, button" )			// types of our buttons
      //.button()
      .click(function( event ) 
      {
      	console.log(this.id + " was pressed");		// print pressed type to console
      	if (this.id == 'logo')						// decide wich function to call
      		alert("hello");
      	if (this.id == 'button')
      		alert("goodbye");
      		
        event.preventDefault();
      });
});
