// LEVEL 1


const lvl1Matris =  new matrisLvl([   
    START_END, SEO,      KEYWORD, TOOLS,    ARCHI,  BALISE,     START_END,
    HIDDEN,    HIDDEN,   ARCHI,   HIDDEN,   SEO,    HIDDEN,     HIDDEN,
    HIDDEN,    HIDDEN,   BALISE,  KEYWORD,  TOOLS,  HIDDEN,     HIDDEN
], 7);
// console.log(lvl1Matris.table);
const lvl1 = new lvl(0, 6, 2, lvl1Matris);

boardObj.addLvl(lvl1);


// LEVEL 2


const lvl2Matris =  new matrisLvl([   
    HIDDEN,    HIDDEN,    START_END,
    HIDDEN,    HIDDEN,    KEYWORD,
    HIDDEN,    HIDDEN,    SEO,
    HIDDEN,    HIDDEN,    KEYWORD,
    START_END,    ARCHI,    ARCHI,
    TOOLS,    HIDDEN,    TOOLS,
    KEYWORD,    SEO,    ARCHI
], 3);

const lvl2 = new lvl(2, 12, 2, lvl2Matris);

boardObj.addLvl(lvl2);



// LEVEL 3


const lvl3Matris =  new matrisLvl([   
    HIDDEN,   BALISE,  KEYWORD,  TOOLS,  HIDDEN,     HIDDEN,    HIDDEN,
    HIDDEN,   ARCHI,   HIDDEN,   SEO,    HIDDEN,     HIDDEN,    HIDDEN,
    START_END, SEO,      KEYWORD, TOOLS,    ARCHI,  BALISE,     START_END

], 7);

const lvl3 = new lvl(20, 14, 3, lvl3Matris);

boardObj.addLvl(lvl3);


// LEVEL 4


const lvl4Matris =  new matrisLvl([   
    START_END,    HIDDEN,    HIDDEN,
    TOOLS,    HIDDEN,        HIDDEN,
    BALISE,    SEO,    KEYWORD,
    ARCHI,    HIDDEN,    BALISE,
    SEO,    ARCHI,    TOOLS,
    TOOLS,    HIDDEN,    HIDDEN,
    SEO,    ARCHI,    START_END
], 3);

const lvl4 = new lvl(0, 20, 4, lvl4Matris);

boardObj.addLvl(lvl4);



// LEVEL 5


const lvl5Matris =  new matrisLvl([   
    START_END, SEO,      KEYWORD, TOOLS,    ARCHI,  BALISE,     START_END,
    HIDDEN,   ARCHI,   HIDDEN,   SEO,    HIDDEN,     HIDDEN,    HIDDEN,
    HIDDEN,   BALISE,  KEYWORD,  TOOLS,  HIDDEN,     HIDDEN,    HIDDEN

], 7);

const lvl5 = new lvl(0, 6, 5, lvl5Matris);

boardObj.addLvl(lvl5);

boardObj.showNextLevel();
// boardObj.showNextLevel();
// boardObj.showNextLevel();
// boardObj.showNextLevel();
// boardObj.showNextLevel();



// setTimeout(boardObj.showBoard, 4000);
