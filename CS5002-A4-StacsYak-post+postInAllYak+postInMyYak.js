//  This function aims to post a Yak and diplay the table in a specific page
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
      //  //  Tell the user if post is successful
      if(data["error"] == undefined){
        alert("Yak is successfully post.");
      } else {
        alert("Post failed. (Error: " + data["error"] + ")");
      }
      //  Empty the text area
      document.getElementById(idName).value = "";
      //  Refresh the respective page with filter and sort applied
      switch(idName){
        case "postContentInAllYak":
          filterByMultiElementsInAllYak();
          break;
        case "postContentInMyYak":
          filterByMultiElementsInMyYak();
          break;
      }
    });
}

//  This function aims to post a Yak and display the table in allYak
function postInAllYak(){
  post("postContentInAllYak");
}

//  This function aims to post a Yak and display the table in myYak
function postInMyYak(){
  post("postContentInMyYak");
}
