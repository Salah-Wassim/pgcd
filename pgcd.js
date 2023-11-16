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

function getPgcdFactor(PGCD, a){
  let arrayFactors = []
  let message
  if(a && a.length > 0){
    a.forEach(interger => {
      if(PGCD%interger === 0){
        arrayFactors.push(interger);
      }
    })
    message = `${PGCD} is not factor of integers : ${a.join(', ')}`
    return arrayFactors.length > 0 ? arrayFactors : message
  }
  else{
    message = `No integers have been entered`
    return message
  }
}

function getTotalX(a, b) {
  if(b && b.length > 1 && b.length <= 3){
    const bCopy = b.slice();
    const PGCD = chooseWay(bCopy)
    let allDividers=[];
    if(PGCD){
      for(let i=0; i<=PGCD; i++){
        if(PGCD%i === 0){
          allDividers.push(i)
        }
      }
      const factors = getPgcdFactor(PGCD, a);
      const resultObj = {
        "pgcd" : PGCD,
        "dividers" : allDividers,
        "factors" : Array.isArray(factors) ? factors.join(', ') : factors
      }
      console.log(
        "PGCD : ", resultObj.pgcd,
        "\nPGCD divisors :", resultObj.dividers.join(", "), 
        "\nPGCD is factor of : ", resultObj.factors
      )
    }
    else{
      console.log("Oups :( Une erreur s'est produite lors du calcul du PGCD")
    }
  }
  else{
    console.log("Le nombre d'entier doit-être compris entre 1 et 3 : ]1, 3]")
  }
}
getTotalX([20, 18], [12, 24, 36])

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
    if(diff < couple[0]){
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
