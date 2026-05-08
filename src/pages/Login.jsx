import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { API_URL } from "../services/ApiUrl";
import { Logo } from "../elements/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      toast.warning("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
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

      if (data.account) {
        localStorage.setItem("account", JSON.stringify(data.account));
      }

      if (data.account.nivel === "CLIENTE") {
        window.location.href = "/dashboard";
      }

      if (data.account.nivel === "ADMIN") {
        window.location.href = "/dashboard";
      }


      
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

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative w-full max-w-[430px]">
        <div className="mb-8 text-center">
          <Logo />

          <p className="text-sm text-slate-400 mt-5 leading-relaxed">
            Faça login para acessar o painel de investimentos.
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
                autoComplete="email"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                Senha
              </label>

              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-12 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? (
                    <EyeOff size={20} strokeWidth={2} />
                  ) : (
                    <Eye size={20} strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/cadastro"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Cadastre-se
              </Link>

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
                {loading ? "Entrando..." : "Entrar"}
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
