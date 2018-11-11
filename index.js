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

// for (var i = 0;  i < zombiArray.length; i++) {
//     if(zombiArray[i] == 2){
//         zombi++;//ゾンビを加算
//     }
// }
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

// let randomX = randomIndex(width + 1 );
// let randomY = randomIndex(height + 1 );
// let count=0;

// while( count<=bomCount ){
//     board[randomX][randomY].hasBom = true;

//     // let randomX = Math.floor( Math.random() * width+1 )
//     // let randomY = Math.floor( Math.random() * height+1 )

//     for(let row = 0; row < width; row++){
//         for(let col = 0; col < height; col++){
//             if(board[row][col].hasBom === true){
//                 count++;
//             }
//         }
//     }
//     console.log(count);
// };


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