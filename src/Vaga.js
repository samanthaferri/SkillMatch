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

  formatarMoeda(valor, minimo = 0) {
    // garantir que seja um número maior que um valor mínimo
    if (typeof valor !== "number" || Number.isNaN(valor) || valor < minimo) {
      return `Valor inválido`;
    }
    return `R$${valor.toFixed(2).replace(".", ",")}`;
  }

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

      if (requisitoAtendido) {
        possui.push(requisito);
      } else {
        naoPossui.push(requisito);
      }
    });

    const possuiFormatado = possui.length > 0 ? possui.join(", ") : " - ";
    const naoPossuiFormatado = naoPossui.length > 0 ? naoPossui.join(", ") : " - ";

    console.log(`\n🎯 Comparando ${candidato.nome} com a vaga ${this.cargo}`);
    console.log(`   Requisitos atendidos: ${possuiFormatado}`);
    console.log(`   Requisitos faltando: ${naoPossuiFormatado}`);
  }
}

module.exports = Vaga;
