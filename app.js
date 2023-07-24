let kittens = []

class Kitty {
  constructor(id, name, mood, affection) {
    this.id = id; 
    this.name = name;
    this.mood = mood;
    this.affection = affection;
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

  //Create an ID for the kitten
  let tempId = generateId()

  //Grab kitten name
  let kittenName = document.getElementById("kittenName").value

  //Clear form
  var frm = document.getElementById('formId');
  frm.reset();  

  let newKitten = new Kitty(tempId, kittenName, "Tolerant", 5)

  //Add kitten to array
  kittens.push(newKitten)
  console.log(kittens)

  saveKittens()
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
      kittens = JSON.parse(storageKittens)
    }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
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


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let needyKitty = findKittenById(id)
  if (Math.random() > .5) {
    needyKitty.affection += 1
  } else {
    needyKitty.affection -= 1
  }

  //Save after
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitty = findKittenById(id)
  kitty.mood = "tolerant"
  kitty.affection = 5;

  //Save after
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection > 5) {
    kitten.mood = "Happy"
  } else if (kitten.affection > 3) {
    kitten.mood = "Alright"
  } else {
    kitten.mood = "Sad"
  }
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
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

loadKittens();
