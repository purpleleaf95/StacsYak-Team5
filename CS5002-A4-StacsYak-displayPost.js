//  This function aims to set the style of post button
function displayPost() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "block";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
  document.getElementById("showUser").style.display = "none";
  //document.getElementById("showSucc").style.display="none";
}

//  This function aims to post a Yak
function postYak(){
  const message = {
    "content": document.getElementById("postContent").value
  };
  const initObject = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };
  //  Send HTTP request
  fetch(URL + keyQuery, initObject)
  .then(response => response.json())
  .then (data => {
    if(data["error"] == undefined) {
      alert("Yak is successfully post.");
    } else {
      alert("Post failed. (Error: " + data["error"] + ")");
    }
  });
  document.getElementById("postContent").value = '';
}
