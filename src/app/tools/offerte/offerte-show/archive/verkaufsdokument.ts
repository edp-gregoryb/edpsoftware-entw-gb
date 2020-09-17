export interface Verkaufsdokument {
    systemfeedback: string;                         // allfällige Fehlermeldung seitens amasys
    dokumentsprache: string;                        // Sprache des Dokuments (für Template)
    guisprache: string;                             // Sprache der Bedieneroberfläche
    termid: string;                                 // termid
    firma: string;                                  // crm: Mandant, 2 auf entw
    aufnr: string;                                  // amasys: Auftragsnummer, 0 wenn neu
    kundBeznr: string;                              // crm: Kundenbeznr
    bestBeznr: string;                              // crm: Zuständige beznr
    sujet: string;                                  // Offerte faros today 2/17
    currency: string;                               // Währung aus amasys
    preisUser: number;                              // 3000
    preisAmasys: number;                            // 3450.25
    bestadr1: string;                               // amasys: Adresszeile 1
    bestadr2: string;                               // amasys: Adresszeile 2
    bestadr3: string;                               // amasys: Adresszeile 3
    bestadr4: string;                               // amasys: Adresszeile 4
    bestadr5: string;                               // amasys: Adresszeile 5
    bestadr6: string;                               // amasys: Adresszeile 6
    bestadr7: string;                               // amasys: Adresszeile 7
    bestadr8: string;                               // amasys: Adresszeile 8
    bestadr9: string;                               // amasys: Adresszeile 9
    indivAnrede: string;                            // 1. amasys: Werter Hans-Jürg
    indivEinleitungstext: string;                   // 1. amasys: Gerne unterbreiten wir Ihnen....
    indivSchlusssatz: string;                       // 1. amasys: Wir freuen uns auf die weitere Zusammenarbeit...
    ausstelldatum: string;                          // dd.mm.yyyy
    gebvertr: string;                               // crm: kurt
    verfasser1: string;                             // amasys: Kurt Muster
    verfasser1funktion: string;                     // amasys: Funktion aus Adresse, Verkaufsleiter
    // gueltigOU:  boolean;                         // allenfalls später: TRUE (= auch ohne Unterschrift gültig)
    titel: Titel[];                                 // Verknüpfung mit Titel-Records
}

export interface Titel {
    objekt: string;                                 // todo: crm: objektID aus crm-Kontext
    objBezeichnung: string;                          // amasys: Sonder Wochenzeitung
    rubrik: string;                                 // immo
    rubBezeichnung: string;                         // Immobilien
    unterrubrik: string;                            // baul
    urubBezeichnung: string;                        // Bauland
    auflage: string;                                // 25648
    werbemittel: Werbemittel[];                     // Verknüpfung mit Werbemittel-Records
}

export interface Werbemittel {
    sujetnr: string;                                // amasys: A
    werbeformatID: string;                          // mengeinheit|dismenge1|dismenge2|disanz|itformat
    werbeformat: string;                            // MM, Seitenteil, Feld inkl. Grösse
    
    // Zusatzfelder zur detaillierteren Definition eines Werbemittels ab Juni 2017
        werbeformatTyp: string;                         // "fix", "mm", "anzahl" (z.B. bei MM-Tarif wäre werbeformatTyp = 'mm')
        werbeformatDismenge1Label: string;              // -> Label für dismenge1
        werbeformatDismenge2Label: string;              // -> Label für dismenge2
        werbeformatDismenge1: number;                   // z.B. Spaltenanzahl bei MM-Tarif
        werbeformatDismenge2: number;                   // z.B. Höhe bei MM-Tarif
        werbeformatDisanz: number;                      // z.B. für Prospektbeilagen bei Typ anzahl
        werbeformatGewicht: number;                     // Gewicht bei Typ anzahl 
        werbeformatDismenge1Values: string[];           // optional: eingeschränkte Werte für dismenge1, z.B. eingeschränkte Spaltigkeit bei MM-Tarif ["1","3","5","7"]
        werbeformatDismenge2Values: string[];           // optional: eingeschränkte Werte für dismenge2
    // Ende Zusatzfelder zur detaillierteren Definition eines Werbemittels ab Juni 2017
    
    buchungsartErscheinung: string;                 // Anzahl (A) || Erscheinung / Ausgabe (E)
    // erscheinungsausgbez: string;                    // Erscheinungen Bezeichnungen
    erscheinungsausgbez: string[];                    // Erscheinungen Bezeichnungen
    erscheinungsaufdetnr: string;                   // Erscheinungen "IDs"
    erscheinungsaschlussel: string[];               // Ausgabeschluessel
    erscheinungsanzahl: number;                     // Anzahl Erscheinungen, falls nur Anzahl verwendet (Typ = "A")
    insertionsschlussAnzeige: boolean;              // TRUE (= Insertionsschluss wird ausgegeben, falls vorhanden)
    insertionsschlussDatum: string;                 // 12.03.2017
    hinweis: string;                                // redaktionelle Mitwirkung ist möglich
    platzierung: string;                            // oben rechts
    //preisUser: string;                              // 3000
    //preisAmasys: string;                            // 3450.25
    preisUser: number;                              // 3000
    preisAmasys: number;                            // 3450.25
    preisposdropdown: string;                       // Angabe DropDown
    zusatzpreispositionen: Zusatzpreisposition[];   // Verknüpfung mit Zusatzpreispositionsrecords
}

export interface Zusatzpreisposition {
    typ: string;                                    // Code aus amsys
    bezeichnung: string;                            // Farbzuschlag
    posKey: string;                                 // <Code>
    preisUser: number;                              // 300
    preisAmasys: number;                            // 50.25
    preisUserTotal: number;                         // 3500.25
    preisAmasysTotal: number;                       // 3867.55
    // preisUser: string;                              // 300
    // preisAmasys: string;                            // 50.25
}
