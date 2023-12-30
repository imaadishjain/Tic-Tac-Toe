const boxes=document.querySelectorAll(".box");

const gameInfo=document.querySelector(".game-info");

const newGameBtn=document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
 

//let's create a function to initialize a game

 function initGame()
 {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    
    newGameBtn.classList.remove("active");

    gameInfo.innerText=`Current Player-${currentPlayer}`;
    
    // Ui pa empty karna hoga
    
    boxes.forEach((box,index)=>
    {
        box.innerText="";
       boxes[index].style.pointerEvents="all";
        
       // initialse box with  css properties
        box.classList=`box box${index+1}`;
  
    })
   
 }

 initGame();
  
 function swapTurn()
 {
    if(currentPlayer==="X")
    {
        currentPlayer='O';
    }
    else
    {
        currentPlayer="X";
    }
   // UI Update
    gameInfo.innerText=`Current Player-${currentPlayer}`;
 }

 function checkGameOver()
 {
       let answer="";
       let c=0;
      winningPosition.forEach((position)=>
       {
         
         if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" &&    gameGrid[position[2]]!=="" &&  c===0)
          &&  (gameGrid[position[0]]===gameGrid[position[1]]) &&(gameGrid[position[1]]===gameGrid[position[2]]))
         {
                 console.log("Condition became true");
                    
                       if(gameGrid[position[0]]==="X")
                       {
                        answer="X";
                       }
                       else
                       {
                        answer="O";
                       }
                       boxes.forEach((box)=>
                       {
                        box.style.pointerEvents = "none";
                       })
                       boxes[position[0]].classList.add("win");
                       boxes[position[1]].classList.add("win");
                       boxes[position[2]].classList.add("win");
                       c++;
                    }

                });

    if(answer!=="")
    {
        gameInfo.innerText=`Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    
    let empty=0;
    
    gameGrid.forEach((grid)=>
    {
        if(grid!=="")
        {
            empty++;
        }
    });

    if(empty===9)
    {
        gameInfo.innerText="Game Tie";
        newGameBtn.classList.add("active");
    }


 }



 function handleClick(index)
 {
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn
        swapTurn();
        checkGameOver();
    }
 }


 boxes.forEach((box,index)=>
 {
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
 });

 newGameBtn.addEventListener("click",()=>
 {
    initGame();
 })

 



