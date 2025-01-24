let pgcd;
let message
let diff;
let notIntegers = [];
let allResults = [];

const resultPgcd = document.querySelector(".result-content-pgcd");
const resultDivisors = document.querySelector(".result-content-divisors");
const resultFactor = document.querySelector(".result-content-factors");
const inputNumbers = document.querySelector(".input-numbers");
const inputFactors = document.querySelector(".input-factor");
const btnSubmit = document.querySelector(".btn-submit-pgcd");
const messageUser = document.querySelector(".message-user");

function resetAll(){
  pgcd=null
  message="";
  diff=null
  notIntegers = [];
  allResults = [];
}

function handleMessage(message){
  return messageUser.innerHTML = message
}

btnSubmit.addEventListener('click', function(e){
  e.preventDefault()

  resetAll()

  let inputNumbersValues = inputNumbers.value;
  let inputFactorsValues = inputFactors.value;
  let numbers;
  let factors;

  let regex = /\d+(,\d+(\.\d+)?)*/;
  //let regex = /^([0-9]+(,[0-9]+)+)$/is;

  if(inputNumbersValues){ 
    regex.test(inputNumbersValues) ? numbers = inputNumbersValues.split(',') : handleMessage("Le format ne correspond pas");
  }
  else{
    console.log("Ce champ doit être complété");
    return handleMessage("Ce champ doit être complété")
  }

  if(inputFactors.type === "text"){
    if(inputFactors){
      regex.test(inputFactorsValues) ? factors = inputFactorsValues.split(',') : handleMessage("Le format ne correspond pas");
      console.log(factors)
    }
    else{
      console.log("Ce champ doit être complété");
      return handleMessage("Ce champ doit être complété")
    }
  }

  if(numbers){
    const intNumbers = numbers.map(Number);
    const intFactor = factors ? factors.map(Number) : []
    console.log(intFactor, intNumbers)
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
  let arrayFactors = []
  if(a && a.length > 0){
    a.forEach(interger => {
      if(PGCD%interger === 0){
        arrayFactors.push(interger);
      }
    })
    message = `${PGCD} is not factor of ${ a.length > 1 ? "integers" : "integer"} : ${a.join(', ')}`
    return arrayFactors.length > 0 ? arrayFactors : message;
  }
  else{
    message = `No integers have been entered`
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
  message = `No common divisors have been found for ${PGCD}`
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
      const PGCD = chooseWay(bCopy)
      console.log(PGCD)
      if(PGCD){
        const factors = getPgcdFactor(PGCD, a);
        const divisors = getPgcdDivisors(PGCD)
        const resultObj = {
          "pgcd" : PGCD,
          "divisors" : Array.isArray(divisors) ? divisors.join(', ') : divisors,
          "factors" : Array.isArray(factors) ? factors.join(', ') : factors
        }
        console.log(
          "PGCD : ", resultObj.pgcd,
          "\nPGCD divisors :", resultObj.divisors, 
          "\nPGCD is factor of : ", resultObj.factors
        )
        resultPgcd.innerHTML = resultObj.pgcd
        resultDivisors.innerHTML = resultObj.divisors
        resultFactor.innerHTML = resultObj.factors
      }
      else{
        console.log("Oops :( An error occurred when calculating the PGCD")
        handleMessage("Oops :( An error occurred when calculating the PGCD")
      }
    }
    else{
      console.log("The number of integers must be between 1 and 3 : ]1, 3]");
      handleMessage("The number of integers must be between 1 and 3 : ]1, 3]")
    }
  }
  else{
    console.log(`Oups ! "${notIntegers.join(", ")}" ${notIntegers.length > 1 ? "are not integers !" : "is not a whole number !"}`);
    handleMessage(`Oups ! "${notIntegers.join(", ")}" ${notIntegers.length > 1 ? "are not integers !" : "is not a whole number !"}`)
  }
}
//displayResult([2, 10], [11, 24, 36])

function getPgcd(couples){
  if(couples.length === 0){
    console.log(false)
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
      console.log("5")
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
