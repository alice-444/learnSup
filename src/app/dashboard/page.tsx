"use client";

import { Wrench } from "lucide-react";

export default function DashboardDev() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10172A] to-[#232B4A]">
      <div className="flex flex-col items-center gap-6 p-8 bg-[#181F3A]/90 rounded-2xl shadow-2xl">
        <Wrench className="w-16 h-16 text-blue-300 mb-2" />
        <h1 className="text-3xl font-bold text-blue-200 text-center">Page en cours de développement</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Cette section du tableau de bord sera bientôt disponible.<br />Merci de votre patience !
        </p>
      </div>
    </div>
  );
}
