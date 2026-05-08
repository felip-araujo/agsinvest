import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../services/ApiUrl";
import { Nav } from "../elements/Nav";

export function Simulacao() {
  const [tipo, setTipo] = useState("simples");
  const [valor, setValor] = useState("");
  const [meses, setMeses] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  async function handleSimular(e) {
    e.preventDefault();

    if (!valor) {
      toast.warning("Informe o valor do investimento.");
      return;
    }

    if (Number(valor) < 1000) {
      toast.warning("O valor mínimo é R$ 1.000,00.");
      return;
    }

    if (tipo === "simples" && !meses) {
      toast.warning("Informe a quantidade de meses.");
      return;
    }

    try {
      setLoading(true);
      setResultado(null);

      const endpoint =
        tipo === "simples"
          ? `${API_URL}/simulacao`
          : `${API_URL}/simulacao/composto`;

      const payload =
        tipo === "simples"
          ? {
              valor: Number(valor),
              meses: Number(meses),
            }
          : {
              valor: Number(valor),
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // Caso sua rota esteja protegida por token, deixe isso ativo:
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao realizar simulação.");
        return;
      }

      setResultado(data);
      toast.success("Simulação realizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] px-4 py-10 font-['Gotham','Inter','Montserrat',sans-serif] text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="absolute top-[-120px] left-[-120px] w-[340px] h-[340px] bg-blue-600/20 rounded-full blur-[110px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative w-full max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-white">
            Simulação de investimento
          </h1>

          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Calcule uma estimativa de rendimento com juros simples ou compostos.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
          <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8">
            <form onSubmit={handleSimular} className="space-y-6">
              <div>
                <p className="text-xs font-medium text-slate-300 mb-3 uppercase tracking-[0.18em]">
                  Tipo de simulação
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTipo("simples");
                      setResultado(null);
                    }}
                    className={`rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 border ${
                      tipo === "simples"
                        ? "bg-white text-[#070A0F] border-white"
                        : "bg-white/[0.04] text-slate-400 border-white/10 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    Juros simples
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTipo("composto");
                      setResultado(null);
                    }}
                    className={`rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 border ${
                      tipo === "composto"
                        ? "bg-white text-[#070A0F] border-white"
                        : "bg-white/[0.04] text-slate-400 border-white/10 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    Juros compostos
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                  Valor investido
                </label>

                <input
                  type="number"
                  min="1000"
                  step="0.01"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Mínimo R$ 1.000,00"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {tipo === "simples" && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
                    Quantidade de meses
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={meses}
                    onChange={(e) => setMeses(e.target.value)}
                    placeholder="Ex: 12"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              )}

              {tipo === "composto" && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-slate-300 font-medium">
                    Simulação automática
                  </p>

                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    O sistema calculará os resultados para 1, 2, 4 e 5 anos com
                    base na taxa diária configurada na API.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 transition-all duration-300 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? "Calculando..." : "Simular investimento"}
                </span>

                <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
              </button>
            </form>
          </div>

          <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8 min-h-[360px]">
            {!resultado && (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                  <span className="text-2xl text-slate-400">↗</span>
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Resultado da simulação
                </h2>

                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Informe os dados ao lado para visualizar a estimativa de
                  rendimento.
                </p>
              </div>
            )}

            {resultado && tipo === "simples" && (
              <div>
                <div className="mb-7">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
                    Resultado
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">Juros simples</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-500">Valor inicial</p>
                    <strong className="block text-xl mt-2">
                      {formatarMoeda(resultado.valor)}
                    </strong>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-500">Período</p>
                    <strong className="block text-xl mt-2">
                      {resultado.meses} meses
                    </strong>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-500">Taxa</p>
                    <strong className="block text-xl mt-2">
                      {resultado.taxa}
                    </strong>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-sm text-slate-500">Rendimento</p>
                    <strong className="block text-xl mt-2 text-emerald-300">
                      {formatarMoeda(resultado.rendimento)}
                    </strong>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-white text-[#070A0F] p-6">
                  <p className="text-sm text-slate-500">Total estimado</p>
                  <strong className="block text-3xl md:text-4xl tracking-[-0.04em] mt-2">
                    {formatarMoeda(resultado.total)}
                  </strong>
                </div>
              </div>
            )}

            {resultado && tipo === "composto" && (
              <div>
                <div className="mb-7">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.18em]">
                    Resultado
                  </p>

                  <h2 className="text-2xl font-semibold mt-2">
                    {resultado.tipo}
                  </h2>
                </div>

                <div className="space-y-4">
                  {resultado.resultados?.map((item) => (
                    <div
                      key={item.meses}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">
                            Período de {item.anos}{" "}
                            {item.anos === 1 ? "ano" : "anos"}
                          </p>

                          <strong className="block text-xl mt-1">
                            {item.meses} meses
                          </strong>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-slate-500">
                            Total estimado
                          </p>

                          <strong className="block text-xl mt-1 text-white">
                            {formatarMoeda(item.total)}
                          </strong>
                        </div>
                      </div>

                      <div className="mt-4 grid md:grid-cols-2 gap-3">
                        <div className="rounded-xl bg-black/20 border border-white/5 p-3">
                          <p className="text-xs text-slate-500">
                            Valor inicial
                          </p>
                          <strong className="block mt-1 text-sm">
                            {formatarMoeda(item.valorInicial)}
                          </strong>
                        </div>

                        <div className="rounded-xl bg-black/20 border border-white/5 p-3">
                          <p className="text-xs text-slate-500">Rendimento</p>
                          <strong className="block mt-1 text-sm text-emerald-300">
                            {formatarMoeda(item.rendimento)}
                          </strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Nav />
    </main>
  )
}
