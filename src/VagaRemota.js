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
    //validar se os dois valores são números
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao) || Number.isNaN(this.auxilioHomeOffice)) {
      return "Não foi possível calcular a remuneração total";
    }

    //validar se, apesar de serem números, são maiores do que zero
    if (this.salario < 0 || this.valeRefeicao < 0 || this.auxilioHomeOffice < 0) {
      return "Não foi possível calcular a remuneração total)";
    }

    //caso seja válido, retorna o cálculo normalmente
    const remuneracaoTotal = (this.salario + this.valeRefeicao + this.auxilioHomeOffice).toFixed(2);
    return remuneracaoTotal;
  }

  mostrarVaga() {
    super.mostrarVaga();
    const equipamentoFormatado = (this.equipamentoFornecido = true ? "Sim" : "Não");
    const auxilioFormatado = this.auxilioHomeOffice > 0 ? `R$${this.auxilioHomeOffice}` : "Não possui";

    console.log(`   ● Modo de trabalho: Remoto`);
    console.log(`   ● Auxílio home office: ${auxilioFormatado}`);
    console.log(`   ● Fornece equipamento: ${equipamentoFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): R$${this.calcularRemuneracao()}`);
  }
}

module.exports = VagaRemota;
