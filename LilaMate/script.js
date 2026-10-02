
/* =========================================
   LILAMATE - JAVASCRIPT
   ========================================= */


/* =========================================
   PIEZAS
   ========================================= */

const pieces = {

    w: {
        k: "♔",
        q: "♕",
        r: "♖",
        b: "♗",
        n: "♘",
        p: "♙"
    },

    b: {
        k: "♚",
        q: "♛",
        r: "♜",
        b: "♝",
        n: "♞",
        p: "♟"
    }

};


const pieceNames = {

    k: "Rey",
    q: "Dama",
    r: "Torre",
    b: "Alfil",
    n: "Caballo",
    p: "Peón"

};


/* =========================================
   TRADUCCIONES
   ========================================= */

const translations = {

    es: {

        subtitle:
            "Un pequeño mundo de ajedrez en colores pastel",

        theme:
            "Modo noche",

        themeDay:
            "Modo día",

        computer:
            "Contra computadora",

        twoPlayers:
            "Dos jugadores",

        suggestions:
            "Sugerencias: ON",

        suggestionsOff:
            "Sugerencias: OFF",

        newGame:
            "Nueva partida",

        save:
            "Guardar",

        load:
            "Cargar",

        gameInfo:
            "Partida",

        players:
            "Jugadores",

        turn:
            "Turno",

        moves:
            "Movimientos",

        suggestionTitle:
            "Sugerencia:",

        createdBy:
            "Creado con ♡ por",

        white:
            "Blancas",

        black:
            "Negras",

        you:
            "Tú",

        computerName:
            "Computadora",

        saved:
            "Partida guardada automáticamente",

        loaded:
            "Partida cargada",

        noSaved:
            "No hay ninguna partida guardada",

        check:
            "¡Jaque!",

        checkmate:
            "¡Jaque mate!",

        stalemate:
            "Tablas por ahogado",

        gameOver:
            "Partida terminada",

        suggested:
            "Podrías jugar"

    },


    en: {

        subtitle:
            "A little pastel-colored chess world",

        theme:
            "Dark mode",

        themeDay:
            "Day mode",

        computer:
            "Play computer",

        twoPlayers:
            "Two players",

        suggestions:
            "Suggestions: ON",

        suggestionsOff:
            "Suggestions: OFF",

        newGame:
            "New game",

        save:
            "Save",

        load:
            "Load",

        gameInfo:
            "Game",

        players:
            "Players",

        turn:
            "Turn",

        moves:
            "Moves",

        suggestionTitle:
            "Suggestion:",

        createdBy:
            "Made with ♡ by",

        white:
            "White",

        black:
            "Black",

        you:
            "You",

        computerName:
            "Computer",

        saved:
            "Game automatically saved",

        loaded:
            "Game loaded",

        noSaved:
            "No saved game",

        check:
            "Check!",

        checkmate:
            "Checkmate!",

        stalemate:
            "Stalemate",

        gameOver:
            "Game over",

        suggested:
            "You could play"

    },


    pt: {

        subtitle:
            "Um pequeno mundo de xadrez em cores pastel",

        theme:
            "Modo noturno",

        themeDay:
            "Modo diurno",

        computer:
            "Contra computador",

        twoPlayers:
            "Dois jogadores",

        suggestions:
            "Sugestões: ON",

        suggestionsOff:
            "Sugestões: OFF",

        newGame:
            "Nova partida",

        save:
            "Salvar",

        load:
            "Carregar",

        gameInfo:
            "Partida",

        players:
            "Jogadores",

        turn:
            "Turno",

        moves:
            "Movimentos",

        suggestionTitle:
            "Sugestão:",

        createdBy:
            "Feito com ♡ por",

        white:
            "Brancas",

        black:
            "Pretas",

        you:
            "Você",

        computerName:
            "Computador",

        saved:
            "Partida salva automaticamente",

        loaded:
            "Partida carregada",

        noSaved:
            "Nenhuma partida salva",

        check:
            "Xeque!",

        checkmate:
            "Xeque-mate!",

        stalemate:
            "Empate por afogamento",

        gameOver:
            "Fim da partida",

        suggested:
            "Você poderia jogar"

    }

};


