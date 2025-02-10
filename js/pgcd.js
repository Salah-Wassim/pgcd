let pgcd;
let message
let diff;
let notIntegers = [];
let allResults = [];

const resultPgcd = document.querySelector(".result-content-pgcd");
const resultDivisors = document.querySelector(".result-content-divisors");
const resultFactor = document.querySelector(".result-content-factors");
const resultPpcm = document.querySelector(".result-content-ppcm");
const inputNumbers = document.querySelector(".input-numbers");
const inputFactors = document.querySelector(".input-factor");
const btnSubmit = document.querySelector(".btn-submit-pgcd");
const messageUser = document.querySelector(".message-user");
const spanPgcdFactor = document.querySelector(".span-result-content-pgcd-factor");
const spanUserInputs = document.querySelectorAll(".span-intergers-user-input");

spanPgcdFactor.innerHTML = "PGCD"

function resetAll(){
  pgcd=null
  message="";
  diff=null
  notIntegers = [];
  allResults = [];
  handleMessage('');
}

function handleMessage(message){
  return messageUser.innerHTML = message
}

function useRegexFactors(input){
  let regexPattern1 = /([0-9]+(,[0-9]+)+)$/is;
  let regexPattern2 = /[0-9]+/is;
  
  const regex = input.includes(",") ? regexPattern1 : regexPattern2;

  return regex.test(input);
}

btnSubmit.addEventListener('click', function(e){
  e.preventDefault()

  resetAll()

  let inputNumbersValues = inputNumbers.value;
  let inputFactorsValues = inputFactors.value;
  let numbers;
  let factors;

  //let regexFactor = /\d+(,\d+(\.\d+)?)*/;
  let regex = /^([0-9]+(,[0-9]+)+)$/is;

  if(inputNumbersValues){ 
    regex.test(inputNumbersValues) ? numbers = inputNumbersValues.split(',') : handleMessage("Le format ne correspond pas");
  }
  else{
    return handleMessage("Ce champ doit être complété")
  }

  if(inputFactors.type === "text"){
    if(inputFactorsValues){
      useRegexFactors(inputFactorsValues) ? factors = inputFactorsValues.split(',') : handleMessage("Le format ne correspond pas");
    }
    else{
      return handleMessage("Ce champ doit être complété")
    }
  }

  if(numbers){
    const intNumbers = numbers.map(Number);
    const intFactor = factors ? factors.map(Number) : []
    displayResult(intFactor, intNumbers)
  }
  
})

function chooseWay(arr){
  if(arr.length > 2){
    makeAllCouplePossible(arr)
    return pgcd
  }
  else{
    getPgcd(arr);
    pgcd = allResults[0]
    return pgcd
  }
}

function getPgcdFactor(PGCD, a){
  let arrayFactors = [];
  let moduloEquation;
  if(a && a.length > 0){
    a.forEach(interger => {
      moduloEquation = interger > PGCD ? interger%PGCD : PGCD%interger;
      if(moduloEquation === 0){
        arrayFactors.push(interger);
      }
    })
    message = `${PGCD} n'est pas facteur ${ a.length > 1 ? " des entiers" : "de l'entier"} : ${a.join(', ')}`
    return arrayFactors.length > 0 ? arrayFactors : message;
  }
  else{
    message = `Aucun entier n'a été saisi`
    return message
  }
}

function getPgcdDivisors(PGCD){
  let arrayDivisors=[];
  for(let i=0; i<=PGCD; i++){
    if(PGCD%i === 0){
      arrayDivisors.push(i)
    }
  }
  message = `Aucun diviseur commun n'a été trouvé pour ${PGCD}`
  return arrayDivisors.length > 0 ? arrayDivisors : handleMessage(message)
}

function verifyIntegersInArray(a, b) {
  const combineArray = [...a, ...b];
  let hasNonInteger = false;
  combineArray.forEach((value) => {
    if (isNaN(value) || !Number.isInteger(value)) {
      notIntegers.push(value);
      hasNonInteger = true;
    }
  });
  return !hasNonInteger;
}

