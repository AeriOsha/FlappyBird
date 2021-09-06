
  
document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')
    
    
    let scoreLabel = document.querySelector('.scoreLabel')
    let modal = document.getElementById('modal');
    let span = document.getElementsByClassName("close")[0];

    let wingSound = new Audio('wingSoundEffect.mp3')
    let dieSound = new Audio('dieSoundEffect.mp3')
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430

    let scoreLabelData ={
        score: 0,
        text: "Score: "

    }
    function resetScoreLabel(){
        scoreLabel.innerHTML = scoreLabelData.text + scoreLabelData.score
        scoreLabelData.score=0
    }
    resetScoreLabel()
    function addScore(points){
        scoreLabelData.score += points
        scoreLabel.innerHTML = scoreLabelData.text + scoreLabelData.score
    }
    
    //this function is the gravity 
    function startGame() {

                birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    //this sets a 20ms delay and then calls our gravity function again
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
            wingSound.play()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)


    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                addScore(1)
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
               
                
           }
           
            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
               (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
               ) {
                dieSound.play()
                gameOver()
               clearInterval(timerId)
           }
        }
        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)
        

    }
    generateObstacle()

function gameOver() {
        showModal()
        clearInterval(gameTimerId)
        console.log('game over')
        isGameOver = true
        document.removeEventListener('keyup', control)
        

    }

function showModal() {
  modal.style.display = "block";
  }


span.onclick = function() {
  modal.style.display = "none";

  location.reload();
}



})
