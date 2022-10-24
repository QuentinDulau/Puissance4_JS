class P4 {

    constructor(element_id, player1 = "Player 1", player2 = "Player 2", rows = 6, cols = 7) {

        this.rows = rows;
        this.cols = cols;

        this.player1 = player1;
        this.player2 = player2;

        this.board = Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = Array(this.cols).fill(0);
        }

        this.turn = 1;

        this.moves = 0;

        this.winner = null;

        this.element = document.querySelector(element_id);

        this.element.addEventListener('click', (event) => this.handle_click(event));
        this.render();
    }



    render() {
        let table = document.createElement('table');

        for (let i = this.rows - 1; i >= 0; i--) {
            let tr = table.appendChild(document.createElement('tr'));
            for (let j = 0; j < this.cols; j++) {
                let td = tr.appendChild(document.createElement('td'));
                let color = this.board[i][j];
                if (color)
                    td.className = 'player' + color;
                td.dataset.column = j;
            }
        }

        this.element.innerHTML = '';
        this.element.appendChild(table);

        let boardSettings = document.createElement('div');
        boardSettings.className = 'boardSettings';
        boardSettings.innerHTML = '<br>Change dimension for the board : <br> <button class="modifRows">Rows</button> <button class="modifCols">Columns</button>';
        this.element.appendChild(boardSettings);



    }
    

    modifRows() {
        let rows = prompt("Rows : ");
        this.rows = rows;
    }
    modifCols() {
        let cols = prompt("Cols : ");
        this.cols = cols;
    }

    set(row, column, player) {
        // color the cell
        this.board[row][column] = player;
        // Count the move
        this.moves++;

        if (player) {
            document.getElementById('currentPlayer').innerHTML = player;
        }
    }


    play(column) {
        // Look for the first empty cell
        let row;
        for (let i = 0; i < this.rows; i++) {
            if (this.board[i][column] == 0) {
                row = i;
                break;
            }
        }

        if (row === undefined) {
            return null;
        } else {
            this.set(row, column, this.turn);
            return row;
        }
    }

    handle_click(event) {
        // Check if the game is over or not
        if (this.winner !== null) {
            if (window.confirm("The game is over!\n\nDo you want to restart the game ?")) {
                this.reset();
                this.render();
            }
            return;

        }

        let column = event.target.dataset.column;
        if (column !== undefined) {

            //convert var into entier

            column = parseInt(column);
            let row = this.play(parseInt(column));

            if (row === null) {
                window.alert("Column is full!");
            } else {
                // Check if the player has won
                if (this.win(row, column, this.turn)) {
                    this.winner = this.turn;
                } else if (this.moves >= this.rows * this.columns) {
                    this.winner = 0;
                }
                this.turn = 3 - this.turn;

                // Update the board
                this.render()


                switch (this.winner) {
                    case 0:
                        window.alert("Null game!!");
                        break;
                    case 1:
                        window.alert("Player 1 wins");
                        break;
                    case 2:
                        window.alert("Player 2 wins");
                        break;
                }
            }
        }

        if (event.target.className == 'modifRows') {
            this.modifRows();
            this.render();
        }
        if (event.target.className == 'modifCols') {
            this.modifCols();
            this.render();
        }
    }


    win(row, column, player) {
        // Horizontal
        let count = 0;
        for (let j = 0; j < this.cols; j++) {
            count = (this.board[row][j] == player) ? count + 1 : 0;
            if (count >= 4) return true;
        }
        // Vertical
        count = 0;
        for (let i = 0; i < this.rows; i++) {
            count = (this.board[i][column] == player) ? count + 1 : 0;
            if (count >= 4) return true;
        }
        // Diagonal
        count = 0;
        let shift = row - column;
        for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
            count = (this.board[i][i - shift] == player) ? count + 1 : 0;
            if (count >= 4) return true;
        }
        // Anti-diagonal
        count = 0;
        shift = row + column;
        for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
            console.log(i, shift - i, shift)
            count = (this.board[i][shift - i] == player) ? count + 1 : 0;
            if (count >= 4) return true;
        }

        return false;
    }

    // Reset the game
    reset() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = 0;
            }
        }
        this.move = 0;
        this.winner = null;
    }

    //Modif board
    /*   ModifRow() {
           var rows = document.getElementById("rows").value;
           this.rows = rows;
           this.render();
       }
       ModifCol() {
           var cols = document.getElementById("cols").value;
           this.cols = cols;
           this.render();
       }
   
       //Modif player
       ModifPlayer1() {
           var player1 = document.getElementById("player1").value;
           this.player1 = player1;
           this.render();
       }
       ModifPlayer2() {
           var player2 = document.getElementById("player2").value;
           this.player2 = player2;
           this.render();
       }*/
}

const replay = document.getElementById('replay');

replay.addEventListener("click", function () {
    location.reload();
});

let p4 = new P4('#game');