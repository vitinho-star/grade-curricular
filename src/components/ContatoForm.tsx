import { useState, type ChangeEvent, type FormEvent } from 'react'

const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

const inputClass =
  'mt-2 w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-brand-600'

const labelClass =
  'font-mono text-[11px] uppercase tracking-widest text-brand-400'

const assuntos = [
  'Dúvidas sobre o curso',
  'Grade curricular',
  'Processo seletivo',
  'Estágio e TCC',
  'Outros',
]

type FormData = {
  nome: string
  email: string
  assunto: string
  mensagem: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = { nome: '', email: '', assunto: '', mensagem: '' }

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {}

  if (form.nome.trim().length < 3) errors.nome = 'Informe seu nome completo.'
  if (!/^\S+@\S+\.\S+$/.test(form.email))
    errors.email = 'Informe um e-mail válido.'
  if (!form.assunto) errors.assunto = 'Selecione um assunto.'
  if (form.mensagem.trim().length < 10)
    errors.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'

  return errors
}

export default function ContatoForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erroEnvio, setErroEnvio] = useState<string | null>(null)
  const [armadilha, setArmadilha] = useState('')

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: undefined })
    setEnviado(false)
    setErroEnvio(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErroEnvio(null)

    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // Campo invisível: só robôs o preenchem. Finge sucesso e não envia nada.
    if (armadilha) {
      setEnviado(true)
      setForm(initialForm)
      return
    }

    if (!ENDPOINT) {
      setErroEnvio('O envio de mensagens ainda não foi configurado.')
      return
    }

    setEnviando(true)

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email: form.email.trim(),
          assunto: form.assunto,
          mensagem: form.mensagem.trim(),
          _subject: `Contato pelo site: ${form.assunto}`,
        }),
      })

      if (!resposta.ok) throw new Error('Falha no envio')

      setEnviado(true)
      setForm(initialForm)
    } catch {
      setErroEnvio(
        'Não foi possível enviar agora. Tente novamente em instantes ou use o e-mail ao lado.',
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-brand-900 p-6 shadow-xl md:p-8"
    >
      <h2 className="text-2xl font-bold text-white">Envie uma mensagem</h2>

      <input
        type="text"
        name="_gotcha"
        value={armadilha}
        onChange={(e) => setArmadilha(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className={labelClass}>
            Nome completo
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            aria-invalid={!!errors.nome}
            className={inputClass}
          />
          {errors.nome && (
            <p role="alert" className="mt-1 text-xs text-red-300">
              {errors.nome}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            aria-invalid={!!errors.email}
            className={inputClass}
          />
          {errors.email && (
            <p role="alert" className="mt-1 text-xs text-red-300">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="assunto" className={labelClass}>
          Assunto
        </label>
        <select
          id="assunto"
          name="assunto"
          value={form.assunto}
          onChange={handleChange}
          aria-invalid={!!errors.assunto}
          className={inputClass}
        >
          <option value="">Selecione um assunto</option>
          {assuntos.map((assunto) => (
            <option key={assunto} value={assunto}>
              {assunto}
            </option>
          ))}
        </select>
        {errors.assunto && (
          <p role="alert" className="mt-1 text-xs text-red-300">
            {errors.assunto}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="mensagem" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          value={form.mensagem}
          onChange={handleChange}
          placeholder="Escreva sua mensagem aqui..."
          aria-invalid={!!errors.mensagem}
          className={inputClass}
        />
        {errors.mensagem && (
          <p role="alert" className="mt-1 text-xs text-red-300">
            {errors.mensagem}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {enviando ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      <p className="mt-3 text-xs text-violet-200">
        Seus dados serão usados apenas para responder a esta mensagem.
      </p>

      {enviado && (
        <p
          role="status"
          className="mt-4 rounded-lg bg-emerald-500/20 px-4 py-3 text-sm text-emerald-200"
        >
          Mensagem enviada com sucesso! Responderemos em breve.
        </p>
      )}

      {erroEnvio && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-200"
        >
          {erroEnvio}
        </p>
      )}
    </form>
  )
}