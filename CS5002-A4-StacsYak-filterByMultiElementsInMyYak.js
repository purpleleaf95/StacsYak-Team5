//  This function aims to display myYakResult table with filtering and sorting rules applied accumulatively
function filterByMultiElementsInMyYak(){
  //  Get values of select and input boxes
  const selectedMinDay = document.getElementById("selectByMinDayInMyYak").value;
  const selectedMaxDay = document.getElementById("selectByMaxDayInMyYak").value;
  const selectedMinTotalVotes = document.getElementById("selectByMinTotalVotesInMyYak").value;
  const selectedMaxTotalVotes = document.getElementById("selectByMaxTotalVotesInMyYak").value;
  const selectedMyVoteType = document.getElementById("selectByMyVoteTypeInMyYak").value;
  const selectedContent = document.getElementById("selectByContentInMyYak").value;
  const sortedBy = document.getElementById("sortByInMyYak").value;
  const ascendingOrDescending = document.getElementById("ascendingOrDescendingInMyYak").value;
  //  Send HTTP request
  fetch(URL + "/user/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        //  Alert the user when failed with error specified
        document.getElementById("showMyYak").innerHTML = String("Error: " + data["error"]);
      } else {
        //  Create newData to contain filtered array
        let newData = [];
        newData = filterBetweenDays(data, selectedMinDay, selectedMaxDay);
        newData = filterBetweenVotes(newData, selectedMinTotalVotes, selectedMaxTotalVotes);
        newData = filterByOneElement(newData, "userVote", selectedMyVoteType);
        newData = filterByContent(newData, selectedContent);
        newData.sort(sortBy(String(sortedBy)));
        if(ascendingOrDescending == "Descending"){
          newData.reverse();
        }
        let table = document.getElementById("myYakResult");
        table.innerHTML = "";
        //  This function aims to add a cell to a row
        function addCell(tagName, text){
          let tag = document.createElement(String(tagName));
          let txt = document.createTextNode(text);
          tag.appendChild(txt);
          tr.appendChild(tag);
        };
        //  This function aims to add a Button to a row
        function addCellButtion(text, onclickFunction){
          let td = document.createElement("td");
          let button = document.createElement("button");
          button.innerHTML = text;
          button.className = "cellButton";
          button.onclick = onclickFunction;
          td.appendChild(button);
          tr.appendChild(td);
        }
        //  Show the table's head
        var tr = document.createElement("tr");
        addCell("th", "TIME");
        addCell("th", "NICKNAME");
        addCell("th", "CONTENT");
        addCell("th", "TOTAL VOTES");
        addCell("th", "USER VOTE");
        addCell("th", "DELETE");
        addCell("th", "UPVOTE");
        addCell("th", "DOWNVOTE");
        table.appendChild(tr);
        if(newData.length == 0){
          //  Alert the user when no result is found
          alert("No result. Please check your filtering rules.");
          var tr = document.createElement("tr");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          addCell("td", "-no result-");
          table.appendChild(tr);
        } else {
          //  Show the table's contents
          for(let index = 0; index < newData.length; index++){
            let yakId = newData[index]["id"];
            //  Create a new row
            tr = document.createElement("tr");
            addCell("td", newData[index]["timestamp"]);
            addCell("td", newData[index]["userNick"]);
            addCell("td", newData[index]["content"]);
            addCell("td", newData[index]["votes"]);
            addCell("td", newData[index]["userVote"]);
            addCellButtion("DELETE", function(){
              del(yakId, "myYak");
            });
            addCellButtion("+", function(){
              vote(yakId, "up", "myYak");
            });
            addCellButtion("-", function(){
              vote(yakId, "down", "myYak");
            });
            table.appendChild(tr);
          }
        }
      }
    });
}
