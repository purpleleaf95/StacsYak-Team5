//  This function aims to show Yaks post in the recent two days
function displayAllYak(){
  // Set style
  document.getElementById("showAllYak").style.display = "block";
  document.getElementById("showMyYak").style.display = "none";
  document.getElementById("showMyProfile").style.display = "none";
  let table = document.getElementById("allYakResult");
  //  This function aims to add an option to the end of a select list
  function addOption(selectList, data) {
      let option = document.createElement("option");
      option.value = data;
      option.text = String(data);
      selectList.appendChild(option);
  };
  //  Send HTTP request
  fetch(URL + "/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        document.getElementById("showAllYak").innerHTML = String("Error: " + data["error"]);
      } else {
        //  Add selectByHour options
        let selectedMinHourOptions = document.getElementById("selectByMinHourInAllYak");
        for (let hour = 2; hour <= 48; hour++) {
          addOption(selectedMinHourOptions, hour);
        }
        let selectedMaxHourOptions = document.getElementById("selectByMaxHourInAllYak");
        for (let hour = 47; hour >= 1; hour --) {
          addOption(selectedMaxHourOptions, hour);
        }
        //  Add selectByMyVoteType options
        let selectedMyVoteTypeOptions = document.getElementById("selectByMyVoteTypeInAllYak");
        addOption(selectedMyVoteTypeOptions, "none");
        addOption(selectedMyVoteTypeOptions, "up");
        addOption(selectedMyVoteTypeOptions, "down");
        //  Add sortBy options
        let sortedByOptions = document.getElementById("sortByInAllYak");
        addOption(sortedByOptions, "Nickname");
        addOption(sortedByOptions, "Content");
        addOption(sortedByOptions, "Total votes");
        addOption(sortedByOptions, "User vote");
        //  Add ascendingOrDescending options
        let ascendingOrDescendingOptions = document.getElementById("ascendingOrDescendingInAllYak");
        addOption(ascendingOrDescendingOptions, "Ascending");
        //  Add selectByUserNick options
        let selectedUserNickOptions = document.getElementById("selectByUserNickInAllYak");
        let allUserNick = [];
        for(let index = 0; index < data.length; index++){
          //  If a specific user nickname cannot be found in allUserNick, put it to the end of the array
          if(allUserNick.indexOf(data[index]["userNick"]) == -1) {
            allUserNick.push(data[index]["userNick"]);
          }
        }
        allUserNick.sort(function sortByUpperCase(a, b){
          if(a.toUpperCase() < b.toUpperCase()) {
              return -1;
          } else if (a.toUpperCase() > b.toUpperCase()){
              return 1;
          } else {
              return 0;
          }
        });
        for(let index = 0; index < allUserNick.length; index++) {
          addOption(selectedUserNickOptions, allUserNick[index]);
        }
        //  Add selectByTotalVotes options
        let allTotalVotes = [];
        let minTotalVotes = data[0]["votes"];
        let maxTotalVotes = data[0]["votes"];
        for(let index = 0; index < data.length; index++){
          if(allTotalVotes.indexOf(data[index]["votes"]) == -1) {
            allTotalVotes.push(Number(data[index]["votes"]));
            if(data[index]["votes"] < minTotalVotes){
              minTotalVotes = data[index]["votes"];
            } else if(data[index]["votes"] > maxTotalVotes){
              maxTotalVotes = data[index]["votes"];
            }
          }
        }
        let selectedMinTotalVotesOptions = document.getElementById("selectByMinTotalVotesInAllYak");
        for(let i = minTotalVotes; i <= maxTotalVotes; i++) {
          addOption(selectedMinTotalVotesOptions, i);
        }
        let selectedMaxTotalVotesOptions = document.getElementById("selectByMaxTotalVotesInAllYak");
        for(let i = maxTotalVotes; i >= minTotalVotes; i--) {
          addOption(selectedMaxTotalVotesOptions, i);
        }
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
        let tr = document.createElement("tr");
        addCell("th", "TIME");
        addCell("th", "USER NAME");
        addCell("th", "CONTENT");
        addCell("th", "TOTAL VOTES");
        addCell("th", "USER VOTE");
        addCell("th", "DELETE");
        addCell("th", "UPVOTE");
        addCell("th", "DOWNVOTE");
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
