$(document).ready(function () {

    var correctAnswers = 0; 
    var incorrectAnswers = 0; 
    var noAnswer = 0; 
    var userGuess = "";
    var timer = 15; 
    var questionIndex; 
    holder = [];
    newArray = [];
    var intervalId;
    var timerRunning = false;



    var questions = [
            {
                question: "Who was the first president?",
                prompt: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"],
                answer: 0,
            },
            {
               question: "Who is the current president?",
                prompt: ["Obama", "Bernie Sanders", "Hillary", "Donald Trump"],
                answer: 3,
            },
            {
                question: "Who was the 5th president?",
                prompt: ["James Madison", "James Monroe", "James Buchanan", "James Garfield"],
                answer: 1,
            },
            {
                question: "Who was the 40th president?",
                prompt: ["Jimmy Carter", "Bill Clinton", "Ronald Reagan", "George H Bush"],
                answer: 2,
            },
            {
                question: "Who was the 15h President?",
                prompt: ["James Madison", "James Monroe", "James Buchanan", "James Garfield"],
                answer: 2,
            },
        ]

    var count = questions.length;

    $("#reset").hide();

    $(".start").on("click", function () {
        displayQuestion();
        startTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    function startTimer() {
        if (!timerRunning) {
            intervalId = setInterval(decrement, 1000);
            timerRunning = true;
        }

    }

    function decrement() {
        $("#timer").html("<h2> Time Remaining  " + timer + "</h2>");
        timer--;


        if (timer === 0) {
            noAnswer++;
            stop();
            $("#answers").html("<p>Times Up! The correct answer is: " + options.prompt[options.answer] + "</p>");
        }
    }

    function stop() {
        timerRunning = false
        clearInterval(intervalId);
    }


    function displayQuestion() {
        //random question array
        questionIndex = Math.floor(Math.random() * questions.length);
        options = questions[questionIndex];

        $("#questions").html("<h2>" + options.question + "</h2>");
        for (var i = 0; i < options.prompt.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("select");
            userChoice.html(options.prompt[i]);
            userChoice.attr("data-guessvalue", i);
            $("#answers").append(userChoice);
        }

        $(".select").on("click", function () {

            userGuess = parseInt($(this).attr("data-guessvalue"));

            if (userGuess === options.answer) {
                stop()
                correctAnswers++;
                userGuess = "";
                $("#answers").html("<p>CORRECT!</p>");
            }

            else {

                stop()
                incorrectAnswers++;
                userGuess = "";
                $("#answers").html("<p>WRONG! The correct answer is: " + options.prompt[options.answer] + "</p>");
            }

        })
    }

    // function hidepicture() {
    //     newArray.push(options);
    //     gameQuestions.splice(questionIndex, 1);
    //     var hidpic = setTimeout(function () {

    //         $("#answers").empty();
    //         timer = 15;

            if ((incorrectAnswers + correctAnswers + noAnswer) === count) {

                $("#questions").empty();
                $("#questions").html("<h3> GAME OVER! See How You Did, below!</h3>");
                $("#answers").append("<h4> Correct: " + correctAnswers + "</h4>");
                $("#answers").append("<h4> Incorrect " + incorrectAnswers + "</h4>");
                $("#answers").append("<h4> Unanswered: " + noAnswer + "</h4>");
                $("#reset").show();
                $("#timer").hide()
                correctAnswers = 0;
                incorrectAnswers = 0;
                noAnswer = 0;
            }

            else {

                startTimer()
                displayQuestion()
            }
        }, 3000);
    // }


    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        startTimer();
        displayQuestion();

    });
// });
    
// using alerts to ask questions
// var questions = [
//     {
//         prompt: "Who was the first president?\n(A) George Washington\n\(B) Abraham Lincoln\n(C) John Adams\n(D) Thomas Jefferson",
//         answer: "A"
//     },
//     {
//         prompt: "Who is the current president?\n(A) Obama\n\(B) Bernie Sanders\n(C) Hillary\n(D) Donald Trump",
//         answer: "D"
//     },
//     {
//         prompt: "Who was the 5th president?\n(A) James Madison\n\(B) James Monroe\n(C) James Buchanan\n(D) James Garfield",
//         answer: "B"
//     },
//     {
//         prompt: "Who was the 40th president?\n(A) Jimmy Carter\n\(B) Bill Clinton\n(C) Ronald Reagan\n(D) George H Bush",
//         answer: "C"
//     },
//     {
//         prompt: "Who was the 15h President?\n(A) James Madison\n\(B) James Monroe\n(C) James Buchanan\n(D) James Garfield",
//         answer: "C"
//     },
// ]
// var score = 0;

// for (var i = 0; i < questions.length; i++) {
//     var response = window.prompt(questions[i].prompt)
//     if (response === questions[i].answer) {
//         score++;
//         alert("Correct!");
//     } else {
//         alert("Wrong!");
//     }
// }
// alert("you got " + score + "/" + questions.length);
