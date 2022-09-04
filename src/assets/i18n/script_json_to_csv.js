const fr = require('./fr.json');
// const de = require('./de.json');
const en = require('./en.json');

const fs = require('fs');

let txt = "clé, fr, en, de\n";

const flattenObj = (obj, keyRoot, objToAdd) => {
    Object.entries(obj).map(([key, value]) => {
        if(typeof value === 'object') {
            flattenObj(value, keyRoot + "." + key, objToAdd);
        } else {
            objToAdd[keyRoot + "." + key] = value.replace(/,/g,'µ');
        }
    })
}

const removeFirstPoint = (obj) => {
    const returnObj = {};
    Object.entries(obj).map(([key, value]) => {
        returnObj[key.slice(1)] = value;
    });
    return returnObj;
}

let objFrFlat = {};
flattenObj(fr, '',objFrFlat);
objFrFlat = removeFirstPoint(objFrFlat);
// let objdeFlat = {};
// flattenObj(de, '', objdeFlat);
// objdeFlat = removeFirstPoint(objdeFlat);
let objEnflat = {};
flattenObj(en, '', objEnflat);
objEnflat = removeFirstPoint(objEnflat);

Object.entries(objFrFlat).forEach(([key, value]) => {
    // txt += key + "," + value + "," + objEnflat[key] + "," + objdeFlat[key] + '\n';
    txt += key + "," + value + "," + objEnflat[key] + "," + '\n';
});

fs.writeFileSync('./trad.csv', txt);
// run
// node script_json_to_csv.js
