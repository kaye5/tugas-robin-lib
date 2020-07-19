function handleFindResult(){
    
}

function generateMap(){
    let x = document.getElementById('input-x').value
    let y = document.getElementById('input-y').value
    map = new Map(3,3);
    map.generateEmptyMap();
    map.setFinalDest(2,2)
}