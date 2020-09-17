export interface Step {
    
    schrittid:                  number;
    prozessid:                  number; //verweis auf einen prozess
    bez:                        string; //bezeichnung
    beschreibung:               string;
    stat:                       string; //status
    reihenfolge:                number; //wird noch nicht verwendet fuer die anzeige aber eigentlich muss zB reihenfolge = 0 beim ersten slot anzeigen, reihenfolge = 1 beim zweiten usw.
    defaultVerantwortlicher:    number;
}