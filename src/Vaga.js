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

  calcularRemuneracao() {
    //validar se os dois valores são números
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao)) {
      return "Não foi possível calcular a remuneração total";
    }

    //validar se, apesar de serem números, são maiores do que zero
    if (this.salario < 0 || this.valeRefeicao < 0) {
      return "Não foi possível calcular a remuneração total)";
    }

    //caso seja válido, retorna o cálculo normalmente
    const remuneracaoTotal = (this.salario + this.valeRefeicao).toFixed(2);
    return remuneracaoTotal;
  }

  mostrarVaga() {
    const requisitosFormatado = this.requisitos.length > 0 ? `${this.requisitos.join(", ")}` : " - ";

    console.log(`\n📌 Vaga de ${this.cargo}`);
    console.log(`   ● Empresa: ${this.empresa}`);
    console.log(`   ● Requisitos: ${requisitosFormatado}`);
    console.log(`   ● Salário: R$${this.salario.toFixed(2)}`);
    console.log(`   ● Vale refeição/alimentação: R$${this.valeRefeicao.toFixed(2)}`);
  }
}

module.exports = Vaga;