/* =========================================
   VARIABLES
   ========================================= */

let board = [];

let turn = "w";

let selected = null;

let legalMoves = [];

let gameMode = "computer";

let suggestionsEnabled = true;

let gameOver = false;

let moveHistory = [];

let language = "es";


/* =========================================
   ELEMENTOS
   ========================================= */

const boardElement =
    document.getElementById("board");

const movesElement =
    document.getElementById("moves");

const turnText =
    document.getElementById("turnText");

const turnSide =
    document.getElementById("turnSide");

const modeText =
    document.getElementById("modeText");

const playersText =
    document.getElementById("playersText");

const suggestionBox =
    document.getElementById("suggestion");

const suggestionText =
    document.getElementById("suggestionText");


/* =========================================
   CREAR TABLERO
   ========================================= */

function createInitialBoard() {

    const b =
        Array(8)
        .fill(null)
        .map(
            () =>
                Array(8).fill(null)
        );


    const order = [
        "r",
        "n",
        "b",
        "q",
        "k",
        "b",
        "n",
        "r"
    ];


    for (let c = 0; c < 8; c++) {

        b[0][c] = {
            color: "b",
            type: order[c]
        };

        b[1][c] = {
            color: "b",
            type: "p"
        };


        b[6][c] = {
            color: "w",
            type: "p"
        };

        b[7][c] = {
            color: "w",
            type: order[c]
        };

    }

    return b;
}


/* =========================================
   NUEVA PARTIDA
   ========================================= */

function newGame() {

    board =
        createInitialBoard();

    turn = "w";

    selected = null;

    legalMoves = [];

    gameOver = false;

    moveHistory = [];

    renderBoard();

    renderMoves();

    updateStatus();

    updateSuggestion();

    saveGame(true);
}


/* =========================================
   RENDERIZAR TABLERO
   ========================================= */

function renderBoard() {

    boardElement.innerHTML = "";


    for (let r = 0; r < 8; r++) {

        for (let c = 0; c < 8; c++) {

            const square =
                document.createElement("div");


            square.className =
                "square " +
                (
                    (r + c) % 2 === 0
                        ? "light"
                        : "dark"
                );


            square.dataset.row = r;

            square.dataset.col = c;


            if (
                selected &&
                selected.r === r &&
                selected.c === c
            ) {

                square.classList.add(
                    "selected"
                );
            }


            const isLegal =
                legalMoves.some(
                    m =>
                        m.r === r &&
                        m.c === c
                );


            if (isLegal) {

                if (board[r][c]) {

                    square.classList.add(
                        "capture"
                    );

                } else {

                    square.classList.add(
                        "legal"
                    );

                }

            }


            if (board[r][c]) {

                const piece =
                    document.createElement("span");


                piece.className =
                    "piece " +
                    (
                        board[r][c].color === "w"
                            ? "white-piece"
                            : "black-piece"
                    );


                piece.textContent =
                    pieces[
                        board[r][c].color
                    ][
                        board[r][c].type
                    ];


                square.appendChild(piece);

            }


            square.addEventListener(
                "click",
                handleSquareClick
            );


            boardElement.appendChild(
                square
            );

        }

    }

}


/* =========================================
   CLICK EN TABLERO
   ========================================= */

function handleSquareClick(e) {

    if (gameOver) return;


    if (
        gameMode === "computer" &&
        turn === "b"
    ) {
        return;
    }


    const square =
        e.currentTarget;


    const r =
        Number(square.dataset.row);

    const c =
        Number(square.dataset.col);


    const piece =
        board[r][c];


    if (selected) {

        const valid =
            legalMoves.find(
                m =>
                    m.r === r &&
                    m.c === c
            );


        if (valid) {

            makeMove(
                selected.r,
                selected.c,
                r,
                c
            );

            return;
        }

    }


    if (
        piece &&
        piece.color === turn
    ) {

        selected = {
            r,
            c
        };


        legalMoves =
            getLegalMoves(
                board,
                r,
                c
            );


        renderBoard();

    } else {

        selected = null;

        legalMoves = [];

        renderBoard();

    }

}


