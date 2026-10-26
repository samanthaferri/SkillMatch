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

// Simular a busca dos candidatos, com o setTimeout() para simular tempo de espera
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

// Simular a busca das vagas remotas
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

// Simular a busca das vagas presenciais
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

//-----------------------------------------------------------------------
// EXECUÇÃO PRINCIPAL
//-----------------------------------------------------------------------

async function main() {
  try {
    // Buscar os candidatos e transformar cada objeto em uma instância da classe Candidato
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

    // Buscar as vagas remotas e criar os objetos da classe VagaRemota
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

    // Buscar as vagas presenciais e criar os objetos da classe VagaPresencial
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

    //-----------------------------------------------------------------------
    // EXIBIR CANDIDATOS E VAGAS
    //-----------------------------------------------------------------------

    console.log(`\n\n...................... Candidatos (${listaCandidatos.length}) ......................\n`);

    //Mostrando todos os candidatos disponíveis
    listaCandidatos.forEach((candidato) => {
      candidato.mostrarCandidato();
    });

    // Juntar as vagas presenciais e remotas em um único array
    const listaVagas = listaVagasPresenciais.concat(listaVagasRemotas);

    console.log(`\n...................... Vagas (${listaVagas.length}) ......................\n`);

    // Mostrar todas as vagas disponíveis
    listaVagas.forEach((vaga) => {
      vaga.mostrarVaga();
    });

    //-----------------------------------------------------------------------
    // CALCULAR COMPATIBILIDADE
    //-----------------------------------------------------------------------

    console.log(`\n\n...................... Calculando compatibilidade ......................\n`);

    // Comparar cada candidato com todas as vagas e guardar os resultados em um array
    const resultadoCompatibilidade = [];

    listaCandidatos.forEach((candidato) => {
      listaVagas.forEach((vaga) => {
        resultadoCompatibilidade.push(vaga.compararCompatibilidade(candidato));
      });
    });

    //-----------------------------------------------------------------------
    // ENCONTRAR AS VAGAS MAIS COMPATÍVEIS (RF06)
    //-----------------------------------------------------------------------

    //-----------------------------------------------------------------------
    // RECOMENDAÇÕES DE ESTUDO (RF07)
    //-----------------------------------------------------------------------
  } catch (e) {
    console.log("erro\n" + e);
  }
}

main();
