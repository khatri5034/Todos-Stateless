const sqlite3 = require("sqlite3").verbose();
const path = require('path')
const db = new sqlite3.Database("todos.db", (err) => {
    if (err) {
      return console.error("Error opening database:", err.message);
    }
    console.log("Connected to the todos database.");
   });

   db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS todos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          task TEXT NOT NULL,
          priority TEXT DEFAULT 'low',
          fun BOOLEAN DEFAULT 0,
          completed BOOLEAN NOT NULL DEFAULT 0
        )
    `);
   });
   module.exports=db;