/* =========================================
   HACER MOVIMIENTO
   ========================================= */

function makeMove(
    fr,
    fc,
    tr,
    tc,
    computerMove = false
) {

    const movingPiece =
        board[fr][fc];

    const capturedPiece =
        board[tr][tc];


    const notation =
        createNotation(
            fr,
            fc,
            tr,
            tc,
            movingPiece,
            capturedPiece
        );


    board[tr][tc] =
        movingPiece;

    board[fr][fc] =
        null;


    /* PROMOCIÓN AUTOMÁTICA */

    if (
        movingPiece.type === "p" &&
        (
            tr === 0 ||
            tr === 7
        )
    ) {

        movingPiece.type =
            "q";
    }


    moveHistory.push({

        color:
            movingPiece.color,

        notation:
            notation

    });


    turn =
        turn === "w"
            ? "b"
            : "w";


    selected = null;

    legalMoves = [];


    renderBoard();

    renderMoves();

    updateStatus();

    updateSuggestion();

    saveGame(true);


    checkGameState();


    /* TURNO DE LA IA */

    if (
        !gameOver &&
        gameMode === "computer" &&
        turn === "b" &&
        !computerMove
    ) {

        setTimeout(
            computerTurn,
            450
        );
    }

}


/* =========================================
   MOVIMIENTOS POSIBLES
   ========================================= */

function getPseudoMoves(
    b,
    r,
    c
) {

    const piece =
        b[r][c];


    if (!piece)
        return [];


    const moves = [];


    function add(nr, nc) {

        if (
            nr < 0 ||
            nr > 7 ||
            nc < 0 ||
            nc > 7
        ) {
            return;
        }


        if (!b[nr][nc]) {

            moves.push({
                r: nr,
                c: nc
            });

        } else if (
            b[nr][nc].color !==
            piece.color
        ) {

            moves.push({
                r: nr,
                c: nc
            });

        }

    }


    function slide(dr, dc) {

        let nr =
            r + dr;

        let nc =
            c + dc;


        while (
            nr >= 0 &&
            nr <= 7 &&
            nc >= 0 &&
            nc <= 7
        ) {

            if (!b[nr][nc]) {

                moves.push({
                    r: nr,
                    c: nc
                });

            } else {

                if (
                    b[nr][nc].color !==
                    piece.color
                ) {

                    moves.push({
                        r: nr,
                        c: nc
                    });

                }

                break;
            }


            nr += dr;

            nc += dc;

        }

    }


    switch (piece.type) {

        case "p": {

            const dir =
                piece.color === "w"
                    ? -1
                    : 1;


            const start =
                piece.color === "w"
                    ? 6
                    : 1;


            if (
                r + dir >= 0 &&
                r + dir <= 7 &&
                !b[r + dir][c]
            ) {

                moves.push({
                    r: r + dir,
                    c
                });


                if (
                    r === start &&
                    !b[r + 2 * dir][c]
                ) {

                    moves.push({
                        r:
                            r + 2 * dir,
                        c
                    });

                }

            }


            for (
                const dc of [-1, 1]
            ) {

                const nr =
                    r + dir;

                const nc =
                    c + dc;


                if (
                    nr >= 0 &&
                    nr <= 7 &&
                    nc >= 0 &&
                    nc <= 7 &&
                    b[nr][nc] &&
                    b[nr][nc].color !==
                        piece.color
                ) {

                    moves.push({
                        r: nr,
                        c: nc
                    });

                }

            }

            break;
        }


        case "n":

            [
                [-2,-1],
                [-2,1],
                [-1,-2],
                [-1,2],
                [1,-2],
                [1,2],
                [2,-1],
                [2,1]

            ].forEach(
                ([dr,dc]) =>
                    add(
                        r + dr,
                        c + dc
                    )
            );

            break;


        case "b":

            slide(1,1);
            slide(1,-1);
            slide(-1,1);
            slide(-1,-1);

            break;


        case "r":

            slide(1,0);
            slide(-1,0);
            slide(0,1);
            slide(0,-1);

            break;


        case "q":

            slide(1,1);
            slide(1,-1);
            slide(-1,1);
            slide(-1,-1);

            slide(1,0);
            slide(-1,0);
            slide(0,1);
            slide(0,-1);

            break;


        case "k":

            for (
                let dr = -1;
                dr <= 1;
                dr++
            ) {

                for (
                    let dc = -1;
                    dc <= 1;
                    dc++
                ) {

                    if (
                        dr !== 0 ||
                        dc !== 0
                    ) {

                        add(
                            r + dr,
                            c + dc
                        );

                    }

                }

            }

            break;

    }


    return moves;
}


