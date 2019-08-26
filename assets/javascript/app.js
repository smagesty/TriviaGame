$(document).ready(function () {

    var correctAnswers = 0; // player correct answers
    var incorrectAnswers = 0; // player incorrect answers
    var noAnswer = 0; // player no answer due to timer running out
    var userGuess = "";
    var timer = 15; // timer 20 seconds per question
    console.log("okl", timer);
    var questionIndex; // current question
    var options;
    holder = [];
    console.log("okt", holder);
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
                        question: "Who was the 15th President?",
                        prompt: ["James Madison", "James Monroe", "James Buchanan", "James Garfield"],
                        answer: 2,
                    },
                ]

    var count = questions.length;

    $("#reset").hide();

    $("#start").on("click", function () {
        $("#directions").hide();
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
            hidepicture();
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
        console.log("okp", questions.length)
        console.log("ok3", questionIndex)
        console.log("ok4", options)

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
            console.log(this)

            if (userGuess === options.answer) {
                stop()
                correctAnswers++;
                userGuess = "";
                $("#answers").html("<p>CORRECT!</p>");
                hidepicture();
                console.log(options.answer)
            }

            else {

                stop()
                incorrectAnswers++;
                userGuess = "";
                $("#answers").html("<p>WRONG! The correct answer is: " + options.prompt[options.answer] + "</p>");
                hidepicture();
            }

        })
    }

    function hidepicture() {
        $("#images").append("<img src=" + options.image + ">");
        newArray.push(options);
        questions.splice(questionIndex, 1);
        console.log("klj", questions)
        console.log("jhj", questionIndex)
        var hidpic = setTimeout(function () {

            $("#images").empty();
            $("#answers").empty();
            timer = 15;

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
    }


    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answers").empty();
        $("#questions").empty();
        for (var i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        startTimer();
        displayQuestion();

    })


})