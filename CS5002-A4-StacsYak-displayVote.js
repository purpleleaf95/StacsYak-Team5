//  This function aims to vote a Yak
function displayVote() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "block";
  document.getElementById("showDelete").style.display = "none";
}

function vote(){
  var postID = document.getElementById("delete").value;

  fetch(URL + postID + keyQuery, {
    method: "DELETE"
  }).then (response => response.json())
    .then (yaks => { console.log("the yak id is" + postID);

    })
    .catch(error => console.log(error));
}
