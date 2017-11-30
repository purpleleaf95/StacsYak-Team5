//  This function aims to show Yaks post in the recent two days
function displayAllYak(){
  // Set style
  document.getElementById("showAllYak").style.display = "block";
  document.getElementById("showMyYak").style.display = "none";
  document.getElementById("showMyProfile").style.display = "none";
  let table = document.getElementById("allYakResult");
  //  Send HTTP request
  fetch(URL + "/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        table.innerHTML = String("Error: " + data["error"]);
      } else {
        table.innerHTML = "";
        //This function aims to add a cell to a row
        function addCell(tagName, text){
            let tag = document.createElement(String(tagName));
            let txt = document.createTextNode(text);
            tag.appendChild(txt);
            tr.appendChild(tag);
        };
        // This function aims to add a Button to a row
        function addCellButtion(text, onclickFunction){
          let button = document.createElement("button");
          button.innerHTML = text;
          button.className = "cellButton";
          button.onclick = onclickFunction;
          tr.appendChild(button);
        }
        //  Show the table's head
        let tr = document.createElement("tr");
        addCell("th", "TIME");
        addCell("th", "USER NAME");
        addCell("th", "CONTENT");
        addCell("th", "TOTAL VOTES");
        addCell("th", "USER VOTE");
        addCell("th", "DELETE/UPVOTE/DOWNVOTE");
        table.appendChild(tr);
        //  Show the table's contents
        for(let index = 0; index < data.length; index++){
          let yakId = data[index]["id"];
          //  Create a new row
          tr = document.createElement("tr");
          addCell("td", data[index]["timestamp"]);
          addCell("td", data[index]["userNick"]);
          addCell("td", data[index]["content"]);
          addCell("td", data[index]["votes"]);
          addCell("td", data[index]["userVote"]);
          addCellButtion("DELETE", function(){
            del(yakId, "allYak");
          });
          addCellButtion("+", function(){
            vote(yakId, "up", "allYak");
          });
          addCellButtion("-", function(){
            vote(yakId, "down", "allYak");
          });
          table.appendChild(tr);
        }
      }
    });
}
