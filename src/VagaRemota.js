//-----------------------------------------------------------------------------
// VAGA REMOTA: classe responsável representar uma vaga remota
// essa classe é herança da classe Vaga
//-----------------------------------------------------------------------------

const Vaga = require("./vaga");

class VagaRemota extends Vaga {
  constructor(
    cargo,
    empresa,
    requisitos,
    equipamentoFornecido,
    auxilioHomeOffice
  ) {
    super(cargo, empresa, requisitos);
    this.equipamentoFornecido = equipamentoFornecido;
    this.auxilioHomeOffice = auxilioHomeOffice;
  }
}

module.exports = VagaRemota;
