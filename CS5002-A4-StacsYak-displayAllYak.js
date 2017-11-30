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
  //  Add options of fixed select lists
  let selectedMinHour = document.getElementById("selectByMinHour");
  for (let hour = 2; hour <= 48; hour++) {
    addOption(selectedMinHour, hour);
  }
  let selectedMaxHour = document.getElementById("selectByMaxHour");
  for (let hour = 47; hour >= 1; hour --) {
    addOption(selectedMaxHour, hour);
  }
  let selectedMyVoteType = document.getElementById("selectByMyVoteType");
  addOption(selectedMyVoteType, "none");
  addOption(selectedMyVoteType, "up");
  addOption(selectedMyVoteType, "down");
  let sortedByOptions = document.getElementById("sortBy");
  addOption(sortedByOptions, "Nickname");
  addOption(sortedByOptions, "Content");
  addOption(sortedByOptions, "Total votes");
  addOption(sortedByOptions, "User vote");
  let ascendingOrDescendingOptions = document.getElementById("ascendingOrDescending");
  addOption(ascendingOrDescendingOptions, "Ascending");
  //  Send HTTP request
  fetch(URL + "/yaks" + keyQuery)
    .then(response => response.json())
    .then(data => {
      //  Add options of dynamic select lists
      let selectedUserNick = document.getElementById("selectByUserNick");
      let allUserNick = [];
      for(let index = 0; index < data.length; index++){
        //  If a specific user nickname cannot be found in allUserNick, put it to the end of the array
        if(allUserNick.indexOf(data[index]["userNick"]) == -1) {
          allUserNick.push(data[index]["userNick"]);
        }
      }
      allUserNick.sort();
      //  Add selectByUserNick options
      for(let index = 0; index < allUserNick.length; index++) {
        addOption(selectedUserNick, allUserNick[index]);
      }
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
      let selectedMinTotalVotes = document.getElementById("selectByMinTotalVotes");
      for(let i = minTotalVotes; i <= maxTotalVotes; i++) {
        addOption(selectedMinTotalVotes, i);
      }
      let selectedMaxTotalVotes = document.getElementById("selectByMaxTotalVotes");
      for(let i = maxTotalVotes; i >= minTotalVotes; i--) {
        addOption(selectedMaxTotalVotes, i);
      }
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
        addCell("th", "DELETE/+/-");
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
