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

//置いた場所の周囲
const directions =[
    [-1,-1],
    [0,-1],
    [1,-1],
    [1,0],
    [1,1],
    [0,1],
    [-1,1],
    [-1,0],
  ];


app.get('/board',(req,res) =>{
    // console.log("req",req)
    let x = Number(req.query.x);
    let y = Number(req.query.y);
    board[y][x].opened = true; //開く
    
    
    // 隣接するコマを確認するループ
    let bomsNo = 0;
    for(let i=0; i<directions.length; i++){

        let a= directions[i][0];
        let b= directions[i][1];
        let u =y+a;//隣接するx座標
        let k =x+b;//隣接するy座標

        // console.log(i,directions)
        console.log("u",u,"k",k,"x",x,"y",y)

        // 1: 爆弾があるかのチェック
        if(u>=0 && u<=9){
            if(board[u][k].hasBom === true){ //爆弾がある場合
            // console.log(x,y);
                bomsNo++;
                console.log("bomsNo",bomsNo);
            }
        }
    }
    board[y][x].number = bomsNo; //周りにある爆弾の数を表示

    const board2 =[...board];

    //爆弾があるところを開いたら爆発する
    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
            if(board[row][col].hasBom === true){
                if(board[y][x].opened === true &&  board[y][x].hasBom === true){
                    delete board[row][col].hasBom;
                    board[row][col].expload=true;
                }
            }
            // delete board2[row][col].hasBom; //爆弾のある場所を隠す
        }
    }

    

    console.log(board2)
    console.log(board)

    res.send(board2);


});
app.listen(8000);