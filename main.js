let rulesBtn = document.querySelector(".rules-btn");
let rules = document.querySelector(".rules-overlay");
let score = localStorage.getItem("score");
let scoreEl = document.querySelector(".score-box span");

if(!score) {
  localStorage.setItem("score", 0);
} else {
  scoreEl.textContent = localStorage.getItem("score");
}

rulesBtn.addEventListener("click", ()=> {
  rules.classList.add("rules-active");
  
  document.querySelector(".rules-overlay .close-rules")
  .addEventListener("click", () => {
    rules.classList.remove("rules-active");
  });
});

let handsObject = {
  scissors: "./images/icon-scissors.svg",
  paper: "./images/icon-paper.svg",
  rock: "./images/icon-rock.svg",
}

let handBox = document.querySelectorAll(".pick-move .hand-box");

handBox.forEach((hand) => {
  hand.addEventListener("click", () => {
    document.querySelector(".pick-move").style.display = "none";
    document.querySelector(".match-box").classList.add("active");

    let handPicked = hand.getAttribute("id");
    document.querySelector(".hand-box.you-picked").id = handPicked;
    document.querySelector(".hand-box.you-picked img").src = handsObject[handPicked];

    let keys = Object.keys(handsObject);
    let housePick = keys[Math.floor(Math.random() * keys.length)];
    let item = handsObject[housePick];

    let statusMsg = document.querySelector(".match-status p");
    let youWin = null;

    if(handPicked == "paper") {
      youWin = housePick == "rock" ? true : housePick == "scissors" ? false : null;
    } 
    if(handPicked == "rock") {
      youWin = housePick == "scissors" ? true : housePick == "paper" ? false : null;
    } 
    if(handPicked == "scissors") {
      youWin = housePick == "paper" ? true : housePick == "rock" ? false : null;
    } 

    statusMsg.textContent = youWin == true ? "you won!" : youWin == false ? "you lost!" : "no one won!";


    setTimeout(() => {

      document.querySelector(".match-status").style.display = "flex";
      let handHousePick = document.querySelector(".hand-box.house-picked");
      handHousePick.id = housePick;

      if (youWin) {
        statusMsg.style.color = "#a5dc86";
        let newScore = Number(score) + 1;
        scoreEl.textContent = newScore;
        localStorage.setItem("score", newScore);
        handHousePick.style.animation = "none";
        document.querySelector(".hand-box.you-picked").classList.add("active");
      }
      else if(youWin == null) {
        handHousePick.style.animation = "none";
      }
      else {
        statusMsg.style.color = "#f27474";
        handHousePick.classList.add("active");
      }
      document.querySelector(".hand-box.house-picked img").src = item;
    }, 3000);

    let againBtn = document.querySelector(".match-status button");
    againBtn.addEventListener("click", () => {
      window.location.reload();
    })
    
  });
});
