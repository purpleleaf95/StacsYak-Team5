//  This function aims to post a Yak
function displayPost() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "block";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
}

function postYak(){
  var message = {
    content: document.getElementById("postContent")
  };
  const msg = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };

//  Send HTTP request
fetch(URL,msg)
.then(response => response.json());
}
