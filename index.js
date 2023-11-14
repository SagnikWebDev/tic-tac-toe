const patterns = [
  {
    0: 1,
    1: 2,
    2: 3,
  },
  {
    0: 4,
    1: 5,
    2: 6,
  },
  {
    0: 7,
    1: 8,
    2: 9,
  },
  {
    0: 1,
    1: 4,
    2: 7,
  },
  {
    0: 2,
    1: 5,
    2: 8,
  },
  {
    0: 3,
    1: 6,
    2: 9,
  },
  {
    0: 1,
    1: 5,
    2: 9,
  },
  {
    0: 3,
    1: 5,
    2: 7,
  },
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
    testinput1.shift();
    value = checkMatch(testinput1, testinput2);
    if (value == "firstWon") {
      firstuserscore += 10;
      firstuserscoresection.innerText = firstuserscore;
      reset();
    }
  } else if (seconduserInputlength == 4) {
    testinput2.shift();
    value = checkMatch(testinput1, testinput2);
    if (value == "secondWon") {
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
