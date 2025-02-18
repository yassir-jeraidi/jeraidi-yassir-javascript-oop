// Exercice 1
const degreC = (tempF) => {
    const tempC = (5 / 9) * (tempF - 32)
    console.log(`cette température équivaut a ${tempC.toFixed(1)} degrés Celsius `)
}

degreC(60.0)

// Exercice 2

const hjms = (seconds) => {
    const days = Math.floor(seconds / 86400)
    seconds = seconds % 86400
    const hours = Math.floor(seconds / 3600)
    seconds = seconds % 3600
    const minutes = Math.floor(seconds / 60)
    const secondes = seconds % 60
    const withS = (x, prefix) => x !== 0 ? (x > 1 ? `${x} ${prefix}s,` : `${x} ${prefix},`) : ''
    console.log(`cette durée équivaut à ${withS(days, 'jour')} ${withS(hours, 'hour')} ${withS(minutes, 'minute')} ${withS(secondes, 'second')}`)
}

hjms(3621)
hjms(567231)

// Exercice 3

const numbers = []
const sortedNumbers = []
numbers[0] = +prompt('1er nombre  : ')
numbers[1] = +prompt('2ème nombre : ')
numbers[2] = +prompt('3ème nombre : ')

const sort = () => {
    for (let i = 0; i < 3; i++) {
        let min = numbers[0]
        let index = 0
        for (let j = 1; j < 3; j++) {
            if (numbers[j] < min) {
                min = numbers[j]
                index = j
            }
        }
        sortedNumbers[i] = min
        numbers[index] = Number.MAX_VALUE
    }
    return sortedNumbers
}

console.log(sort())

// Exercice 4

let taille = +prompt("Un motif de taille = ")
for (let i = 1; i <= taille; i++) {
    console.log('*'.repeat(i))
}

// Exercice 4 bis
taille *= 2
for (let i = 1; i <= taille; i = i + 2) {
    console.log(' '.repeat((taille - i)) + ' *'.repeat(i))
}


// Exercice 5

let value = +prompt("Nombre = ")

const premier = (number) => {
    for (let i = 2; i <= (number / 2); i++) {
        if (number % i === 0) {
            return false
        }
    }
    return number > 1
}

console.log(premier(value))


// Exercice 7

const nFibo1 = +prompt("Entrez la valeur de n : ")
const fibo1 = (number) => {
    if (n <= 0) return 0
    if (n === 1) return 1
    let a = 0, b = 1, temp;
    for (let i = 2; i <= number; i++) {
        temp = a + b
        a = b
        b = temp
    }
    return b
}


console.log(`Le ${nFibo1} terme de suite de Fibonnaci est : ${fibo1(nFibo1)}`)

const n = +prompt("Entrez la valeur de n : ")
const fibo2 = (number) => {
    let a = 0 , b = 1 , temp , index=1
    while (b <= number){
        temp = a+b
        a=b
        b=temp
        index++
    }
    return {term : b , rank : index}
}

console.log(`Le premier terme de la suite de Fibonnaci superieur a ${n} est ${fibo2(n).term} a la position ${fibo2(n).rank}`)

// Exercice 7
const number = +prompt("Pour un nombre A entre 1 et 100 : ")
function Raca1(A) {
    if (A < 1 || A > 100) {
        console.log("Valeur de A invalide.");
        return;
    }
    let un = A / 2; 
    while (Math.abs(un * un - A) >= 1e-5) {
        un = 0.5 * (un + A/un);
    }
    
    console.log("Pour un nombre A entre 1 et 100:", A);
    console.log("Valeur approchée de la racine carrée =", un);
    return un;
}

Raca1(number); 

