export default function GameOver({winner, rematch}){
    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {winner && <p>{winner} Has Won </p>}
            {!winner && <p>It's A Draw</p>}

            <button onClick={rematch}>Rematch</button>
        </div>

    )
}