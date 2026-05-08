import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../services/ApiUrl";

export function Cadastro() {
  const [tipoCadastro, setTipoCadastro] = useState("USER");

  const [formData, setFormData] = useState({
    nome: "",
    representante: "",
    email: "",
    cpf: "",
    cnpj: "",
    gender: "Masculino",
    senha: "",
    telefone: "",
    nivel: "CLIENTE",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function limparNumeros(valor) {
    return valor.replace(/\D/g, "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isUser = tipoCadastro === "USER";

    if (
      !formData.nome ||
      !formData.email ||
      !formData.senha ||
      !formData.telefone
    ) {
      toast.warning("Preencha todos os campos obrigatórios.");
      return;
    }

    if (isUser && !formData.cpf) {
      toast.warning("Informe o CPF.");
      return;
    }

    if (!isUser && (!formData.cnpj || !formData.representante)) {
      toast.warning("Informe o CNPJ e o representante.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isUser ? `${API_URL}/users` : `${API_URL}/empresas`;

      const payload = isUser
        ? {
            nome: formData.nome,
            email: formData.email,
            cpf: limparNumeros(formData.cpf),
            gender: formData.gender,
            senha: formData.senha,
            telefone: limparNumeros(formData.telefone),
            nivel: formData.nivel,
          }
        : {
            nome: formData.nome,
            representante: formData.representante,
            email: formData.email,
            cnpj: limparNumeros(formData.cnpj),
            senha: formData.senha,
            telefone: limparNumeros(formData.telefone),
            nivel: formData.nivel,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao criar conta.");
        return;
      }

      toast.success(
        isUser ? "Usuário criado com sucesso!" : "Empresa criada com sucesso!",
      );

      setFormData({
        nome: "",
        representante: "",
        email: "",
        cpf: "",
        cnpj: "",
        gender: "Masculino",
        senha: "",
        telefone: "",
        nivel: "CLIENTE",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] flex items-center justify-center px-4 py-10 font-['Gotham','Inter','Montserrat',sans-serif]">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="absolute top-[-120px] left-[-120px] w-[340px] h-[340px] bg-blue-600/20 rounded-full blur-[110px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative w-full max-w-2xl">
        <div className="mb-8 text-center">
          <img
            src="/agsinvest-w.png"
            alt="Logotipo"
            className="mx-auto max-w-[190px] md:max-w-[220px] h-auto object-contain"
          />

          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Escolha o tipo de cadastro e preencha seus dados para começar.
          </p>
        </div>

        <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8">
          <div className="mb-7">
            <p className="text-xs font-medium text-slate-300 mb-3 uppercase tracking-[0.18em]">
              Tipo de cadastro
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipoCadastro("USER")}
                className={`rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 border ${
                  tipoCadastro === "USER"
                    ? "bg-white text-[#070A0F] border-white"
                    : "bg-white/[0.04] text-slate-400 border-white/10 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                Pessoa Física
              </button>

              <button
                type="button"
                onClick={() => setTipoCadastro("COMPANY")}
                className={`rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 border ${
                  tipoCadastro === "COMPANY"
                    ? "bg-white text-[#070A0F] border-white"
                    : "bg-white/[0.04] text-slate-400 border-white/10 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                Pessoa Jurídica
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                {tipoCadastro === "USER" ? "Nome completo" : "Nome da empresa"}
              </label>

              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder={
                  tipoCadastro === "USER"
                    ? "Digite seu nome completo"
                    : "Digite o nome da empresa"
                }
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {tipoCadastro === "COMPANY" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  Representante
                </label>

                <input
                  type="text"
                  name="representante"
                  value={formData.representante}
                  onChange={handleChange}
                  placeholder="Nome do representante"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  {tipoCadastro === "USER" ? "CPF" : "CNPJ"}
                </label>

                <input
                  type="text"
                  name={tipoCadastro === "USER" ? "cpf" : "cnpj"}
                  value={tipoCadastro === "USER" ? formData.cpf : formData.cnpj}
                  onChange={handleChange}
                  placeholder={
                    tipoCadastro === "USER"
                      ? "000.000.000-00"
                      : "00.000.000/0000-00"
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  Telefone
                </label>

                <input
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {tipoCadastro === "USER" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-3 uppercase tracking-[0.18em]">
                  Gênero
                </label>

                <div className="grid md:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 cursor-pointer transition-all ${
                      formData.gender === "Masculino"
                        ? "bg-white/[0.08] border-blue-400/60 text-white"
                        : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="Masculino"
                      checked={formData.gender === "Masculino"}
                      onChange={handleChange}
                      className="accent-blue-500"
                    />
                    Masculino
                  </label>

                  <label
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 cursor-pointer transition-all ${
                      formData.gender === "Feminino"
                        ? "bg-white/[0.08] border-blue-400/60 text-white"
                        : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="Feminino"
                      checked={formData.gender === "Feminino"}
                      onChange={handleChange}
                      className="accent-blue-500"
                    />
                    Feminino
                  </label>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seuemail@exemplo.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  Senha
                </label>

                <input
                  type="text"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite uma senha segura"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 mt-3 transition-all duration-300 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {loading
                  ? "Criando conta..."
                  : tipoCadastro === "USER"
                    ? "Criar conta "
                    : "Criar conta PJ"}
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Já possui uma conta?{" "}
          <a
            href="/login"
            className="text-slate-400 hover:text-white transition"
          >
            Entrar no sistema
          </a>
        </p>
      </section>
    </main>
  );
}
