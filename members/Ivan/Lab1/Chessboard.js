const board = document.getElementById("chessboard");
let activeCell = null;
let currentPlayer = "white";

function isWhitePiece(symbol) {
    return "♙♖♘♗♕♔".includes(symbol);
}

function isBlackPiece(symbol) {
    return "♟♜♞♝♛♚".includes(symbol);
}

function getCoords(cell) {
    return {
        row: cell.parentNode.rowIndex,
        col: cell.cellIndex
    };
}

function getBoardCell(r, c) {
    return board.rows[r].cells[c];
}

function isFreePath(start, end) {
    let stepRow = Math.sign(end.row - start.row);
    let stepCol = Math.sign(end.col - start.col);

    let r = start.row + stepRow;
    let c = start.col + stepCol;

    while (r !== end.row || c !== end.col) {
        if (getBoardCell(r, c).innerText !== "") return false;
        r += stepRow;
        c += stepCol;
    }
    return true;
}

function canMove(piece, from, to) {
    let dr = to.row - from.row;
    let dc = to.col - from.col;
    let absR = Math.abs(dr);
    let absC = Math.abs(dc);
    let destination = getBoardCell(to.row, to.col).innerText;

    if (piece === "♙") {
        if (dc === 0 && dr === -1 && destination === "") return true;
        if (from.row === 6 && dc === 0 && dr === -2 && destination === "" && getBoardCell(5, from.col).innerText === "") return true;
        if (absC === 1 && dr === -1 && isBlackPiece(destination)) return true;
    }

    if (piece === "♟") {
        if (dc === 0 && dr === 1 && destination === "") return true;
        if (from.row === 1 && dc === 0 && dr === 2 && destination === "" && getBoardCell(2, from.col).innerText === "") return true;
        if (absC === 1 && dr === 1 && isWhitePiece(destination)) return true;
    }

    if (piece === "♖" || piece === "♜") {
        if (dr === 0 || dc === 0) return isFreePath(from, to);
    }

    if (piece === "♗" || piece === "♝") {
        if (absR === absC) return isFreePath(from, to);
    }

    if (piece === "♕" || piece === "♛") {
        if (dr === 0 || dc === 0 || absR === absC) return isFreePath(from, to);
    }

    if (piece === "♘" || piece === "♞") {
        if ((absR === 2 && absC === 1) || (absR === 1 && absC === 2)) return true;
    }

    if (piece === "♔" || piece === "♚") {
        if (absR <= 1 && absC <= 1) return true;
    }

    return false;
}


board.addEventListener("click", function(event) {
    if (event.target.tagName !== "TD") return;

    let clickedCell = event.target;
    let piece = clickedCell.innerText;

    if (activeCell) {
        let start = getCoords(activeCell);
        let end = getCoords(clickedCell);

        if (canMove(activeCell.innerText, start, end)) {
            let targetPiece = clickedCell.innerText;

            if (
                targetPiece === "" ||
                (isWhitePiece(activeCell.innerText) && isBlackPiece(targetPiece)) ||
                (isBlackPiece(activeCell.innerText) && isWhitePiece(targetPiece))
            ) {
                clickedCell.innerText = activeCell.innerText;
                activeCell.innerText = "";
                currentPlayer = currentPlayer === "white" ? "black" : "white";
            }
        }

        activeCell.style.outline = "";
        activeCell = null;
    } 
    else {
        if (piece === "") return;

        if (
            (currentPlayer === "white" && isWhitePiece(piece)) ||
            (currentPlayer === "black" && isBlackPiece(piece))
        ) {
            activeCell = clickedCell;
            clickedCell.style.outline = "3px solid red";
        }
    }
});