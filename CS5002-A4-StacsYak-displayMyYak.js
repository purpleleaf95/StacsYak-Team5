//  This function aims to show Yaks post by the user in the recent one week
function displayMyYak(){
  // Set style
  document.getElementById("showAllYak").style.display = "none";
  document.getElementById("showMyYak").style.display = "block";
  document.getElementById("showMyProfile").style.display = "none";
  document.getElementById("selectByContentInMyYak").value = "";
  let table = document.getElementById("myYakResult");
  //  Send HTTP request
  fetch(URL + "/user/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        document.getElementById("showMyYak").innerHTML = String("Error: " + data["error"]);
      } else {
        //  This function aims to add an option to the end of a select list
        function addOption(selectList, data) {
            let option = document.createElement("option");
            option.value = data;
            option.text = String(data);
            selectList.appendChild(option);
        };
        //  Add selectByHour options
        let selectedMinHourOptions = document.getElementById("selectByMinDayInMyYak");
        selectedMinHourOptions.innerHTML = "";
        for (let hour = 1; hour <= 7; hour++) {
          addOption(selectedMinHourOptions, hour);
        }
        let selectedMaxHourOptions = document.getElementById("selectByMaxDayInMyYak");
        selectedMaxHourOptions.innerHTML = "";
        for (let hour = 7; hour >= 1; hour --) {
          addOption(selectedMaxHourOptions, hour);
        }
        //  Add selectByMyVoteType options
        let selectedMyVoteTypeOptions = document.getElementById("selectByMyVoteTypeInMyYak");
        selectedMyVoteTypeOptions.innerHTML = "";
        addOption(selectedMyVoteTypeOptions, "All");
        addOption(selectedMyVoteTypeOptions, "none");
        addOption(selectedMyVoteTypeOptions, "up");
        addOption(selectedMyVoteTypeOptions, "down");
        //  Add sortBy options
        let sortedByOptions = document.getElementById("sortByInMyYak");
        sortedByOptions.innerHTML = "";
        addOption(sortedByOptions, "Time");
        addOption(sortedByOptions, "Content");
        addOption(sortedByOptions, "Total votes");
        addOption(sortedByOptions, "User vote");
        //  Add ascendingOrDescending options
        let ascendingOrDescendingOptions = document.getElementById("ascendingOrDescendingInMyYak");
        ascendingOrDescendingOptions.innerHTML = "";
        addOption(ascendingOrDescendingOptions, "Descending");
        addOption(ascendingOrDescendingOptions, "Ascending");
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
        let selectedMinTotalVotesOptions = document.getElementById("selectByMinTotalVotesInMyYak");
        selectedMinTotalVotesOptions.innerHTML = "";
        for(let i = minTotalVotes; i <= maxTotalVotes; i++) {
          addOption(selectedMinTotalVotesOptions, i);
        }
        let selectedMaxTotalVotesOptions = document.getElementById("selectByMaxTotalVotesInMyYak");
        selectedMaxTotalVotesOptions.innerHTML = "";
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
        addCell("th", "NICKNAME");
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
    });
}
