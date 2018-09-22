
//Variables
var questionIndex = 0
var answeredCorrect = 0
var answeredIncorrect = 0
var questionTimer = 20
var timerInterval;
var questionTimeout;
var userguess = ""
var triviaAnswer = ""
var questionObj = [{
    question: "What is Mario's origial name in the first Donkey Kong game?",
    choices: [" A: Hop Boy", " B: Jump Man", " C: Bouncy Bill", " D: Leaping Larry"],
    correctAnswer: 1,
    image: "assets/images/MarioGif.gif",
}, {
    question: "What character was Donkey Kong originally based on?",
    choices: ["A: Tarzan ", "B: Spike (Tom & Jerry) ", "C: Bluto (Popeye) ", "D: King Kong "],
    correctAnswer: 2,
    image: "assets/images/BlutoGif.gif",
}, {
    question: "How many copies did the infamously terrible ET game sell for the Atari 2600?",
    choices: ["A: 1.5 million ", "B: 500,000 ", "C: 50,000 ", "D: 1 Million "],
    correctAnswer: 0,
    image: "assets/images/ETGif.gif",
}, {
    question: "What was Mega Man's original name when translated from Japanese?",
    choices: ["A: Ultra Man ", "B: Blue Man ", "C: Rock Man ", "D: Blaster Man "],
    correctAnswer: 2,
    image: "assets/images/MegaManGif.gif",
}, {
    question: "What was Pac Man originally modeled to look like?",
    choices: ["A: Grape fruit ", "B: Cheese Wheel ", "C: Tortilla ", "D: Pizza "],
    correctAnswer: 3,
    image: "assets/images/PacManGif.gif",
}, {
    question: "Which company was originally partnered with Sony to develop the Playstation?",
    choices: ["A: Nintendo ", "B: Microsoft ", "C: Konami ", "D: Atari "],
    correctAnswer: 0,
    image: "assets/images/SonyGif.gif",
}, {
    question: "What was the game with the earliest use of the infamous Konami Code?",
    choices: ["A: Contra ", "B: Gradius ", "C: Sunset Riders ", "D: Q*bert "],
    correctAnswer: 1,
    image: "assets/images/GradiusGif.gif",
}, {
    question: "Nolan Bushnell, founder of Atari, also created which of these restaurants?",
    choices: ["A: Main Event ", "B: Dave & Busters ", "C: Magic Time Machine ", "D: Chuck E Cheese's "],
    correctAnswer: 3,
    image: "assets/images/ChuckGif.gif",
}
]

//Functions
function questionIterate() {
    start()
    $("#QuestionArea").empty();
    $("#QuestionArea").append(questionObj[questionIndex].question);
    $("#AnswerArea").empty();
    for (i = 0; i < questionObj[questionIndex].choices.length; i++) {
        var answerButtons = $("<button>" + questionObj[questionIndex].choices[i] + "</button> <br>");
        answerButtons.addClass("answerbutton");
        answerButtons.attr("value", i)
        $("#AnswerArea").append(answerButtons);
        triviaAnswer = questionObj[questionIndex].correctAnswer
        console.log(triviaAnswer)
    }
}

function correct() {
    stop();
    answeredCorrect++;
    $("#QuestionArea").empty();
    $("#AnswerArea").empty();
    $("#QuestionArea").append('<img src="' + questionObj[questionIndex].image + '">')
    questionIndex++;
    if (questionIndex < 8) {
        setTimeout(questionIterate, 1000 * 5);
    }
    reset()
}

function incorrect() {
    stop();
    answeredIncorrect++;
    $("#QuestionArea").empty();
    $("#AnswerArea").empty();
    $("#QuestionArea").append("<img id='failimage' src='assets/images/PacManWrong.gif'/>")
    questionIndex++;
    if (questionIndex < 8) {
        setTimeout(questionIterate, 1000 * 5);
    }
    reset();
}


function timerDecrease() {
    questionTimer--
    $("#timerarea").text(questionTimer)
}


function start() {
    questionTimeout = setTimeout(outOfTime, 1000 * 20)
    timerInterval = setInterval(timerDecrease, 1000)

}
function stop() {
    clearTimeout(questionTimeout);
    clearInterval(timerInterval);
    questionTimer = 20;
    $("#timerarea").text(questionTimer);
}

function outOfTime() {
    stop();
    $("#QuestionArea").empty();
    $("#AnswerArea").empty();
    $("#QuestionArea").append("<img id='failimage' src='assets/images/PacManWrong.gif'/>")
    questionIndex++;
    answeredIncorrect++;
    $("#NoWrong").text(answeredIncorrect);
    if (questionIndex < 8) {
        setTimeout(questionIterate, 1000 * 5);
    }

    reset();
}

function reset() {
    setTimeout(function () {
        if (questionIndex === 8) {
            stop();
            clearTimeout(start);
            $("#QuestionArea").empty();
            $("#AnswerArea").empty();
            questionIndex = 0
            var reset = $("<button>" + "</button>");
            reset.addClass("continuebutton");
            reset.text("Continue?");
            $("#QuestionArea").append(reset);
        }
    }, 5000);



}
//running code
if (questionIndex === 0) {
    $('#startbutton').one("click", questionIterate);
    var answeredCorrect = 0;
    var answeredIncorrect = 0;
}

var triviaAnswer = questionObj[questionIndex].correctAnswer



function clicking() {
    userguess = parseInt($(this).attr("value"));
    if (userguess == triviaAnswer) {
        correct();
        $("#NoRight").text(answeredCorrect);

    }
    else {
        incorrect();
        $("#NoWrong").text(answeredIncorrect);
    }

}




$(document).on("click", ".answerbutton", clicking);
$(document).on("click", ".continuebutton", questionIterate)


