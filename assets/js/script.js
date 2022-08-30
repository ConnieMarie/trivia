var score = 0;
var gameQuestionCountLimit = 10;
var gameQuestionCount = 0;
var gameCategoryId = "";
var apiUrl =
  "https://opentdb.com/api.php?amount=1&category=<catId>&type=multiple";

var gameCategoryList = [
  {
    id: 12,
    name: "Music",
  },
  {
    id: 23,
    name: "History",
  },
];

//runs event listeners specific to the main page
if ($("body").hasClass("homepage")) {
  //toggles the bulma dropdown button reveal
  var dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("is-active");
  });

  //when category is selected, stores the category in variable for API
  $(".dropdown-content").click(function (event) {
    var topic = event.target.innerText;
    console.log(topic);
    console.log(gameCategoryList[0].name);
    //stores the data-catId from the dropdown to add to the API search
    gameCategoryId = $(event.target).attr("data-catId");
    console.log(gameCategoryId);
    $("#dropdownText").text(topic);
  });

  //Prevents moving forward to play game without a category selected
  $("#playButton").click(function (event) {
    //checks to ensure a category was selected and no undefined
    if (gameCategoryId && gameCategoryId != "") {
      console.log(gameCategoryId);
      //if a category was select, redirects to the game page
      document.location.href = "game-page.html";
    } else {
      openModal(); 
    }
  });
}


// Function to open the modal
function openModal() {
    
    // Add is-active class on the modal
    document.getElementById("modal-select-topic").classList.add("is-active");
  }
   
  // Function to close the modal
  function closeModal() {
    document.getElementById("modal-select-topic").classList.remove("is-active");
  }
   
  // Add event listeners to close the modal
  // whenever user click outside modal
  document.querySelectorAll(
   ".modal-background",
   ".modal-close",
   ".modal-card-head",
   ".delete",
   ".modal-card-foot",
   ".button"
  ).forEach(($el) => {
            const $modal = $el.closest(".modal");
            $el.addEventListener("click", () => {
             
            // Remove the is-active class from the modal
            $modal.classList.remove("is-active");
          });
        });
         
        // Adding keyboard event listeners to close the modal
        document.addEventListener("keydown", (event) => {
        const e = event || window.event;
            if (e.keyCode === 27) {
             
             // Using escape key
              closeModal();
            }
         });


//JS logic for the modal
// document.addEventListener('DOMContentLoaded', () => {
//     // Functions to open and close a modal
//     function openModal($el) {
//       $el.classList.add('is-active');
//     }
  
//     function closeModal($el) {
//       $el.classList.remove('is-active');
//     }
  
//     function closeAllModals() {
//       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
//         closeModal($modal);
//       });
//     }
  
//     // Add a click event on buttons to open a specific modal
//     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
//       const modal = $trigger.dataset.target;
//       const $target = document.getElementById(modal);
  
//       $trigger.addEventListener('click', () => {
//         openModal($target);
//       });
//     });
  
//     // Add a click event on various child elements to close the parent modal
//     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
//       const $target = $close.closest('.modal');
  
//       $close.addEventListener('click', () => {
//         closeModal($target);
//       });
//     });
  
//     // Add a keyboard event to close all modals
//     document.addEventListener('keydown', (event) => {
//       const e = event || window.event;
  
//       if (e.keyCode === 27) { // Escape key
//         closeAllModals();
//       }
//     });
//   });



//runs event listeners specific to the gamePage
if ($("body").hasClass("gamePage")) {
  $("#startButton").click(function (event) {
    //checks to ensure a category was selected and no undefined
    if (gameCategoryId && gameCategoryId != "") {
      //if category variable has a value, calls question
      gameQuestionCount = 0;
      score = 0;
      getQuestion();
    } else {
      //if category variable is empty (user directly access game page bypassing category question), redirects to the home page to have user select the trivia category
      document.location.href = "index.html";
    }
  });

  $("#choiceButtons").click(function (event) {
    // add logic to test if a button was pressed
    // if yes,
    // store data-choiceId value to a variable
    // test answer against question variable
    // if correct
    //add to score
    //provide response to user
    // if incorrect
    //provide response to user
    // end with endGame check (if that was the last question to ask)
    //if total questions asked match the total variable, run the endGame function
    //else clear screen and run getQuestion again
  });
}

var getQuestion = function () {
  gameCategoryId = 23;

  if (gameQuestionCount >= gameQuestionCountLimit) {
    endGame();
  } else {
    var fetchUrl = apiUrl.replace("<catId>", gameCategoryId);
    // make a request to the url
    fetch(fetchUrl)
      .then(function (response) {
        // request was successful
        if (response.ok) {
          response.json().then(function (data) {
            // bulma loading icon class
            // $(":button").toggleClass("is-loading");
            // console.log(data);
            displayQuestion(data);
          });
        } else {
          // bulma loading icon class
          // $(":button").toggleClass("is-loading");
          alert("Trivia API Error: Unable to retreive a question");
        }
      })
      .catch(function (error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        // bulma loading icon class
        // $(":button").toggleClass("is-loading");
        alert("Trivia API Error: Unable to connect to trivia database");
      });
  }
};

function displayQuestion(question) {
  console.log(question);
  // First clear old elements and questions

  // Add elements with new questions while adding the data attribute to the button elements
  // Add question count number to question header
}

getQuestion();
