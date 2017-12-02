//  This function aims to show user's profile
function displayMyProfile(){
  //  Set style
  document.getElementById("showAllYak").style.display = "none";
  document.getElementById("showMyYak").style.display = "none";
  document.getElementById("showMyProfile").style.display = "block";
  //  Send HTTP request
  fetch(URL + "/user" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        document.getElementById("showMyProfile").innerHTML = String("Error: " + data["error"]);
      } else {
        document.getElementById("myKey").innerHTML = key;
        document.getElementById("myId").innerHTML = data["id"];
        document.getElementById("myNickname").innerHTML = data["userNick"];
        document.getElementById("myScore").innerHTML = data["score"];
        document.getElementById("myTotalPosts").innerHTML = data["totalPosts"];
      }
    })
}

//  This function aims to change user's nickname
function changeNick(){
  const message = {
    "userNick": document.getElementById("newNick").value
  };
  const initObject = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };
  //  Send HTTP request
  fetch(URL + "/user" + keyQuery, initObject)
  .then(response => response.json())
  .then(data => {
    if(data["error"] == undefined){
      alert("Nickname is successfully changed.");
    } else {
      alert("Change failed. (Error: " + data["error"] + ")");
    }
    //  Empty the text area
    document.getElementById("newNick").value = "";
    displayMyProfile();
    });
}
