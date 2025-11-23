let allResults = [];
let diff;
let pgcd
let resultSimplication

const numeratorInput = document.getElementById("numerator");
const denominatorInput = document.getElementById("denominator")
const simplicationSubmit = document.querySelector(".btn-submit-fraction");
const messageError = document.querySelector('.message-error')
const resultNumerator = document.getElementById("result-numerator")
const resultDenominator = document.getElementById("result-denominator")
const resultCard = document.getElementById('result');

function resetAll(){
  pgcd=null
  diff=null
  allResults = [];
  resultSimplication=null
  message="";
  handleMessage('');
  resultCard.classList.remove('show');
}

function handleMessage(message){
  return messageError.innerHTML = message
}

simplicationSubmit.addEventListener('click', function (e){
    e.preventDefault()

    resetAll()

    let numeratorInputValue = numeratorInput.value
    let denominatorInputValue = denominatorInput.value

    if(!numeratorInputValue || !denominatorInputValue){
      resultCard.classList.remove('show');
      return handleMessage("Tous les champs doivent être complétés")
    }

    let regex = /^\d+$/;
    if(!regex.test(numeratorInputValue) || !regex.test(denominatorInputValue)){
      resultCard.classList.remove('show');
      return handleMessage("Le format est invalide")
    }
    else{
        let intNumerator = Number(numeratorInputValue)
        let intDenominateur = Number(denominatorInputValue)

        simplifyingFraction(intNumerator, intDenominateur)
    }
})

function simplifyingFraction(a, b){

    if (a == null || b == null) return false

    if(isNaN(a) && isNaN(b)) return false

    if (b === 0){
      console.log("Hello")
      resultCard.classList.remove('show');
      return handleMessage("Le dénominateur ne peut pas être zéro")
    }

    if(a === b){
      resultNumerator.innerHTML=1
      resultDenominator.innerHTML=1
      resultCard.classList.add("show", "success")
      return false
    }

    const intValueArray = [a, b]

    calculatePgcd(intValueArray)

    if(allResults[0]){
        pgcd = allResults[0]

        const numeratorDivisionResult = a / pgcd
        const denominatorDivisionResult = b / pgcd

        resultNumerator.innerHTML=numeratorDivisionResult
        resultDenominator.innerHTML=denominatorDivisionResult
        
        resultCard.classList.add("show", "success")
    }
}

function calculatePgcd(couple){
  if(couple[0] > couple[1]) {
    couple = couple.sort((a, b) => a - b )
    calculatePgcd(couple)
  }
  else{
    diff = couple[1] - couple[0];
    let isRunning = true;
    while(isRunning){
      if(diff > couple[0]){
        diff = diff - couple[0];
      }
      if(diff < couple[0]){
        couple[0] = couple[0] - diff;
      }
      if(diff === couple[0]){
        allResults.push(diff)
        isRunning = false
      }
    }
  }
}