const gameboard = document.querySelector("#gameboard")
const currentScoreElement = document.querySelector("#current-score")
const highScoreElement = document.querySelector("#high-score")
const container = document.getElementsByClassName("container")
const startBtn = document.querySelector("#start-btn")
const restartBtn = document.querySelector("#restart-btn")
const borders = document.getElementsByClassName("border")
const width = 10
let boardPositions = []
let snake = [2,1,0]
let appleIndex
let score = 0
let highScore = 0
let intervalTime = 0
let timerId = 0
let speed = 0.9

function createGameboard() {
	for (let i = 0; i < width * width; i++) {
		let square = document.createElement("div")
		square.classList.add("square")
		gameboard.appendChild(square)
		boardPositions.push(square)
	}
}

function colorRed() {
		document.body.style.color = "red"
		gameboard.style.border = "8px solid red"
		startBtn.style.border = "8px solid red"
		restartBtn.style.border = "8px solid red"
}

function colorWhite() {
		document.body.style.color = "white"
		gameboard.style.border = "8px solid white"
		startBtn.style.border = "8px solid white"
		restartBtn.style.border = "8px solid white"
}

function generateApple() {
	let apple = document.createElement("div")
	apple.innerHTML = "🍎"
	do {
		appleIndex = Math.floor(Math.random() * boardPositions.length)
	} while (boardPositions[appleIndex].classList.contains("snake"))
	boardPositions[appleIndex].classList.add("apple")
	boardPositions[appleIndex].appendChild(apple)
}




function control(e) {
	if (e.key === "ArrowRight") {
		direction = 1
	} else if (e.key === "ArrowUp") {
		direction = -width
	} else if (e.key === "ArrowLeft") {
		direction = -1
	} else if (e.key === "ArrowDown") {
		direction = +width
	}
}

function move() {
	if (
		(snake[0] + width >= width * width && direction === width) ||
		(snake[0] % width === width - 1 && direction === 1) ||
		(snake[0] % width === 0 && direction === -1) ||
		(snake[0] - width < 0 && direction === -width) ||
		(boardPositions[snake[0] + direction].classList.contains("snake"))
	) {
		if (score > highScore) {
			highScore = score
			highScoreElement.textContent = highScore
		}
		boardPositions[appleIndex].classList.remove("apple")
		boardPositions[appleIndex].innerHTML = ""
		colorRed()
		return clearInterval(timerId)
	}

	let tail = snake.pop()
	boardPositions[tail].classList.remove("snake")
	snake.unshift(snake[0] + direction)

	if (boardPositions[snake[0]].classList.contains("apple")) {
		boardPositions[snake[0]].classList.remove("apple")
		boardPositions[snake[0]].innerHTML = ""
		boardPositions[tail].classList.add("snake")
		snake.push(tail)
		score++
		currentScoreElement.textContent = score
		generateApple()
		clearInterval(timerId)
		intervalTime = intervalTime * speed
		timerId = setInterval(move, intervalTime)
	}
	boardPositions[snake[0]].classList.add("snake")
}

function startGame() {
	startBtn.style.display = "none"
	restartBtn.style.display = "block"
	currentScoreElement.textContent = score
	highScoreElement.textContent = highScore
	snake = [2,1,0]
	snake.forEach(index => boardPositions[index].classList.add("snake"))
	generateApple()
	direction = 1
	intervalTime = 500
	timerId = setInterval(move, intervalTime)
}

function restartGame() {
	clearInterval(timerId)
	colorWhite()
	boardPositions[appleIndex].innerHTML = ""
	score = 0
	currentScoreElement.textContent = score
	snake.forEach(index => boardPositions[index].classList.remove("snake"))
	snake = [2,1,0]
	snake.forEach(index => boardPositions[index].classList.add("snake"))
	generateApple()
	direction = 1
	intervalTime = 500
	timerId = setInterval(move, intervalTime)
}


document.addEventListener("keyup", control)
startBtn.addEventListener("click", startGame)
restartBtn.addEventListener("click", restartGame)
createGameboard()