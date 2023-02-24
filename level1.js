// LEVEL 1


const lvl1Matris =  new matrisLvl([   
    START_END, SEO,      KEYWORD, TOOLS,    ARCHI,  BALISE,     START_END,     
    HIDDEN,    HIDDEN,   ARCHI,   HIDDEN,   SEO,    HIDDEN,     HIDDEN,
    HIDDEN,    HIDDEN,   BALISE,  KEYWORD,  TOOLS,  HIDDEN,     HIDDEN
], 7);
console.log(lvl1Matris.table);
const lvl1 = new lvl(0, 6, 2, lvl1Matris);

boardObj.addLvl(lvl1);

boardObj.showBoard();


// LEVEL 2


const lvl2Matris =  new matrisLvl([   
    START_END, SEO,      KEYWORD, TOOLS,    ARCHI,  START_END,
    HIDDEN,    HIDDEN,   ARCHI,   HIDDEN,   SEO,    HIDDEN,
    HIDDEN,    HIDDEN,   BALISE,  KEYWORD,  TOOLS,  HIDDEN
], 6);

const lvl2 = new lvl(0, 5, 2, lvl2Matris);

// boardObj.addLvl(lvl2);

// boardObj.showNextLevel();

// boardObj.showBoard();