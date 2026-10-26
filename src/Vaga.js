//-----------------------------------------------------
// VAGA: classe que representa uma vaga de emprego
//-----------------------------------------------------

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

  // Formatar valores em reais, com duas casas decimais
  formatarMoeda(valor, minimo = 0) {
    // Garantir que seja um número válido e respeite o valor mínimo
    if (typeof valor !== "number" || Number.isNaN(valor) || valor < minimo) {
      return "Valor inválido";
    }

    return `R$${valor.toFixed(2).replace(".", ",")}`;
  }

  // Calcular a remuneração somando o salário e o vale-refeição
  calcularRemuneracao() {
    // Verificar se algum dos valores não é um número válido
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao)) {
      return "Não foi possível calcular a remuneração";
    }

    // Verificar se algum dos valores é negativo
    if (this.salario < 0 || this.valeRefeicao < 0) {
      return "Não foi possível calcular a remuneração";
    }

    // Retornar a soma dos valores
    return this.salario + this.valeRefeicao;
  }

  // Mostrar as informações da vaga no terminal
  mostrarVaga() {
    const requisitosFormatado = this.requisitos.length > 0 ? this.requisitos.join(", ") : " - ";
    const salarioFormatado = this.formatarMoeda(this.salario);
    const valeRefeicaoFormatado = this.formatarMoeda(this.valeRefeicao);

    console.log(`\n📌 Vaga de ${this.cargo}`);
    console.log(`   ● Empresa: ${this.empresa}`);
    console.log(`   ● Requisitos: ${requisitosFormatado}`);
    console.log(`   ● Salário: ${salarioFormatado}`);
    console.log(`   ● Vale refeição/alimentação: ${valeRefeicaoFormatado}`);
  }

  // Comparar os requisitos da vaga com as habilidades de um candidato
  compararCompatibilidade(candidato) {
    const possui = [];
    const naoPossui = [];

    // Percorrer cada requisito exigido pela vaga
    this.requisitos.forEach((requisito) => {
      // Procurar o requisito nas habilidades do candidato, ignorando maiúsculas e minúsculas
      const requisitoAtendido = candidato.habilidades.find((habilidade) => {
        return habilidade.toLowerCase() === requisito.toLowerCase();
      });

      // Separar os requisitos atendidos dos que estão faltando
      if (requisitoAtendido) {
        possui.push(requisito);
      } else {
        naoPossui.push(requisito);
      }
    });

    // Contar quantos requisitos a vaga exige e quantos o candidato atende
    const totalRequisitosVaga = this.requisitos.length;
    const totalRequisitosAtendidos = possui.length;

    // Guardar o percentual e a classificação da compatibilidade
    const compatibilidade = {
      percentual: 0,
      classificacao: "",
    };

    // Calcular e arredondar o percentual de requisitos atendidos
    if (totalRequisitosVaga > 0) {
      compatibilidade.percentual = Number(((totalRequisitosAtendidos / totalRequisitosVaga) * 100).toFixed());
    } else {
      // Sem requisitos, marcar a vaga como não avaliável para evitar dividir por zero
      compatibilidade.percentual = "Não avaliável";
    }

    // Classificar a compatibilidade conforme o percentual calculado
    if (compatibilidade.percentual === "Não avaliável") {
      compatibilidade.classificacao = "Vaga sem requisitos";
    } else if (compatibilidade.percentual <= 49) {
      compatibilidade.classificacao = "Baixa compatibilidade";
    } else if (compatibilidade.percentual <= 79) {
      compatibilidade.classificacao = "Média compatibilidade";
    } else {
      compatibilidade.classificacao = "Alta compatibilidade";
    }

    // Preparar as listas de requisitos para exibir no terminal
    const possuiFormatado = possui.length > 0 ? possui.join(", ") : " - ";
    const naoPossuiFormatado = naoPossui.length > 0 ? naoPossui.join(", ") : " - ";

    // Mostrar o resultado da comparação entre o candidato e a vaga
    console.log(`\n🎯 CANDIDATO: ${candidato.nome} ${candidato.sobrenome} | VAGA: ${this.cargo}`);

    if (totalRequisitosVaga > 0) {
      console.log(`   Requisitos atendidos: ${possuiFormatado}`);
      console.log(`   Requisitos faltando: ${naoPossuiFormatado}`);
      console.log(`   O candidato atende a ${totalRequisitosAtendidos}/${totalRequisitosVaga} requisitos da vaga!`);
      console.log(`   RESULTADO: ${compatibilidade.classificacao} (${compatibilidade.percentual}%)\n`);
    } else {
      console.log(`   A vaga não possui requisitos e a compatibilidade não pôde ser avaliada.\n`);
    }

    // Reunir todas as informações da comparação em um objeto
    const resultadoCompatibilidade = {
      candidato: candidato,
      vaga: this.cargo,
      empresa: this.empresa,
      requisitos: this.requisitos,
      requisitosAtendidos: possui,
      requisitosNaoAtendidos: naoPossui,
      compatibilidade: compatibilidade,
    };

    // Retornar o objeto para utilizar os resultados em outras partes do programa
    return resultadoCompatibilidade;
  }
}

module.exports = Vaga;
