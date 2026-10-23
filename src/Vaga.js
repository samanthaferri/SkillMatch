//------------------------------------------------
// VAGA: classe responsável representar uma vaga
//------------------------------------------------

class Vaga {
  constructor(
    cargo,
    empresa,
    requisitos,
    salario,
    areaVaga,
    valeRefeicao
  ) {
    this.cargo = cargo;
    this.empresa = empresa;
    this.requisitos = requisitos;
    this.salario = Number(salario);
    this.areaVaga = areaVaga;
    this.valeRefeicao = Number(valeRefeicao);
  }

  //sempre deixar a moeda formatada para o real: R$ e 2 casas após a vírgula
  formatarMoeda(valor, minimo = 0) {
    // garantir que seja um número maior que um valor mínimo
    if (typeof valor !== "number" || Number.isNaN(valor) || valor < minimo) {
      return `Valor inválido`;
    }
    return `R$${valor.toFixed(2).replace(".", ",")}`;
  }

  //soma de salário com benefícios de cada vaga
  calcularRemuneracao() {
    //validar se os dois valores são números
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao)) {
      return "Não foi possível calcular a remuneração";
    }

    //validar se, apesar de serem números, são maiores do que zero
    if (this.salario < 0 || this.valeRefeicao < 0) {
      return "Não foi possível calcular a remuneração)";
    }

    //caso seja válido, retorna o cálculo normalmente
    return this.salario + this.valeRefeicao;
  }

  //exibir os detalhes de cada vaga
  mostrarVaga() {
    const requisitosFormatado = this.requisitos.length > 0 ? `${this.requisitos.join(", ")}` : " - ";
    const salarioFormatado = this.formatarMoeda(this.salario);
    const valeRefeicaoFormatado = this.formatarMoeda(this.valeRefeicao);

    console.log(`\n📌 Vaga de ${this.cargo}`);
    console.log(`   ● Empresa: ${this.empresa}`);
    console.log(`   ● Requisitos: ${requisitosFormatado}`);
    console.log(`   ● Salário: ${salarioFormatado}`);
    console.log(`   ● Vale refeição/alimentação: ${valeRefeicaoFormatado}`);
  }

  compararCompatibilidade(candidato) {
    const possui = [];
    const naoPossui = [];

    //percorrer a lista de requisitos da vaga
    this.requisitos.forEach((requisito) => {
      //procurar requisito nas habilidades do candidato
      const requisitoAtendido = candidato.habilidades.find((habilidade) => {
        //retornar quando requisito for encontrado na lista das habilidades
        return habilidade.toLowerCase() === requisito.toLowerCase();
      });

      //acrescentar o requisito em sua lista (se o candidato tem ou não a habilidade)
      if (requisitoAtendido) {
        possui.push(requisito);
      } else {
        naoPossui.push(requisito);
      }
    });

    //Quantidades requisitos da vaga
    const totalRequisitosVaga = this.requisitos.length;
    const totalRequisitosAtendidos = possui.length;

    //Objeto compatibilidade: teremos um percentual e uma classificação
    const compatibilidade = {
      percentual: 0,
      classificacao: "",
    };

    //Calcular percentual de compatibilidade e atribuir ao objeto compatibilidade
    if (totalRequisitosVaga > 0) {
      compatibilidade.percentual = ((totalRequisitosAtendidos / totalRequisitosVaga) * 100).toFixed();
    } else {
      compatibilidade.percentual = 100;
    }

    //Classificação da compatibilidade
    if (compatibilidade.percentual <= 45) {
      compatibilidade.classificacao = "Baixa compatibilidade";
    } else if (compatibilidade.percentual <= 79) {
      compatibilidade.classificacao = "Média compatibilidade";
    } else {
      compatibilidade.classificacao = "Alta compatibilidade";
    }

    //Lista de requisitos que atende e não atende
    const possuiFormatado = possui.length > 0 ? possui.join(", ") : " - ";
    const naoPossuiFormatado = naoPossui.length > 0 ? naoPossui.join(", ") : " - ";

    //Relatório candidato vs vaga
    console.log(`\n🎯 CANDIDATO: ${candidato.nome} ${candidato.sobrenome} | VAGA: ${this.cargo} `);

    if (totalRequisitosVaga > 0) {
      console.log(`   Requisitos atendidos: ${possuiFormatado}`);
      console.log(`   Requisitos faltando: ${naoPossuiFormatado}`);
      console.log(`   O candidato atende a ${totalRequisitosAtendidos}/${totalRequisitosVaga} requisitos da vaga!`);
    }
    console.log(`   RESULTADO: ${compatibilidade.classificacao} (${compatibilidade.percentual}%)\n`);

    /*     //Resultados da análise (retornar objeto)
    const resultadoCompatibilidade = {

    } */
  }
}

module.exports = Vaga;
