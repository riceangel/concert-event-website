/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById('theme-button');
let darkMode = false; 

// Step 2: Write the callback function
const toggleDarkMode = () => {
    // Write your code here
    // This section will run whenever the button is clicked
    const img = themeButton.querySelector("img");

    document.body.classList.toggle("dark-mode");
    darkMode = !darkMode
    if (darkMode) {
      // change button text to light mode
      img.src = "img/sun.png"
      themeButton.lastChild.textContent = "Light Mode"
    } else {
      img.src = "img/space04_moon.png"
      themeButton.lastChild.textContent = "Dark Mode"
    }
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);


/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
let rsvp_btn = document.getElementById("rsvp-button");
let count = 3;

const addParticipant = (person, event) => {
    // Step 2: Write your code to manipulate the DOM here
    
    let rsvp_count = document.getElementById("rsvp-count")
    
    // create p tag for new participant to be added
    const newParticipant = document.createElement('p')

    if (parseInt(person.num_tickets) == 1) {
      newParticipant.textContent = `🎼 ${person.name} has reserved ${person.num_tickets} seat!` 
    } else {
      newParticipant.textContent = `🎼 ${person.name} has reserved ${person.num_tickets} seats!` 
    }

    // Need to get first instance because getElementsByClassName rets a collection
    let participants = document.getElementsByClassName("rsvp-participants")[0]
    participants.appendChild(newParticipant)

    // adding count to page    
    // 1) remove current instance of rsvp count
    rsvp_count.remove()
    
    count = count + 1

    const new_count = document.createElement('p')
    new_count.setAttribute("id", "rsvp-count")
    new_count.textContent = `♬ ${count} people have RSVP'd to this event!`
    participants.appendChild(new_count)

    event.preventDefault();
}

// Step 3: Add a click event listener to the submit RSVP button here
// rsvp_btn.addEventListener("click", addParticipant);


/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = () => {
  let containsErrors = false;

  // let name = document.getElementById("name").value
  let email = document.getElementById("email")
  let num_tickets = document.getElementById("num_tickets")

  var rsvpInputs = document.getElementById("rsvp-form").elements;

  // accesses and saves values of inputs
  let person = {
    name: rsvpInputs[0].value, 
    email: rsvpInputs[1].value, 
    num_tickets: rsvpInputs[2].value
  }
  console.log(person.name)
  
  // TODO: Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    // TODO: Inside loop, validate the value of each input
    // console.log("rsvp input", rsvpInputs[i].value)
    if (rsvpInputs[i].value.length <= 0) { 
      containsErrors = true
      // add error class attribute to curr input
      // document.rsvpInputs[i].classList.add('error');
      // true argument forcefully adds attribute 
      rsvpInputs[i].classList.toggle('error', true)
    } else {
      // false argument removes error class attr (forcefully)
      rsvpInputs[i].classList.toggle('error', false);
    }
  }

  // check if email is 
  if (person.num_tickets <= 0) {
    containsErrors = true
    num_tickets.classList.toggle('error', true)
  }
  const re = new RegExp("^[^@]+@[^@]+\\.[^@]+$");
  /*if (!email.value.includes("@")) {
    email.classList.toggle('error', true)
  }*/ 

  let match = re.exec(person.email)
  console.log(match)
  // re.match returns array, 0th index shows what was parsed

  if (match === null || match[0] != person.email) {
    containsErrors = true
    email.classList.toggle('error', true);
    email.value = "Invalid Email"
  } else {
    email.classList.toggle('error', false);
  }
  

  // TODO: alert() func is a thing
  // If no errors, call addParticipant() and clear fields
  if (!containsErrors) {
    addParticipant(person, event)
    toggleModal(person)

    // clear out rsvpInputs
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
}

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvp_btn.addEventListener("click", validateForm)

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/
/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

// button to close modal
let closeModalBtn = document.getElementById("close-modal-btn")
const hideModal = () => {
  let modal = document.getElementById("success-modal");
  modal.style.display = "none"
}
closeModalBtn.addEventListener("click", hideModal)

// display modal when user successfully rsvp'd
const toggleModal = (person) => {
    console.log("Running toggleModal...");

    let modal = document.getElementById("success-modal"); 
    let modal_text = document.getElementById("modal-text")
    // TODO: Update modal display to flex
    modal.style.display = "flex";

    let ticket_text = ""
    if (person.num_tickets == 1) {
      ticket_text = "Ticket"
    } else {
      ticket_text = "Tickets"
    }
    
    // TODO: Update modal text to personalized message
    modal_text.innerHTML = `<b>🎟️ ${person.num_tickets} ${ticket_text} Acquired! 🎟️ </b> 
                            <br> <hr> <br> 
                            Awesome! You have successfully RSVP\'d for the concert!
                            See you soon, ${person.name}!`;                 

    
    let intervalId = setInterval(animateImage, 500);
    // Set modal timeout to 5 seconds
    setTimeout(() => {
        // TODO: Update modal display to none
        modal.style.display = "none"
        clearInterval(intervalId);
    }, 7000);

}


let motionButton = document.getElementById('motion-button');
let motionEnabled = true
const toggleMotion = () => {
  const img = motionButton.querySelector("img");
  motionEnabled = !motionEnabled
  if (motionEnabled) {
     // change button text to light mode
    img.src = "img/cat12_moyou_mike.png"
    motionButton.lastChild.textContent = "Motion ON"
  } else {
    img.src = "img/cat_koubakozuwari_brown.png"
    motionButton.lastChild.textContent = "Motion OFF"
  }
}
motionButton.addEventListener("click", toggleMotion)

// Animation variables and animateImage() function
let rotateFactor = 0
let modalImage = document.getElementById("modal-img")

const animateImage = () => {
  if (motionEnabled) {
      rotateFactor = rotateFactor === 0 ? -10 : 0
  modalImage.style.transform = `rotate(${rotateFactor}deg)`
  }

}


const headerBtns = document.getElementsByClassName('header-button-container');
const youtubeBtn = document.getElementById('YouTube-btn')
const rsvpBtn = document.getElementById('rsvp-btn')
const rsvpSection = document.getElementById('rsvp')
console.log(youtubeBtn, "youtube")
console.log(rsvpBtn, "rsvp")


youtubeBtn.addEventListener('click', function() {
    window.open('https://www.youtube.com/@tioatberkeley', '_blank'); // '_blank' opens in a new tab
});

rsvpBtn.addEventListener('click', function() {
  if (motionEnabled) {
    rsvpSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    rsvpSection.scrollIntoView();
  }
  
});
