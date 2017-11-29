//  This function aims to delete a Yak
function displayDelete() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "block";

}


function del() {
  var postID = document.getElementById("delete").value;

  fetch(URL + postID + keyQuery, {
    method: "DELETE"
  }).then (response => response.json())
    .then (yaks => { console.log("the yak id is" + postID);

    })
    .catch(error => console.log(error));
}
