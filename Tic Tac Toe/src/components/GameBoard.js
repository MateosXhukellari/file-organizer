

export default function GameBoard({onSelectSquare, board}){

    /*
    const [gameBoard, setGameBoard] = useState(initialBoard)

    function handleEvent(rowIndex,colIndex){
        setGameBoard((prevGameBoard)=>{
            const updateBoard = [...prevGameBoard.map((innerArray => [...innerArray]))]
            updateBoard[rowIndex][colIndex] = activePlayerSymbol
            return updateBoard
        })
        onSelectSquare();

    }

 */

    return(
        <ol id ="game-board">
            {board.map((item, itemIndex)=> <li key={itemIndex}>
                <ol>
                    {item.map((playerSymbol, colIndex)=> <li key={colIndex}>
                        <button onClick={() => onSelectSquare(itemIndex, colIndex)} disabled={playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                    </li>)}
                </ol>
            </li> )}
        </ol>
    )
}