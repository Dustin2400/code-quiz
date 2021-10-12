var startButton = document.getElementById("start-button");
var module = document.getElementById("module");
var timeLeft = document.getElementById("time-left");
var question = document.getElementById("question");
var text = document.getElementById("text");
var choices = document.getElementById("choices");
var answer = document.getElementById("answer");
var viewHighScores = document.getElementById("view-high-scores");
var questionCounter = 0;
var timer;
var prevQuestion
var quizDone = false;
var answerChoice=document.getElementsByClassName("answer-choice");
var highScores=[
    {score: 0,
    initials: 00},
    {score: 0,
    initials: 00},
    {score: 0,
    initials: 00},
    {score: 0,
    initials: 00},
    {score: 0,
    initials: 00},
]
var questions = [
    {
        question: "Which declaration establishes a variable that cannot be changed?",
        choiceA: "A. var",
        choiceB: "B. let",
        choiceC: "C. const",
        choiceD: "D. static",
        correct: 2
    },
    {
        question: "Which of the following is not a type of loop?",
        choiceA: "A. if",
        choiceB: "B. since",
        choiceC: "C. while",
        choiceD: "D. for",
        correct: 1
    },
    {
        question: "What variable denotes the HTML inside an element?",
        choiceA: "A. textContent",
        choiceB: "B. value",
        choiceC: "C. addHTML",
        choiceD: "D. innerHTML",
        correct: 3
    },
    {
        question: "How many time will the following loop iterate? for(i=0; i<9; i++)",
        choiceA: "A. none",
        choiceB: "B. 8",
        choiceC: "C. 9",
        choiceD: "D. 10",
        correct: 2
    },
    {
        question: "How can a loop be escaped?",
        choiceA: "A. return",
        choiceB: "B. exit",
        choiceC: "C. stop",
        choiceD: "D. off",
        correct: 0
    },
]

function startQuiz() {
    timer = 75;
    var timeInterval = setInterval(function() {
        if(timer===75){
            quizDone = false;
            timeLeft.textContent=timer;
            quiz();
            timer--;
        }else if(timer===0){
            timeLeft.textCountent=timer;
            clearInterval(timeInterval);
            quizOver();
            return;
        } else {
            if(quizDone){
                clearInterval(timeInterval);
                return;
            }
            timeLeft.textContent=timer;
            timer--;
        }
    }, 1000);
};

function quiz() {
    if(questionCounter==5){
        quizOver();
        return
    }
    text.textContent="";
    question.textContent=questions[questionCounter].question;
    choices.innerHTML = "";
    var choice1=document.createElement("p");
    choice1.className="answer-choice";
    choice1.textContent=questions[questionCounter].choiceA;
    choice1.setAttribute("data-choice-id", 0);
    choices.appendChild(choice1);
    choice1.addEventListener("click", processAnswer);
    var choice2=document.createElement("p");
    choice2.className="answer-choice";
    choice2.textContent=questions[questionCounter].choiceB;
    choice2.setAttribute("data-choice-id", 1);
    choices.appendChild(choice2);
    choice2.addEventListener("click", processAnswer);
    var choice3=document.createElement("p");
    choice3.className="answer-choice";
    choice3.textContent=questions[questionCounter].choiceC;
    choice3.setAttribute("data-choice-id", 2);
    choices.appendChild(choice3);
    choice3.addEventListener("click", processAnswer);
    var choice4=document.createElement("p");
    choice4.className="answer-choice";
    choice4.textContent=questions[questionCounter].choiceD;
    choice4.setAttribute("data-choice-id", 3);
    choices.appendChild(choice4);
    choice4.addEventListener("click", processAnswer);
}


function processAnswer(event){
    var chosen = event.target.getAttribute("data-choice-id");
    if (chosen == questions[questionCounter].correct){
        answer.textContent="Correct!";
        questionCounter++;
        quiz();
    } else {
        answer.textContent="Wrong!";
        timer-=10;
        questionCounter++;
        quiz();
    }
}

function quizOver(){
    quizDone=true;
    question.textContent = "Quiz Over";
    choices.innerHTML="";
    text.textContent = "Your score is "+timer+". Enter your initials.";
    choices.innerHTML="<input type='text' maxlength='2' name='initials'><p class='button' id = 'submit-button'>Submit</p>";
    var submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", saveHighScore);
    console.log(highScores);
}

function saveHighScore() {
    console.log(highScores);
    answer.textContent="";
    var initials = document.querySelector("input[name='initials']").value;
    var replaced = false;
    for(i=0; i< 5; i++){
        if (timer>=highScores[i].score && !replaced){
            for(j=4; j>i; j--){
                console.log(i,j, highScores);
                highScores[j].score=highScores[j-1].score;
                highScores[j].initials=highScores[j-1].initials;
                console.log("j", highScores);
            }
            console.log(i,highScores);
            highScores[i].initials=initials;
            highScores[i].score=timer;
            replaced=true;
            console.log("i", highScores);
        }
        console.log("for", highScores);
    }
    highScoresDisplay();
}

function highScoresDisplay() {
    quizDone = true;
    question.textContent="High Scores";
    choices.innerHTML="<p class='button' id='back-button'>Take Quiz</p><p class='button' id='clear-button'>Clear</p>";
    var backButton = document.getElementById("back-button");
    backButton.addEventListener("click", startQuiz);
    var clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", clearScores);
    var highScoreList = document.createElement("ol");
    for(i=0; i<5; i++){
        var highScore = document.createElement("li");
        highScore.textContent= highScores[i].initials+": "+highScores[i].score;
        highScoreList.appendChild(highScore);
    }
    text.appendChild(highScoreList);
    saveScores();
    questionCounter=0;
}

function clearScores() {
    highScores=[
        {score: 0,
        initials: 00},
        {score: 0,
        initials: 00},
        {score: 0,
        initials: 00},
        {score: 0,
        initials: 00},
        {score: 0,
        initials: 00},
    ];
    saveScores();
}

function saveScores() {
    localStorage.setItem("highScores",JSON.stringify(highScores));
}

function loadScores(){
    var savedScores=localStorage.getItem("highScores");
    if(!savedScores){
        return false;
    }
    highScores=JSON.parse(savedScores);
}

loadScores();
viewHighScores.addEventListener("click", highScoresDisplay);
startButton.addEventListener("click", startQuiz);