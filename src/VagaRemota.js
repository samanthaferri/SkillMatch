//--------------------------------------------------------
// VAGA REMOTA: classe que representa uma vaga remota
// Herda os atributos e métodos da classe Vaga
//--------------------------------------------------------

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
    // Usar o construtor da classe Vaga para os atributos em comum
    super(cargo, empresa, requisitos, salario, areaVaga, valeRefeicao);

    // Adicionar os atributos específicos das vagas remotas
    this.equipamentoFornecido = equipamentoFornecido;
    this.auxilioHomeOffice = Number(auxilioHomeOffice);
  }

  // Calcular a remuneração incluindo o auxílio home office
  calcularRemuneracao() {
    // Verificar se algum dos valores não é um número válido
    if (Number.isNaN(this.salario) || Number.isNaN(this.valeRefeicao) || Number.isNaN(this.auxilioHomeOffice)) {
      return "Não foi possível calcular a remuneração total";
    }

    // Verificar se algum dos valores é negativo
    if (this.salario < 0 || this.valeRefeicao < 0 || this.auxilioHomeOffice < 0) {
      return "Não foi possível calcular a remuneração total)";
    }

    // Retornar a soma do salário com os benefícios
    return this.salario + this.valeRefeicao + this.auxilioHomeOffice;
  }

  // Mostrar as informações da vaga, incluindo os detalhes do trabalho remoto
  mostrarVaga() {
    // Reutilizar o método mostrarVaga da classe Vaga
    super.mostrarVaga();
    // Verificar se a empresa fornece equipamentos
    const equipamentoFormatado = this.equipamentoFornecido ? "Sim" : "Não";

    // Mostrar o valor do auxílio home office, caso exista
    const auxilioFormatado =
      this.auxilioHomeOffice > 0 ? `${this.formatarMoeda(this.auxilioHomeOffice)}` : "Não possui";

    // Formatar a remuneração total, incluindo os benefícios
    const remuneracaoTotalFormatada = this.formatarMoeda(this.calcularRemuneracao());

    console.log(`   ● Modo de trabalho: Remoto`);
    console.log(`   ● Auxílio home office: ${auxilioFormatado}`);
    console.log(`   ● Fornece equipamento: ${equipamentoFormatado}`);
    console.log(`   ● Remuneração total (com benefícios): ${remuneracaoTotalFormatada}`);
  }
}

module.exports = VagaRemota;
