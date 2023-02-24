import {questionsLvl1} from "./questionLvl1.js"

let activeCaseId = 0;

const niveau1 = document.getElementById("niveau1");
const backgroundFade = document.getElementById("backgroundFade");
const pion = document.createElement("div");
const lifeDiv = document.getElementById("lifes");
const perduDiv = document.getElementById("perdu")
let lifeCount = 2

function updateLife(){
    while (lifeDiv.firstChild) {
        lifeDiv.removeChild(lifeDiv.firstChild)
    }
    for (let i = 0; i < lifeCount; i++) {
        const life = document.createElement("img");
        life.src = 'coeur.png';
        life.classList.add("life")
        lifeDiv.appendChild(life)
    }
}

const modalDifficulty = document.getElementById("myModalDifficulty");
const esayBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");
const startButton = document.querySelector('#start-game');
const startPage = document.getElementById("startPage");

let easy = true;

function initLvl1() {
    for (let i = 0 ; i < 21 ; i++) {
        let question = questionsLvl1.find(x => x.id === i)
        const c = document.createElement("div");
        const front = document.createElement("div")
        front.classList.add("front")
        const back = document.createElement("div")
        back.classList.add("back");
        if(question){
            back.innerHTML = 
            `<div class="container">
            <div id="score" class="score"></div>
                <div id="question-container" class="hide">
                    <div id="questionElement" class="questionElement"></div>
                    <div id="answer-buttons" class="btn-grid">
                        
                    </div>
                </div>
            </div>`;
            let questionElement = back.getElementsByClassName("questionElement")[0]
            questionElement.innerHTML = question.Question
            let answerButtonsElement = back.getElementsByClassName("btn-grid")[0]
            let correctAnswer = question.BonneReponse;
            let incorectAnswers = question.MauvaiseReponses;
            let optionList = [];
            optionList.push(correctAnswer, ...incorectAnswers);
            optionList.sort(() => Math.random() - .5);
            
            optionList.forEach(answer => {
                const button = document.createElement("button")
                button.innerText = answer
                button.classList.add('btn')
                if(answer == correctAnswer){
                    button.dataset.correct = true
                }
                button.addEventListener("click", selectAnswer)
                answerButtonsElement.appendChild(button)
            });
            
        }
        switch (i) {
            case 7:
            case 8:
            case 10:
            case 12:
            case 13:
            case 14:
            case 15:
            case 19:
            case 20:
                c.classList.add("hidden")
                break;
        }
        switch (i) {
            case 0: 
                c.classList.add("start")
                front.innerHTML = `<h1>DEBUT</h1>`
                break;
            case 6 : 
                c.classList.add("end")
                front.innerHTML = `<h1>FIN</h1>`
                break;
            case 1:
            case 11:
                c.classList.add("SEO")
                front.innerHTML = `<img class="category" src="5.png" alt="category"><h1>SEO</h1>`
                break;
            case 2:
            case 17:
                c.classList.add("keyword")
                front.innerHTML = `<img class="category" src="6.png" alt="category">`
                break;
            case 3:
            case 18:
                c.classList.add("tools")
                front.innerHTML = `<img class="category" src="7.png" alt="category">`
                break;
            case 5:
            case 16:
                c.classList.add("balise")
                front.innerHTML = `<img class="category" src="8.png" alt="category">`
                break;
            case 4:
            case 9:
                c.classList.add("archi")
                front.innerHTML = `<img class="category" src="9.png" alt="category">`
                break;
        }
        c.classList.add("case");
        c.setAttribute("id",`${i}`);
        c.appendChild(front);
        c.appendChild(back);
        niveau1.appendChild(c);
    }
}

function movePion(){
    let activeCase = document.getElementById(activeCaseId.toString());
    activeCase.classList.remove("flip");
    progressTruLvl1();
    activeCase = document.getElementById(activeCaseId.toString());
    addPion(activeCase,pion);
    setTimeout(() => {
        removePion(activeCase,pion)
        triggerQuestion(activeCase); 
    }, 1000);
}

function startOfGame() {
    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space"    
        ) {
          movePion();
        }
    }
}

function initGame(){
    const activeCase = document.getElementById(activeCaseId.toString());
    activeCase.appendChild(pion)
}

function initPion(){
    pion.classList.add("pion");
    pion.setAttribute("id","pion");
    pion.innerHTML = `<img src="pion2.png" alt="le pion du joueur">`
}

function addPion(activeCase, pion){
    activeCase.appendChild(pion);
}

function removePion(activeCase, pion){
    activeCase.removeChild(pion);
}

function mainGame(){
    document.body.onkeyup = function(e) {
        if (e.key == " " ||
            e.code == "Space"    
        ) {
          movePion();
        }
      }
}

function triggerQuestion(activeCase){
   activeCase.classList.add("flip")
   let front = activeCase.getElementsByClassName("front")[0]
   front.innerHTML = ""
}

function endOfLvl1(bool) {
    if (bool){
        niveau1.style.display = "none";
        lifeDiv.style.display = "none";
        console.log("Fin Du game WIN");
    } else {
        perduDiv.style.display = "block";
        lifeDiv.style.display = "none";
        niveau1.style.display = "none";
        backgroundFade.style.display = "none";
        console.log("Fin Du game LOSE");
    }
}

function progressTruLvl1(){
    activeCaseId+=1

    if (activeCaseId == 3 && easy) {
        activeCaseId = 9
    }
    if (activeCaseId == 10) {
        activeCaseId = 16
    }
    if (activeCaseId == 19) {
        activeCaseId = 11
    }
    if (activeCaseId == 12) {
        activeCaseId = 4
    }
    if (activeCaseId == 6) {
       endOfLvl1(true)
    }
}

function askDifficulty(){
    if (activeCaseId == 2) {
        modalDifficulty.style.display = "block";
    
        // Add event listener for modal action
        modalDifficulty.addEventListener("click", function(event) {
          // Check if user clicked on a specific action button in the modal
          if (event.target.id === "easyBtn") {
            // Call movePion() function here after the user takes an action in the modal
            easy = true
            movePion();
            updateLife();
    
            // Close the modal dialog box
            modalDifficulty.style.display = "none";
          } else {
            easy = false;
            movePion();
            modalDifficulty.style.display = "none";
            lifeCount += 1;
            updateLife();
          }
        });
      } else {
        // If activeCaseId is not 2, call movePion() function immediately
        movePion();
      }
}
function selectAnswer(e) {
    
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        console.log("bien ouej ma ptite gueule");

    } else {
        lifeCount --;
        updateLife();
        
        if (lifeCount <= 0){
            endOfLvl1(false);
        }
    }
    askDifficulty()
    
}

startButton.addEventListener('click', function(event) {
    startPage.style.display = "none";
    niveau1.style.display = "grid";
    lifeDiv.style.display = "flex"
    backgroundFade.style.display = "block";
    initLvl1();
    initPion();
    initGame();
    updateLife();
    mainGame();
});





