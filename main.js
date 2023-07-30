const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
    this.y = 0;
    this.x = 0;
  }
  get field() {
    return this._field;
  }
  print() {
    this.field.forEach((el) => {
      console.log(el.join(""));
    });
  }

  move() {
    let steps;
    while (this.field[this.y][this.x] !== hat) {
      this.print();
      steps = prompt("Which way ? Please press 'r' to go right, 'l' to go left, 'u' to go up, 'd' to go down: ");
   
      if (steps === "r") {
        this.x += 1;

        if (this.field[this.y][this.x] === fieldCharacter) {
          this.field[this.y][this.x] = pathCharacter;
        } else if (this.field[this.y][this.x] === undefined) {
          break;
        } else if (this.field[this.y][this.x] === hole) {
          break;
        }
      }
      if (steps === "d") {
        this.y += 1;

        if (this.field[this.y][this.x] === fieldCharacter) {
          this.field[this.y][this.x] = pathCharacter;
        } else if (this.field[this.y][this.x] === undefined) {
          break;
        } else if (this.field[this.y][this.x] === hole) {
          break;
        }
      }

      if (steps === "l") {
        this.x -= 1;

        if (this.field[this.y][this.x] === fieldCharacter) {
          this.field[this.y][this.x] = pathCharacter;
        } else if (this.field[this.y][this.x] === undefined) {
          break;
        } else if (this.field[this.y][this.x] === hole) {
          break;
        }
      }

      if (steps === "u") {
        this.y -= 1;
             if (this.field[this.y][this.x] === fieldCharacter) {
          this.field[this.y][this.x] = pathCharacter;
        } else if (this.field[this.y][this.x] === undefined) {
          break;
        } else if (this.field[this.y][this.x] === hole) {
          break;
        }
        }

        
      }
      switch (this.field[this.y][this.x]) {
        case hat:
          console.log("WELL DONE! YOU FOUND THE HAT!");
          break;
        case hole:
          console.log("GAME OVER! YOU HAVE FALLEN!");
          break;
        case undefined:
          console.log("OUT OF BOUNDS! PLEASE STAY WITHIN THE FIELD");
          break;
      }
    }
  

  //Creating a new field
  static generateField(height, width, percentage = 30) {
    let field = [];
    let numOfHoles = Math.floor((height * width * percentage) / 100);
    let hatX = 0;
    let hatY = 0;
    while (!hatX && !hatY) {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    }

    for (let row = 0; row < height; row++) {
      let rowArr = [];
      for (let col = 0; col < width; col++) {
        if (row === 0 && col === 0) {
          rowArr.push(pathCharacter);
          continue;
        }
        if (row === hatY && col === hatX) {
          rowArr.push(hat);
          continue;
        }
        rowArr.push(fieldCharacter);
      }
      field.push(rowArr);
    }

    for (numOfHoles; numOfHoles > 0; numOfHoles--) {
      let holeY = 0;
      let holeX = 0;
      while (field[holeY][holeX] !== fieldCharacter) {
        holeY = Math.floor(Math.random() * height);
        holeX = Math.floor(Math.random() * width);
      }
      field[holeY][holeX] = hole;
    }
    return field;
  }
}

const newField = Field.generateField(5, 5);
const myField = new Field(newField);

myField.move();
