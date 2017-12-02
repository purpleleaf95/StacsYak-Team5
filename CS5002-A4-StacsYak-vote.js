//  This function aims to up/down vote a Yak
function vote(yakId, voteType, pageName){
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
  fetch(URL + "/yaks/" + yakId + "/vote" + keyQuery, initObject)
  .then(response => response.json())
  .then(data => {
    if(data["error"] == undefined) {
      alert("Yak is successfully voted.");
    } else {
      alert("Vote failed. (Error: " + data["error"] + ")");
    }
    switch(pageName){
      case "allYak":
        filterByMultiElementsInAllYak();
        break;
      case "myYak":
        filterByMultiElementsInMyYak();
        break;
    }
  });
}
