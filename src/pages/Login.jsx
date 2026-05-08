import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      toast.warning("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao fazer login.");
        return;
      }

      toast.success("Login realizado com sucesso!");

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] flex items-center justify-center px-4 font-['Gotham','Inter','Montserrat',sans-serif]">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Efeitos de fundo */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative w-full max-w-[430px]">
        <div className="mb-8 text-center">
          {/* <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
            <span className="text-white text-xl font-semibold">Ags Invest</span>
          </div> */}

          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-white">
            Acessar sistema
          </h1>

          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Entre com suas credenciais para continuar no painel.
          </p>
        </div>

        <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-7 md:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                Email
              </label>

              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                Senha
              </label>

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link to="/cadastro">Cadastre-se</Link>
              
              <button
                type="button"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 mt-2 transition-all duration-300 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {loading ? "Entrando..." : "Entrar no sistema"}
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Sistema seguro · Acesso restrito
        </p>
      </section>
    </main>
  );
}

export default Login;
