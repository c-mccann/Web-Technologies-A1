// DT340A - Web Technologies - Assignment 1		Carl McCann C12508463 
var dir = "img/";
var imageNames = [];
var currentWidth;
var CLASS_NAME = "img";

function imageNotFound(img){										// handles the situation when a file is not found. Javascript has problems
	try{															// breaking out of loops, so here the code undoes unwanted loads
		deleteShowMoreButton();										
		while($('#photoholder').children().last().attr('id') !== img.id){	// accessing the DOM via JQuery
			$('#photoholder').children().last().remove();
		}
		$('#photoholder').children().last().remove();
		
		throw new Error("Image not found!");	
	}
	catch(err){
		return;
	}
}

function clickNewRowButton(){   // function to programmatically click new row button. used at end of doc ready to load first five images
	document.getElementById('newrowbutton').click(); 				// // accessing the DOM via JavaScript
}
		
function deletePhoto(){												// removes image and its description
	var description = document.getElementById("description");
	var imgName = description.innerHTML.split(":")[1];
	imgName = imgName.substring(1,imgName.length);
	var img = document.getElementById(imgName);
	if(img){
		img.parentNode.removeChild(img);	
	}
	document.getElementById("description").innerHTML = "";
	
}


function deleteShowMoreButton(){
	var showMoreButtonDiv = document.getElementById("newrowbuttondiv");
	if(showMoreButtonDiv){
		showMoreButtonDiv.parentNode.removeChild(showMoreButtonDiv);
		alert("Image Not Found!");
	}
}
function borderDescription(img){
	var allImages = document.getElementsByTagName(CLASS_NAME); // getElementsByClassName stopped working after i moved to apache server
	for (var i = 0; i < allImages.length; i++) {
		allImages[i].style.border = "0px"; 
	}

	img.style.border = "3px solid blue";
	var imgTagsSplit = img.src.split("/");

	document.getElementById("description").innerHTML = "Description: " + imgTagsSplit[imgTagsSplit.length - 1];
}

$(document).ready(function(){
	$.ajax({
		url : dir,
		success: function (data) {

			var tags = data.split("<");

			for (var i = 0; i < tags.length; i++) {
				var img = tags[i].split('"')[1];
				if(tags[i].includes("jpg")){
					var img = tags[i].split('"')[1];
					if(img.includes("jpg")){
						imageNames.push(img);
					}
				}
			}
	    	imageNames = imageNames.reverse(); // this allows us to pop the last elem, rather than deleting or splicing the array
	    	clickNewRowButton();
	    }
	});
	$("#newrowbutton").click(function(){
		var numPhotos = parseInt($("#colnumberinput").val());
		var currentImages = [];
		for (var i = 0; i < numPhotos; i++) {
			var newImg = imageNames.pop();
			if( newImg !== 'cross.jpg' && newImg !== 'undefined'){

				currentImages.push(newImg); // this is where the reversed imageNames array comes in handy	
			}
		}

		currentImages = currentImages.filter(function( element ) {		// remove undefined images from array
			return element !== undefined;
		});

		if(currentImages.length != numPhotos){		// if the actual number of photos left is different from the number requested
			deleteShowMoreButton();
		}

		currentWidth = (document.body.clientWidth -40) / currentImages.length; // - 40, to stop the border messing up rows	
																// original divisor was numPhotos, but currentImages.length is smarter
																// as if you ask for 100 and there are 5 photos left, the size of the 
																// photos won't be messed up
		myloop: for (var i = 0; i < currentImages.length; i++) {

			var fullPath = dir + currentImages[i];
			var id = currentImages[i];

			var properImg = document.createElement('IMG');
			properImg.src = fullPath;
			properImg.width = currentWidth;
			properImg.id = id;
			properImg.class = CLASS_NAME;

			properImg.onclick = function() { borderDescription(this); };
			properImg.onerror = function() { imageNotFound(this); };

			if(currentImages[i] !== 'undefined' ){
				$("#photoholder").append(properImg);	
			}


		}
	});
});
