//  This function aims to return an array according to the filter rule of one element
function filterByOneElement(array, element, value) {
  let newArray = [];
  if(value == "All"){
    //  newArray should be the same as array
    for (let index = 0; index < array.length; index++) {
      newArray.push(array[index]);
    }
  } else {
    for (let index = 0; index < array.length; index++) {
        if (array[index][element] == value) {
            newArray.push(array[index]);
        }
    }
  }
  return newArray;
}

function filterBetweenHours(array, from, to){
  /*let newArray = [];
  for(let index = 0; index < array.length; index++){
    let currentTime = array[index]["timestamp"];
    let currentDate = Number(currentTime.substring())
    let currentHour = Number(currentTime.substring())
  }
  return newArray;*/
}

function filterBetweenVotes(array, from, to){
  let newArray = [];
  if (from == "All" && to == "All") {
    for (let index = 0; index < array.length; index++) {
      newArray.push(array[index]);
    }
  } else if (from == "All") {
    for (let index = 0; index < array.length; index++) {
      if (array[index]["votes"] <= to) {
        newArray.push(array[index]);
      }
    }
  } else if (to == "All") {
    for (let index = 0; index < array.length; index++) {
      if (array[index]["votes"] >= from) {
        newArray.push(array[index]);
      }
    }
  } else {
    for (let index = 0; index < array.length; index++) {
      if (array[index]["votes"] >= from && array[index]["votes"] <= to) {
        newArray.push(array[index]);
      }
    }
  }
  return newArray;
}

//  This function is designed for sorting rules
function sortBy(element) {
  switch(element) {
    case "Time":
      element = "timestamp";
      break;
    case "Nickname":
      element = "userNick";
      break;
    case "Content":
      element = "content";
      break;
    case "Total votes":
      element = "votes";
      break;
    case "User vote":
      element = "userVote";
      break;
  }
  return function (a, b) {
    if(a[element] < b[element]) {
        return -1;
    } else if (a[element] > b[element]){
        return 1;
    } else {
        return 0;
    }
  }
}
