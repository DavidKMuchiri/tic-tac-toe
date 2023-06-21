// const gameTable = [
//     ['X', 'X', 'X'],
//     ['X', '', 'O'],
//     ['O', '', 'X']
// ]


// const symbol1 = 'X';
// const symbol2 = 'O';

export const play = (gameTable, game_stage) =>{



    let current_stats = checkWin(gameTable);
    if(current_stats[0]){
        return [current_stats[1], current_stats[2]];
    }
    if(game_stage === 8){
        return "Game has ended at a draw";
    }
}

const checkWin = (gameTable) =>{
    let map_objects = [checkColumns(gameTable), checkRows(gameTable), checkDiagonals(gameTable)];
    for(let counter1 = 0; counter1 < map_objects.length; counter1++){
        let current_map_object = map_objects[counter1];
        let object_keys = Object.keys(current_map_object);

        for(let counter2 = 0; counter2 < object_keys.length; counter2++){
            let current_value = current_map_object[object_keys[counter2]];
            if(current_value.length === 3){
                let distinct = new Set(current_value.split(''));
                distinct = [...distinct];
                if(Object.keys(distinct).length === 1){
                    if(distinct[0] === 'X'){
                        return [true, object_keys[counter2], "won"];
                    }else{
                        return [true, object_keys[counter2], "lost"];
                    }
                }
            }
        }
    }

    return [false]
}

const checkColumns = (gameTable) =>{
    const map_object = {}
    let counter3 = 0
    let counter2 = 0;
    for(let counter = 0; counter < 9; counter++){
        let currentArray = gameTable[counter3];
        // console.log(currentArray[counter2]);
        if(currentArray[counter2] !== undefined){
            if(map_object[`C${counter2}`]){
                map_object[`C${counter2}`] = map_object[`C${counter2}`] + currentArray[counter2];
            }else{
                map_object[`C${counter2}`] = currentArray[counter2];
            }
        }
        
        counter3 = counter3 + 1;
        if(counter3 > 2){
            counter3 = 0;
            counter2 = counter2 + 1;
            if(counter2 > 2){
                counter2 = 0;
            }
        }
    }

    return map_object;


}


const checkRows = (gameTable) =>{
    const map_object = {};

    for(let counter1 = 0; counter1 < gameTable.length; counter1++){
        let currentArray = gameTable[counter1];
        for(let counter2 = 0; counter2 < currentArray.length; counter2++){
            if(currentArray[counter2] !== undefined){
                if(map_object[`R${counter1}`]){
                    map_object[`R${counter1}`] = map_object[`R${counter1}`] + currentArray[counter2];
                }else{
                    map_object[`R${counter1}`] = currentArray[counter2];
                }
            }
        }
    }

    return map_object;
}

const checkDiagonals = (gameTable) =>{
    const map_object = {
        "0": '',
        "1": ''
    }

        for(let counter = 0; counter < 3; counter++){
                let currentArray = gameTable[counter];
                map_object[`0`] = map_object[`0`] + currentArray[counter];
                map_object[`1`] = map_object[`1`] + currentArray[(currentArray.length - 1) - counter];      
        }
    return map_object;
}