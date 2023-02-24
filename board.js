console.log("INIT BOARD CLASS");

class board {
    /**
     * @param {Array.<lvl>} lvls le lvl
     * @param {Array.<card>} cards le lvl
     */
    constructor (cards) {
        /**@type {Array.<lvl>} */
        this.lvls = [];
        this.cards = cards;
        this.levelToShow = 0;
        this.width = 0;
        this.matris = [];

        const div =  document.getElementById("board");
        this.div = div;
        // this.div.style.gridTemplateColumns = "repeat( "+this.width+" ,130px);"
    }

    clear() {
        this.div.innerHTML = "";
    }

    showBoard() {
        this.clear();
        for (let iLvl = 0; iLvl <= this.levelToShow; iLvl++) {
            const lv = this.lvls[iLvl];
            lv.matris.table.forEach((v)=>{
                const c = document.createElement("div");
                const front = document.createElement("div")
                front.classList.add("front")
                const back = document.createElement("div")
                back.classList.add("back");
                back.innerHTML = 
                `<div class="container">
                <div id="score" class="score"></div>
                    <div id="question-container" class="hide">
                        <div id="question">Question</div>
                        <div id="answer-buttons" class="btn-grid">
                        <button class="btn">Answer 1</button>
                        <button class="btn">Answer 2</button>
                        <button class="btn">Answer 3</button>
                        <button class="btn">Answer 4</button>
                        </div>
                    </div>
                </div>`;
                c.classList.add(v);
                c.classList.add("case");

                // c.setAttribute("id",`${i}`);
                c.appendChild(front);
                c.appendChild(back);
                this.div.appendChild(c);
            })
        }
    }
    /**
     * @param {lvl} lvl 
     */
    addLvl (lvl) {
        this.lvls.push(lvl);
        // this.matris = mergeTo2dArayAtCoordonate(this.matris, lvl.matris.table, lvl.)
    }

    showNextLevel() {
        this.levelToShow++;
        this.showBoard();
    }
}

class boardMatrisElement {
    constructor(card, x, y, div) {

    }
}

const boardObj = new board()

class lvl {
    /**
     * @param {Number} idStart l'id de la premiere case
     * @param {Number} idEnd l'id de la derniere case
     * @param {Number} forkIN id de la fourche entre facile est difficile
     * @param {matrisLvl} matris les cards placer sur le board
     */
    constructor(idStart, idEnd, forkIN, matris) {
        this.idStart = idStart;
        this.idEnd = idEnd;

        /**@type {matrisLvl} */
        this.matris = matris;

       //pas sure 
        this.inForkId = forkIN;
        this.outForkId = this.InForkId+2;   //récuperer la bifurcation 2 case aprés
    }
}


/**
 * MATRIS EXAMPLE
 * [ START_END, SEO, KEYWORD, TOOLS, ARCHI, BALISE, START_END,
 *  HIDDEN, HIDDEN, ARCHI, HIDDEN, SEO, HIDDEN, HIDDEN
 *  HIDDEN, HIDDEN, BALISE, KEYWORD, TOOLS, HIDDEN, HIDDEN
 * ]
 */
class matrisLvl {
    /**
     * 
     * @param {Array} matris la matris dois etre composer en remplacent les case vide par HIDDEN les theme par leur categorie. Il faut au moin DEUX "START_END"
     * @param {Number} width La largeur du niveau
     */
    constructor (matris, width) {
        /**@type {Array} */
        this.width = width;
        this.height = matris.length/width;
        const temp = [];
        for (let i = 0; i < this.height; i++) {
            temp.push(matris.slice(i*width, i*width+width-1));
        }
        this.table = temp;
    }
}

class card {
    constructor (id, categorie_class, question, goodAnswer, badAnswer, difficulty) {
        this.id = id;
        this.categorie_class = categorie_class;
        this.question = question;
        this.goodAnswer = goodAnswer;
        this.badAnswer = badAnswer;
        this.difficulty = difficulty;
    }
}

class categories {
}
const START_END = "start"
const SEO = "SEO"
const KEYWORD = "keyword"
const TOOLS = "tools"
const BALISE = "balise"
const ARCHI = "archi"
const HIDDEN = "hidden"

/**
 * 
 * @param {Array} arr1 
 * @param {Array} arr2 
 */
function mergeTo2dArayAtCoordonate(arr1, arr2, x1, y1, x2, y2) {
    const arr1Spaces = spacesCalc(arr1, x1, y1)
    const arr2Spaces = spacesCalc(arr2, x2, y2)
    // [haut, droite, bas, gauche]
    const dif = [(arr2Spaces[0] - arr1Spaces[0]), (arr2Spaces[1] - arr1Spaces[1]), (arr2Spaces[2] - arr1Spaces[2]), (arr2Spaces[3] - arr1Spaces[3])]
    if (dif[0] > 0) {//haut
        for (let i = 0; i < dif[0]; i++) {
            y1++
            arr1.unshift(Array(w))
        }
    }
    if (dif[2] > 0) {//bas
        for (let i = 0; i < dif[2]; i++) {
            arr1.push(Array(w))
        }
    }
    if (dif[1] > 0) {//droite
        for (let i = 0; i < dif[1]; i++) {
            arr1.forEach( () => {
                arr1.push(null)
            });
        }
    }
    if (dif[3] > 0) {//gauche
        for (let i = 0; i < dif[3]; i++) {
            x1++
            arr1.forEach( () => {
                arr1.unshift(null)
            });
        }
    }
    return arr1
}

function spacesCalc(arr, x, y) {
    const h = arr.length;
    const w = arr[0].length;
    const droite = w - (x+1);
    const gauche = w - droite -1;
    const bas = h - (y+1);
    const haut = h - bas - 1;
    // [haut, droite, bas, gauche]
    return [haut, droite, bas, gauche];
}