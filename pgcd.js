// Trouver le PGCD pour les entiers du tableau b 
// Trouver tous les diviseurs du PGCD
// Vérifier si le PGCD est facteur des entiers contenus dans le tableau a et b
let pgcd;
let diff;
let allResults = [];
function chooseWay(arr){
  if(arr.length > 2){
    makeAllCouplePossible(arr)
    return pgcd
  }
  else{
    return getPgcd(arr);
  }
}
function getTotalX(a, b) {
  const bCopy = b.slice();
  const PGCD = chooseWay(bCopy)
  let allDividers=[];
  let factors=[];
  if(PGCD){
    for(let i=0; i<=PGCD; i++){
      if(PGCD%i === 0){
        allDividers.push(i)
      }
    }
    const combineArray = [...a, ...b]
    combineArray.forEach(interger => {
      if(PGCD%interger === 0){
        factors.push(interger);
      }
    })
    factors = factors.filter(result => result > 0);
    const resultObj = {
      "pgcd" : PGCD,
      "dividers" : allDividers,
      "factors" : factors
    }
    console.log(
      "PGCD : ", resultObj.pgcd,
      "\nPGCD divisors :", resultObj.dividers.join(", "), 
      "\nPGCD is a factor of : ", resultObj.factors.join(', ')
    )
  }
  else{
    console.log("PGCD not found")
  }
}
getTotalX([2, 6], [24, 36])

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
function calculatePgcd(couple){
  if(couple[0] > couple[1]) {
    couple.sort((a, b) => a - b )
  }
  diff = couple[1] - couple[0];
  let isRunning = true;
  while(isRunning){
    if(diff > couple[0]){
      diff = diff - couple[0];
    }
    else{
      couple[0] = couple[0] - diff;
    }
    if(diff === couple[0]){
      allResults.push(diff)
      isRunning = false
    }
  }
}
function makeAllCouplePossible(arr){
  let couples = []
  let a;
  let b;
  let couple;
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
function returnMostFrequentValueFromArray(arr){
  let toto;
  let array = []
  arr.sort((a, b) => a - b)
  arr.forEach((element) => {
    toto = arr.reduce((acc, num) => {
      if(num === element){
        acc.count ++
      }
      return acc
    }, {count : 0, value : element});
    array.push(toto);
  })
  const result = array.find(({count}) => count === Math.max(count));
  pgcd = result.value
}