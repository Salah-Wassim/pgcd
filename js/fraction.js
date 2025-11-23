let allResults = [];
let diff;
let pgcd
let resultSimplication

const numeratorInput = document.getElementById("numerator");
const denominatorInput = document.getElementById("denominator")
const simplicationSubmit = document.querySelector(".btn-submit-fraction");
const messageError = document.querySelector('.message-error')
const result = document.getElementById("result")

function resetAll(){
  pgcd=null
  diff=null
  allResults = [];
  resultSimplication=null
  message="";
  handleMessage('');
  
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
        return handleMessage("Tous les champs doivent être complétés")
    }

    let regex = /^\d+$/;
    if(!regex.test(numeratorInputValue) || !regex.test(denominatorInputValue)){
        return handleMessage("Le format est invalide")
    }
    else{
        let intNumerator = Number(numeratorInputValue)
        let intDenominateur = Number(denominatorInputValue)

        simplifyingFraction(intNumerator, intDenominateur)
    }
})

function simplifyingFraction(a, b){

    if (!a || !b) return false

    if(isNaN(a) && isNaN(b)) return false

    if(a === b){
        resultSimplication="1"
        return result.innerHTML = resultSimplication
    }

    const intValueArray = [a, b]

    calculatePgcd(intValueArray)

    if(allResults[0]){
        pgcd = allResults[0]

        // console.log("pgcd", pgcd)

        const numeratorDivisionResult = a / pgcd
        const denominatorDivisionResult = b / pgcd

        // console.log("numeratorResult : ", numeratorDivisionResult)
        // console.log("denominatorResult : ", denominatorDivisionResult)

        resultSimplication = `${numeratorDivisionResult} / ${denominatorDivisionResult}`
        return result.innerHTML = resultSimplication
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