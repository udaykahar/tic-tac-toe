var board;
var playerO="O";
var playerX="X";
var currentPlayer=playerO;
var gameOver=false;

window.onload=function(){
  setgame();
}

function setgame(){
  board=[
    ["","",""],
    ["","",""],
    ["","",""]
  ]
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div"); // create a div
      tile.id = r.toString()+"-"+c.toString();  // set the id TO the div
      tile.classList.add("tile"); // add the class to the div
      if(r==0 || r==1){
        tile.classList.add("vertical-line");
      }
      if(c==0 || c==1){
        tile.classList.add("horizontal-line");
      }
      document.getElementsByClassName("gameContainer")[0].append(tile); // append the div to the board
      tile.addEventListener("click", setTile); // add the event listener to the div
    }
    
  }
}

function setTile(){
  if(gameOver){
    return;
  }
  let coordinates = this.id.split("-");
  let row = parseInt(coordinates[0]);
  let col = parseInt(coordinates[1]);

  if(board[row][col]!=""){
    return;
  }

  board[row][col] = currentPlayer;
  this.innerHTML = currentPlayer;

  if(currentPlayer==playerO){
    currentPlayer=playerX;
  }else{
    currentPlayer=playerO;
  }
  checkWinner();
}

function checkWinner(){
  //horizontally
  for (let r = 0; r < 3; r++) {
    if(board[r][0]==board[r][1] && board[r][1]==board[r][2] && board[r][0] !=""){
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(r.toString()+"-"+i.toString());
        tile.classList.add("winner");
      }
      gameOver=true;
      return;
    }
  }
  //vertically
  for (let c = 0; c < 3; c++) {
    if(board[0][c]==board[1][c] && board[1][c]==board[2][c] && board[0][c] !=""){
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(i.toString()+"-"+c.toString());
        tile.classList.add("winner");
      }
      gameOver=true;
      return;
    }
  }
  //diagonally
  if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0] !=""){
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString()+"-"+i.toString());
      tile.classList.add("winner");
    }
    gameOver=true;
    return;
  }
  //anti-diagonally
  if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2] !=""){
    for (let i = 0; i < 3; i++) {
      let tile = document.getElementById(i.toString()+"-"+(2-i).toString());
      tile.classList.add("winner");
    }
    gameOver=true;
    return;
  }
}