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
            hasBom:false,
            opened:false,
        });
    } 
    board.push(boardRow);
}

// function randomIndex(n){
//     let i, j, tmp, a = new Array(n);
//     a[0] = 0;
//     for(i = n - 1; i > 0; i--) {
//         j = Math.floor(Math.random() * (i+1));
//         tmp = a[i] || i;
//         a[i] = a[j] || j;
//         a[j] = tmp;
//     };
//     return a;
// }

let count=0;


while( count < bomCount ){
    let randomX1 = Math.floor( Math.random() * width );
    let randomY1 = Math.floor( Math.random() * height );
    let randomX2 = Math.floor( Math.random() * width );
    let randomY2 = Math.floor( Math.random() * height );
    let randomX3 = Math.floor( Math.random() * width );
    let randomY3 = Math.floor( Math.random() * height );
    let randomX4 = Math.floor( Math.random() * width );
    let randomY4 = Math.floor( Math.random() * height  );
    let randomX5 = Math.floor( Math.random() * width );
    let randomY5 = Math.floor( Math.random() * height );
    let randomX6 = Math.floor( Math.random() * width );
    let randomY6 = Math.floor( Math.random() * height );
    let randomX7 = Math.floor( Math.random() * width );
    let randomY7 = Math.floor( Math.random() * height );
    let randomX8 = Math.floor( Math.random() * width );
    let randomY8 = Math.floor( Math.random() * height );
    let randomX9 = Math.floor( Math.random() * width );
    let randomY9 = Math.floor( Math.random() * height  );
    let randomX10 = Math.floor( Math.random() * width );
    let randomY10 = Math.floor( Math.random() * height );
    board[randomX1][randomY1].hasBom = true;
    board[randomX2][randomY2].hasBom = true;
    board[randomX3][randomY3].hasBom = true;
    board[randomX4][randomY4].hasBom = true;
    board[randomX5][randomY5].hasBom = true;
    board[randomX6][randomY6].hasBom = true;
    board[randomX7][randomY7].hasBom = true;
    board[randomX8][randomY8].hasBom = true;
    board[randomX9][randomY9].hasBom = true;
    board[randomX10][randomY10].hasBom = true;
    // board[1][2].hasBom = true;
    // board[2][3].hasBom = true;
    // board[3][4].hasBom = true;
    // board[4][5].hasBom = true;
    // board[5][6].hasBom = true;
    // board[7][7].hasBom = true;
    // board[8][8].hasBom = true;
    // board[7][9].hasBom = true;
    // board[9][9].hasBom = true;
    // board[2][1].hasBom = true;

    // let randomX = Math.floor( Math.random() * width+1 )
    // let randomY = Math.floor( Math.random() * height+1 )

    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
            if((board[row][col].hasBom === true)&&
            (count<bomCount)){
                count++;
                console.log(count);
            }
        }
    }
};


app.get('/board',(req,res) =>{
    // console.log("req",req)
    let xx = req.query.x;
    let yy = req.query.y;
    board[yy][xx].opened = true;
    const board2 =[];
    board2.push(...board);

    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
        // delete board2[row][col].hasBom;
        }}
    // console.log(board2)
    res.send(board2);

});

app.listen(8000);