class Candidato {
  constructor(
    nome,
    sobrenome,
    areaInteresse,
    habilidades,
    tempoExperiencia
  ) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.areaInteresse = areaInteresse;
    this.habilidades = habilidades;
    this.tempoExperiencia = tempoExperiencia;
  }

  mostrarDetalhes() {
    console.log(`===== Candidato(a): ${this.nome}\n`);
    console.log(`Nome completo: ${this.nome} ${this.sobrenome}.`);
    console.log(`Área de interesse: ${this.areaInteresse}`);
    console.log(`Tempo de experiência: ${this.tempoExperiencia}\n`);
  }
}

module.exports = Candidato;
