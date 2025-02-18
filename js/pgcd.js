let pgcd;
let message
let diff;
let notIntegers = [];
let allResults = [];
let resultObject = {}
let countsArray=[];
let ppcmResult;

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
const historyListElements = document.getElementById('cible-history-content-list')
const btnDeleteHistory = document.querySelector(".btn-delete-list-history")

spanPgcdFactor.innerHTML = "PGCD"

window.addEventListener("load", function(){
  displayListHistory()
})

function resetAll(){
  resultObject = {}
  countsArray=[]
  ppcmResult=null
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
    storeInHistory(inputNumbersValues)
  }
  
})

function storeInHistory(userInput){
  addElementIntoLocalStorage(userInput)
  displayListHistory()
}

function displayListHistory(){
  historyListElements.innerHTML = "";
  let listHistory = JSON.parse(localStorage.getItem("history") || "[]");

  listHistory.forEach((element, index) => {
    let historyElementContainer = document.createElement("div");
    historyElementContainer.style.padding = "5px 0"
    historyElementContainer.textContent = element

    let btnDeleteHistory = document.createElement("button");
    btnDeleteHistory.style.border = "none"
    btnDeleteHistory.style.paddingLeft = "8px"
    btnDeleteHistory.textContent = "❌";
    btnDeleteHistory.onclick = () => removeHistoryElement(index)

    historyListElements.appendChild(historyElementContainer);
    historyElementContainer.appendChild(btnDeleteHistory)
  })
}

function addElementIntoLocalStorage(element){
  let listHistory = JSON.parse(localStorage.getItem('history') || '[]');
  listHistory.push(element);
  localStorage.setItem("history", JSON.stringify(listHistory))
  displayListHistory()
}

function removeHistoryElement(index){
  let listHistory = JSON.parse(localStorage.getItem("history") || "[]");
  listHistory.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(listHistory))
  displayListHistory()
}

function clearAllListHistory(){
  btnDeleteHistory.addEventListener('click', function(){
    localStorage.removeItem('history');
    displayListHistory()
  })
}
clearAllListHistory()

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

function makeAllCouplePossible(arr) {
  
  if (integersIsEqual(arr)) {
      pgcd = arr[0];
      return;
  }

  let couples = arr.flatMap(a => arr.map(b => [a, b]));

  getPgcd(couples);
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

function calculPpcm(inputValues, pgcd){
  let array = inputValues.split(',');
  if(array.length > 2){
    getObjectPrimeFactorsArrays(array)
    return ppcmResult
  }
  else{
    ppcmResult = array.reduce((acc, value) => {
      return (acc * value) / pgcd
    })
    return ppcmResult;
  }
}

function getObjectPrimeFactorsArrays(arr){
  if(arr.length===0 && !Array.isArray(arr)){
    return false;
  }
  arr.forEach(element => {
      resultObject[element] = factoriser(element);
countOccurence(resultObject[element]) 
  })
}


function countOccurence(arr){
  if(arr.length===0 && !Array.isArray(arr)){
    return false;
  }
  const count = arr.reduce((acc, value) => {
      acc[value] = (acc[value] || 0)+1
      return acc
  }, {})
  flattenObjectArray(count)
}

function flattenObjectArray(count){
  countsArray.push(count);
  const transformedArray = countsArray.flatMap(obj =>
  Object.entries(obj).map(([key, value]) => ({ [key]: value }))
  );
  removeDuplicatesWithLowerValues(transformedArray)
}

function removeDuplicatesWithLowerValues(arr){
  if(arr.length===0 && !Array.isArray(arr)){
    return false;
  }

  const maxValues = {};
  
  arr.forEach(obj => {
      for (let key in obj) {
          maxValues[key] = Math.max(maxValues[key] || 0, obj[key]);
      }
  });

  const resultLowerValues =  arr.filter(obj => {
      return Object.entries(obj).every(([key, value]) => value === maxValues[key]);
  });
  
  lcm_of_multiple_numbers(resultLowerValues);
}

function lcm_of_multiple_numbers(arr){
  if(arr.length===0 && !Array.isArray(arr)){
    return false;
  }

  let numbers=[];

  arr.forEach(object => {
    for(let key in object){
      const result = Math.pow(key, object[key]);
      numbers.push(result)
    }
  })

  const finalResultPpcm = numbers.reduce((acc, value) => {
    return acc * value;
  })

  ppcmResult = finalResultPpcm
}

function factoriser(n){
  if(!n){
      console.log(false)
      return false;
  }
  let factors = [];
  while(n%2===0){
      factors.push(2);
      n = n / 2
  }
  let d = 3;
  while(d <= Math.sqrt(n)){
      while(n%d===0){
          factors.push(d)
          n = n / d
      }
      if(d){d+=2}
  }
  if(n > 1){
      factors.push(n)
  }
  return factors
}