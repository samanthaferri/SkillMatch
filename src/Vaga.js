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

  //cálculo da remuneração: salário e vale refeição
  calcularRemuneracao() {
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao)) {
      return "Não foi possível calcular a remuneração total";
    }
    return this.salario + this.valeRefeicao;
  }

  //esse método vai mostrar os detalhes de uma vaga
  mostrarVaga() {
    console.log(`\n📌 Vaga de ${this.cargo}`);
    console.log(`   ● Empresa: ${this.empresa}`);
    console.log(`   ● Requisitos: ${this.requisitos.join(", ")}`);
    console.log(`   ● Salário: R$${this.salario.toFixed(2)}`);
    console.log(`   ● Vale refeição/alimentação: R$${this.valeRefeicao.toFixed(2)}`);
  }
}

module.exports = Vaga;
