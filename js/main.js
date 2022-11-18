'use strict'

let gNums
let gBoard
let gLength = 4
let gCurrNumber
let gGameInterval

function onInit() {
    gCurrNumber = 1
    gBoard = makeBoard(gLength ** 2)
    renderBoard(gBoard)
}

function onReset() {
    toggleModal()
    onInit()
}

function onSetLength(length) {
    gLength = length
}

function onCellClicked(clickedNum) {
    if (clickedNum !== gCurrNumber) return
    if (clickedNum === 1) onGameStart()
    markCell(clickedNum)
    if (gCurrNumber === gLength ** 2) return onWin() 
    gCurrNumber++
}

function onGameStart() {
    startStopWatch()
}

function startStopWatch() {
    const startTime = Date.now()
    gGameInterval = setInterval(()=> {
        const passedTime = (Date.now() - startTime) / 1000
        const elTimer = document.querySelector('.timer')
        elTimer.innerText = passedTime.toFixed(2)
    }, 100)
    console.log(gGameInterval)
}

function markCell(cellNum) {
    const elCell = document.querySelector(`.cell-${cellNum}`)
    elCell.classList.add('marked')
}

function renderBoard(board) {
    const elTbody = document.querySelector('tbody')
    const length = board.length ** 0.5
    let strHTML = ''
    for (let i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < length; j++) {
            const randomNum = board.pop()
            strHTML += `<td class="cell-${randomNum}" onclick="onCellClicked(${randomNum})">${randomNum}</td>`
        }
        strHTML += '</tr>'
    }
    elTbody.innerHTML = strHTML
}

function onWin() {
    clearInterval(gGameInterval)
    toggleModal()
}

function makeBoard(length = 16) {
    const board = []
    setGNums(length)
    for (let i = 0; i < length; i++) {
        board[i] = drawNum(gNums)
    }
    return board
}

function drawNum(nums) {
    const randomIdx = getRandomInt(0, nums.length)
    return  nums.splice(randomIdx, 1)[0]
}

function setGNums(length = 16) {
    let nums = []
    for (let i = 1; i <= length; i++) {
        nums.push(i)
    }
    gNums = nums
}

function toggleModal() {
    const elModal = document.querySelector('.game-modal')
    elModal.classList.toggle('hidden')
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
