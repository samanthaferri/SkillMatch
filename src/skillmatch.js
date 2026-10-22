//-----------------------------------------------------------------------
// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior
//-----------------------------------------------------------------------

const Candidato = require("./Candidato");
const Vaga = require("./vaga");
const VagaRemota = require("./VagaRemota");
const VagaPresencial = require("./VagaPresencial");
const vagasRemotas = require("./database/bd_vagas_remotas");
const vagasPresenciais = require("./database/bd_vagas_presenciais");
const candidatos = require("./database/bd_candidatos");

//-----------------------

//função para buscar as vagas existentes
function bucarVagas() {
  return new Promise((resolve, reject) => {
    console.log("Buscando vagas...");
    setTimeout(() => {
      if (vagas) {
        resolve(vagas);
      } else {
        reject("Nenhuma vaga encontrada!");
      }
    }, 1000);
  });
}

//-----------------------------------

//função central
async function main() {
  try {
    console.log("funcionou");
    const vagasResponse = await bucarVagas();
    const listaVagas = vagasResponse.map(
      (vagasObj) =>
        new Vaga(vagasObj.cargo, vagasObj.empresa, vagasObj.requisitos),
    );
    //console.log(vagasResponse);
    listaVagas.forEach((vaga) => {
      //vaga.mostrarVaga();
    });
  } catch (e) {
    console.log("erro\n" + e);
  }
}

main();
