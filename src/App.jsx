import React, { useState, useEffect } from 'react';
import SidebarLeft from './components/SidebarLeft';
import DashboardContent from './components/DashboardContent';
import { 
  costSavingsHistory, 
  modelDistribution, 
  initialOrchestrationLogs,
  logSources,
  logIntents,
  logTemplates
} from './mockData';
import { Sliders, Cpu, BrainCircuit } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('command-center');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Simulation and KPI States
  const [isSimulating, setIsSimulating] = useState(true);
  const [kpis, setKpis] = useState({
    prompts: 14230,
    savings: 92,
    tokensCompressed: 2.4, // in Millions
    systemStatus: 'Active'
  });
  
  const [logs, setLogs] = useState(initialOrchestrationLogs);
  const [costHistory, setCostHistory] = useState(costSavingsHistory);

  // Live simulation tick
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Pick random parameters
      const randomSource = logSources[Math.floor(Math.random() * logSources.length)];
      const randomIntent = logIntents[Math.floor(Math.random() * logIntents.length)];
      const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)];

      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS
      const randomTxId = `tx-${Math.floor(1000 + Math.random() * 9000)}`;

      // Construct log node
      const newLog = {
        id: randomTxId,
        timestamp: timeString,
        source: randomSource,
        intent: randomIntent.text,
        actions: randomTemplate.actions,
        outcome: randomTemplate.outcome,
        savingAmount: randomTemplate.savingAmount,
        tokens: randomIntent.baseTokens
      };

      // Update state
      setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)]); // Cap at 10 items

      setKpis(prevKpis => {
        const incrementPrompts = Math.floor(Math.random() * 3) + 1;
        const incrementalCompressed = (randomIntent.baseTokens * 0.45) / 1000000; // compress ~45% avg
        return {
          ...prevKpis,
          prompts: prevKpis.prompts + incrementPrompts,
          tokensCompressed: prevKpis.tokensCompressed + incrementalCompressed
        };
      });

      // Periodically update the cost history graph data with small noise to simulate dynamic savings changes
      setCostHistory(prevHistory => {
        return prevHistory.map((item, idx) => {
          if (idx === prevHistory.length - 1) {
            // Apply slight random noise to Sunday/last element
            const delta = Math.floor((Math.random() - 0.5) * 40);
            return {
              ...item,
              projected: Math.max(1000, item.projected + delta),
              actual: Math.max(100, Math.floor((item.projected + delta) * 0.08)) // maintain ~92% saving ratio
            };
          }
          return item;
        });
      });

    }, 3200);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleResetSimulation = () => {
    setKpis({
      prompts: 14230,
      savings: 92,
      tokensCompressed: 2.4,
      systemStatus: 'Active'
    });
    setLogs(initialOrchestrationLogs);
    setCostHistory(costSavingsHistory);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Slim Navigation Sidebar */}
      <SidebarLeft 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Core Dashboard Content Panel */}
      {activeTab === 'command-center' ? (
        <DashboardContent 
          kpis={kpis}
          costHistory={costHistory}
          distribution={modelDistribution}
          logs={logs}
          isSimulating={isSimulating}
          setIsSimulating={setIsSimulating}
          onResetSimulation={handleResetSimulation}
          onMenuToggle={() => setMobileOpen(true)}
        />
      ) : (
        /* Empty route template */
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950">
          <div className="bg-slate-900 border border-slate-850 p-8 rounded-2xl text-center max-w-md shadow-2xl">
            <div className="w-16 h-16 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center mx-auto text-purple-400 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Sliders className="w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2 capitalize">{activeTab.replace('-', ' ')} Feed</h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              This system node represent simulated analytics for {activeTab}. The real-time optimization loop is actively executing in the Command Center tab.
            </p>
            <button 
              onClick={() => setActiveTab('command-center')}
              className="px-5 py-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-xl text-xs font-semibold hover:bg-purple-500 hover:text-slate-950 hover:border-purple-500 transition-all cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.1)]"
            >
              Access Command Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
