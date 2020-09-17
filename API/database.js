const Sequelize = require("sequelize");

var conn;

(async function() {
    if(!conn) {
        try {
            //initialize the connection on the first run
            conn = new Sequelize("dbName", null, null, {
                dialect: "sqlite",
                storage: "db.sqlite"
            });
            console.log("Connected to the database.");

            //Create the Table
            try {
                await conn.sync({force: true });
                console.log("Created the tables successfully.");
            } catch (error) {
                console.log("Cannot create the tables. \n" + error);
            }
        } catch (error) {
            console.log("There was a problem with connection. \n" + error);
        }
    }
})();


// const Objekt = conn.define("Objekt", {
//     Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     objekt: Sequelize.STRING,
//     obj_bezeichnung: Sequelize.STRING,
//     aschlussel: Sequelize.STRING,
//     untertitel: Sequelize.STRING
// });
//
// const AnzeigeProdukt = conn.define("AnzeigeProdukt", {
//     Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     objekt: Sequelize.STRING,
//     aschlussel: Sequelize.STRING,
//     autoren: Sequelize.STRING
// });
//
// const AllArtikel = conn.define("AllArtikel", {
//     Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//     objekt: Sequelize.STRING,
//     aschlussel: Sequelize.STRING,
//     objektartikel: Sequelize.STRING,
//     prozessid: Sequelize.INTEGER,
//     bez: Sequelize.STRING,
//     startdatum: Sequelize.STRING,
//     enddatum: Sequelize.STRING,
//     artikelVerantwortlicher: Sequelize.INTEGER,
//     titel: Sequelize.STRING,
//     untertitel: Sequelize.STRING,
//     autoren: Sequelize.STRING,
//     seitenzahl: Sequelize.STRING,
//     permalinkid: Sequelize.STRING,
//     doi_nummer: Sequelize.STRING
// });

const RenderTable = conn.define("RenderTable", {
    Id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    objekt: Sequelize.STRING,
    obj_bezeichnung: Sequelize.STRING,
    untertitel: Sequelize.STRING,
    aschlussel: Sequelize.STRING,
    ausgbez: Sequelize.STRING,
    fortschritt: Sequelize.STRING
});

module.exports = {
    connection: conn,
    models: {
        // objektTable: Objekt,
        // azpTable: AnzeigeProdukt,
        // artikelTabelle: AllArtikel,
        renderTable : RenderTable
    }
}
