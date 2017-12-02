function filterByMultiElementsInAllYak(){
  const selectedMinHour = document.getElementById("selectByMinHourInAllYak").value;
  const selectedMaxHour = document.getElementById("selectByMaxHourInAllYak").value;
  const selectedUserNick = document.getElementById("selectByUserNickInAllYak").value;
  const selectedMinTotalVotes = document.getElementById("selectByMinTotalVotesInAllYak").value;
  const selectedMaxTotalVotes = document.getElementById("selectByMaxTotalVotesInAllYak").value;
  const selectedMyVoteType = document.getElementById("selectByMyVoteTypeInAllYak").value;
  const selectedContent = document.getElementById("selectByContentInAllYak").value;
  const sortedBy = document.getElementById("sortByInAllYak").value;
  const ascendingOrDescending = document.getElementById("ascendingOrDescendingInAllYak").value;
  //  Send HTTP request
  fetch(URL + "/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        document.getElementById("showAllYak").innerHTML = String("Error: " + data["error"]);
      } else {
        //  Create newAlbums to contain filtered array
        let newData = [];
        newData = filterBetweenHours(data, selectedMinHour, selectedMaxHour);
        newData = filterByOneElement(newData, "userNick", selectedUserNick);
        newData = filterBetweenVotes(newData, selectedMinTotalVotes, selectedMaxTotalVotes);
        newData = filterByOneElement(newData, "userVote", selectedMyVoteType);
        newData = filterByContent(newData, selectedContent);
        newData.sort(sortBy(String(sortedBy)));
        if(ascendingOrDescending == "Descending"){
          newData.reverse();
        }
        let table = document.getElementById("allYakResult");
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
        //  Alert the user when no result is found
        if (newData.length == 0) {
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
      }
    });
}
