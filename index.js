var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var score = 0
var colors = [
    'black',
    'red',
    'blue',
    'yellow',
    'pink'
]
var $time = document.querySelector('#time')
var isGameStarted = false
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')




$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}





function startGame() {
    setGameTime()
    score = 0
    $gameTime.setAttribute('disabled', 'true')
    show($timeHeader)
    hide($resultHeader)

    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)
    var interval = setInterval(function () {
        var time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)


    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}


function setGameTime() {
    var time = +$gameTime.value
    $time.textContent = time.toFixed(1)
}


function endGame() {
    show($start)
    isGameStarted = false
    setGameScore()
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    show($gameTime)
    $gameTime.removeAttribute('disabled', 'true')
}



function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }



    if (event.target.dataset.box) {
        score++
        renderBox()
    }

}


function renderBox() {
    $game.innerHTML = ''
    var box = document.createElement('div')
    var boxSize = getRandom(30, 100)
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var randomColorIndex = getRandom(0, colors.length)


    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.left = '70px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', true)



    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}