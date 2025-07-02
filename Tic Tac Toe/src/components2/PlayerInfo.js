import {useState} from "react";

/*
* Add a function thais is triggered when the button edit is pressed
* Change the isEdited to true on that function
* Show the <span className = "player-name"> only when isEdited is false
* Show an <input> element when if isEdited is true
* */


export default function PlayerInfo({playerName, symbol, activePlayer}) {
    let [userName, setUserName] = useState(playerName);
    let [isEdited, setIsEdited] = useState(false);

    function handleEdit(){
        setIsEdited(!isEdited);
    }

    function changeName(event){
        setUserName(event.target.value);
    }

    return(
        <li className={activePlayer ? 'active': undefined}>
            {!isEdited ? <span className='player'>
                <span className='player-name'>{userName}</span>
                <span className='player-symbol'>{symbol}</span>
                </span> : null}
            {isEdited ? <input type='text' required value={playerName} onChange={changeName}/> : null}


            <button onClick={handleEdit}>{isEdited ? 'Save' : 'Edit'}</button>
        </li>
    )

}