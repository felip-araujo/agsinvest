import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  BadgeCheck,
  IdCard,
  Save,
  Lock,
  Building2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../services/ApiUrl";
import { Nav } from "../elements/Nav";

export function Perfil() {
  const account = JSON.parse(localStorage.getItem("account"));
  const token = localStorage.getItem("token");

  const isCompany = account?.tipo === "COMPANY";

  const endpointBase = isCompany ? "empresas" : "users";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    representante: "",
    email: "",
    cpf: "",
    cnpj: "",
    gender: "",
    telefone: "",
    senha: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function limparNumeros(valor) {
    return String(valor || "").replace(/\D/g, "");
  }

  async function buscarPerfil() {
    try {
      if (!account?.id || !token) {
        toast.error("Login necessário.");
        return;
      }

      setLoading(true);

      const response = await fetch(`${API_URL}/${endpointBase}/${account.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Erro ao buscar perfil.");
        return;
      }

      setFormData({
        nome: data.nome || "",
        representante: data.representante || "",
        email: data.email || "",
        cpf: data.cpf || "",
        cnpj: data.cnpj || "",
        gender: data.gender || "",
        telefone: data.telefone || "",
        senha: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nome) {
      toast.warning(
        isCompany
          ? "O nome da empresa não pode ficar vazio."
          : "O nome não pode ficar vazio."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = isCompany
        ? {
            nome: formData.nome,
            representante: formData.representante,
            email: formData.email,
            cnpj: limparNumeros(formData.cnpj),
            telefone: limparNumeros(formData.telefone),
          }
        : {
            nome: formData.nome,
            email: formData.email,
            cpf: limparNumeros(formData.cpf),
            gender: formData.gender,
            telefone: limparNumeros(formData.telefone),
          };

      if (formData.senha) {
        payload.senha = formData.senha;
      }

      const response = await fetch(`${API_URL}/${endpointBase}/${account.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || data.message || "Erro ao atualizar perfil.");
        return;
      }

      toast.success("Perfil atualizado com sucesso!");

      const updatedData = data.user || data.company;

      if (updatedData) {
        const updatedAccount = {
          ...account,
          nome: updatedData.nome,
          email: updatedData.email,
          nivel: updatedData.nivel,
        };

        localStorage.setItem("account", JSON.stringify(updatedAccount));
      }

      setFormData((prev) => ({
        ...prev,
        senha: "",
      }));
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    buscarPerfil();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#070A0F] px-4 py-6 pb-28 font-['Gotham','Inter','Montserrat',sans-serif] text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-140px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />

      <section className="relative max-w-6xl mx-auto">
        <header className="mb-6 bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            Minha conta
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-semibold tracking-[-0.04em] text-white">
                {isCompany ? "Perfil da empresa" : "Perfil do usuário"}
              </h1>

              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                {isCompany
                  ? "Visualize e atualize os dados cadastrais da empresa."
                  : "Visualize e atualize seus dados pessoais de acesso ao sistema."}
              </p>
            </div>

            {account?.nivel && account.nivel !== "CLIENTE" && (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                <BadgeCheck size={18} />
                {account.nivel}
              </div>
            )}
          </div>
        </header>

        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          <aside className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 h-fit">
            <div className="w-20 h-20 rounded-[24px] bg-white text-[#070A0F] flex items-center justify-center">
              {isCompany ? (
                <Building2 size={34} strokeWidth={2} />
              ) : (
                <User size={34} strokeWidth={2} />
              )}
            </div>

            <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">
              {formData.nome || (isCompany ? "Empresa" : "Usuário")}
            </h2>

            <p className="text-sm text-slate-400 mt-2 break-all">
              {formData.email || "email não informado"}
            </p>

            <div className="mt-6 space-y-3">
              <ProfileInfo
                icon={<IdCard size={18} />}
                label={isCompany ? "CNPJ" : "CPF"}
                value={
                  isCompany
                    ? formData.cnpj || "Não informado"
                    : formData.cpf || "Não informado"
                }
              />

              {isCompany && (
                <ProfileInfo
                  icon={<User size={18} />}
                  label="Representante"
                  value={formData.representante || "Não informado"}
                />
              )}

              <ProfileInfo
                icon={<Phone size={18} />}
                label="Telefone"
                value={formData.telefone || "Não informado"}
              />
            </div>
          </aside>

          <section className="bg-white/[0.035] border border-white/10 rounded-[28px] shadow-2xl backdrop-blur-xl p-6 md:p-8">
            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Dados cadastrais
              </p>

              <h2 className="text-2xl font-semibold tracking-[-0.04em] mt-2">
                Editar informações
              </h2>
            </div>

            {loading ? (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-8 text-center">
                <p className="text-slate-400">Carregando dados do perfil...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label={isCompany ? "Nome da empresa" : "Nome completo"}
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    icon={isCompany ? <Building2 size={18} /> : <User size={18} />}
                    placeholder={
                      isCompany ? "Digite o nome da empresa" : "Digite seu nome"
                    }
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={18} />}
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                {isCompany && (
                  <InputField
                    label="Representante"
                    name="representante"
                    value={formData.representante}
                    onChange={handleChange}
                    icon={<User size={18} />}
                    placeholder="Nome do representante"
                  />
                )}

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    label={isCompany ? "CNPJ" : "CPF"}
                    name={isCompany ? "cnpj" : "cpf"}
                    value={isCompany ? formData.cnpj : formData.cpf}
                    onChange={handleChange}
                    icon={<IdCard size={18} />}
                    placeholder={
                      isCompany ? "00.000.000/0000-00" : "000.000.000-00"
                    }
                  />

                  <InputField
                    label="Telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    icon={<Phone size={18} />}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                {!isCompany && (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-3 uppercase tracking-[0.18em]">
                      Gênero
                    </label>

                    <div className="grid md:grid-cols-2 gap-3">
                      <GenderOption
                        label="Masculino"
                        value="Masculino"
                        checked={formData.gender === "Masculino"}
                        onChange={handleChange}
                      />

                      <GenderOption
                        label="Feminino"
                        value="Feminino"
                        checked={formData.gender === "Feminino"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                <InputField
                  label="Nova senha"
                  name="senha"
                  type="text"
                  value={formData.senha}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  placeholder="Preencha apenas se quiser alterar a senha"
                />

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Por segurança, deixe o campo de senha vazio caso não queira
                    alterar sua senha atual.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="group relative w-full overflow-hidden rounded-2xl bg-white text-[#070A0F] font-semibold py-3.5 mt-3 transition-all duration-300 hover:bg-slate-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Save size={19} />
                    {saving ? "Salvando..." : "Salvar alterações"}
                  </span>

                  <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-transform duration-300 group-hover:translate-y-0" />
                </button>
              </form>
            )}
          </section>
        </div>
      </section>

      <Nav />
    </main>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  icon,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-300 mb-2 uppercase tracking-[0.18em]">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={type === "password" ? "new-password" : "off"}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 py-3.5 text-white placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-blue-400/70 focus:bg-white/[0.07] focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
}

function GenderOption({ label, value, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 cursor-pointer transition-all ${
        checked
          ? "bg-white text-[#070A0F] border-white"
          : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.07]"
      }`}
    >
      <input
        type="radio"
        name="gender"
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-blue-500"
      />
      {label}
    </label>
  );
}

function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-[0.14em]">
          {label}
        </p>
        <p className="text-sm text-white mt-1">{value}</p>
      </div>
    </div>
  );
}