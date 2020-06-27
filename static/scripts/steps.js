//script voor de stepprogressbar bij de questions
const bullets = [...document.querySelectorAll('.bullet')];
const bar = document.querySelector('.container');
const questions = [...document.querySelectorAll('.question')];
const previousButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')
const finishButton = document.querySelector('.finish')

let currentStep = 1;

bar.classList.remove('hidden');
previousButton.classList.remove('hidden')
nextButton.classList.remove('hidden')
finishButton.classList.add('hidden')

for(i = 0 ; i < questions.length ; i++){
    if(!questions[i].classList.contains('display-none')) {
        questions[i].classList.add('display-none')
    }
}


nextButton.addEventListener('click', () => {
    const currentBullet = bullets[currentStep - 1];
    console.log(currentStep)
    currentBullet.classList.add('completed');
    currentStep++;
    previousButton.disabled = false;

    if(currentStep === 10) {
        nextButton.disabled = true;
        finishButton.classList.remove('hidden');
    }

    for(i = 0 ; i < bullets.length ; i++){
        if(questions[i].classList.contains('active')) {
            questions[i].classList.remove('active')
        }
    }

    questions[currentStep - 1].classList.add('active');
})

previousButton.addEventListener('click', () => {
    const previousBullet = bullets[currentStep - 2];
    previousBullet.classList.remove('completed');
    currentStep-- ;
    nextButton.disabled = false;
    finishButton.classList.add('hidden');

    if (currentStep === 1){
        previousButton.disabled = true;
    }

    for(i = 0 ; i < bullets.length ; i++){
        if(questions[i].classList.contains('active')) {
            questions[i].classList.remove('active')
        }
    }

    questions[currentStep - 1].classList.add('active');
})




// function showSteps() {

// bar.classList.remove('hidden');

//     for (i = 0; i < 11; i++) {
//         // de array begint bij 0, maar de stappen beginnen bij 1
//         let = currentBullet = i+1;
//         console.log("i=" + i);
//         console.log(currentBullet);
//         if( currentBullet < currentStep) {
//             console.log(currentBullet + " is lager dan " + currentStep);
//             bullets[i].classList.add('completed');
//         }
//         if(currentBullet == currentStep) {
//             bullets[i].classList.add('current_step');
//         }else{
//             console.log(currentBullet + " is niet lager dan of gelijk aan " + currentStep)
//         }
//       }

// }

// showSteps();
