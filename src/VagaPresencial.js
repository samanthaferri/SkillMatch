//--------------------------------------------------------------
// VAGA PRESENCIAL: classe que representa uma vaga presencial
// Herda os atributos e métodos da classe Vaga
//--------------------------------------------------------------

const Vaga = require("./Vaga");

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
    // Usar o construtor da classe Vaga para os atributos em comum
    super(cargo, empresa, requisitos, salario, areaVaga, valeRefeicao);

    // Adicionar os atributos específicos das vagas presenciais
    this.endereco = endereco;
    this.valeTransporte = valeTransporte;
  }

  // Mostrar as informações da vaga, incluindo os detalhes presenciais
  mostrarVaga() {
    // Reutilizar o método mostrarVaga da classe Vaga
    super.mostrarVaga();
    // Verificar se a vaga oferece vale-transporte
    const transporteFormatado = this.valeTransporte ? "Possui" : "Não possui";

    // Formatar a soma do salário com o vale-refeição
    const remuneracaoTotalFormatada = this.formatarMoeda(this.calcularRemuneracao());

    console.log(`   ● Modo de trabalho: Presencial`);
    console.log(`   ● Endereço: ${this.endereco}`);
    console.log(`   ● Vale transporte: ${transporteFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): ${remuneracaoTotalFormatada}`);
  }
}

module.exports = VagaPresencial;
