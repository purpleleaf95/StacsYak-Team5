//  This function aims to delete a Yak
function del(yakID, pageName) {
  const initObject = {
    method: "DELETE"
  };
  //  Send HTTP request
  fetch(URL + "/yaks/"+ yakID + keyQuery, initObject)
    .then (response => response.json())
    .then (data => {
      if(data["error"] == undefined) {
        alert("Yak(ID:" + yakID + ") is successfully deleted.");
      } else {
        alert("Delete failed. (Error: " + data["error"] + ")");
      }
      switch(pageName){
        case "allYak":
          displayAllYak();
          break;
        case "myYak":
          displayMyYak();
          break;
      }
    });
}
