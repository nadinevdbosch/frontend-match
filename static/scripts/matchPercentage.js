//Hier wordt gekeken hoeveel procent je een match bent

const matches = [...document.querySelectorAll('.match-berekening p')];
const heart = [...document.querySelectorAll('.match-berekening img')];

console.log(matches[0].innerText)

for (i = 0; i < matches.length; i++) {
let matchPercentage = matches[i].innerText
console.log('is ' + matchPercentage + ' gelijk aan 10%?')
    if( matchPercentage == '0%') {
      heart[i].classList.add('nul-procent')
    }
    if( matchPercentage == '10%') {
        heart[i].classList.add('tien-procent')
    }
    if( matchPercentage == '20%') {
        heart[i].classList.add('twintig-procent')
    }
    if( matchPercentage == '30%') {
        heart[i].classList.add('dertig-procent')
    }
    if( matchPercentage == '40%') {
        heart[i].classList.add('veertig-procent')
    }
    if( matchPercentage == '50%') {
        heart[i].classList.add('vijftig-procent')
    }
    if( matchPercentage == '60%') {
        heart[i].classList.add('zestig-procent')
    }
    if( matchPercentage == '70%') {
        heart[i].classList.add('zeventig-procent')
    }
    if( matchPercentage == '80%') {
        heart[i].classList.add('tachtig-procent')
    }
    if( matchPercentage == '90%') {
        heart[i].classList.add('negentig-procent')
    }
    if( matchPercentage == '100%') {
        heart[i].classList.add('honderd-procent')
    }else{
        console.log('het werkt niet')
    }
}



