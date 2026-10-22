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
    endereco
  ) {
    super(cargo, empresa, requisitos);
    this.endereco = endereco;
  }
}

module.exports = VagaPresencial;
