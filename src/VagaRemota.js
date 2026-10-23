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
    valeRefeicao,
    equipamentoFornecido,
    auxilioHomeOffice
  ) {
    super(cargo, empresa, requisitos, salario, areaVaga, valeRefeicao);
    this.equipamentoFornecido = equipamentoFornecido;
    this.auxilioHomeOffice = Number(auxilioHomeOffice);
  }

  calcularRemuneracao() {
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao) || Number.isNaN(this.auxilioHomeOffice)) {
      return "Não foi possível calcular a remuneração total";
    }
    return this.salario + this.valeRefeicao + this.auxilioHomeOffice;
  }

  mostrarVaga() {
    super.mostrarVaga();
    const equipamentoFormatado = (this.equipamentoFornecido = true ? "Sim" : "Não");
    const auxilioFormatado = this.auxilioHomeOffice > 0 ? `R$${this.auxilioHomeOffice.toFixed(2)}` : "Não possui";
    const remuneracaoTotal = this.calcularRemuneracao().toFixed(2);

    console.log(`   ● Modo de trabalho: Remoto`);
    console.log(`   ● Auxílio home office: ${auxilioFormatado}`);
    console.log(`   ● Fornece equipamento: ${equipamentoFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): R$${remuneracaoTotal}`);
  }
}

module.exports = VagaRemota;
