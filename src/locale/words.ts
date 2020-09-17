
/*---------------------------------------------------------------------------------------------------------------------------------------------------------
    TRANSLATION in .ts-files
        add more words:   set a new variable to german.json, french.json and italian.json (all spelled the same) with the desired strings in the different languages. ready to use.
        usage:            import words from words.ts to the ts file where a translation is used and get access to the desired word in the correct language via words.[someVariableName]
    TRANSLATION in .html-files
        add i18n to html-tag <div i18n="@@variableName">Wort</div>, then add to messages.fr.xlf and messages.it.xlf a transunit
---------------------------------------------------------------------------------------------------------------------------------------------------------*/


//loads current language from environment and depending on it exports all in-ts-files-used words in the right language

import { environment } from '../environments/environment';

var wordstemp;

switch(environment.language){
    case 'fr': {
        wordstemp = require('./french.json');
        break;
    }
    case 'it': {
        wordstemp = require('./italian.json');
        break;
    }
    default: { //default german
        wordstemp = require('./german.json');
        break;
    }
}

export const words = wordstemp;

//"i18n-ts": "^1.0.2",