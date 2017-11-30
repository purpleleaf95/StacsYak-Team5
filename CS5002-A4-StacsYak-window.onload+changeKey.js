//  Set key and URL
//const key = "a4d043e0-87cb-4854-9a01-5304747c83b5";
var key = prompt("Please enter your key:", "e.g. a4d043e0-87cb-4854-9a01-5304747c83b5");
const keyQuery = "?key=" + key;
const URL = "https://cs5002-api.host.cs.st-andrews.ac.uk/api";

window.onload = function() {
  displayAllYak();
}

function changeKey() {
  window.location.reload();
}
