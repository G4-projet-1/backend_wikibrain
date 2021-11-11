create database wikibrain;
use wikibrain;

	create table Role (
		id integer primary key auto_increment,
		nom varchar(20) not null
	);

	create table Utilisateur (
		id integer primary key auto_increment,
		nom varchar(20) not null,
		prenom varchar(20) not null,
		username varchar(20) not null,
		mdp varchar(50) not null,
		id_role integer not null,
		mail varchar(50),
		constraint fk_utilisateur_id_role foreign key (id_role) references Role(id) on delete cascade
	);

	create table Categorie (
		id integer primary key auto_increment,
		nom varchar(20) not null
	);

	create table Fiche (
		id integer primary key auto_increment,
		titre varchar(50) not null,
		contenu char(50) not null,
		date_creation Datetime not null,
		id_categ integer not null,
		constraint fk_fiche_id_categ foreign key (id_categ) references Categorie(id) on delete cascade,
		id_util integer not null,
		constraint fk_fiche_id_util foreign key (id_util) references Utilisateur(id) on delete cascade
	);

	create table Modification_fiche (
		id integer not null primary key auto_increment,
		date_motif Datetime not null,
		id_fiche integer not null,
		constraint fk_mod_fiche_id_fiche foreign key (id_fiche) references Fiche(id) on delete cascade,
		id_util integer not null,
		constraint fk_mod_fiche_id_util foreign key (id_util) references Utilisateur(id) on delete cascade
	);

	create table Commentaire_fiche (
		id integer primary key auto_increment,
		contenu char(50) not null,
		date_crea Datetime not null,
		id_fiche integer not null,
		constraint fk_com_fiche_id_fiche foreign key (id_fiche) references Fiche(id) on delete cascade,
		id_util integer not null,
		constraint fk_com_fiche_id_util foreign key (id_util) references Utilisateur(id) on delete cascade
	);
