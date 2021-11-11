const db = require('./db.js');
const mysql = require('mysql');
const express = require('express');
var app = express();
const port = 3000; 
const bodyparser = require('body-parser'); // obselete ne pas utiliser !!!!!

app.use(express.json());

// Connection string db mysql
var conn = mysql.createConnection({
    host:db.host,
    user:db.user,
    password:db.password,
    database:db.database
});

// verifier si la connection et bonne ou pas
conn.connect((err) => {
    if (!err) {
        console.log("La connection à la bdd est effectuée");
    } else {
        console.log("La connection à la BDD a échouée \n Erreur :" + JSON.stringify(err,undefined,2));
    }
});

// mise du serveur a l'écoute
app.listen(port, () => console.log("L'api wikibrain tourne sur : http://localhost:3000/"));

// Methodes CRUD v0

/// Utilisateur
app.get('/utilisateurs', (req,res) => {
    conn.query('SELECT * FROM Utilisateur',(err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/utilisateurs/:id', (req,res) => {
    conn.query('SELECT * FROM Utilisateur where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/utilisateurs/:id', (req,res) => {
    conn.query('DELETE FROM Utilisateur where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/utilisateurs', (req,res) => {
    let utilisateurs = req.body;
    conn.query('INSERT INTO Utilisateur (nom,prenom,username,mdp,id_role) VALUES (?,?,?,?,?)',[utilisateurs.nom,utilisateurs.prenom,utilisateurs.username,utilisateurs.mdp,utilisateurs.id_role],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/utilisateurs/:id', (req,res) => {
    let utilisateurs = req.body;
    conn.query('UPDATE Utilisateur SET nom = ? , prenom = ? , username = ? , mdp = ? WHERE id = ?',[utilisateurs.nom,utilisateurs.prenom,utilisateurs.username,utilisateurs.mdp],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///

/// Role
app.get('/roles', (req,res) =>{
    conn.query('SELECT * FROM Role',(err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/roles/:id', (req,res) => {
    conn.query('SELECT * FROM Role where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/roles/:id', (req,res) => {
    conn.query('DELETE FROM Role where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/roles', (req,res) => {
    let roles = req.body;
    conn.query('INSERT INTO Role (nom) VALUES (?)',[roles.nom],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
            res.send({
                "code":200,
                "success":"Le role a bien été crée"
            });
        } else {
            console.log(err);
            res.send({
                "code":400,
                "failed":"erreur survenue"
            })
        }
    })
});

app.post('/roles/:id', (req,res) => {
    let role = req.body;
    conn.query('UPDATE Role SET nom = ? WHERE id = ?',[role.nom],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///

/// Categorie
app.get('/categories', (req,res) =>{
    conn.query('SELECT * FROM Categorie',(err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/categories/:id', (req,res) => {
    conn.query('SELECT * FROM Categorie where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/categories/:id', (req,res) => {
    conn.query('DELETE FROM Categorie where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/categories', (req,res) => {
    let categories = req.body;
    conn.query('INSERT INTO Categorie (nom) VALUES (?)',[categories.nom],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/categories/:id', (req,res) => {
    let categories = req.body;
    conn.query('UPDATE Categorie SET nom = ? WHERE id = ?',[categories.nom],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///

/// Fiche
app.get('/fiches', (req,res) =>{
    conn.query('SELECT * FROM Fiche',(err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/fiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Fiche where id = ?',[req.params.id], (err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/fiches/search/', async (req, res) => {
    let fiche = req.body;
    conn.query('SELECT * FROM Fiche WHERE nom LIKE ?',[fiche.nom], (err,rows,fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.delete('/fiches/:id', (req,res) => {
    conn.query('DELETE FROM Fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/fiches', (req,res) => {
    let fiches = req.body;
    conn.query('INSERT INTO Fiche (titre,contenu,date_creation,id_categ,id_util) VALUES (?,?,?,?,?)',[fiches.titre,fiches.contenu,fiches.date_creation,fiches.id_categ,fiches.id_util],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/fiches/:id', (req,res) => {
    let fiches = req.body;
    conn.query('UPDATE Fiche SET titre = ? , contenu = ? WHERE id = ?',[fiches.titre,fiches.contenu],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///

/// Modification_fiche
app.get('/modfiches', (req,res) =>{
    conn.query('SELECT * FROM Modification_fiche',(err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/modfiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Modification_fiche where id = ?',[req.params.id], (err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/modfiches/:id', (req,res) => {
    conn.query('DELETE FROM Modification_fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/modfiches', (req,res) => {
    let modfiches = req.body;
    conn.query('INSERT INTO Modification_fiche (date_motif,id_fiche,id_util) VALUES (?,?,?)',[modfiches.date_motif,modfiches.id_fiche,modfiches.id_util],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/modfiches/:id', (req,res) => {
    let modfiches = req.body;
    conn.query('UPDATE Modification_fiche SET date_motif = ? , id_fiche = ? , id_util = ? WHERE id = ?',[modfiches.date_motif,modfiches.id_fiche,modfiches.id_util],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///

/// Commentaire_fiche
app.get('/comfiches', (req,res) =>{
    conn.query('SELECT * FROM Commentaire_fiche',(err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.get('/comfiches/:id', (req,res) =>{
    conn.query('SELECT * FROM Commentaire_fiche where id = ?',[req.params.id], (err,rows,fields) =>{
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

app.delete('/comfiches/:id', (req,res) => {
    conn.query('DELETE FROM Commentaire_fiche where id = ?',[req.params.id],(err,rows,fields) => {
        if (!err) {
            res.send("Données parfaitement supprimées");
        } else {
            console.log(err);
        }
    })
});

app.put('/comfiches', (req,res) => {
    let comfiches = req.body;
    conn.query('INSERT INTO Commentaire_fiche (contenu,date_crea,id_fiche,id_util) VALUES (?,?,?,?)',[comfiches.contenu,comfiches.date_crea,comfiches.id_fiche,comfiches.id_util],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});

app.post('/comfiches/:id', (req,res) => {
    let comfiches = req.body;
    conn.query('UPDATE Commentaire_fiche SET contenu = ? WHERE id = ?',[comfiches.contenu],[req.params.id],(err,rows,fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
    })
});
///
