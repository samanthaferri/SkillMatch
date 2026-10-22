//------------------------------------------------
// VAGA: classe responsável representar uma vaga
//------------------------------------------------

class Vaga {
  constructor(
    cargo,
    empresa,
    requisitos,
    salario,
    areaVaga
  ) {
    this.cargo = cargo;
    this.empresa = empresa;
    this.requisitos = requisitos;
    this.salario = salario;
    this.areaVaga = areaVaga;
  }

  //esse método vai mostrar os detalhes de uma vaga
  mostrarVaga() {
    console.log(`===== Vaga: ${this.cargo} =====\n`);
    console.log(`Empresa: ${this.empresa}`);
    console.log(`Salário: R$${this.salario}`);
    console.log(`Requisitos: ${this.requisitos.join(", ")}\n`);
  }
}

module.exports = Vaga;
