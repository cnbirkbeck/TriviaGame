//document.ready to start the functions after the DOM is ready 
$(document).ready(function(){
    //Global Variables for the game
    
        //display current questions
        var currentQ;

        //result scores
        var correctAns;
        var incorrectAns;
        var unanswered;

        //boolean answer
        var answered;

        //Timer
        var seconds;
        var time;

        //user choice input
        var userChoice;

        // answer prompts
        var text= {
            correct: "You're Correct! With answers like that you'll Sit the Iron Throne in no time!",
            incorrect: "Wrong, you won't sit the Iron Throne anytime soon!",
            timeOut: "You must be quicker, winter is coming!",
            done: "Quiz Complete, the road to the Throne is dark and full of terrors; but you made it.",
        };

        //questions for game

        var quizQuestions = [

            {
                question: "What does Valar Morghulis mean?",
                choices: ["All men must live", "All men must die", "All men can be King", "All men will die"],
                correct: 1,
                image: "assets/images/valarmorg.gif",
                answerText:"Valar Morghulis is a common greeting in Braavos, meaning 'all mean must die' in High Valyrian.",
            },

            {
                question: "Dragon Glass & ________ are the only substances that can kill a White Walker.",
                choices: ["wild fire", "dragon blood", "Valyrian steel", "viper venom"],
                correct:2,
                image: "assets/images/Valyrain steel.gif",
                answerText:"Valyrian steel is a form of metal that was forged in the days of the mighty Valyrian Freehold. When fashioned into bladed weapons, the steel can hold an especially keen edge, remaining sharp forever without the need for honing. Along with dragon glass it is one of the few known substances that can kill a White Walker." ,
            },

            {
                question: "Who really poisoned Joffery?",
                choices: ["Tyrion Lannister", "Sansa Stark", "Petyr Baelish", "Olenna Tyrell"],
                correct:3,
                image: "assets/images/olenna.gif",
                answerText:"Lady Olenna, better known as 'The Queen of Thorns', is the sharp-witted grandmother of Loras and Margaery. In the adaptation, Olenna is the matriarch of, and the true power behind, House Tyrell. She reveals to Margaery that she poisons Joffery to save her from having to marry him."
            },

            {
                question: "Who becomes Joffrey's Hand of the King?",
                choices: ["Tommen Lannister", "Tyrion Lannister", "The Hound", "The Mountain"],
                correct:1,
                image: "assets/images/tyrion.gif",
                answerText: "Impressed with Tyrion's political instincts, his father Tywin appoints Tyrion acting Hand of the King in an attempt to control Joffrey."
            },

            {
                question: "What substance is used to help win the Battle of Blackwater Bay?",
                choices: ["Dragon Glass", "Viper Venom", "wildfire", "whet stone"],
                correct:2,
                image: "assets/images/wild fire.gif",
                answerText: "The battle was an attempt by Stannis Baratheon, brother of the late King Robert Baratheon, to take King's Landing, the capital of the Seven Kingdoms, and to seize the Iron Throne from King Joffrey Baratheon. It required a naval assault and an attack on the city gates by land. Tyrion Lannister, acting Hand of the King, led the defense of the city. He successfully destroyed a large portion of Stannis's fleet through the use of wildfire."
            },

            {
                question: "What is Arya's punishment for stealing from the Many-Face God?",
                choices: ["She has her hand cut off", "She is blinded", "She has her mouth sewn shut", "She is exiled"],
                correct:1,
                image: "assets/images/arya.gif",
                answerText: "After taking a life Arya is subsequently blinded by Jaqen H'gar."
            },

            {
                question: "Where did Daenerys hatch the dragon eggs?",
                choices: ["On a funeral pyre", "In a cave", "At Dragon Stone", "In a volcanic flame"],
                correct:0,
                image: "assets/images/dragons.gif",
                answerText: "Daenerys hatchs the eggs in Khal Drogo's funeral pyre; believing the idea of a life for a life."
            },

            {
                question: "What is Oberyn Martell's nickname?",
                choices:["The Mountain", "The King Slayer", "The Red Viper", "Snake Eyes"],
                correct: 2,
                image: "assets/images/oberyn.gif",
                answerText: "Prince Oberyn Martell, also known as The Red Viper, was a member of House Martell, the younger brother of Doran Martell and the late Elia Martell, and the father of eight bastard girls known as the Sand Snakes. He was well known for his fighting skills, passionate temper, and sexual appetites.",
                
            },

            {
                question: "The Night King was created using a dagger made of __________.",
                choices: ["Valyrain Steel", "Sacred Tree Roots", "wildfire", "Dragon Glass"],
                correct: 3,
                image: "assets/images/night king.gif",
                answerText: "The White Walkers were created by the Children of the Forest thousands of years ago as a form of protection against the First Men who were cutting their sacred trees and slaughtering their tribe. The Children of the Forest pressed dragonglass daggers into the chests of these First Men to create the first White Walkers."
            },

            {
                question: "Who fights for Tyrion during his trial?",
                choices: ["Podrick Payne", "Brianne of Tarth", "Jamie Lannister", "Bronn"],
                correct: 3,
                image: "assets/images/bronn.gif",
                answerText: "Ser Bronn of the Blackwater is a skilled and dangerous sellsword who comes to prominence when he champions for Tyrion Lannister in his trial by combat at the Eyrie. Bronn subsequently enters Tyrion's service as his personal bodyguard, assassin, and enforcer and in return was given knighthood, power, and wealth.",
            }
        ];

    //Hide Content at Game Start
    $("#questionArea").hide();
    $("#answerArea").hide();
    $("#results").hide();

    //Once Begin Quiz is clicked hide header, call game function
    $("#beginbtn").on("click", function(){
        $(".jumbotron").hide(); 
        newGame();
    });

    //Restart Button Hide
    $("#restartbtn").on("click", function(){
        $("#results").hide();
        newGame();
    });

   //Function to Start New Game After Begin Quiz is clicked
    function newGame(){
        $("#questionArea").show();
        $("#answerArea").hide();
        $("#results").hide();
        correctAns=0;
        incorrectAns=0;
        unanswered=0;
        currentQ=0;
        //call questions function to initiate question asking
        questions();
    };

    //Question Function
    function questions(){
        $("#answerArea").hide();
        $("#questionArea").show();
        $("#questions").show();
        answered=true;
        //print question from the Quiz Questions array
        $("#question").html(quizQuestions[currentQ].question);

        //console log to test
        console.log(questions);



        //loop through possible choices and prepend to radio buttons
        for (var i=0; i<=3;i++){
            var list= $("<div>");
            list.text(quizQuestions[currentQ].choices[i]);
            list.prepend($("<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='inlineRadioOptions'+i+'' id='radio'+i+'><label class='form-check-label' id + choices '</label></div>'"));
            list.attr({"data-index":i});
            list.addClass("thisChoice");
            $(".list").append(list);     
            
        };

        //Call the timer
        countdown();

        //User clicks on choice, stops timer, calls the Answer function
        $(".thisChoice").on("click", function (){
         userChoice = $(this).data("index");
         clearInterval(time);
         showAnswer();
        });

       
    };

   

    //Timer Count Down 

    function countdown() {
         seconds = 30;
         $("#time").html("00:" + seconds);
         answered = true;

         //Delay of 1 sec before timer goes off
		time = setInterval(countDownShow, 1000);
    };

    //Timer Display

    function countDownShow(){
        seconds --;

        if (seconds <10) {
            $("#time").html("00:0" + seconds);
            $("#time").css ({"color":"red"});
        }

        else{
            $("#time").html("00:"+seconds);
            $("#time").css({"color":"black"});
        };

        if ( seconds < 1){
            clearInterval(time);
            answered = false;
            showAnswer();
        };
        
    }


    //Display the Answer Card

    function showAnswer(){
        $("#questionArea").hide();
        $("#results").hide();
        $("#answerArea").show();
        $(".thisChoice").empty();

        var correctAnswerText= quizQuestions[currentQ].choices[quizQuestions[currentQ].correct];
        var correctAnswerIndex= quizQuestions[currentQ].correct;
        console.log(correctAnswerText);
        console.log(correctAnswerIndex);

        //Insert GIF
        var gifLink = quizQuestions[currentQ].image;
        var gifIn = $("#answerImg");
        gifIn.attr("src", gifLink);
        gifIn.addClass("gifImg");
        $("#answerImg").html(gifIn);

        //Answer Text

        var ansText = quizQuestions[currentQ].answerText;
            newCap=$("<div>");
            newCap.html(ansText);
            newCap.addClass("gifCap");
            $("#answer").html(newCap);

        //Display and Counts Answered

        if((userChoice === correctAnswerIndex) && (answered === true)){
            correctAns++;
            $("#text").html(text.correct);
            $("#correctAnswer").hide();
        } else if ((userChoice !== correctAnswerIndex) && (answered=== true))
        {
            incorrectAns++;
            $("#text").html(text.incorrect);
            $("#correctAnswer").show().html("The correct answer was " + correctAnswerText);

        } else
        {
            unanswered++;
            $("#text").html(text.timeOut);
            $("#correctAnswer").show().html("The correct answer was " + correctAnswerText)
            answered = true;
        }

        //Final Answer Reveal Timer
        if(currentQ ===(quizQuestions.length-1)){
            setTimeout(results,10000);
        } else {
            currentQ++;
            setTimeout(questions,10000);
        }
    }

    //Results Function
    function results(){
        $("#answerArea").hide();
        $("#questionArea").hide();
        $("#results").show();
        $("#resultText").html(text.done);
        $("#correctAnswers").html("Correct Answers: "+ correctAns);
        $("#incorrectAnswers").html("Incorrect Answers:" + incorrectAns);
        $("#unanswered").html("Unanswered Questions: "+ unanswered);
        $("#restartbtn").show();
        

    }



})
