//  Set key and URL
//  Ask the user to input the key when refreshing the page
var key = prompt("Please enter your key:", "e.g. a4d043e0-87cb-4854-9a01-5304747c83b5");
const keyQuery = "?key=" + key;
const URL = "https://cs5002-api.host.cs.st-andrews.ac.uk/api";

//  This function aims to demonstrate allYak page when refreshing the website
window.onload = function(){
  displayAllYak();
}

//  This function aims to refresh the website and to let the user login with a new key
function changeKey(){
  window.location.reload();
}
