import React from 'react';
import { 
  Terminal, 
  Radar, 
  TrendingDown, 
  Cpu, 
  Sliders, 
  Activity,
  LogOut,
  User,
  BrainCircuit
} from 'lucide-react';

export default function SidebarLeft({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const menuItems = [
    { id: 'command-center', name: 'Command Center', icon: Terminal, glowClass: 'glow-purple' },
    { id: 'tracking', name: 'Universal Tracking', icon: Radar, glowClass: 'glow-cyan' },
    { id: 'cost', name: 'Cost Analytics', icon: TrendingDown, glowClass: 'glow-emerald' },
    { id: 'orchestration', name: 'Agent Orchestration', icon: Cpu, glowClass: 'glow-purple' },
    { id: 'settings', name: 'Integration Settings', icon: Sliders, glowClass: 'glow-cyan' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col items-center justify-between
        w-20 py-6 border-r border-slate-900 bg-slate-950 transition-all duration-300
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Branding Logo */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 rounded-xl bg-purple-500/30 blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-400 group-hover:border-purple-400 transition-colors">
              <BrainCircuit className="w-7 h-7 fill-purple-400/10 animate-pulse" />
            </div>
          </div>

          <div className="w-8 h-[1px] bg-slate-900" />
        </div>

        {/* Navigation Actions */}
        <nav className="flex flex-col gap-4 w-full px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`
                  relative group flex items-center justify-center w-14 h-14 rounded-xl
                  transition-all duration-300 ease-out cursor-pointer mx-auto
                  ${isActive 
                    ? 'bg-slate-900 border border-slate-800 text-white shadow-[0_0_12px_rgba(168,85,247,0.15)]' 
                    : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                  }
                `}
                title={item.name}
              >
                {/* Side active neon indicator */}
                {isActive && (
                  <span className="absolute left-0 w-[3px] h-6 bg-purple-500 rounded-r-md" />
                )}
                
                <Icon className={`w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? item.glowClass : ''}`} />

                {/* Tooltip Hover Bubble */}
                <div className="absolute left-18 hidden group-hover:flex items-center z-50">
                  <div className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap font-medium">
                    {item.name}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Profile / System status */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-[1px] bg-slate-900" />

          {/* User profile representation */}
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 transition-all cursor-pointer">
            <User className="w-4 h-4" />
          </button>

          {/* Status Indicator */}
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center" title="Core Operating System Online">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
}
