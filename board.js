
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
        this.matris = [[]];

        const div =  document.getElementById("board");
        this.div = div;
        // this.div.style.gridTemplateColumns = "repeat( "+this.width+" ,130px);"
    }

    clear() {
    }

    showBoard() {
        console.log(this.matris[0].length);
        // this.clear();
        this.div.innerHTML = "";
        this.div.style.gridTemplateRows = "repeat("+this.matris.length+", "+this.div.getBoundingClientRect().height/this.matris.length+"px)"
        this.div.style.gridTemplateColumns = "repeat("+this.matris[0].length+","+this.div.getBoundingClientRect().width/this.matris[0].length+"px)"
            this.matris.forEach((v, i2)=>{
                v.forEach((cas, i)=>{
                    const c = document.createElement("div");
                    const front = document.createElement("div");
                    front.classList.add("front");
                    const back = document.createElement("div");
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
                    c.classList.add(cas);
                    c.classList.add("case");
    
                    // c.setAttribute("id",`${i}`);
                    c.appendChild(front);
                    c.appendChild(back);
                    if (cas !== HIDDEN) {
                        c.style.visibility = "hidden"
                        setTimeout(()=>{c.classList.add("animate"); c.style.visibility = "visible"}, 60*(i+i2*10));    
                    }

                    this.div.appendChild(c);
                })
            })
    }
    /**
     * @param {lvl} lvl 
     */
    addLvl (lvl) {
        this.lvls.push(lvl);
    }

    showNextLevel() {
        if (this.levelToShow === 0) {
            this.matris = Array.from(this.lvls[0].matris.table);
        } else if (!(this.levelToShow >= this.lvls.length)) {
            const xy1 = this.lvls[0].end;
            const xy2 = this.lvls[this.levelToShow].start;
            this.matris = mergeTo2dArayAtCoordonate(this.lvls[0].matris.table, this.lvls[this.levelToShow].matris.table, xy1.x, xy1.y, xy2.x, xy2.y, this.lvls[0], this.lvls[this.levelToShow]);
        } else {
            console.error("No Next level to show");
            return
        }
        console.log(this.matris);
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
        this.start = {};
        this.end = {};
        this.start.id = idStart;
        this.end.id = idEnd;

        this.start.y = Math.trunc(idStart/matris.width);
        this.start.x = idStart - (this.start.y*matris.width);
        this.end.y = Math.trunc(idEnd/matris.width);
        this.end.x = idEnd - (this.end.y*matris.width);

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
            temp.push(matris.slice(i*width, i*width+width));
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
function mergeTo2dArayAtCoordonate(arr1, arr2, x1, y1, x2, y2, lv1, lv2) {
    const arr1Spaces = spacesCalc(arr1, x1, y1)
    const arr2Spaces = spacesCalc(arr2, x2, y2)
    // [haut, droite, bas, gauche]
    const dif = [(arr2Spaces[0] - arr1Spaces[0]), (arr2Spaces[1] - arr1Spaces[1]), (arr2Spaces[2] - arr1Spaces[2]), (arr2Spaces[3] - arr1Spaces[3])]
    if (dif[0] > 0) {//haut
        for (let i = 0; i < dif[0]; i++) {
            lv1.start.y++
            lv1.end.y++
            arr1.unshift(Array(arr1[0].length))
        }
    }
    if (dif[2] > 0) {//bas
        for (let i = 0; i < dif[2]; i++) {
            const t = []
            for (let i2 = 0; i2 < arr1[0].length; i2++) {
                t[i2] = null
            }
            arr1.push(t)
        }
    }
    if (dif[1] > 0) {//droite
        for (let i = 0; i < dif[1]; i++) {
            arr1.forEach( (ar) => {
                ar.push(null)
            });
        }
    }
    if (dif[3] > 0) {//gauche
        for (let i = 0; i < dif[3]; i++) {
            lv1.start.x++
            lv1.end.x++
            arr1.forEach( (ar) => {
                ar.unshift(null)
            });
        }
    }
    arr1 = replace2DArray(arr1, arr2, lv1.end.x-lv2.start.x, lv1.end.y-lv2.start.y); // (arr1[0].length-arr2[0].length)-x2, (arr1.length-arr2.length)-y2
    lv1.end.x = lv2.end.x + lv1.end.x-lv2.start.x
    lv1.end.y = lv2.end.y + lv1.end.y-lv2.start.y
    return Array.from(arr1)
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

function replace2DArray(originalArray, replacementArray, ofsetX, ofsetY) {
    const originalRowCount = originalArray.length;
    const originalColCount = originalArray[0].length;

    
    for (let i = 0; i < originalRowCount; i++) {
        for (let j = 0; j < originalColCount; j++) {
            if (i-ofsetY >= 0 && j-ofsetX >= 0 && i-ofsetY < replacementArray.length && j-ofsetX < replacementArray[0].length) {
                if (((originalArray[i][j] === HIDDEN || originalArray[i][j] === null || originalArray[i][j] === START_END)) && replacementArray[i-ofsetY][j-ofsetX] !== HIDDEN) {
                    originalArray[i][j] = replacementArray[i-ofsetY][j-ofsetX];
                }
            }
        }
    }
    originalArray.forEach((y, i)=>{
        y.forEach((x, j)=>{
            if (x === null) {
                originalArray[i][j] = HIDDEN
            }
        })
    })
    return Array.from(originalArray);
}
