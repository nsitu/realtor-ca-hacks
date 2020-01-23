/* run this in the browser console while visiting a listing on realtor.ca to get total square footage of rooms. */

total = 0;
rooms=[];
counts = {};
$('.listingDetailsRoomDetails_Dimensions.Imperial').each(function(d,data){ 
    $(data).each( function(j,measurements){  
	let theNums = $(measurements).html().split(' x '); 
	for (i in theNums){
	 let components = theNums[i].split(' ,');
	 let feet = parseInt(components[0].replace(' ft',''));
	 let inches = parseInt(components[1].replace(' in',''));
	 let feetAndInches = feet + (inches/12);
	 theNums[i] = feetAndInches;
	}
	let theSquare = theNums[0] * theNums[1];
	total+=theSquare;
	rooms.push(theSquare);
	console.log($(data));
	$(measurements).prepend(' <b>' + theSquare.toFixed(2) + ' sqft</b>&nbsp;&nbsp;&nbsp;' );
    })
});
$('#propertyDetailsRoomsSection .propertyDetailsSectionHeader').html(' <b>'+total.toFixed(2)+' sqft</b>&nbsp;&nbsp;&nbsp;');

for (var i = 0; i < rooms.length; i++) {
  counts[rooms[i]] = counts[rooms[i]] ? counts[rooms[i]] + 1 : 1;
}
for (let [key, value] of Object.entries(counts)) {
  if (value != 1) {
	let duplicateSpace = (value * key) - key;
	let possibleActual = parseInt(total - duplicateSpace);
	
	$('#propertyDetailsRoomsSection .propertyDetailsSectionHeader').append(value + 'x '+parseInt(key)+' sqft => Actual total is <b>'+possibleActual +' sqft</b>');
  }
}









