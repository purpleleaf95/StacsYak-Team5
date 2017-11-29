//  Set key and URL
// var key = "a4d043e0-87cb-4854-9a01-5304747c83b5";
// var URL = "https://cs5002-api.host.cs.st-andrews.ac.uk/api/yaks?key=" + key;

var urlLocal = "https://cs5002-api.host.cs.st-andrews.ac.uk/api/yaks?key=a4d043e0-87cb-4854-9a01-5304747c83b5"; //works
//var urlUser = "https://cs5002-api.host.cs.st-andrews.ac.uk/api/user?key=a4d043e0-87cb-4854-9a01-5304747c83b5";  //does not work yet
//  This function aims to post a Yak
function displayPost() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "block";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
  //document.getElementById("showSucc").style.display="none";
}


function postYak(){
  var message = {
    "content": document.getElementById("postContent").value
  };
  const msg = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };

//  Send HTTP request
fetch(urlLocal,msg)
.then(response => response.json())
//.then(afterPost =>document.getElementById("showSucc").style.display="block")
.catch(error=>document.getElementById("showError").innerHTML = error);
document.getElementById("postContent").value = '';
}
