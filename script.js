const inputContainer=document.getElementById('input-container')
const countdownContainer=document.getElementById('countdown')
const completeContainer=document.getElementById('complete')
const formEl=document.getElementById('countdownForm')
const dateEl=document.getElementById('inputDate')

const userCountdownTitle=document.getElementById('countdown-title')
const timeElements=document.querySelectorAll('span')
const resetBtn=document.getElementById('reset')

const completeInfo=document.getElementById('complete-info')
const newCountdownBtn=document.getElementById('new-countdown')


let countdownTitle=''
let countdownDate=''
let countdownValue=Date
let countdownInterval;
let savedCountdown;

const second =1000
const minute=second * 60
const hour=minute * 60
const day=hour * 24

const today=new Date().toISOString().split("T")[0]
dateEl.setAttribute('min',today)

function updateDom(){
    countdownInterval=setInterval(()=>{
        const now=new Date().getTime()
        const distance=countdownValue-now
        inputContainer.hidden=true
        if(distance<0){
            clearInterval(countdownInterval)
            completeInfo.textContent=`${countdownTitle} finished on ${countdownDate}`
            inputContainer.hidden=true
            countdownContainer.hidden=true
            completeContainer.hidden=false
        }else{
            const days=Math.floor(distance/day)
            const hours=Math.floor((distance % day)/hour)
            const minutes=Math.floor((distance % hour)/minute)
            const seconds=Math.floor((distance % minute)/second)
            
            timeElements[0].textContent=days
            timeElements[1].textContent=hours
            timeElements[2].textContent=minutes
            timeElements[3].textContent=seconds
    
            userCountdownTitle.textContent=countdownTitle
            countdownContainer.hidden=false
            completeContainer.hidden=true
        }
    },second)
}

function updateCountdown(e){
    e.preventDefault()
    countdownTitle=e.srcElement[0].value
    countdownDate=e.srcElement[1].value
    savedCountdown={
        title:countdownTitle,
        date:countdownDate
    }
    localStorage.setItem("countdown",JSON.stringify(savedCountdown))
    countdownValue=new Date(countdownDate).getTime()
    updateDom()
}

function reset(){
    inputContainer.hidden=false
    countdownContainer.hidden=true
    completeContainer.hidden=true

    clearInterval(countdownInterval)
    countdownTitle=''
    countdownDate=''
    localStorage.removeItem("countdown")
}

function restorePreviousCountdown(){
    if(localStorage.getItem("countdown")){
        inputContainer.hidden=true
        savedCountdown=JSON.parse(localStorage.getItem("countdown"))
        countdownTitle=savedCountdown.title
        countdownDate=savedCountdown.date
        countdownValue=new Date(countdownDate).getTime()
        updateDom()
    }
}

formEl.addEventListener('submit',updateCountdown)
resetBtn.addEventListener('click',reset)
newCountdownBtn.addEventListener('click',reset)

restorePreviousCountdown()