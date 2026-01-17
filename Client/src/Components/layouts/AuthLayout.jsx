import React from "react";
import UI_IMG from "../../assets/images/auth-img.PNG";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Planova</h1>
            <p className="text-sm text-slate-600">Project Management Platform</p>
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Hero / Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 text-white">
        {/* layered glows */}
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.25),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.2),transparent_30%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_35%,transparent_60%)]"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
          <div className="max-w-xl w-full space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse"></span>
              <span className="text-xs tracking-wide uppercase text-emerald-100">Live project pulse</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-xl shadow-blue-900/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/10">
                    <img src={UI_IMG} alt="Planova UI" className="h-9 w-9 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Planova OS</p>
                    <p className="text-lg font-semibold text-white">Plan smarter, ship faster</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-100">On-time delivery</p>
                    <p className="text-2xl font-bold text-white">94%</p>
                    <p className="text-[11px] text-emerald-200 mt-1">+8% vs last sprint</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-blue-100">Team focus</p>
                    <p className="text-2xl font-bold text-white">42h</p>
                    <p className="text-[11px] text-emerald-200 mt-1">avg. deep work</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl flex flex-col gap-3 shadow-lg shadow-blue-900/20">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-100">Squad velocity</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/40">+12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[78%] bg-emerald-400"></div>
                  </div>
                  <span className="text-sm font-semibold text-white">78%</span>
                </div>
                <p className="text-xs text-blue-100">Track execution in real time across pods.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg shadow-blue-900/20">
                <p className="text-sm font-semibold text-white mb-3">Today’s focus</p>
                <div className="space-y-2">
                  {["Finalize Q1 roadmap","Ship sprint 14","Review launch assets"].map((item, idx) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-blue-50">
                      <input type="checkbox" defaultChecked={idx === 1} className="accent-emerald-300 h-4 w-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-blue-100">
              <div className="flex -space-x-2">
                {["AE","MS","JP"].map((initials) => (
                  <span key={initials} className="h-9 w-9 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-xs font-semibold uppercase">
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">Trusted by product teams</p>
                <p className="text-xs text-blue-100">Designers, engineers, and ops in one workspace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;