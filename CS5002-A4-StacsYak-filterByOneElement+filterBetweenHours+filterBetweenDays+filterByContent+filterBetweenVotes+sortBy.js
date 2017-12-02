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
  let newArray = [];
  let currentTime = Date.parse(new Date());
  for(let index = 0; index < array.length; index++){
    let yakTime = Date.parse(array[index]["timestamp"]);
    let hourDifference = Number((currentTime - yakTime) / 3600000);
    if (hourDifference >= (from - 1) && hourDifference < to) {
      newArray.push(array[index]);
    }
  }
  return newArray;
}

function filterBetweenDays(array, from, to){

}

function filterByContent(array, text){
  let newArray = [];
  if(text == ""){
    //  newArray should be the same as array
    for (let index = 0; index < array.length; index++) {
      newArray.push(array[index]);
    }
  } else {
    for (let index = 0; index < array.length; index++) {
        if (array[index]["content"].indexOf(text) != -1) {
            newArray.push(array[index]);
        }
    }
  }
  return newArray;
}

function filterBetweenVotes(array, from, to){
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    if (array[index]["votes"] >= from && array[index]["votes"] <= to) {
      newArray.push(array[index]);
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
    if(element == "userNick" || element == "content"){
      //  Ignore case
      var compareA = String(a[element]).toUpperCase();
      var compareB = String(b[element]).toUpperCase();
    } else {
      var compareA = a[element];
      var compareB = b[element];
    }
    if(compareA < compareB) {
        return -1;
    } else if (compareA > compareB){
        return 1;
    } else {
        return 0;
    }
  }
}
