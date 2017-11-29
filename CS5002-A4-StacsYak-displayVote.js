//  This function aims to vote a Yak
function displayVote() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "block";
  document.getElementById("showDelete").style.display = "none";
}

function upVote(){
  var yakId = document.getElementById("voteID").value;
  var vote = document.getElementById("up").value;

var message = {
  direction: vote
};

const msg = {
  method: "POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(message)
};

//  Send HTTP request
fetch(URL + yakId + "/vote" + keyQuery, msg)
.then(response => response.json())
.catch(error => console.log(error));
}

function downVote(){
  var yakId = document.getElementById("voteID").value;
  var vote = document.getElementById("down").value;

var message = {
  direction: vote
};

const msg = {
  method: "POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify(message)
};

//  Send HTTP request
fetch(URL + yakId + "/vote" + keyQuery, msg)
.then(response => response.json())
.catch(error => console.log(error));
}
