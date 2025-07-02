import GameImage from './assets/game-logo.png'
import {useState} from "react";
import Player from './components2/PlayerInfo'
import GameBoard from './components/GameBoard'
import {WINNING_COMBINATIONS} from './components2/Winning_Combinations'
import GameOver from "./components2/GameOver";
import Log from "./components2/Log";

const initialGameBoard = [
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


export default function App2(){
    const [gameTurn, setGameTurn] = useState([])
    const [activePlayer, setActivePlayer] = useState('X')

    let gameBoard = [...initialGameBoard.map(arr=> [...arr])]

    for(const turn of gameTurn){
        const {square, player} = turn;
        const {row,col} = square;

        gameBoard[row][col] = player;
    }

    let winner = null;

    for(const combos of WINNING_COMBINATIONS){
        const firstSquare = gameBoard[combos[0].row][combos[0].column];
        const secondSquare = gameBoard[combos[1].row][combos[1].column];
        const thirdSquare = gameBoard[combos[2].row][combos[2].column];

        if(firstSquare && firstSquare === secondSquare && firstSquare===thirdSquare){
            winner = firstSquare;
        }
    }

    const hasDraw = gameTurn.length === 9 && !winner


    function handleSelectPlayer(rowIndex, colIndex){
        setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X')
        setGameTurn((prevTurn) => {

            let currentPlayer = 'X'

            if(prevTurn.length > 0 && prevTurn[0].player === 'X'){
                currentPlayer = 'O'
            }

            const updateTurn = [{
                    square:{
                        row: rowIndex,
                        col: colIndex,
                    },
                    player: currentPlayer

                }, ...prevTurn]

            return updateTurn
        })

    }

    function rematch(){
        setGameTurn([])
    }
    return(
        <main>
            <div id="game-container">
                <Header />
                <ol id='players' className='highlight-player'>
                    <Player playerName='Player1' symbol='X' activePlayer={activePlayer==='X'}/>
                    <Player playerName='Player2' symbol='O' activePlayer={activePlayer==='O'}/>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} rematch={rematch}/>}
                <GameBoard onSelectSquare={handleSelectPlayer} board={gameBoard} />

            </div>
            <Log turns={gameTurn}/>
        </main>
    )
}