//  This function aims to set the style of delete button
function displayDelete() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "block";

}

//  This function aims to delete a Yak
function del() {
  let postID = document.getElementById("delete").value;
  let initObject = {
    method: "DELETE"
  };
  //  Send HTTP request
  fetch(URL + postID + keyQuery, initObject)
    .then (response => response.json())
    .then (data => {
      if(data["error"] == undefined) {
        alert("Yak(ID:" + postID + ") is successfully deleted.");
      } else {
        alert("Delete failed. (Error: " + data["error"] + ")");
      }
    });
}
