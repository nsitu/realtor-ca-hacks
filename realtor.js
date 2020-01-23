/* run this in the browser console while visiting a listing on realtor.ca to get total square footage of rooms. */

total = 0;
rooms=[];
counts = {};
$('.listingDetailsRoomDetails_Dimensions.Imperial').each(function(d,data){
  $(data).each( function(j,measurements){
    let theString = $(measurements).html().replace(/\s/g, '');
    if (theString.includes("not")){
      // Measurements not available.
    }
    else{
      theNums = theString.split('x');
      for (i in theNums){
        let components = theNums[i].split(',');
        let feet = parseInt(components[0].replace('ft',''));
        theNums[i] = feet;
        if (components.length>1){
          let inches = parseInt(components[1].replace('in',''));
          let feetAndInches = feet + (inches/12);
          theNums[i] = feetAndInches;
        }
      }
    	let theSquare = theNums[0] * theNums[1];
    	total+=theSquare;
    	rooms.push(theSquare);
    	$(measurements).prepend(' <b>' + theSquare.toFixed(2) + ' sqft</b>&nbsp;&nbsp;&nbsp;' );
    }
  })
});

let thePrice = parseInt($("#listingPrice").html().replace('$','').replace(',',''));
let ppsqft = (thePrice / total);
$('#propertyDetailsRoomsSection .propertyDetailsSectionHeader').html(' <b>'+total.toFixed(2)+' sqft</b>&nbsp;&nbsp;&nbsp;' + ' <b>'+$("#listingPrice").html()+'</b> ($' + ppsqft.toFixed(2) + '/sqft)');

for (var i = 0; i < rooms.length; i++) {
  counts[rooms[i]] = counts[rooms[i]] ? counts[rooms[i]] + 1 : 1;
}
let actual = total;
for (let [key, value] of Object.entries(counts)) {
  if (value != 1) {
  	let duplicateSpace = (value * key) - key;
  	let actual = parseInt(total - duplicateSpace);
  	$('#propertyDetailsRoomsSection .propertyDetailsSectionHeader').append('<br/> Found '+value+' rooms with '+parseInt(key)+' sqft <br/>Actual total is <b>'+actual +' sqft</b>');
    ppsqft = (thePrice / actual);
    $('#propertyDetailsRoomsSection .propertyDetailsSectionHeader').append(
      '<br/>Actual: $'  + ppsqft.toFixed(2) + ' per sqft'
    );
  }
}
