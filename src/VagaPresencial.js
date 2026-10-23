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
    valeRefeicao,
    endereco,
    valeTransporte
  ) {
    super(cargo, empresa, requisitos, salario, areaVaga, valeRefeicao);
    this.endereco = endereco;
    this.valeTransporte = valeTransporte;
  }

  mostrarVaga() {
    super.mostrarVaga();
    const transporteFormatado = (this.valeTransporte = true ? "Possui" : "Não possui");
    const remuneracaoTotal = this.calcularRemuneracao().toFixed(2);

    console.log(`   ● Modo de trabalho: Presencial`);
    console.log(`   ● Endereço: ${this.endereco}`);
    console.log(`   ● Vale transporte: ${transporteFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): R$${remuneracaoTotal}`);
  }
}

module.exports = VagaPresencial;
