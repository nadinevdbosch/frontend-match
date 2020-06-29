//script voor de stepprogressbar bij de questions
const bar = document.querySelector('.container');
const questions = [...document.querySelectorAll('.question')];
const bullets = [...document.querySelectorAll('.bullet')];
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
    currentBullet.classList.add('completed');
    currentStep++;
    previousButton.disabled = false;

    if(currentStep === 10) {
        nextButton.disabled = true;
        finishButton.classList.remove('hidden');
    }

    for(i = 0 ; i < questions.length ; i++){
        if(questions[i].classList.contains('active')) {
            questions[i].classList.remove('active')
        }
    }

    for(i = 0 ; i < bullets.length ; i++){
        if(bullets[i].classList.contains('current_step')) {
            bullets[i].classList.remove('current_step')
        }
    }

    questions[currentStep - 1].classList.add('active');
    bullets[currentStep - 1].classList.add('current_step');
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



