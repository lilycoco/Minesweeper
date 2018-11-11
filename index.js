// console.log ("Hello World");

const express =require('express');
const app =express();

const width = 10;
const height = 10;
const bomCount =10;
const board =[];

for(let row = 0; row < width; row++){
    const boardRow =[];
    for(let col = 0; col < height; col++){
        boardRow.push({
            opened:false,
            hasBom:false,
        });
    } 
    board.push(boardRow);
}

let count=0;
while( count < bomCount ){
    let randomX = Math.floor( Math.random() * width );
    let randomY = Math.floor( Math.random() * height );
    if( board[randomY][randomX].hasBom ===false){
        board[randomY][randomX].hasBom = true;
        count++
        console.log("randomX",randomX,"randomY",randomY);
    }
    console.log(count);
};

app.get('/board',(req,res) =>{
    // console.log("req",req)
    let xx = req.query.x;
    let yy = req.query.y;

    board[yy][xx].opened = true;
    board[yy][xx].number = 0;

    
    const board2 =[];
    board2.push(...board);

    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
        // delete board2[row][col].hasBom;
            if(board[row][col].hasBom===true){
                if(board[yy][xx].opened === true &&  board[yy][xx].hasBom === true){
                    delete board[row][col].hasBom;
                    // delete board[row][col].opened;
                    board[row][col].expload=true;
                    // board[row][col].opened=false;
                }
            }
        }
    }

    // console.log(board2)
    res.send(board2);

});
app.listen(8000);