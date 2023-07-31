let kittens = []

class Kitty {
  // create values instead of passing them here
  id;
  name;
  affection;
  mood;

  constructor(name) {
    this.id = generateId()
    this.name = name
    this.affection = 5
    this.mood = "Tolerant"
  }
}


/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()

  //Clear Kitties
  //clearKittens()

  //Verify Form is correct

  //Grab kitten name
  // @ts-ignore
  let kittenName = titleCaseName(document.getElementById("kittenName").value)

  if (kittenName.length > 0 && kittens.find(o => o.name === kittenName) === undefined)
  {
    //Clear form
    var frm = document.getElementById('formId');
    // @ts-ignore
    frm.reset();  

    let newKitten = new Kitty(kittenName)

    //Add kitten to array
    kittens.push(newKitten)
    console.log(kittens)
    

    saveKittens()
    drawKitten(newKitten)

  } else if (kittenName.length === 0) {
    alert("Please give your kitty a name")

  //Notify duplicate cat attempt
  } else if (kittens.find(o => o.name === kittenName) !== undefined) {
    alert(kittenName + " already exists!")
  }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
    localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
    let storageKittens = localStorage.getItem("kittens")
    if (storageKittens != null) {
      //May need to implement this with proper words or 1 by 1
      console.log("GRABBED KITTENS")
      kittens = JSON.parse(storageKittens)
    } else {
      console.log("DIDNT GRAB KITTENS")
    }
}

/**
 * Draw all of the kittens to the kittens element
 */

function drawKittens() {
  // Clear all cards before redrawing
  const elements = document.getElementsByClassName("card");
  while(elements.length > 0){
      elements[0].remove();
  }

  kittens.forEach((kitty) => {
    drawKitten(kitty)
    setKittenMood(kitty)
  });
}

function drawKitten(kitty) {
  let kittenshtml = document.getElementById("kittens");

  let card = document.createElement("div");
  card.className = "card"
  card.id = kitty.id

  //Add image
  let img = document.createElement("img")
  img.className = "card-img"
  img.src = "kitten-tolerant.png"
  img.height = 100
  img.alt = "Moody Kittens"
  card.appendChild(img)

  //Add Name to Card
  let name = document.createElement("h2")
  name.className = "card-name"
  name.innerText = kitty.name
  card.appendChild(name)

  //Add Mood to Card
  let mood = document.createElement("h2")
  mood.className = "card-mood"
  mood.innerText = kitty.mood
  card.appendChild(mood)

  //Add Buttons
  let petButton = document.createElement("button");
  petButton.innerText = "Pet"
  petButton.value = kitty.id
  petButton.addEventListener('click', function() {pet(this.value)})
  card.appendChild(petButton)

  let catnipButton = document.createElement("button");
  catnipButton.innerText = "Cat Nip"
  catnipButton.value = kitty.id
  catnipButton.addEventListener('click', function() {catnip(this.value)})
  card.appendChild(catnipButton)

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete"
  deleteButton.value = kitty.id
  deleteButton.addEventListener('click', function() {deleteKitten(this.value)})
  card.appendChild(deleteButton)

  // @ts-ignore
  kittenshtml.appendChild(card)
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * 
 * @return {Kitten}
 */
function findKittenById(id) {
  let kitten = kittens.find(o => o.id === id)
  return kitten
}

function deleteKitten(id) {
  //Remove kitten from array
  let kitten = findKittenById(id)
  kittens.splice(kittens.indexOf(kitten), 1)

  //Remove Card
  let card = document.getElementById(kitten.id);
  card?.remove()

  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  //loadKittens()
  let kitten = findKittenById(id)

  //Change kitty affection by one, but keep in a range from 1 to 10
  if (kitten.affection !== 10 && (kitten.affection === 1 || Math.random() > .5)) {
    kitten.affection += 1
  } else {
    kitten.affection -= 1
  }
  setKittenMood(kitten)

  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitty = findKittenById(id)
  kitty.affection = 5;
  setKittenMood(kitty)
  //Save after
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection and changes Card Styles to match Mood
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {

  //Grab Card
  let card = document.getElementById(kitten.id);

  //Update css
  if (card !== null) {
    if (kitten.affection > 6) {
      kitten.mood = "Happy"
      card.style.backgroundColor = "gold"
      card.style.color = "white"
    } else if (kitten.affection > 3) {
      kitten.mood = "Tolerant"
      card.style.backgroundColor = "azure"
      card.style.color = "black"
    } else {
      kitten.mood = "Angry"
      card.style.backgroundColor = "lightblue"
      card.style.color = "black"
    }
    // Add visual effedt to kitten png
    card.className = "card kitten " + kitten.mood.toLowerCase();
    //Update card html
    const collection = card.children;
    for (let i = 0; i < collection.length; i++) {
      //Update mood text
      if (collection[i].className === "card-mood") {
        collection[i].innerHTML = kitten.mood
      }
      //Update kitten image
      else if (collection[i].className === "card-img") {
        let newImage = "kitten-" + kitten.mood.toLowerCase() + ".png"
        collection[i].src = newImage;
        console.log(collection[i])
      }
    }
  } else {
    console.log("Card is null.")
  }

  debugKitty("setKittenMood", kitten)
}

function debugKitty(fun, kitten){
  console.log(fun + " > " + kitten.name + "(" + kitten.id + ")" + ": " + kitten.mood + ", " + kitten.affection)
}

// function drawKittyMood(id, mood)

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
  loadKittens()
  drawKittens()
 // location.reload() // DELETE
}

//https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function titleCaseName(str){
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  // @ts-ignore
  document.getElementById("welcome").remove();
  loadKittens()
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}