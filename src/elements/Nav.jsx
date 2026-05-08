import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ChartNoAxesCombined,
  FileText,
  Download,
  User,
} from "lucide-react";

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Início",
      path: "/dashboard",
      icon: <Home size={21} strokeWidth={2} />,
    },
    {
      label: "Simulação",
      path: "/simulacao",
      icon: <ChartNoAxesCombined size={21} strokeWidth={2} />,
    },
    {
      label: "Contratos",
      path: "/contratos",
      icon: <FileText size={21} strokeWidth={2} />,
    },
    {
      label: "Resgates",
      path: "/resgates",
      icon: <Download size={21} strokeWidth={2} />,
    },
    {
      label: "Perfil",
      path: "/perfil",
      icon: <User size={21} strokeWidth={2} />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#070A0F]/90 backdrop-blur-xl px-4 py-3">
      <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            ativo={location.pathname === item.path}
            label={item.label}
            icon={item.icon}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>
    </nav>
  );
}

function MenuItem({ label, icon, ativo, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2.5 text-[11px] font-semibold transition ${
        ativo
          ? "bg-white text-[#070A0F]"
          : "text-slate-500 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {label}
    </button>
  );
}