/* =========================================
   CLONAR TABLERO
   ========================================= */

function cloneBoard(b) {

    return b.map(
        row =>
            row.map(
                piece =>
                    piece
                        ? {...piece}
                        : null
            )
    );
}


/* =========================================
   APLICAR MOVIMIENTO
   ========================================= */

function applyMove(
    b,
    fr,
    fc,
    tr,
    tc
) {

    b[tr][tc] =
        b[fr][fc];

    b[fr][fc] =
        null;
}


/* =========================================
   ENCONTRAR REY
   ========================================= */

function findKing(
    b,
    color
) {

    for (
        let r = 0;
        r < 8;
        r++
    ) {

        for (
            let c = 0;
            c < 8;
            c++
        ) {

            const p =
                b[r][c];


            if (
                p &&
                p.color === color &&
                p.type === "k"
            ) {

                return {
                    r,
                    c
                };

            }

        }

    }


    return null;
}


/* =========================================
   CASILLA ATACADA
   ========================================= */

function isSquareAttacked(
    b,
    r,
    c,
    byColor
) {

    for (
        let rr = 0;
        rr < 8;
        rr++
    ) {

        for (
            let cc = 0;
            cc < 8;
            cc++
        ) {

            const p =
                b[rr][cc];


            if (
                !p ||
                p.color !== byColor
            ) {
                continue;
            }


            const moves =
                getPseudoMoves(
                    b,
                    rr,
                    cc
                );


            if (
                moves.some(
                    m =>
                        m.r === r &&
                        m.c === c
                )
            ) {

                return true;
            }

        }

    }


    return false;
}


/* =========================================
   JAQUE
   ========================================= */

function isInCheck(
    b,
    color
) {

    const king =
        findKing(
            b,
            color
        );


    if (!king)
        return true;


    const enemy =
        color === "w"
            ? "b"
            : "w";


    return isSquareAttacked(
        b,
        king.r,
        king.c,
        enemy
    );
}


/* =========================================
   MOVIMIENTOS LEGALES
   ========================================= */

function getLegalMoves(
    b,
    r,
    c
) {

    const piece =
        b[r][c];


    if (!piece)
        return [];


    const pseudo =
        getPseudoMoves(
            b,
            r,
            c
        );


    return pseudo.filter(
        move => {

            const copy =
                cloneBoard(b);


            applyMove(
                copy,
                r,
                c,
                move.r,
                move.c
            );


            return !isInCheck(
                copy,
                piece.color
            );

        }
    );
}


/* =========================================
   TODOS LOS MOVIMIENTOS
   ========================================= */

function getAllLegalMoves(
    b,
    color
) {

    const all = [];


    for (
        let r = 0;
        r < 8;
        r++
    ) {

        for (
            let c = 0;
            c < 8;
            c++
        ) {

            if (
                b[r][c] &&
                b[r][c].color === color
            ) {

                const moves =
                    getLegalMoves(
                        b,
                        r,
                        c
                    );


                moves.forEach(
                    move => {

                        all.push({

                            fr: r,
                            fc: c,

                            tr: move.r,
                            tc: move.c

                        });

                    }
                );

            }

        }

    }


    return all;
}


