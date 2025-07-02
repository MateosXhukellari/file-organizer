import GameImage from "./assets/game-logo.png"
import GameBoard from "./components/GameBoard"
import Player from "./components/PlayerInfo"
import Log from "./components/Log"
import {useState} from "react";
import GameOver from "./components/GameOver"
import {WINNING_COMBINATIONS} from "./components/Winning_Combinations";


const initialBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

function Header(){
    return (
    <>
    <header>
        <img src = {GameImage} alt="stylized atom"></img>
        <h1>TIC TAC TOE</h1>
    </header>
    </>
    )

}

function App() {
    const [gameTurn, setGameTurn] = useState([])
    const [activePlayer, setActivePlayer] = useState('X')

    let gameBoard = [...initialBoard.map(arr => [...arr])]

    for(const turn of gameTurn){
        const {square, player} = turn;
        const {row, col} = square

        gameBoard[row][col] = player;
    }
    let winner = null;

    for(const combinations of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
        const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
        const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = firstSquareSymbol
        }
    }

    const hasDraw = gameTurn.length === 9 && !winner

    function handleSelectPlayer(rowIndex,colIndex){
        setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X')
        setGameTurn((prevTurn)=>{

            let currentPlayer = 'X'

            if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
                currentPlayer = 'O'
            }

            const updateTurn = [{
                square: {
                    row:rowIndex,
                    col:colIndex
                },
                player: currentPlayer
            },...prevTurn]

            return updateTurn
        })
    }

    function handleRestart(){
        setGameTurn([]);
    }

  return (
        <main>
            <div id = "game-container">
                <Header />
                <ol id="players" className="highlight-player">
                    <Player initialName="Player1" symbol="X" activePlayer={activePlayer === 'X'}/>

                    <Player initialName="Player2" symbol="O" activePlayer={activePlayer === 'O'}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} rematch={handleRestart}/>}
                <GameBoard onSelectSquare={handleSelectPlayer} board = {gameBoard}/>
            </div>

        <Log turns={gameTurn}/>
        </main>
  )
}

export default App
