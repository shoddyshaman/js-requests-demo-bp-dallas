console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

const baseURL = `http://localhost:4000`

//get all characters
function getAllChars(){
  
  clearCharacters()
  axios.get(`${baseURL}/characters`)
  .then(function(res){
    //returns a promise that we are calling res
    //loop-over res and call the createCharacterCard on each element in the array
    console.log(res)
    for(let i =0;i < res.data.length;i++){
      createCharacterCard(res.data[i])
    }

  })
  .catch(error => console.log(error))
}

getAllBtn.addEventListener('click',getAllChars)

//get a single character

function getOneChar(event){
  clearCharacters()
  // console.log(event.target.id)
  axios.get(`${baseURL}/character/${event.target.id}`)
  .then(res => {
    console.log(res.data)
    createCharacterCard(res.data)
  })
  .catch(err => console.log(err))

}

//loop over node-list returned by querySelectorAll and add event listener to all
// console.log(charBtns)
for(let i = 0;i < charBtns.length;i++){
  charBtns[i].addEventListener('click',getOneChar)
}


//get characters above a certain age
function getOldChars(event){
  event.preventDefault()
  clearCharacters()
  console.log(ageInput.value)
  axios.get(`${baseURL}/character?age=${ageInput.value}`)
  .then(res => {
    // console.log(res.data)
    res.data.map(char => createCharacterCard(char))
  })
  .catch(err => console.error(err))
  //clear out input field
  ageInput.value = ''
}

ageForm.addEventListener('submit',getOldChars)


//create a new character
function createNewChar(event){
  event.preventDefault()
  clearCharacters()

  //getting the comma seperated input and turning it into an array
  let newLikes = [...newLikesText.value.split(',')]

  //create a body to send with the request
  let body = {
    firstName:newFirstInput.value,
    lastName:newLastInput.value,
    gender:newGenderDropDown.value,
    age:newAgeInput.value,
    likes:newLikes
  }
 //make a post request to server to add new character
  axios.post(`${baseURL}/character`,body)
  .then(res => {
    res.data.map(char => createCharacterCard(char))
  })
  .catch(err => console.error(err))

  //clear out the input fields for the form
  newFirstInput.value = ''
  newLastInput.value = ''
  newGenderDropDown.value = ''
  newAgeInput.value = ''
  newLikesText.value = ''
}

createForm.addEventListener('submit',createNewChar)


