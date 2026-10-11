import type { Disciplina } from '../data/disciplinas'

export function validarGrade(lista: Disciplina[], totalEsperado = 63): string[] {
  const problemas: string[] = []
  const porCodigo = new Map<string, Disciplina>()

  for (const d of lista) {
    if (porCodigo.has(d.codigo)) {
      problemas.push(`Código repetido: ${d.codigo} (${d.nome})`)
    }
    porCodigo.set(d.codigo, d)

    if (d.semestre < 1 || d.semestre > 10) {
      problemas.push(`Semestre inválido em "${d.nome}": ${d.semestre}`)
    }
    if (d.horas < 0) {
      problemas.push(`Carga horária inválida em "${d.nome}"`)
    }
    if (
      d.preRequisitoAtePeriodo !== undefined &&
      d.preRequisitoAtePeriodo >= d.semestre
    ) {
      problemas.push(`"${d.nome}" exige períodos que não vêm antes dele`)
    }
  }

  for (const d of lista) {
    for (const codigo of d.preRequisitos) {
      const pre = porCodigo.get(codigo)
      if (!pre) {
        problemas.push(`Pré-requisito inexistente em "${d.nome}": ${codigo}`)
      } else if (pre.semestre >= d.semestre) {
        problemas.push(
          `"${d.nome}" (${d.semestre}º) exige "${pre.nome}", que está no ${pre.semestre}º semestre`,
        )
      }
    }
  }

  for (let s = 1; s <= 10; s++) {
    if (!lista.some((d) => d.semestre === s)) {
      problemas.push(`O ${s}º semestre ainda está vazio`)
    }
  }

  if (lista.length !== totalEsperado) {
    problemas.push(`Esperadas ${totalEsperado} disciplinas, mas há ${lista.length}`)
  }

  const semHoras = lista.filter((d) => d.horas === 0).length
  if (semHoras > 0) {
    problemas.push(`${semHoras} disciplina(s) ainda sem carga horária`)
  }

  const semDescricao = lista.filter((d) => !d.descricao.trim()).length
  if (semDescricao > 0) {
    problemas.push(`${semDescricao} disciplina(s) ainda sem descrição`)
  }

  return problemas
}