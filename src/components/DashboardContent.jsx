import React from 'react';
import { 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  Zap, 
  FileText, 
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  TrendingDown,
  Sparkles,
  Menu
} from 'lucide-react';

export default function DashboardContent({ 
  kpis, 
  costHistory, 
  distribution, 
  logs, 
  isSimulating, 
  setIsSimulating,
  onResetSimulation,
  onMenuToggle
}) {

  // Custom tool tip for Line Chart
  const CustomLineTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg shadow-xl font-sans text-xs">
          <p className="text-slate-400 font-semibold mb-1 font-mono">{label} Analysis</p>
          <p className="text-rose-400 font-semibold mb-0.5">
            Default Cost: ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-emerald-400 font-semibold">
            AIOS Optimized: ${payload[1].value.toLocaleString()}
          </p>
          <div className="border-t border-slate-800 mt-1.5 pt-1.5 text-[10px] text-slate-400 font-mono">
            Savings: ${ (payload[0].value - payload[1].value).toLocaleString() } (92%)
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom tool tip for Pie Chart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg shadow-xl font-sans text-xs">
          <p className="font-semibold text-slate-200">{payload[0].name}</p>
          <p className="font-bold text-cyan-400 mt-0.5">{payload[0].value}% of Requests</p>
          <p className="text-[10px] text-slate-500 mt-1">{payload[0].payload.desc}</p>
        </div>
      );
    }
    return null;
  };

  // Agent action badges mapping
  const renderAgentBadges = (actions) => {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {actions.map((act, i) => {
          let badgeColor = "bg-slate-800 text-slate-400 border-slate-700/50";
          if (act === 'Observer') badgeColor = "bg-purple-950/40 text-purple-400 border-purple-500/20";
          if (act === 'Cost') badgeColor = "bg-emerald-950/40 text-emerald-400 border-emerald-500/20";
          if (act === 'Memory') badgeColor = "bg-cyan-950/40 text-cyan-400 border-cyan-500/20";
          if (act === 'Routing') badgeColor = "bg-indigo-950/40 text-indigo-400 border-indigo-500/20";

          return (
            <React.Fragment key={act}>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border uppercase tracking-wider ${badgeColor}`}>
                {act}
              </span>
              {i < actions.length - 1 && (
                <ArrowRight className="w-2.5 h-2.5 text-slate-650" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex flex-col gap-6 select-none">
      
      {/* Top Header Section */}
      <header className="flex items-center justify-between pb-3 border-b border-slate-900 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-850 rounded-lg cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400 glow-purple" />
              <span>AIOS COMMAND CENTER</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Autonomous AI Operating System Optimization Engine.</p>
          </div>
        </div>

        {/* Live Controller Actions */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-850 p-0.5 rounded-lg text-xs">
            <button 
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors cursor-pointer font-medium
                ${isSimulating 
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                  : 'text-slate-400 hover:text-slate-200'
                }
              `}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isSimulating ? 'SIMULATING' : 'PAUSED'}
            </button>
            
            <button 
              onClick={onResetSimulation}
              className="p-1 text-slate-400 hover:text-slate-200 rounded ml-1 transition-colors cursor-pointer"
              title="Reset Counters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
            <span className="text-slate-400 uppercase">Engine Status: LIVE</span>
          </div>
        </div>
      </header>

      {/* Top Row: Live KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Prompts Intercepted */}
        <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-4.5 flex flex-col justify-between min-h-[110px] transition-all hover:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity">
            <FileText className="w-14 h-14 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Prompts Intercepted
            </div>
            <div className="text-2xl font-bold text-white font-mono mt-2.5 glow-cyan">
              {kpis.prompts.toLocaleString()}
            </div>
          </div>
          <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1 mt-2">
            <span className="w-1 h-1 rounded-full bg-cyan-450 animate-ping"></span>
            Cross-platform intercepts running
          </div>
        </div>

        {/* KPI 2: Active Cost Savings */}
        <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-4.5 flex flex-col justify-between min-h-[110px] transition-all hover:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity">
            <TrendingDown className="w-14 h-14 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              Active Cost Savings
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-2.5 glow-emerald">
              {kpis.savings}%
            </div>
          </div>
          <div className="text-[9px] text-slate-500 font-mono mt-2">
            Enterprise premium savings active
          </div>
        </div>

        {/* KPI 3: Tokens Compressed */}
        <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-4.5 flex flex-col justify-between min-h-[110px] transition-all hover:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity">
            <Zap className="w-14 h-14 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Tokens Compressed
            </div>
            <div className="text-2xl font-bold text-white font-mono mt-2.5">
              {kpis.tokensCompressed.toFixed(2)}M
            </div>
          </div>
          <div className="text-[9px] text-slate-500 font-mono mt-2">
            Semantic waste stripped from context
          </div>
        </div>

        {/* KPI 4: System Status */}
        <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-4.5 flex flex-col justify-between min-h-[110px] transition-all hover:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity">
            <Sparkles className="w-14 h-14 text-white" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              System Status
            </div>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-2.5 glow-purple flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
              {kpis.systemStatus}
            </div>
          </div>
          <div className="text-[9px] text-slate-550 font-mono mt-2">
            ASI self-learning loops processing
          </div>
        </div>
      </div>

      {/* Middle Section: Cost Line Graph & Donut Model Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: 7-Day Cost Savings Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-850/80 rounded-xl p-5 flex flex-col gap-4 min-h-[320px] transition-all hover:border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">Token Usage vs. Cost Savings</h2>
              <p className="text-[11px] text-slate-500">Projected costs compared to optimized routing metrics.</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Default Cost
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Optimized Cost
              </span>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.25} />
                <XAxis 
                  dataKey="day" 
                  stroke="#475569" 
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                />
                <YAxis 
                  stroke="#475569" 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                  tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#f43f5e" // rose-500
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#020617', stroke: '#f43f5e', strokeWidth: 1.5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" // emerald-500
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#020617', stroke: '#10b981', strokeWidth: 1.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Donut Routing Chart */}
        <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-5 flex flex-col justify-between min-h-[320px] transition-all hover:border-slate-800">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">Model Routing Distribution</h2>
            <p className="text-[11px] text-slate-500">Autonomous routing ratios based on prompt complexity.</p>
          </div>

          <div className="flex-1 relative flex items-center justify-center min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Summary Text */}
            <div className="absolute flex flex-col items-center justify-center font-sans">
              <span className="text-[10px] uppercase text-slate-500 tracking-wider font-semibold">Active Mode</span>
              <span className="text-lg font-bold text-white tracking-tight">AUTO</span>
            </div>
          </div>

          {/* Slices Indicators legend */}
          <div className="flex flex-col gap-1.5 text-[10px] font-mono border-t border-slate-800/60 pt-3">
            {distribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="text-slate-200 font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Live Autonomous Feed */}
      <div className="bg-slate-900 border border-slate-850/80 rounded-xl p-5 flex flex-col gap-4 flex-1 transition-all hover:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
              Live Agent Orchestration Log
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Real-time compilation of intercepted tasks and automated outcomes.</p>
          </div>
          <span className="text-[9px] font-mono bg-slate-950 border border-slate-850 text-slate-400 px-2 py-0.5 rounded-full">
            Logs Displayed: {logs.length}
          </span>
        </div>

        {/* Live Logs Table Container */}
        <div className="overflow-x-auto border border-slate-950 rounded-lg">
          <table className="w-full text-left border-collapse text-xs select-none">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-900 font-mono">
                <th className="p-3 font-semibold uppercase tracking-wider text-[10px]">Time</th>
                <th className="p-3 font-semibold uppercase tracking-wider text-[10px]">Source</th>
                <th className="p-3 font-semibold uppercase tracking-wider text-[10px]">Task Intent</th>
                <th className="p-3 font-semibold uppercase tracking-wider text-[10px]">Agent Actions</th>
                <th className="p-3 font-semibold uppercase tracking-wider text-[10px] text-right">Outcome & Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  className="hover:bg-slate-900/60 transition-colors animate-fade-in group font-sans"
                >
                  <td className="p-3 text-slate-500 font-mono text-[10px]">{log.timestamp}</td>
                  <td className="p-3 font-medium text-slate-350">
                    <span className="bg-slate-950 border border-slate-850 px-2 py-0.5 rounded-md font-mono text-[10px]">
                      {log.source}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200 font-semibold tracking-tight">{log.intent}</td>
                  <td className="p-3">{renderAgentBadges(log.actions)}</td>
                  <td className="p-3 text-right">
                    <div className="text-emerald-400 font-mono font-bold text-[11px] group-hover:glow-emerald transition-all duration-300">
                      {log.outcome}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