function displayResult(a, b) {
  if(verifyIntegersInArray(a, b)){
    if(b && b.length > 1 && b.length <= 3){
      const bCopy = b.slice();
      const PGCD = chooseWay(bCopy);
      if(PGCD){
        const factors = getPgcdFactor(PGCD, a);
        const divisors = getPgcdDivisors(PGCD);
        const ppcm = calculPpcm(inputNumbers.value, PGCD)
        const resultObj = {
          "pgcd" : PGCD,
          "divisors" : Array.isArray(divisors) ? divisors.join(', ') : divisors,
          "ppcm" : ppcm,
          "factors" : Array.isArray(factors) ? factors.join(', ') : factors
        }
        console.log(
          "PGCD : ", resultObj.pgcd,
          "\nCommon dividers :", resultObj.divisors, 
          "\nPPCM :", resultObj.ppcm,
          "\nPGCD is factor of : ", resultObj.factors
        )
        spanUserInputs.forEach(spanUserInput => {
          spanUserInput.innerHTML = inputNumbers.value.split(', ')
        })
        resultPgcd.innerHTML = resultObj.pgcd
        resultDivisors.innerHTML = resultObj.divisors
        resultPpcm.innerHTML = resultObj.ppcm
        resultFactor.innerHTML = resultObj.factors
        spanPgcdFactor.innerHTML = resultObj.pgcd
      }
      else{
        handleMessage("Oops :( Une erreur s'est produite lors du calcul du PGCD.")
      }
    }
    else{
      handleMessage("Le nombre d'entiers doit être compris entre 1 et 3 : ]1, 3]")
    }
  }
  else{
    handleMessage(`Oups ! "${notIntegers.join(", ")}" ${notIntegers.length > 1 ? "ne sont pas des entiers !" : "n'est pas un nombre entier !"}`)
  }
}
//displayResult([2, 10], [11, 24, 36])

function getPgcd(couples){
  if(couples.length === 0){
    return false;
  }
  if(couples.length > 2){
    couples.forEach(couple => {
      calculatePgcd(couple)
    })
  }
  else{
    calculatePgcd(couples)
  }
  if(allResults.length === 1){
    return allResults[0] || []
  }
  else{
    returnMostFrequentValueFromArray(allResults)
  }
}

function integersIsEqual(couple){
  const isEqual = couple.reduce((acc, num) => {
    if(acc === num){
      return true
    }
    return false
  })
  return isEqual
}

function calculatePgcd(couple){
  if(couple[0] > couple[1]) {
    couple.sort((a, b) => a - b )
  }
  if(integersIsEqual(couple)){
    allResults.push(couple[0])
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

function calculPpcm(inputValues, pgcd){
  let array = inputValues.split(',');
  let ppcmResult;
  if(array.length > 2){
    ppcmResult = "Non fonctionnel"
    return ppcmResult
  }
  else{
    ppcmResult = array.reduce((acc, value) => {
      return (acc * value) / pgcd
    })
    return ppcmResult;
  }
}

function makeAllCouplePossible(arr){
  let couples = []
  let a;
  let b;
  let couple;
  if(!integersIsEqual(arr)){
    arr.forEach(element => {
      for(let i=0; i<arr.length; i++){
        a = element;
        b = arr[i]
        if(a !== b){
          couple = [a, b];
          couples.push(couple)
        }
      }
    })
    getPgcd(couples)
  }
  else{
    pgcd = arr[0]
  }
}

function returnMostFrequentValueFromArray(arr){
  if(arr.length === 0){
    return false
  }

  const counts = arr.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  let maxCount = 0;
  let mostFrequentValue = null;

  for(const [value, count] of Object.entries(counts)){
    if(count > maxCount){
      maxCount = count;
      mostFrequentValue = value
    }
  }
  
  pgcd = mostFrequentValue
}
