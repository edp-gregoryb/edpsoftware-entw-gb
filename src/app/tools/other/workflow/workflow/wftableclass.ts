import Dexie from 'dexie';


// interface Iwftable {
//     id?: number,
//     objekt: String,
//     obj_bezeichnung: String,
//     untertitel: String,
//     aschlussel: String,
//     ausgbez: String,
//     fortschritt: String
// }

// class Wftabledb extends Dexie {
//
//     wftableitems: Dexie.Table<Iwftable, number>;
//
//     constructor () {
//         super('Wftabledb');
//         this.version(1).stores({
//             wftableitems: '++id,first,last'
//         });
//         this.wftableitems = this.table('wftableitems'); // Just informing Typescript what Dexie has already done...
//     }
// }

// Instantiate it
// var db = new Wftabledb('myDb');
//
// // Open it
// db.open().catch(err => {
//     console.error(`Open failed: ${err.stack}`);
// });
