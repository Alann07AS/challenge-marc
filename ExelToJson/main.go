package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strings"
)

// !!!!!!!!!!!!!!!  préciser le nombre de question présent !!!!!!!!!!!!!//
const QUESTIONS_NB = 75

// !!!!!!!!!!!!!!!  préciser le nombre de question présent !!!!!!!!!!!!!//

func main() {
	allColumn, err := filepath.Glob("./table/*") // recupere tout mes chemin de fichier column
	if err != nil {
		panic(err)
	}

	bf := make([]byte, 24000)                                 // prepare le buffer
	questions := make([]map[string]interface{}, QUESTIONS_NB) // prepare le bon nombre de question  définis dans la const QUESTION_NB
	for i := range questions {
		questions[i] = map[string]interface{}{} // créé les maps pour chaque elements
	}

	for _, v := range allColumn { // parcour chaqu'un de mes fichiers column
		file, err := os.Open(v) // ouvre le fichier
		if err != nil {
			panic(err)
		}
		n, err := file.Read(bf) // lis le fichier et le met dans le buffer en renvoyant la len() du message dans "n"
		if err != nil {
			panic(err)
		}
		str := string(bf[:n])            // cast en string
		rows := strings.Split(str, "\n") // split ligne par ligne
		key := ""                        // declare ma variable qui contien la clé concerner
		for i, v := range rows {         // boucle sur chaque ligne
			if i == 0 { // la premiere ligne est la clé de chaque objet
				key = v
				continue
			}
			questions[i-1][key] = v // remplie chaque objet avec sa valeur à sa bonne clé
		}
	}
	for i, v := range questions { // rajoute un id a chaque objet
		v["id"] = i + 1
	}
	result, err := os.Create("result.json") // prepare le fichier json
	if err != nil {
		panic(err)
	}
	json, err := json.MarshalIndent(questions, "	", "	") // parse le tableau de maps en []byte json
	if err != nil {
		panic(err)
	}
	result.Write(json) // ecrit le json dans le fichier
}
