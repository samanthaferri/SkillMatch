//-----------------------------------------------------------------------
// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior
//-----------------------------------------------------------------------

const Candidato = require("./Candidato");
const candidatos = require("./database/bd_candidatos");
const Vaga = require("./vaga");
const VagaRemota = require("./VagaRemota");
const VagaPresencial = require("./VagaPresencial");
const vagasRemotas = require("./database/bd_vagas_remotas");
const vagasPresenciais = require("./database/bd_vagas_presenciais");

//-----------------------

function buscarCandidatos() {
  return new Promise((resolve, reject) => {
    console.log("\n🔎 Buscando candidatos...\n");

    setTimeout(() => {
      if (candidatos !== null && candidatos.length > 0) {
        resolve(candidatos);
      } else {
        reject("Nenhum candidato encontrado!");
      }
    }, 1000);
  });
}

//-----------------------

function bucarVagasRemotas() {
  return new Promise((resolve, reject) => {
    console.log("\n🔎 Buscando vagas remotas...\n");
    setTimeout(() => {
      if (vagasRemotas != null && vagasRemotas.length > 0) {
        resolve(vagasRemotas);
      } else {
        reject("Nenhuma vaga remota encontrada!");
      }
    }, 1000);
  });
}

//-----------------------

function bucarVagasPresenciais() {
  return new Promise((resolve, reject) => {
    console.log("\n🔎 Buscando vagas presenciais...\n");
    setTimeout(() => {
      if (vagasPresenciais != null && vagasPresenciais.length > 0) {
        resolve(vagasPresenciais);
      } else {
        reject("Nenhuma vaga remota encontrada!");
      }
    }, 1000);
  });
}

//-----------------------

async function main() {
  try {
    //Candidatos
    const candidatosResponse = await buscarCandidatos();
    const listaCandidatos = candidatosResponse.map(
      (candidatosObj) =>
        new Candidato(
          candidatosObj.nome,
          candidatosObj.sobrenome,
          candidatosObj.areaInteresse,
          candidatosObj.habilidades,
          candidatosObj.tempoExperiencia,
        ),
    );

    //Vagas remotas
    const vagasRemotasResponse = await bucarVagasRemotas();
    const listaVagasRemotas = vagasRemotasResponse.map(
      (remotasObj) =>
        new VagaRemota(
          remotasObj.cargo,
          remotasObj.empresa,
          remotasObj.requisitos,
          remotasObj.salario,
          remotasObj.areaVaga,
          remotasObj.valeRefeicao,
          remotasObj.equipamentoFornecido,
          remotasObj.auxilioHomeOffice,
        ),
    );

    //Vagas presenciais
    const vagasPresenciaisResponse = await bucarVagasPresenciais();
    const listaVagasPresenciais = vagasPresenciaisResponse.map(
      (presenciaisObj) =>
        new VagaPresencial(
          presenciaisObj.cargo,
          presenciaisObj.empresa,
          presenciaisObj.requisitos,
          presenciaisObj.salario,
          presenciaisObj.areaVaga,
          presenciaisObj.valeRefeicao,
          presenciaisObj.endereco,
          presenciaisObj.valeTransporte,
        ),
    );

    console.log(`\n\n======== Candidatos (${listaCandidatos.length}) ========\n`);
    listaCandidatos.forEach((candidato) => {
      candidato.mostrarCandidato();
    });

    console.log(`\n======== Vagas (${vagasRemotas.length + vagasPresenciais.length}) ========\n`);

    listaVagasRemotas.forEach((vagaRemota) => {
      vagaRemota.mostrarVaga();
    });

    listaVagasPresenciais.forEach((vagaPresencial) => {
      vagaPresencial.mostrarVaga();
    });
  } catch (e) {
    console.log("erro\n" + e);
  }
}

main();
