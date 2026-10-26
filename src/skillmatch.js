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
        reject("Nenhuma vaga presencial encontrada!");
      }
    }, 1000);
  });
}

//-----------------------------------------------------------------------
// ANÁLISE DE COMPATIBILIDADE (FOR E CALLBACK)
//-----------------------------------------------------------------------

// Comparar cada candidato com todas as vagas
function analisarCompatibilidades(candidatos, vagas, aoComparar) {
  // Percorrer a lista de candidatos
  for (let i = 0; i < candidatos.length; i++) {
    // Percorrer todas as vagas para cada candidato
    for (let j = 0; j < vagas.length; j++) {
      const resultado = vagas[j].compararCompatibilidade(candidatos[i]);

      aoComparar(resultado); //callback
    }
  }
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

    // Realizar as comparações utilizando a função com callback
    analisarCompatibilidades(listaCandidatos, listaVagas, (resultado) => {
      resultadoCompatibilidade.push(resultado);
    });

    //-----------------------------------------------------------------------
    // ENCONTRAR AS VAGAS MAIS COMPATÍVEIS (RF06)
    //-----------------------------------------------------------------------

    console.log(`\n\n...................... Vagas mais compatíveis ......................\n`);

    // Analisar os resultados de cada candidato separadamente
    listaCandidatos.forEach((candidato) => {
      // Filtrar apenas os resultados do candidato que possuem percentual numérico
      const resultadosCandidato = resultadoCompatibilidade.filter((resultado) => {
        return resultado.candidato === candidato && typeof resultado.compatibilidade.percentual === "number";
      });

      // Procurar a maior compatibilidade até encontrar 100% ou terminar a lista
      let maiorPercentual = 0;
      let indice = 0;

      while (indice < resultadosCandidato.length && maiorPercentual < 100) {
        const percentual = resultadosCandidato[indice].compatibilidade.percentual;

        if (percentual > maiorPercentual) {
          maiorPercentual = percentual;
        }

        indice++;
      }

      // Encontrar todas as vagas com o maior percentual, incluindo possíveis empates
      const melhoresVagas = resultadosCandidato.filter((resultado) => {
        return resultado.compatibilidade.percentual === maiorPercentual;
      });

      // Mostrar as vagas mais compatíveis para o candidato
      console.log(`\n🏆 Melhores vagas para ${candidato.nome} ${candidato.sobrenome}:`);

      if (melhoresVagas.length > 0) {
        melhoresVagas.forEach((resultado) => {
          console.log(`● ${resultado.vaga} (${resultado.compatibilidade.percentual}% de compatibilidade)`);
          console.log(`  Empresa: ${resultado.empresa}`);
        });
      } else {
        console.log("  Nenhuma vaga pôde ser avaliada.");
      }

      // Encontrar as vagas que não possuem requisitos cadastrados
      const vagasNaoAvaliaveis = resultadoCompatibilidade.filter((resultado) => {
        return resultado.candidato === candidato && resultado.compatibilidade.percentual === "Não avaliável";
      });

      // Mostrar as vagas não avaliáveis separadamente
      if (vagasNaoAvaliaveis.length > 0) {
        console.log(`\n❌ Vagas não avaliáveis ${candidato.nome} ${candidato.sobrenome}:`);

        vagasNaoAvaliaveis.forEach((resultado) => {
          console.log(`● ${resultado.vaga} (Sem requisitos cadastrados)`);
          console.log(`  Empresa: ${resultado.empresa}`);
        });
      }
    });

    //-----------------------------------------------------------------------
    // RECOMENDAÇÕES DE ESTUDO (RF07)
    //-----------------------------------------------------------------------

    console.log(`\n\n...................... Recomendações de estudo ......................\n`);

    // Criar um plano de estudos para cada candidato
    listaCandidatos.forEach((candidato) => {
      // Buscar apenas os resultados avaliáveis do candidato atual
      const resultadosCandidato = resultadoCompatibilidade.filter((resultado) => {
        return resultado.candidato === candidato && typeof resultado.compatibilidade.percentual === "number";
      });

      // Verificar quantas vagas o candidato atende 100%
      const vagasCompletas = resultadosCandidato.filter((vagaCompleta) => {
        return vagaCompleta.compatibilidade.percentual === 100;
      });

      // Criar um array para guardar as habilidades recomendadas
      const recomendacoes = [];

      // Percorrer as vagas avaliadas do candidato
      resultadosCandidato.forEach((resultado) => {
        // Percorrer as habilidades que faltam em cada vaga
        resultado.requisitosNaoAtendidos.forEach((habilidade) => {
          // Verificar se a habilidade já está nas recomendações
          let habilidadeEncontrada = recomendacoes.find((item) => {
            return item.habilidade.toLowerCase() === habilidade.toLowerCase();
          });

          // Adicionar a habilidade somente se ainda não existir
          if (!habilidadeEncontrada) {
            // Criar um objeto para guardar a habilidade e as vagas que a exigem
            habilidadeEncontrada = {
              habilidade: habilidade,
              vagas: [],
            };

            // Adicionar o objeto criado ao array de recomendações
            recomendacoes.push(habilidadeEncontrada);
          }

          // Guardar a vaga relacionada à habilidade encontrada
          habilidadeEncontrada.vagas.push({
            cargo: resultado.vaga,
            empresa: resultado.empresa,
            percentual: resultado.compatibilidade.percentual,
          });
        });
      });

      // Descobrir a maior compatibilidade relacionada a cada habilidade
      recomendacoes.forEach((recomendacao) => {
        let maiorCompatibilidade = 0;

        // Percorrer as vagas relacionadas à habilidade
        recomendacao.vagas.forEach((vaga) => {
          if (vaga.percentual > maiorCompatibilidade) {
            maiorCompatibilidade = vaga.percentual;
          }
        });

        // Guardar o maior percentual no objeto da recomendação
        recomendacao.maiorCompatibilidade = maiorCompatibilidade;
      });

      // Ordenar pela maior compatibilidade e, em caso de empate, pela quantidade de vagas
      recomendacoes.sort((a, b) => {
        if (a.maiorCompatibilidade !== b.maiorCompatibilidade) {
          return b.maiorCompatibilidade - a.maiorCompatibilidade;
        }

        // Em caso de empate, priorizar a habilidade exigida em mais vagas
        return b.vagas.length - a.vagas.length;
      });

      //-----------------------------------------------------
      // EXIBIR O PLANO DE ESTUDOS
      //-----------------------------------------------------

      // Mostrar o candidato e a quantidade de vagas avaliadas
      console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`📚 PLANO DE ESTUDOS — ${candidato.nome} ${candidato.sobrenome}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      console.log(`\n📊 Analisamos ${resultadosCandidato.length} vagas para o seu perfil.`);

      // Mostrar uma mensagem se o candidato atender 100% de alguma vaga
      if (vagasCompletas.length > 0) {
        const textoVaga = vagasCompletas.length === 1 ? "vaga" : "vagas";

        console.log(`✅ Você já atende 100% dos requisitos de ${vagasCompletas.length} ${textoVaga}!`);
      }

      // Separar as habilidades recomendadas por prioridade

      // Alta prioridade: habilidades que faltam em vagas com compatibilidade de 80% ou mais
      const prioridadeAlta = recomendacoes.filter((item) => {
        return item.maiorCompatibilidade >= 80;
      });

      // Média prioridade: habilidades que faltam em vagas com compatibilidade de 50% a 79%
      const prioridadeMedia = recomendacoes.filter((item) => {
        return item.maiorCompatibilidade >= 50 && item.maiorCompatibilidade < 80;
      });

      // Complementar: habilidades que faltam em vagas com compatibilidade abaixo de 50%
      const prioridadeComplementar = recomendacoes.filter((item) => {
        return item.maiorCompatibilidade < 50;
      });

      // Remover grupos vazios para que a primeira prioridade disponível seja o foco principal
      const gruposPrioridade = [
        prioridadeAlta,
        prioridadeMedia,
        prioridadeComplementar,
      ].filter((grupo) => {
        return grupo.length > 0;
      });

      // Os títulos indicam a ordem do plano de estudos, não as faixas de percentual
      const titulosPrioridade = [
        "🎯 FOCO PRINCIPAL",
        "📖 PRÓXIMOS PASSOS",
        "🌱 PARA IR ALÉM",
      ];

      // Exibir apenas os grupos que possuem habilidades recomendadas
      gruposPrioridade.forEach((grupo, indice) => {
        console.log(`\n${titulosPrioridade[indice]}`);

        // Exibir as habilidades de cada grupo
        grupo.forEach((item) => {
          console.log(`   • ${item.habilidade}`);
        });
      });

      // Tratar situações em que não existem recomendações de estudo
      if (resultadosCandidato.length === 0) {
        console.log("\n⚠️ Não há vagas com requisitos avaliáveis para gerar recomendações.");
      } else if (recomendacoes.length === 0) {
        console.log("\n🎉 Parabéns! Você já possui todas as habilidades exigidas pelas vagas avaliadas!");
      }
    });
  } catch (e) {
    console.log("Erro:\n" + e);
  }
}

main();
