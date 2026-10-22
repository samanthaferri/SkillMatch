const Candidato = require("./");
const Vaga = require("./vaga");
const vagas = require("./database/bd_vagas");

//-----------------------------------

const candidato1 = new Candidato("Samantha", "Ferri", "Programação", "HTML", 2);
console.log(candidato1);

//-----------------------------------

console.log(vagas);
