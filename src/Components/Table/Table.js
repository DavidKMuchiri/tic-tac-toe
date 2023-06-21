import { useState } from 'react';
import { play } from './tic-tac-toe';
import ScoreSheet from '../ScoreSheet/ScoreSheet';
import './Table.css';

let ticTacToeAiEngine = require("tic-tac-toe-ai-engine");


const Table = ({showWinner, showLoser, showInfo}) =>{

    // const [player, setPlayer] = useState(1);
    // const [symbol, setSymbol] =  useState('X');
    // const [reset, setReset] = useState(false);
    const [gameTable, setGameTable] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ])
    const [game_stage, setGameStage] = useState(0);
    const [gameEngineResponse, setGameEngineReponse] = useState("");
    const [numberOfO, setNumberOfO] = useState(0)
    const [numberOfX, setNumberOfX] = useState(0)
    const [playerScore, setPlayerScore] = useState(0)
    const [programmingScore, setProgrammingScore] = useState(0);
    
    const arraySplit = (array) =>{
        let finalArray = [];
        for(let counter = 0; counter < array.length; counter = counter + 3){
            finalArray.push([array[counter], array[counter + 1], array[counter + 2]]);
        }

        return finalArray;
    }

    const arrayJoin = (array) =>{
        let finalArray = [];
        // let counter2 = 0;
        for(let counter = 0; counter < array.length; counter = counter + 1){
            finalArray.push(array[counter][0]);
            finalArray.push(array[counter][1]);
            finalArray.push(array[counter][2]);

        }

        return finalArray;
        
    }
    const computer_play = (gameTable) =>{
        let joinedArray = arrayJoin(gameTable);
        let computerMove = ticTacToeAiEngine.computeMove(joinedArray);
        computerMove = computerMove.nextBestGameState;
        // console.log(computerMove);
        let newGameTable = arraySplit(computerMove);

        return newGameTable;
    }
    
    const onCellClick = (position) =>{
        if(gameTable[position[0]][position[1]].length > 0){
            showInfo("Position already filled");
            return;
        }
        const tempArray = [...gameTable];
        tempArray[position[0]][position[1]] = 'X';
        setNumberOfX(numberOfX + 1);
        // console.log(tempArray);
        setGameTable(tempArray);
        let finalGameTable = computer_play(tempArray);

        setTimeout(() => {
            setGameTable(finalGameTable);
            setNumberOfO(numberOfO + 1);
        }, 200);
        // setGameTable(finalGameTable);
        setGameStage(game_stage + 2);

        let reponse = play(finalGameTable, game_stage);
        if(reponse){
            // console.log(reponse);
            setGameEngineReponse(reponse[0]);
        }

        if(game_stage === 8 && reponse === "Game has ended at a draw"){
            showInfo(reponse);
            // if(reset){
            //     setReset(false);
            // }else{
            //     setReset(true);
            // }
        }else if(reponse && reponse !== "Game has ended at a draw"){
            // console.log();
            if(reponse[1] === "won"){
                showWinner("You have won");
                // console.log("Won");
                setPlayerScore(playerScore + 1);
            }else if(reponse[1] === "lost"){
                showLoser("You have lost");
                setProgrammingScore(programmingScore + 1);
            }
        }


    }

    const showWin = (position) =>{
        if(gameEngineResponse === "C0" && position[1] === 0){
            return "rowCellWin";
        }else if(gameEngineResponse === "C1" && position[1] === 1){
            return "rowCellWin";
        }else if(gameEngineResponse === "C2" && position[1] === 2){
            return "rowCellWin";
        }else if(gameEngineResponse === "R0" && position[0] === 0){
            return "rowCellWin";
        }else if(gameEngineResponse === "R1" && position[0] === 1){
            return "rowCellWin";
        }else if(gameEngineResponse === "R2" && position[0] === 2){
            return "rowCellWin";
        }else if(gameEngineResponse === "0" && ((position[0] === 0 && position[1] === 0)|| (position[0] === 1 && position[1] === 1) || (position[0] === 2 && position[1] === 2))){
            return "rowCellWin";
        }else if(gameEngineResponse === "1" && ((position[0] === 0 && position[1] === 2)|| (position[0] === 1 && position[1] === 1) || (position[0] === 2 && position[1] === 0))){
            return "rowCellWin";
        }
    }

    const resetGame = () =>{
        setGameTable([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ])
        setGameStage(0);
        setGameEngineReponse('');
        setNumberOfO(0);
        setNumberOfX(0);
    }
    const onCellClickHandler = (position) =>{
        if(!gameEngineResponse && numberOfO === numberOfX){
            onCellClick(position);
        }else if(gameEngineResponse){
            showInfo("Game has ended");
        }
    }
    return(
        <div className='tableContainer'>
            <div className='table'>
                <div className='row'>
                    <p className={showWin([0, 0])} onClick={() => onCellClickHandler([0, 0])}>{gameTable[0][0]}</p>
                    <p className={showWin([0, 1])} onClick={() => onCellClickHandler([0, 1])}>{gameTable[0][1]}</p>
                    <p className={showWin([0, 2])} onClick={() => onCellClickHandler([0, 2])}>{gameTable[0][2]}</p>
                </div> 
                <div className='row'>
                    <p className={showWin([1, 0])} onClick={() => onCellClickHandler([1, 0])}>{gameTable[1][0]}</p>
                    <p className={showWin([1, 1])} onClick={() => onCellClickHandler([1, 1])}>{gameTable[1][1]}</p>
                    <p className={showWin([1, 2])} onClick={() => onCellClickHandler([1, 2])}>{gameTable[1][2]}</p>
                </div> 
                <div className='row'>
                    <p className={showWin([2, 0])} onClick={() => onCellClickHandler([2, 0])}>{gameTable[2][0]}</p>
                    <p className={showWin([2, 1])} onClick={() => onCellClickHandler([2, 1])}>{gameTable[2][1]}</p>
                    <p className={showWin([2, 2])} onClick={() => onCellClickHandler([2, 2])}>{gameTable[2][2]}</p>
                </div> 
            </div>
            <button className={game_stage > 0 ? "tableResetBtn": "tableResetBtn hideTableResetBtn" } onClick={resetGame}>Reset</button>
            <ScoreSheet playerScore={playerScore} programmingScore={programmingScore} />
            
        </div>
    )
}

export default Table;