/* =========================================
   INTELIGENCIA ARTIFICIAL
   ========================================= */

function computerTurn() {

    if (
        gameOver ||
        gameMode !== "computer" ||
        turn !== "b"
    ) {
        return;
    }


    const moves =
        getAllLegalMoves(
            board,
            "b"
        );


    if (!moves.length)
        return;


    let bestScore =
        -Infinity;


    let bestMoves = [];


    for (
        const move of moves
    ) {

        const piece =
            board[
                move.fr
            ][
                move.fc
            ];


        const captured =
            board[
                move.tr
            ][
                move.tc
            ];


        let score =
            Math.random() * 2;


        if (captured) {

            score +=
                pieceValue(
                    captured.type
                ) * 10;
        }


        if (
            piece.type === "p"
        ) {

            score +=
                move.tr * .4;
        }


        score +=
            pieceValue(
                piece.type
            ) * .05;


        if (
            score >
            bestScore
        ) {

            bestScore =
                score;

            bestMoves =
                [move];

        } else if (
            Math.abs(
                score -
                bestScore
            ) < .01
        ) {

            bestMoves.push(
                move
            );

        }

    }


    const chosen =
        bestMoves[
            Math.floor(
                Math.random() *
                bestMoves.length
            )
        ];


    makeMove(
        chosen.fr,
        chosen.fc,
        chosen.tr,
        chosen.tc,
        true
    );
}


/* =========================================
   VALOR PIEZAS
   ========================================= */

function pieceValue(type) {

    const values = {

        p: 1,
        n: 3,
        b: 3,
        r: 5,
        q: 9,
        k: 100

    };


    return values[type] || 0;
}


/* =========================================
   ESTADO DEL JUEGO
   ========================================= */

function checkGameState() {

    const legal =
        getAllLegalMoves(
            board,
            turn
        );


    if (
        legal.length === 0
    ) {

        gameOver = true;


        if (
            isInCheck(
                board,
                turn
            )
        ) {

            const winner =
                turn === "w"
                    ? translations[
                        language
                      ].black
                    : translations[
                        language
                      ].white;


            showModal(

                translations[
                    language
                ].checkmate,

                `${translations[language].gameOver}: ${winner}`

            );

        } else {

            showModal(

                translations[
                    language
                ].stalemate,

                translations[
                    language
                ].gameOver

            );

        }

        return;
    }


    if (
        isInCheck(
            board,
            turn
        )
    ) {

        turnText.textContent =
            `${translations[language].check} ${getTurnName()}`;

    }

}


/* =========================================
   NOMBRE DEL TURNO
   ========================================= */

function getTurnName() {

    return turn === "w"
        ? translations[
            language
          ].white
        : translations[
            language
          ].black;
}


/* =========================================
   ACTUALIZAR ESTADO
   ========================================= */

function updateStatus() {

    const t =
        translations[
            language
        ];


    turnText.textContent =
        `${t.turn}: ${getTurnName()}`;


    turnSide.textContent =
        getTurnName();


    if (
        gameMode === "computer"
    ) {

        modeText.textContent =
            "🤖 " +
            t.computer;


        playersText.textContent =
            `${t.you} vs. ${t.computerName}`;

    } else {

        modeText.textContent =
            "👥 " +
            t.twoPlayers;


        playersText.textContent =
            `${t.white} vs. ${t.black}`;

    }

}


/* =========================================
   NOTACIÓN
   ========================================= */

function createNotation(
    fr,
    fc,
    tr,
    tc,
    piece,
    captured
) {

    const files =
        "abcdefgh";


    const from =
        files[fc] +
        (8 - fr);


    const to =
        files[tc] +
        (8 - tr);


    const symbol =
        piece.type === "p"
            ? ""
            : piece.type.toUpperCase();


    return (
        symbol +
        from +
        (
            captured
                ? "x"
                : "-"
        ) +
        to
    );
}


