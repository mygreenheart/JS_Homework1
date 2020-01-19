var numbers = [];

var x = 0,
  y = 0;

var direction = "right";
var numberPosition = 0;
var innerDimension;
var dimension = 15;// Для размерности матрицы менять это значение
var oldPosition;

var matrix = createMatrix(dimension, dimension);

fillMatrix(dimension);

matrixView(matrix);

function fillMatrix(n) {
  for (let i = 1; i <= Math.pow(n, 2); i++) {
    numbers.push(i);
  }

  if (!numbers.length) return;

  var num = numbers.shift();
  matrix[x][y] = num;
  ++numberPosition;

  if (innerDimension === 0) return;


  if (innerDimension === 1) {
    getNextDirection();
    setNextPosition();
    innerDimension = 0;
    fillMatrix(dimension);
    return;
  }


  if (numberPosition === innerDimension || numberPosition === dimension) {
    getNextDirection();
    setNextPosition();
    oldPosition = numberPosition;
    innerDimension = dimension - 1;
    fillMatrix(dimension);

    return;
  }

  if (
    numberPosition === oldPosition + innerDimension ||
    numberPosition === oldPosition + innerDimension * 2
  ) {
    if (numberPosition === oldPosition + innerDimension * 2) {
      innerDimension = innerDimension - 1;
      oldPosition = numberPosition;
    }
    getNextDirection();
    setNextPosition();
    fillMatrix(dimension);
    return;
  }
  setNextPosition();
  fillMatrix(dimension);
}

function setNextPosition() {
  if (direction == "right") {
    y = y + 1;
  }

  if (direction == "down") {
    x = x + 1;
  }

  if (direction == "left") {
    y = y - 1;
  }

  if (direction == "top") {
    x = x - 1;
  }
}

function getNextDirection() {
  if (direction === "right") {
    direction = "down";
    return;
  }

  if (direction === "down") {
    direction = "left";
    return;
  }

  if (direction === "left") {
    direction = "top";
    return;
  }

  if (direction === "top") {
    direction = "right";
  }
}

function createMatrix(x, y) {
  var matrix = [];
  for (var i = 0; i < x; i++) {
    matrix[i] = Array(y);
  }
  return matrix;
}

function matrixView(matrix) {
  let rows = "";

  for (let i = 0; i < matrix.length; i++) {
    let cells = "";

    for (let j = 0; j < matrix[i].length; j++) {
      cells += '<div class="block_cell">' + matrix[i][j] + "</div>";
    }

    rows += '<div class="block_row">' + cells + "</div>";
  }

  document
    .querySelector("body")
    .insertAdjacentHTML("beforeend", '<div class="block">' + rows + "</div>");
}
