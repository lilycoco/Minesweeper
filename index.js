// console.log ("Hello World");

const express =require('express');
const app =express();
app.use(express.static('static'));//static = ディレクトリの名前 Node.jsはpackage.jasonのあるとこ

//staticの中身

// const fs =require('fs');
// const path =require('path'); //url
// const htmlPath = path.join(__dirname, './static/index.html');
// console.log(htmlPath);
// const html =fs.readFileSync(htmlPath, 'utf8');
// console.log(html);

// app.get('/',(req,res) =>{
    
//     res.send(html);
// });

const width = 10;
const height = 20;
const bomCount =10;
const board =[];

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

//width X height のボード表示
for(let row = 0; row < height; row++){
    const boardRow =[];
    for(let col = 0; col < width; col++){
        boardRow.push({
            opened:false,
            hasBom:false,
        });
    } 
    board.push(boardRow);
}

//ランダムに爆弾配置
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

//マスを開く処理
app.get('/board',(req,res) =>{
    if(req.query.x){
    
        // console.log("req",req)
        let x = Number(req.query.x);
        let y = Number(req.query.y);
        let user = req.query.user;
        board[y][x].opened = true;//開く
        board[y][x].user = user; //ユーザー表示
        
        // 隣接するマスを確認するループ
        let bomsNo = 0;
        let nextSpot =[];
        for(let i=0; i<directions.length; i++){

            let a= directions[i][0];
            let b= directions[i][1];
            let u =y+a;//隣接するy座標
            let k =x+b;//隣接するx座標

            let n = 1; //何回while文を回すかの数

            // console.log(i,directions)
            // console.log("u",u,"k",k,"x",x,"y",y)

            // 1: 爆弾があるかのチェック
            if(u >= 0 && u < height && k >= 0 && k < width){
                if(board[u][k].hasBom === true){ //爆弾がある場合
                    bomsNo++;
                }     
            }
            // console.log( board[y][x].number);
        }
        console.log("nextSpot",nextSpot);
        console.log("bomsNo",bomsNo);
        if(bomsNo===0){
            for(let i=0; i<directions.length; i++){
                let a= directions[i][0];
                let b= directions[i][1];
                let u =y+a;//隣接するy座標
                let k =x+b;//隣接するx座標
                let nextBomsNo = 0;
                if(u >= 0 && u < height && k >= 0 && k < width){

                    for(let q=0; q<directions.length; q++){

                        let c= directions[q][0];
                        let d= directions[q][1];
                        let j =u+c;//隣接するy座標
                        let p =k+d;//隣接するx座標
                        // console.log("j",j,"p",p);

                        if(j >= 0 && j < height && p >= 0 && p < width){
                            if(board[j][p].hasBom === true){ //爆弾がある場合
                            nextBomsNo++;
                            }                   
                        }
                    }
                

                    if(nextBomsNo===0){
                        board[u][k].opened =true;
                    }
                    // console.log("nextBomsNo",nextBomsNo);
                    
                }
            }
        }

        board[y][x].number = bomsNo; //周りにある爆弾の数を表示



        //爆弾があるところを開いたら爆発する
        for(let row = 0; row < width; row++){
            for(let col = 0; col < height; col++){        
                if(board[col][row].hasBom === true){
                    if(board[y][x].opened === true &&  board[y][x].hasBom === true){
                        board[col][row].expload = true;
                    }
                }
            }
        }
    }
    
    let board2 = JSON.parse(JSON.stringify(board)); //ディープコピー
    for(let row = 0; row < width; row++){
        for(let col = 0; col < height; col++){
            delete board2[col][row].hasBom; //爆弾のある場所を隠す
        }
    }
    // console.log(board2)
    // console.log(board)
    
    // res.send(board2);
    res.json(board2);
});



app.listen(8000);