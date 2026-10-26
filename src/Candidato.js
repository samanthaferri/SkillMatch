//--------------------------------------------------------------
// CANDIDATO: classe responsável por representar um candidato
//--------------------------------------------------------------

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
    this.tempoExperiencia = Number(tempoExperiencia);
  }

  mostrarCandidato() {
    const habilidadesFormatadas = this.habilidades.length > 0 ? `${this.habilidades.join(", ")}` : " - ";

    console.log(`👤 Candidato(a): ${this.nome}`);
    console.log(`Nome completo: ${this.nome} ${this.sobrenome}`);
    console.log(`Área de interesse: ${this.areaInteresse}`);
    console.log(`Tempo de experiência: ${this.tempoExperiencia} anos`);
    console.log(`Habilidades: ${habilidadesFormatadas}\n`);
  }
}

module.exports = Candidato;
