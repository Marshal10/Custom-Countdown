const inputContainer=document.getElementById('input-container')
const countdownContainer=document.getElementById('countdown')
const completeContainer=document.getElementById('complete')
const formEl=document.getElementById('countdownForm')
const dateEl=document.getElementById('inputDate')

let countdownTitle=''
let countdownDate=''
const today=new Date().toISOString().split("T")[0]
dateEl.setAttribute('min',today)

console.log(today)

function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value
    console.log(countdownTitle,countdownDate)
}

formEl.addEventListener('submit',updateCountdown)