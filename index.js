const randomQuetos = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quetodisplay')
const clearQuotesInput = document.getElementById('quetoinput')
const typingTimer = document.getElementById('timer')
let correct=true;
clearQuotesInput.addEventListener('input', () => {
       const arrayQuotes = quoteDisplayElement.querySelectorAll('span')
       const arrayInputValue = clearQuotesInput.value.split('')
       arrayQuotes.forEach((characterSpan, index) => {
              const character = arrayInputValue[index]
              if (character == null) {
                     characterSpan.classList.remove('correct')
                     characterSpan.classList.remove('incorrect')
                   correct=false;
              }
              else if (character === characterSpan.innerText) {
                     characterSpan.classList.add('correct')
                     characterSpan.classList.remove('incorrect')     
                   correct=true;
              }
              else {
                     characterSpan.classList.add('incorrect')
                     characterSpan.classList.remove('correct')
                     correct=false
              }
       })
       if(correct){ renderNewQuote()}
})

function getRandomQuote() {
       return fetch(randomQuetos)
              .then(response => response.json())
              .then(data => data.content)
}
async function renderNewQuote() {
       const quotes = await getRandomQuote()
       quoteDisplayElement.innerHTML = ''
       quotes.split('').forEach(character => {
              const characterSpan = document.createElement('span')
              characterSpan.innerText = character
              quoteDisplayElement.appendChild(characterSpan)

       })
       clearQuotesInput.value = null;
       startTimer()
}
let startTime
function startTimer(){
 typingTimer.innerText=0
 startTime=new Date()
 setInterval(() => {
     typingTimer.innerText= getTimerTime() 
 }, 1000);
}
function getTimerTime() {
  return  Math.round((new Date()-startTime)/1000)
}
renderNewQuote();