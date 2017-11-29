//  This function aims to set the style of delete button
function displayDelete() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "block";
  document.getElementById("showUser").style.display = "none";

}

//  This function aims to delete a Yak
function del() {
  const postID = document.getElementById("delete").value;
  const initObject = {
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
