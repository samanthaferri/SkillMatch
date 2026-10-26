//-----------------------------------------------------------------------
// SkillMatch JS: Simulador de Compatibilidade com Vaga Front-End Júnior
//-----------------------------------------------------------------------

const Candidato = require("./Candidato");
const candidatos = require("./database/bd_candidatos");
const VagaRemota = require("./VagaRemota");
const VagaPresencial = require("./VagaPresencial");
const vagasRemotas = require("./database/bd_vagas_remotas");
const vagasPresenciais = require("./database/bd_vagas_presenciais");

//-----------------------------------------------------------------------
// BUSCA DOS DADOS
//-----------------------------------------------------------------------

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

    //-----------------------

    //Mostrando todos os candidatos disponíveis
    console.log(`\n\n...................... Candidatos (${listaCandidatos.length}) ......................\n`);
    listaCandidatos.forEach((candidato) => {
      candidato.mostrarCandidato();
    });

    //-----------------------

    //Concatenei as vagas presenciais com as remotas, assim tenho um array único de vagas
    const listaVagas = listaVagasPresenciais.concat(listaVagasRemotas);

    //Mostrando todas as vagas disponíveis
    console.log(`\n...................... Vagas (${listaVagas.length}) ......................\n`);
    listaVagas.forEach((vaga) => {
      vaga.mostrarVaga();
    });

    //-----------------------

    //Comparando compatibilidade
    console.log(`\n\n...................... Calculando compatibilidade ......................\n`);

    const resultadoCompatibilidade = [];
    listaCandidatos.forEach((candidato) => {
      listaVagas.forEach((vaga) => {
        resultadoCompatibilidade.push(vaga.compararCompatibilidade(candidato));
      });
    });
  } catch (e) {
    console.log("erro\n" + e);
  }
}

main();
