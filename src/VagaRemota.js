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
    salario,
    areaVaga,
    equipamentoFornecido,
    auxilioHomeOffice
  ) {
    super(cargo, empresa, requisitos, salario, areaVaga);
    this.equipamentoFornecido = equipamentoFornecido;
    this.auxilioHomeOffice = auxilioHomeOffice;
  }

  mostrarVaga() {
    super.mostrarVaga();
    console.log(`Modo de trabalho: Remoto`);
    console.log(`Fornece equipamento: ${this.empresa}`);
    console.log(`Auxílio home office: R$${this.auxilioHomeOffice}`);
  }
}

module.exports = VagaRemota;
