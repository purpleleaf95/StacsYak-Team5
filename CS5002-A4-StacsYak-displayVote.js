//  This function aims to set the style of vote button
function displayVote() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "block";
  document.getElementById("showDelete").style.display = "none";
  document.getElementById("showUser").style.display = "none";
}

<<<<<<< HEAD
function upVote(yakId){
  //var yakId = document.getElementById("voteID").value;
  //var vote = document.getElementById("up").value;
  //var yakId = document.getElementById("up").value;
  vote = "up";
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
fetch(URL+ "/" + yakId + "/vote" + keyQuery, msg)
.then(response => response.json())
.catch(error => console.log(error));
}

function downVote(yakId){
//  var yakId = document.getElementById("voteID").value;
//  var vote = document.getElementById("down").value;

//only picking up first element with down element
//var yakId = document.getElementById("down").value;
vote = "down";

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
fetch(URL +"/"+ yakId + "/vote" + keyQuery, msg)
.then(response => response.json())
.catch(error => console.log(error));
=======
//  This function aims to up/down vote a Yak
function vote(voteType){
  const yakId = document.getElementById("voteID").value;
  const message = {
    direction: voteType
  };
  const initObject = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };
  //  Send HTTP request
  fetch(URL + "/" + yakId + "/vote" + keyQuery, initObject)
  .then(response => response.json())
  .then(data => {
    if(data["error"] == undefined) {
      alert("Yak is successfully voted.");
    } else {
      alert("Vote failed. (Error: " + data["error"] + ")");
    }
  })
}

//  This function aims to up vote a Yak
function upVote(){
  vote(document.getElementById("up").value)
}

//  This function aims to down vote a Yak
function downVote(){
  vote(document.getElementById("down").value)
>>>>>>> origin/master
}
