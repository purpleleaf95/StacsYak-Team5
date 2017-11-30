//  This function aims to post a Yak
function post(idName){
  const message = {
    "content": document.getElementById(idName).value
  };
  const initObject = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(message)
  };
  //  Send HTTP request
  fetch(URL + "/yaks" + keyQuery, initObject)
  .then(response => response.json())
  .then(data => {
    if(data["error"] == undefined) {
      alert("Yak is successfully post.");
    } else {
      alert("Post failed. (Error: " + data["error"] + ")");
    }
    //  Empty the text area
    document.getElementById(idName).value = "";
    switch(idName){
      case "postContentInAllYak":
        displayAllYak();
        break;
      case "postContentInMyYak":
        displayMyYak();
        break;
    }
  });
}

function postInAllYak(){
  post("postContentInAllYak");
}

function postInMyYak() {
  post("postContentInMyYak");
}
