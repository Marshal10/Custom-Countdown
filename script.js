const inputContainer=document.getElementById('input-container')
const countdownContainer=document.getElementById('countdown')
const completeContainer=document.getElementById('complete')
const formEl=document.getElementById('countdownForm')
const dateEl=document.getElementById('inputDate')

const userCountdownTitle=document.getElementById('countdown-title')
const timeElements=document.querySelectorAll('span')


let countdownTitle=''
let countdownDate=''
let countdownValue=Date
let countdownInterval;

const second =1000
const minute=second * 60
const hour=minute * 60
const day=hour * 24

const today=new Date().toISOString().split("T")[0]
dateEl.setAttribute('min',today)

console.log(today)

function updateDom(){
    countdownInterval=setInterval(()=>{
        const now=new Date().getTime()
        const distance=countdownValue-now

        const days=Math.floor(distance/day)
        const hours=Math.floor((distance % day)/hour)
        const minutes=Math.floor((distance % hour)/minute)
        const seconds=Math.floor((distance % minute)/second)
        
        timeElements[0].textContent=days
        timeElements[1].textContent=hours
        timeElements[2].textContent=minutes
        timeElements[3].textContent=seconds

        userCountdownTitle.textContent=countdownTitle
        inputContainer.hidden=true
        countdownContainer.hidden=false
    },1000)
}

function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value

    countdownValue=new Date(countdownDate).getTime()
    console.log(countdownValue)
    updateDom()
}

formEl.addEventListener('submit',updateCountdown)