class Vaga {
  constructor(cargo, empresa, requisitos) {
    this.cargo = cargo;
    this.empresa = empresa;
    this.requisitos = requisitos;
  }

  mostrarVaga() {
    console.log(`~~~~~ Vaga: ${this.cargo} ~~~~~`);
    console.log(`Cargo: ${this.cargo}`);
    console.log(`Empresa: ${this.empresa}`);
    console.log(`Requisitos: ${this.requisitos}`);
  }
}

module.exports = Vaga;
