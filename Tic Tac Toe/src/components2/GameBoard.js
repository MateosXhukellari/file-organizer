export default function GameBoard({onSquareSelect, board}){
    return(
        <ol id='game-board'>
            {board.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) =>
                        <li key={colIndex}>
                            <button onClick={onSquareSelect(rowIndex,colIndex)} disabled={playerSymbol !== null}></button>
                        </li>)}
                    </ol>
                </li>
            )}
        </ol>
    )
}