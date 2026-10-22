//-----------------------------------------------------------------------------
// VAGA PRESENCIAL: classe responsável representar uma vaga presencial
// essa classe é herança da classe Vaga
//-----------------------------------------------------------------------------

const Vaga = require("./vaga");

class VagaPresencial extends Vaga {
  constructor(
    cargo,
    empresa,
    requisitos,
    salario,
    areaVaga,
    endereco,
    valeTransporte
  ) {
    super(cargo, empresa, requisitos, salario, areaVaga);
    this.endereco = endereco;
    this.valeTransporte = valeTransporte;
  }

  mostrarVaga() {
    super.mostrarVaga();
    console.log(`Modo de trabalho: Presencial`);
    console.log(`Endereço: ${this.endereco}`);
    console.log(`Vale transporte: R$${this.valeTransporte}`);
  }
}

module.exports = VagaPresencial;
