import { Construction } from "lucide-react";
import { Nav } from "../elements/Nav.jsx";

export function EmDesenvolvimento({ titulo = "Em desenvolvimento" }) {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] px-4 py-6 pb-28 font-['Gotham','Inter','Montserrat',sans-serif] text-white flex items-center justify-center">
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative w-full max-w-xl text-center">
        <div className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-8 md:p-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300">
            <Construction size={32} strokeWidth={2} />
          </div>

          <p className="mt-7 text-xs uppercase tracking-[0.22em] text-slate-500">
            Nova funcionalidade
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-white">
            {titulo}
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            Esta área ainda está sendo preparada. Em breve você poderá acessar
            todos os recursos desta seção.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4">
            <p className="text-sm text-slate-400">
              Nossa equipe está trabalhando para liberar essa funcionalidade com
              segurança e qualidade.
            </p>
          </div>
        </div>
      </section>

      <Nav />
    </main>
  );
}