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

    if (this.salario < 0 || this.valeRefeicao < 0 || this.auxilioHomeOffice < 0) {
      return "Não foi possível calcular a remuneração total)";
    }

    //Acrescenta o valor do auxílio home office na conta
    return this.salario + this.valeRefeicao + this.auxilioHomeOffice;
  }

  mostrarVaga() {
    super.mostrarVaga();
    const equipamentoFormatado = (this.equipamentoFornecido = true ? "Sim" : "Não");
    const auxilioFormatado =
      this.auxilioHomeOffice > 0 ? `${this.formatarMoeda(this.auxilioHomeOffice)}` : "Não possui";
    const remuneracaoTotalFormatada = this.formatarMoeda(this.calcularRemuneracao());

    console.log(`   ● Modo de trabalho: Remoto`);
    console.log(`   ● Auxílio home office: ${auxilioFormatado}`);
    console.log(`   ● Fornece equipamento: ${equipamentoFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): ${remuneracaoTotalFormatada}`);
  }
}

module.exports = VagaRemota;
