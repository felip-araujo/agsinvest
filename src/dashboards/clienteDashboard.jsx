import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, ChartNoAxesCombined, RefreshCw, Wallet, Plus } from "lucide-react";
import { Nav } from "../elements/Nav";

export function ClienteDashboard() {
  const navigate = useNavigate();
  const [tabAtiva, setTabAtiva] = useState("patrimonio");

  const account = JSON.parse(localStorage.getItem("account"));
  const nomeCliente = account?.nome || "Cliente";
  const primeiroNome = nomeCliente.split(" ")[0];

  const valorAtual = 0;
  const metaValor = 3000;
  const porcentagem = Math.min((valorAtual / metaValor) * 100, 100);

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    navigate("/login");
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] px-4 py-6 pb-28 font-['Gotham','Inter','Montserrat',sans-serif] text-white">
      {/* Efeitos de fundo */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative max-w-6xl mx-auto">
        <header className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Painel do cliente
              </p>

              <h1 className="mt-2 text-2xl md:text-4xl font-semibold tracking-[-0.04em] text-white">
                Olá, {primeiroNome}
              </h1>

              <p className="text-sm text-slate-400 mt-2">
                Acompanhe seus investimentos, simulações e próximos aportes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] items-center justify-center text-slate-300 hover:bg-white/[0.07] hover:text-white transition">
                <Bell size={20} strokeWidth={2} />
              </button>

              <button
                onClick={handleLogout}
                className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:bg-white/[0.07] hover:text-white transition"
              >
                <LogOut size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-[1fr_280px] gap-5 items-end">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Meta inicial</span>

                <strong className="text-sm text-white">
                  {formatarMoeda(valorAtual)} / {formatarMoeda(metaValor)}
                </strong>
              </div>

              <div className="h-3 w-full bg-white/[0.06] rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${porcentagem}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => navigate("/simulacao")}
              className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 px-5 transition-all duration-300 hover:bg-slate-200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ChartNoAxesCombined size={20} strokeWidth={2} />
                Nova simulação
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </header>

        <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Carteira
                  </p>

                  <h2 className="text-2xl font-semibold tracking-[-0.04em] mt-2">
                    Seus investimentos
                  </h2>
                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-1 flex items-center gap-1">
                  <button
                    onClick={() => setTabAtiva("patrimonio")}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                      tabAtiva === "patrimonio"
                        ? "bg-white text-[#070A0F]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Patrimônio+
                  </button>

                  <button
                    onClick={() => setTabAtiva("renda")}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                      tabAtiva === "renda"
                        ? "bg-white text-[#070A0F]"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Renda+
                  </button>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-7 md:p-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400">
                  {tabAtiva === "patrimonio" ? (
                    <RefreshCw size={34} strokeWidth={2} />
                  ) : (
                    <Wallet size={34} strokeWidth={2} />
                  )}
                </div>

                <h3 className="mt-7 text-2xl md:text-3xl font-semibold tracking-[-0.04em] leading-tight">
                  {tabAtiva === "patrimonio"
                    ? "Você ainda não possui investimentos ativos"
                    : "Você ainda não possui rendimentos cadastrados"}
                </h3>

                <p className="mt-4 text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                  {tabAtiva === "patrimonio"
                    ? "Faça seu primeiro aporte para começar a acompanhar a evolução do seu patrimônio dentro da plataforma."
                    : "Acompanhe seus rendimentos mensais e veja como seu investimento pode evoluir ao longo do tempo."}
                </p>

                <button
                  onClick={() => navigate("/simulacao")}
                  className="group relative mt-8 overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 px-7 transition-all duration-300 hover:bg-slate-200"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Plus size={19} strokeWidth={2} />
                    Fazer primeiro aporte
                  </span>

                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </div>
            </div>

            <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Mercado
                  </p>

                  <h2 className="text-2xl font-semibold tracking-[-0.04em] mt-2">
                    Notícias do Agro
                  </h2>
                </div>

                <button className="text-sm text-slate-400 hover:text-white transition">
                  Ver todas
                </button>
              </div>

              <button className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:bg-white/[0.05] transition group">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Preço da soja atinge recorde histórico
                    </h3>

                    <p className="text-sm text-slate-400 mt-2">
                      Mercado internacional impulsiona valorização do grão.
                    </p>
                  </div>

                  <span className="text-slate-500 group-hover:text-white transition">
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Resumo
              </p>

              <h2 className="text-2xl font-semibold tracking-[-0.04em] mt-2">
                Visão geral
              </h2>

              <div className="mt-6 space-y-3">
                <ResumoItem label="Total investido" value={formatarMoeda(0)} />
                <ResumoItem label="Rendimento" value={formatarMoeda(0)} />
                <ResumoItem label="Contratos" value="0 ativos" />
              </div>
            </div>

            <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Próximo passo
              </p>

              <h2 className="text-xl font-semibold tracking-[-0.04em] mt-2">
                Simule antes de investir
              </h2>

              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                Veja uma estimativa de rendimento com juros simples ou compostos
                antes de realizar seu primeiro aporte.
              </p>

              <button
                onClick={() => navigate("/simulacao")}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.04] text-white py-3 font-semibold hover:bg-white/[0.07] transition"
              >
                Abrir simulador
              </button>
            </div>
          </aside>
        </div>
      </section>

      <Nav />
    </main>
  );
}

function ResumoItem({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3">
      <span className="text-sm text-slate-400">{label}</span>
      <strong className="text-sm text-white">{value}</strong>
    </div>
  );
}