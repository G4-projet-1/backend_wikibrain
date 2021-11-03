const db = require('./db.js');
const mysql = require('mysql');
const express = require('express');
var app = express();
const port = 3000; 
const bodyparser = require('body-parser'); // obselete ne pas utiliser !!!!!

app.use(json());

// Connection string db mysql
var conn = mysql.createConnection({
    host:db.host,
    user:db.user,
    password:db.password,
    database:db.database
});

// verifier si la connection et bonne ou pas
conn.connect((err) => {
    if(!err){
        console.log("La connection a la bdd est effectuer");
    }
    else {
        console.log("La connection a la BDD à échouer \n Erreur :" + JSON.stringify(err,undefined,2));
    }
});

// mise du serveur a l'écoute
app.listen(port, () => console.log("L'api wikibrain tourne sur : http://localhost:3000/"));

// Methodes CRUD v0

/// Utilisateur
app.get('/utilisateurs', (req,res) => {
    conn.query('SELECT * FROM Utilisateur',(err,rows,fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/utilisateurs/:id', (req,res) => {
    conn.query('SELECT * FROM Utilisateur where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/utilisateurs/:id', (req,res) => {
    conn.query('DELETE FROM Utilisateur where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///

/// Role
app.get('/roles', (req,res) =>{
    conn.query('SELECT * FROM Role',(err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/roles/:id', (req,res) => {
    conn.query('SELECT * FROM Roles where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/roles/:id', (req,res) => {
    conn.query('DELETE FROM Roles where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///

/// Categorie
app.get('/categories', (req,res) =>{
    conn.query('SELECT * FROM Categorie',(err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/categories/:id', (req,res) => {
    conn.query('SELECT * FROM Categorie where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/categories/:id', (req,res) => {
    conn.query('DELETE FROM Categorie where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///

/// Fiche
app.get('/fiches', (req,res) =>{
    conn.query('SELECT * FROM Fiche',(err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/fiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Fiche where id = ?',[req.params.id], (err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/fiches/:id', (req,res) => {
    conn.query('DELETE Fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///

/// Modification_fiche
app.get('/modfiches', (req,res) =>{
    conn.query('SELECT * FROM Modification_fiche',(err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/modfiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Modification_fiche where id = ?',[req.params.id], (err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/modfiches/:id', (req,res) => {
    conn.query('DELETE Modification_fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///

/// Commentaire_fiche
app.get('/comfiches', (req,res) =>{
    conn.query('SELECT * FROM Commentaire_fiche',(err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.get('/comfiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Commentaire_fiche where id = ?',[req.params.id], (err,rows,fields) =>{
        if(!err)
        {
            res.send(rows);
        }
        else
        {
            console.log(err);
        }
    })
});

app.delete('/comfiches/:id', (req,res) => {
    conn.query('DELETE Commentaire_fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if(!err)
        {
            res.send("Données parfaitement supprimées");
        }
        else
        {
            console.log(err);
        }
    })
});
///