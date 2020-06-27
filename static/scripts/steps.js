//script voor de stepprogressbar bij de questions

const bullets = [...document.querySelectorAll('.bullet')];
const bar = document.querySelector('.container');
const params = new URLSearchParams(window.location.search);
const currentStep = params.get('question');



function showSteps() {

bar.classList.remove('hidden');

    for (i = 0; i < 11; i++) {
        // de array begint bij 0, maar de stappen beginnen bij 1
        let = currentBullet = i+1;
        console.log("i=" + i);
        console.log(currentBullet);
        if( currentBullet < currentStep) {
            console.log(currentBullet + " is lager dan " + currentStep);
            bullets[i].classList.add('completed');
        }
        if(currentBullet == currentStep) {
            bullets[i].classList.add('current_step');
        }else{
            console.log(currentBullet + " is niet lager dan of gelijk aan " + currentStep)
        }
      }

}

showSteps();
