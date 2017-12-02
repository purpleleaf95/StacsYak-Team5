//  This function aims to delete a Yak
function del(yakID, pageName){
  const initObject = {
    method: "DELETE"
  };
  //  Send HTTP request
  fetch(URL + "/yaks/"+ yakID + keyQuery, initObject)
    .then(response => response.json())
    .then(data => {
      //  Tell the user if del is successful
      if(data["error"] == undefined){
        alert("Yak(ID:" + yakID + ") is successfully deleted.");
      } else {
        alert("Delete failed. (Error: " + data["error"] + ")");
      }
      //  Refresh the respective page with filter and sort applied
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