/* =========================================
   HISTORIAL
   ========================================= */

function renderMoves() {

    movesElement.innerHTML = "";


    for (
        let i = 0;
        i < moveHistory.length;
        i += 2
    ) {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "move-row";


        const number =
            document.createElement(
                "span"
            );


        number.textContent =
            `${Math.floor(i / 2) + 1}.`;


        const white =
            document.createElement(
                "span"
            );


        white.textContent =
            moveHistory[i]
                ? moveHistory[i].notation
                : "";


        const black =
            document.createElement(
                "span"
            );


        black.textContent =
            moveHistory[i + 1]
                ? moveHistory[
                    i + 1
                  ].notation
                : "";


        row.append(
            number,
            white,
            black
        );


        movesElement.appendChild(
            row
        );

    }

}


/* =========================================
   SUGERENCIAS
   ========================================= */

function updateSuggestion() {

    if (
        !suggestionsEnabled ||
        gameOver ||
        gameMode !== "computer" ||
        turn !== "w"
    ) {

        suggestionBox.classList.remove(
            "show"
        );

        return;
    }


    const moves =
        getAllLegalMoves(
            board,
            "w"
        );


    if (!moves.length) {

        suggestionBox.classList.remove(
            "show"
        );

        return;
    }


    let best =
        moves[0];


    let bestScore =
        -Infinity;


    for (
        const move of moves
    ) {

        const captured =
            board[
                move.tr
            ][
                move.tc
            ];


        let score =
            Math.random() * 2;


        if (captured) {

            score +=
                pieceValue(
                    captured.type
                ) * 5;
        }


        const piece =
            board[
                move.fr
            ][
                move.fc
            ];


        if (
            piece.type === "p"
        ) {

            score +=
                (
                    6 -
                    move.tr
                ) * .1;
        }


        if (
            score >
            bestScore
        ) {

            bestScore =
                score;

            best =
                move;
        }

    }


    const files =
        "abcdefgh";


    const from =
        files[best.fc] +
        (8 - best.fr);


    const to =
        files[best.tc] +
        (8 - best.tr);


    const piece =
        board[
            best.fr
        ][
            best.fc
        ];


    const name =
        pieceNames[
            piece.type
        ];


    suggestionText.textContent =
        `${translations[language].suggested}: ${name} ${from} → ${to}`;


    suggestionBox.classList.add(
        "show"
    );
}


/* =========================================
   GUARDAR PARTIDA
   ========================================= */

function saveGame(
    silent = false
) {

    const data = {

        board,

        turn,

        moveHistory,

        gameMode,

        suggestionsEnabled,

        language,

        darkMode:
            document.body
                .classList
                .contains("dark")

    };


    localStorage.setItem(
        "lilamate-save",
        JSON.stringify(data)
    );


    if (!silent) {

        showModal(

            "💾",

            translations[
                language
            ].saved

        );

    }

}


/* =========================================
   CARGAR PARTIDA
   ========================================= */

function loadGame() {

    const saved =
        localStorage.getItem(
            "lilamate-save"
        );


    if (!saved) {

        showModal(

            "📂",

            translations[
                language
            ].noSaved

        );

        return;
    }


    try {

        const data =
            JSON.parse(
                saved
            );


        board =
            data.board;


        turn =
            data.turn;


        moveHistory =
            data.moveHistory || [];


        gameMode =
            data.gameMode ||
            "computer";


        suggestionsEnabled =
            data.suggestionsEnabled !== false;


        language =
            data.language ||
            "es";


        if (
            data.darkMode
        ) {

            document.body
                .classList
                .add("dark");

        } else {

            document.body
                .classList
                .remove("dark");

        }


        document.getElementById(
            "language"
        ).value =
            language;


        updateLanguageUI();

        updateButtons();


        selected = null;

        legalMoves = [];

        gameOver = false;


        renderBoard();

        renderMoves();

        updateStatus();

        updateSuggestion();


        showModal(

            "📂",

            translations[
                language
            ].loaded

        );

    } catch (error) {

        console.error(error);


        showModal(
            "⚠️",
            "No se pudo cargar la partida."
        );

    }

}


