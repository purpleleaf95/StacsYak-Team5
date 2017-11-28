//  Set key and URL
var key = "a4d043e0-87cb-4854-9a01-5304747c83b5";
var URL = "https://cs5002-api.host.cs.st-andrews.ac.uk/api/yaks?key=" + key;

//  This function aims to show Yaks post in the recent two days
function displayGet(){
  // Set style
  document.getElementById("showGet").style.display = "block";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
  var table = document.getElementById("getResult");
  //  Send HTTP request
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      table.innerHTML = "";
      //This function aims to add a cell to a row
      var addCell = function(tag, text) {
          var tag = document.createElement(String(tag));
          var txt = document.createTextNode(text);
          tag.appendChild(txt);
          tr.appendChild(tag);
      };
      //  Show the table's head
      let tr = document.createElement("tr");
      addCell("th", "TIME");
      addCell("th", "ID");
      addCell("th", "USER NAME");
      addCell("th", "TOTAL VOTES");
      addCell("th", "USER VOTE");
      table.appendChild(tr);
      //  Show the table's contents
      for(let index = 0; index < data.length; index++){
        //  Create a new row
        tr = document.createElement("tr");
        addCell("td", data[index]["timestamp"]);
        addCell("td", data[index]["id"]);
        addCell("td", data[index]["userNick"]);
        addCell("td", data[index]["votes"]);
        addCell("td", data[index]["userVote"]);
        table.appendChild(tr);
      }
    })
    .catch(error => table.innerHTML = error);
}

function displayPost() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "block";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
}

function displayVote() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "block";
  document.getElementById("showDelete").style.display = "none";
}

function displayDelete() {
  //  Set style
  document.getElementById("showGet").style.display = "none";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "block";
}
