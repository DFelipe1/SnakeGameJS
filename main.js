

// starta o script
window.onload = () => {

    // pegar o stage e configurar jogo
    const stage = document.getElementById("stage");
    const ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush)
    const h2 = document.querySelector('#score')
    const textRecord = document.querySelector('#record')


    // definição de variaveis
    const vel = 1

    let vx = vy = 0;
    let px = py = 10;
    let length = 20;
    let amountPiece = stage.width * 0.05;
    let fruitx = fruity = 15;

    

    let trail = [];
    let tail = 5;

    let state = 'gaming'
    let score = 0
   // let record = 0
    

    const localStorageRecord = JSON.parse(localStorage.getItem('record'))
    let record = localStorage.getItem('record') !== null ? localStorageRecord : 0
    console.log(localStorageRecord)

    const updateLocalStorage = (record) => {
        localStorage.setItem('record', JSON.stringify(record))
    }
    // escala de update do jogo (defini o tempo de atualização)
    setInterval( game, 60);

    // logica do jogo
    function game() {
        
        // posicionamento inicial do jogador
        px += vx
        py += vy
        
        // limites infinito do stage
        ifinityStage()

        //renderização do canva
        render()

        // cauda da cobra
        trail.push({x: px, y: py})
        while(trail.length > tail) {
            
            trail.shift()
        }

        pointColision()

        h2.innerHTML = `Score: ${score}`
        textRecord.innerHTML = `Record: ${record}`

    }

    // controle do jogo, atraves do teclado
    function keyPush(event) {

        
        
        if(event.keyCode == 65 || event.keyCode == 37){ //left
            vx = -vel
            vy = 0
        }
        if(event.keyCode == 68 || event.keyCode == 39){ //rigth
            vx = vel
            vy = 0
        }
        if(event.keyCode == 83 || event.keyCode == 40){ //down
            vx = 0
            vy = vel
        }
        if(event.keyCode == 87 || event.keyCode == 38){ //up
            vx = 0
            vy = -vel
        }
    }

    function ifinityStage(){
        if(px < 0){
            px = amountPiece -1
        }
    
        if(px > amountPiece - 1){
            px = 0
        }
        
        if(py < 0){
            py = amountPiece - 1
        }
    
        if(py > amountPiece - 1){
            py = 0
        }
    
    }

    function render() {
        ctx.fillStyle = '#05023f';
        ctx.fillRect(0, 0, stage.width, stage.height);

        //renderização da fruta
        ctx.fillStyle = 'green'
        ctx.fillRect(fruitx * length, fruity * length, length, length)
        
        //renderização do player
        ctx.fillStyle = 'gray';
        // varredura de comprimento do player
        for(let i = 0; i < trail.length; i++){
           
            ctx.fillRect(trail[i].x * length, trail[i].y * length, length, length);
            
            //game over, se a cabeça bater no corpo o jogo para
            gameover(i)

        }
        
       
        

        
    }

    function gameover(i) {
        if( trail[i].x == px && trail[i].y == py){
            vx = vy = 0
            tail = 5
            if(record < score ){
                record = score
            }
            updateLocalStorage(record)
            score = 0

            
        }
    }

    function pointColision(){
        //define a colição do player e da fruta
        if (fruitx == px && fruity == py){
            // aumenta o player e redireciona a fruta para outro lugar de forma aleatoria
            tail++
            score += 10
            fruitx = Math.floor(Math.random()*amountPiece)
            fruity = Math.floor(Math.random()*amountPiece)
        }

        
    }
}