/* =========================================
   TEMA
   ========================================= */

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body
                .classList
                .toggle("dark");


            updateThemeText();

            saveGame(true);

        }
    );


function updateThemeText() {

    const t =
        translations[
            language
        ];


    const dark =
        document.body
            .classList
            .contains("dark");


    document
        .querySelector(
            "#themeBtn span"
        )
        .textContent =
            dark
                ? t.themeDay
                : t.theme;

}


/* =========================================
   CAMBIAR MODO
   ========================================= */

document
    .getElementById("modeBtn")
    .addEventListener(
        "click",
        () => {

            gameMode =
                gameMode === "computer"
                    ? "two"
                    : "computer";


            newGame();

            updateButtons();

        }
    );


function updateButtons() {

    const btn =
        document.getElementById(
            "modeBtn"
        );


    const t =
        translations[
            language
        ];


    btn.querySelector(
        "span"
    ).textContent =

        gameMode === "computer"
            ? t.computer
            : t.twoPlayers;


    document
        .getElementById(
            "suggestBtn"
        )
        .querySelector(
            "span"
        )
        .textContent =

            suggestionsEnabled
                ? t.suggestions
                : t.suggestionsOff;


    updateThemeText();

}


/* =========================================
   SUGERENCIAS ON/OFF
   ========================================= */

document
    .getElementById(
        "suggestBtn"
    )
    .addEventListener(
        "click",
        () => {

            suggestionsEnabled =
                !suggestionsEnabled;


            updateButtons();

            updateSuggestion();

            saveGame(true);

        }
    );


/* =========================================
   NUEVA PARTIDA
   ========================================= */

document
    .getElementById(
        "newGameBtn"
    )
    .addEventListener(
        "click",
        () => {

            const question =
                language === "es"
                    ? "¿Comenzar una nueva partida?"
                    : language === "pt"
                        ? "Começar uma nova partida?"
                        : "Start a new game?";


            if (
                confirm(question)
            ) {

                newGame();

            }

        }
    );


/* =========================================
   GUARDAR
   ========================================= */

document
    .getElementById(
        "saveBtn"
    )
    .addEventListener(
        "click",
        () =>
            saveGame(false)
    );


/* =========================================
   CARGAR
   ========================================= */

document
    .getElementById(
        "loadBtn"
    )
    .addEventListener(
        "click",
        loadGame
    );


/* =========================================
   IDIOMA
   ========================================= */

document
    .getElementById(
        "language"
    )
    .addEventListener(
        "change",
        e => {

            language =
                e.target.value;


            updateLanguageUI();

            updateStatus();

            updateSuggestion();

            saveGame(true);

        }
    );


function updateLanguageUI() {

    const t =
        translations[
            language
        ];


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.dataset.i18n;


                if (t[key]) {

                    element.textContent =
                        t[key];

                }

            }
        );


    updateButtons();

}


/* =========================================
   MODAL
   ========================================= */

function showModal(
    title,
    text
) {

    document
        .getElementById(
            "modalTitle"
        )
        .textContent =
            title;


    document
        .getElementById(
            "modalText"
        )
        .textContent =
            text;


    document
        .getElementById(
            "modal"
        )
        .classList
        .add("show");

}


function closeModal() {

    document
        .getElementById(
            "modal"
        )
        .classList
        .remove("show");

}


/* =========================================
   ESCAPE
   ========================================= */

document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            selected = null;

            legalMoves = [];

            renderBoard();

        }

    }
);


/* =========================================
   AUTO GUARDADO
   ========================================= */

window.addEventListener(
    "beforeunload",
    () => {

        saveGame(true);

    }
);


/* =========================================
   INICIO
   ========================================= */

newGame();

updateLanguageUI();

updateStatus();

updateSuggestion();

