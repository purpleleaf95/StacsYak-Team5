//  This function aims to show Yaks post in the recent two days
function displayGet(){

  // Set style
  document.getElementById("showGet").style.display = "block";
  document.getElementById("showPost").style.display = "none";
  document.getElementById("showVote").style.display = "none";
  document.getElementById("showDelete").style.display = "none";
  document.getElementById("showUser").style.display = "none";
  var table = document.getElementById("getResult");
  //  Send HTTP request
  fetch(URL + keyQuery)
    .then(response => response.json())
    .then(data => {
      if(data["error"] != undefined){
        table.innerHTML = String(data["error"]);
      } else {
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
        addCell("th", "CONTENT");
        addCell("th", "TOTAL VOTES");
        addCell("th", "USER VOTE");
        addCell("th", " ");
        table.appendChild(tr);
        //  Show the table's contents
        for(let index = 0; index < data.length; index++){
          //  Create a new row
          var postId = data[index]["id"];

          // let deleteButton = document.createElement('span');
          // deleteButton.innerHTML = '<button id="delete" onclick="del()" value = '+ postID  +' style="width:100px; padding: 10px; font-size:10px"> Delete </button>';
          //
          // let upButton = document.createElement('span');
          // upButton.innerHTML = '<button id="up" onclick = "upVote()" value = '+ postID  +' style="width:50px; padding: 10px; font-size:10px"> + </button>';
          //
          // let downButton = document.createElement('span');
          // downButton.innerHTML = '<button id="down" onclick = "downVote()" value = '+ postID  + ' style="width:50px; padding: 10px; font-size:10px"> - </button>';

          let deleteButton = document.createElement('span');
          deleteButton.innerHTML = '<button id="delete" onclick="del(\'' + postId + '\')"  style="width:100px; padding: 10px; font-size:10px"> Delete </button>';

          let upButton = document.createElement('span');
          upButton.innerHTML = '<button id="up" onclick = "upVote(\'' + postId + '\')" style="width:50px; padding: 10px; font-size:10px"> + </button>';

          let downButton = document.createElement('span');
          downButton.innerHTML = '<button id="down" onclick = "downVote(\'' + postId + '\')" style="width:50px; padding: 10px; font-size:10px"> - </button>';


          tr = document.createElement("tr");
          addCell("td", data[index]["timestamp"]);
          addCell("td", data[index]["id"]);
          addCell("td", data[index]["userNick"]);
          addCell("td", data[index]["content"]);
          addCell("td", data[index]["votes"]);
          addCell("td", data[index]["userVote"]);
          tr.appendChild(deleteButton);
          tr.appendChild(upButton);
          tr.appendChild(downButton);

          table.appendChild(tr);
        }

      }
    });
}
