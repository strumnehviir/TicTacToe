// board generator returns the board
const GameBoard = (() => {
    let gameboard = []
    
    for (i = 0; i < 9; ++i){
        gameboard.push("")
    }
    let uiGameboard = document.getElementById("game-board")
    gameboard.forEach((element, index) => {
        let playSquare = document.createElement('div')
        playSquare.classList.add('player-square')
        playSquare.setAttribute("id", `box-${index}`)
        
        uiGameboard.appendChild(playSquare)

    })
    return {gameboard} // for rest set this
})()




// Evaluates the winning combination and who it belongs to 
const winnerEvaluator = (() =>{
    let winCombo1 = [0, 1, 2]
    let winCombo2 = [3, 4, 5]
    let winCombo3 = [6, 7, 8]
    let winCombo4 = [0, 3, 6]
    let winCombo5 = [1, 4, 7]
    let winCombo6 = [2, 5, 8]
    let winCombo7 = [0, 4, 8]
    let winCombo8 = [2, 4, 6]
    let winComboFind = false // reset this too

    const winEvalMethod = (playerComboArray, turnXO, name) =>{
        playerComboArray.sort()
        let turnSystem = turnXO
         

        // I know, I know, switch would have been better below, but i cannot change it now

        if(winComboFind === false){
            winComboFind = winCombo1.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo2.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo3.every(val => playerComboArray.includes(val))
            

        }

        if(winComboFind === false){
            winComboFind = winCombo4.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo5.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo6.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo7.every(val => playerComboArray.includes(val))
            
        }

        if(winComboFind === false){
            winComboFind = winCombo8.every(val => playerComboArray.includes(val))
            
        }
        if(winComboFind === false){
            return turnSystem
        }

        if(winComboFind === true){
            let messageArea = document.getElementById('message-text')
            messageArea.innerText = `${name} wins!`
            turnSystem = "stop"
            return turnSystem
        }

    }
    return{winEvalMethod, winComboFind}
})()




// a factory for making players
const playerFactory = (mark, name) => {
    let playerBoxSelection = [] // reset this
    return {mark, playerBoxSelection, name}
}




// game controller
const Gameflow = (() => {
    let player1 = playerFactory("x", "player 1")
    let player2 = playerFactory("o", " player 2")
    let turnSystem = "p1" // reset this 
    let uiPlayBox = document.querySelectorAll(".player-square")
    let messageArea = document.querySelector("#message-text")
    messageArea.innerText = `${player1.name}'s turn`
    

    uiPlayBox.forEach(element =>{
        element.addEventListener('click', (e) =>{
            let moveSquare = e.target
            let moveSquareId = e.target.id
            let moveSquareIdArr = moveSquareId.split('-')
            let idAsStr = moveSquareIdArr[1]
            let idAsInt = parseInt(idAsStr)
            let drawParameterChecker = ""
            
            if(turnSystem === "p1" && moveSquareId != `box-${idAsInt}-clicked`){
                messageArea.innerText = `${player2.name}'s turn`
                turnSystem = "p2"
                moveSquare.innerText = player1.mark
                moveSquare.setAttribute("id", `${moveSquareId}-clicked`)
                GameBoard.gameboard[idAsInt] = player1.mark
                player1.playerBoxSelection.push(idAsInt)
                turnSystem = winnerEvaluator.winEvalMethod(player1.playerBoxSelection, turnSystem, player1.name)
                drawParameterChecker = GameBoard.gameboard.find(element => element === "")
            }
    
            else if(turnSystem === "p2" && moveSquareId != `box-${idAsInt}-clicked`){
                messageArea.innerText = `${player1.name}'s turn`
                turnSystem = "p1"
                moveSquare.innerText = player2.mark
                moveSquare.setAttribute("id", `${moveSquareId}-clicked`)
                GameBoard.gameboard[idAsInt] = player2.mark
                player2.playerBoxSelection.push(idAsInt)
                turnSystem = winnerEvaluator.winEvalMethod(player2.playerBoxSelection, turnSystem, player2.name)
                drawParameterChecker = GameBoard.gameboard.find(element => element === "")
            }

            if(drawParameterChecker != "" && turnSystem != null){
                turnSystem = "stop"
                messageArea.innerText = `Its a draw...`
            }
            
            
        })  
     })
    return {turnSystem, player1, player2}
})()

// resets the game
const reset = (() => {
    let messageArea = document.querySelector("#message-text")
    let playerBoxes = document.querySelectorAll(".player-square")
    let resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', () =>{
        GameBoard.gameboard = []
        for (i = 0; i < 9; ++i){
            GameBoard.gameboard.push("")
        }
        messageArea.innerText = `${Gameflow.player1.name}'s turn`
        playerBoxes.forEach(element => element.innerText = "")
        playerBoxes.forEach((element, index) =>{
            element.removeAttribute('id')
            element.setAttribute('id', `box-${index}`)
        })
        Gameflow.player1.playerBoxSelection = []
        Gameflow.player2.playerBoxSelection = []
        winnerEvaluator.winComboFind = false
        // this doesnt seem to work
        Gameflow.turnSystem = "p1"
        // this was my last resort
        location.reload()
    })


})()

