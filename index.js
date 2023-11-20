const patterns = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
let currentSituation = true;
let checkXorO = true;
let firstuserInput = [];
let seconduserInput = [];
let firstuserscore = 0;
let seconduserscore = 0;
const firstuserscoresection = document.querySelector("#first-player-score");
const seconduserscoresection = document.querySelector("#second-player-score");
const turnSection = document.querySelector(".turn-section");
const boxes = document.querySelectorAll(".box");
boxes.forEach((e) => {
  e.addEventListener("click", (e) => {
    const selectbox = e.target;
    if (selectbox.innerHTML == "") {
      const i = document.createElement("i");
      const turnSection = document.querySelector(".turn-section");
      if (checkXorO) {
        i.setAttribute("class", "fa-solid fa-x");
        checkXorO = !checkXorO;
        turnSection.innerHTML = "O";
        firstuserInput.push(Number(selectbox.id));
      } else {
        i.setAttribute("class", "fa-solid fa-o");
        checkXorO = !checkXorO;
        turnSection.innerHTML = "X";
        seconduserInput.push(Number(selectbox.id));
      }
      if (firstuserInput.length == 5 || seconduserInput.length == 5) {
        reset();
      } else {
        multicheck();
      }
      selectbox.appendChild(i);
    }
  });
});
function checkMatch(input1, input2) {
  let newfirstuserInput;
  let newseconduserInput;
  if (input2 == undefined) {
    newfirstuserInput = input1.sort();
    if (newfirstuserInput.length == 3) {
      let returndataoffirst = patterns.filter((val) => {
        const [a, b, c] = newfirstuserInput;
        return val[0] == a && val[1] == b && val[2] == c;
      });
      if (returndataoffirst.length != 0) {
        return "firstWon";
      }
    }
  } else if (input1 == undefined) {
    newseconduserInput = input2.sort();
    if (newseconduserInput.length == 3) {
      let returndataofsecond = patterns.filter((val) => {
        const [a, b, c] = newseconduserInput;
        return val[0] == a && val[1] == b && val[2] == c;
      });
      if (returndataofsecond.length != 0) {
        return "secondWon";
      }
    }
  } else {
    newfirstuserInput = input1.sort();
    newseconduserInput = input2.sort();
    if (newfirstuserInput.length == 3) {
      let returndataoffirst = patterns.filter((val) => {
        const [a, b, c] = newfirstuserInput;
        return val[0] == a && val[1] == b && val[2] == c;
      });
      if (returndataoffirst.length != 0) {
        return "firstWon";
      }
    }
    if (newseconduserInput.length == 3) {
      let returndataofsecond = patterns.filter((val) => {
        const [a, b, c] = newseconduserInput;
        return val[0] == a && val[1] == b && val[2] == c;
      });
      if (returndataofsecond.length != 0) {
        return "secondWon";
      }
    }
  }
  return "noWon";
}
function multicheck() {
  let testinput1 = [...firstuserInput];
  let testinput2 = [...seconduserInput];
  const firstuserInputlength = firstuserInput.length;
  const seconduserInputlength = seconduserInput.length;
  let value;
  if (
    firstuserInputlength == 3 ||
    (firstuserInputlength != 4 && seconduserInputlength == 3)
  ) {
    value = checkMatch(testinput1, testinput2);
    if (value == "firstWon") {
      firstuserscore += 10;
      firstuserscoresection.innerText = firstuserscore;
      reset();
    }
    if (value == "secondWon") {
      seconduserscore += 10;
      seconduserscoresection.innerText = seconduserscore;
      reset();
    }
  } else if (firstuserInputlength == 4 && seconduserInputlength != 4) {
    value = checkafterfour(testinput1);
    if (value == "Won") {
      firstuserscore += 10;
      firstuserscoresection.innerText = firstuserscore;
      reset();
    }
  } else if (seconduserInputlength == 4) {
    value = checkafterfour(testinput2);
    if (value == "Won") {
      seconduserscore += 10;
      seconduserscoresection.innerText = seconduserscore;
      reset();
    }
  }
}
function reset() {
  setTimeout(() => {
    boxes.forEach((e) => {
      if (e.innerHTML != "") {
        const element = e.firstElementChild;
        e.removeChild(element);
      }
    }, 100);
  });
  firstuserInput.splice(0, firstuserInput.length);
  seconduserInput.splice(0, seconduserInput.length);
  checkXorO = true;
  turnSection.innerHTML = "X";
}
function checkafterfour(arr) {
  let i = 0;
  let endresult = false;
  patterns.forEach((e) => {
    if (i != 3) {
      for (let z = 0; z < arr.length; z++) {
        const element = e.some((e) => e == arr[z]);
        if (element) {
          i++;
        }
      }
      if (i == 3) {
        console.log(e, "siuuuu");
        endresult = true;
      } else {
        i = 0;
      }
    }
  });
  if (endresult) {
    return "Won";
  }
}
