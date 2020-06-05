const sqlite3 = require('sqlite3').verbose()
//Criar obj que irá fazer operações banco de dados
const db = new sqlite3.Database('./src/database/database.db')
//utilizar o objeto de banco de dados, para nossas operações

// db.serialize(() => {
//     //criar tabela com comandos sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (
//             ?,?,?,?,?,?,?
//         );
//     `;
//     const values = ["", "", "", "", "", "", ""];

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err);
//         }
//         console.log("cadastrado com  sucesso");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData)

//     //consultar os dados
//     db.all(`SELECT * FROM places`, function(err, rows) {
//          if (err) {
//            return console.log(err);
//          }

//          console.log(`Aqui estão seus registros`)
//          console.log(rows)
//     })
//     // Deletar um dado
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//           if (err) {
//             return console.log(err);
//           }
//           console.log('Registro deletado')
//     })
// })

module.exports = db