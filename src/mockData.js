// Mock data for the Autonomous AI Operating System (AIOS) Command Center

// 7-day projected vs. actual costs ($)
export const costSavingsHistory = [
  { day: "Mon", projected: 1850, actual: 148, compressed: 420 },
  { day: "Tue", projected: 2100, actual: 168, compressed: 510 },
  { day: "Wed", projected: 2450, actual: 196, compressed: 630 },
  { day: "Thu", projected: 2200, actual: 176, compressed: 580 },
  { day: "Fri", projected: 2600, actual: 208, compressed: 690 },
  { day: "Sat", projected: 1750, actual: 140, compressed: 380 },
  { day: "Sun", projected: 1900, actual: 152, compressed: 440 }
];

// Model Distribution Routing (Donut Chart)
export const modelDistribution = [
  { name: "Claude 3.5 Sonnet", value: 40, color: "#a855f7", desc: "Complex logic & reasoning" }, // Purple
  { name: "Gemini 1.5 Flash", value: 45, color: "#06b6d4", desc: "Boilerplate & standard queries" }, // Cyan
  { name: "DeepSeek Coder", value: 15, color: "#10b981", desc: "Specialized math & code generation" } // Emerald
];

// Initial Live Orchestration Logs
export const initialOrchestrationLogs = [
  {
    id: "tx-9801",
    timestamp: "19:20:12",
    source: "VS Code",
    intent: "React Login Dashboard",
    actions: ["Observer", "Cost", "Memory", "Routing"],
    outcome: "Compressed by 45% -> Routed to Flash -> Saved $0.23",
    savingAmount: 0.23,
    tokens: 4500
  },
  {
    id: "tx-9802",
    timestamp: "19:19:48",
    source: "Chrome",
    intent: "Summarize API specs",
    actions: ["Observer", "Cost", "Memory"],
    outcome: "Memory Matched -> Cache Served -> Saved $0.12",
    savingAmount: 0.12,
    tokens: 1800
  },
  {
    id: "tx-9803",
    timestamp: "19:19:15",
    source: "Terminal CLI",
    intent: "Audit SQL security rules",
    actions: ["Observer", "Routing"],
    outcome: "Semantic Audit -> Routed to Sonnet -> Saved $0.05",
    savingAmount: 0.05,
    tokens: 8500
  },
  {
    id: "tx-9804",
    timestamp: "19:18:50",
    source: "GitHub Action",
    intent: "Generate TS typings",
    actions: ["Observer", "Cost", "Routing"],
    outcome: "Compressed by 60% -> Routed to Flash -> Saved $0.18",
    savingAmount: 0.18,
    tokens: 3200
  },
  {
    id: "tx-9805",
    timestamp: "19:18:12",
    source: "VS Code",
    intent: "Optimize float arithmetic",
    actions: ["Observer", "Routing"],
    outcome: "DeepSeek Routed -> Low-cost Math -> Saved $0.08",
    savingAmount: 0.08,
    tokens: 1400
  }
];

// Lists for dynamic mock log generation
export const logSources = ["VS Code", "Chrome", "Terminal CLI", "GitHub Action", "Slack Bot", "Web UI"];

export const logIntents = [
  { text: "Generate unit tests", baseTokens: 3500 },
  { text: "Refactor legacy loop", baseTokens: 1200 },
  { text: "Draft release notes", baseTokens: 2500 },
  { text: "Optimize CSS grid rules", baseTokens: 900 },
  { text: "Implement JWT validation", baseTokens: 4100 },
  { text: "Parse JSON crash dump", baseTokens: 12500 },
  { text: "Translate error codes", baseTokens: 1500 },
  { text: "Scaffold docker compose", baseTokens: 2800 }
];

export const logTemplates = [
  {
    actions: ["Observer", "Cost", "Memory", "Routing"],
    outcome: "Compressed by 52% -> Routed to Flash -> Saved $0.19",
    savingAmount: 0.19
  },
  {
    actions: ["Observer", "Memory"],
    outcome: "Semantic Cache Hit -> Local Return -> Saved $0.14",
    savingAmount: 0.14
  },
  {
    actions: ["Observer", "Cost", "Routing"],
    outcome: "Tokens Splice -> Routed to DeepSeek -> Saved $0.11",
    savingAmount: 0.11
  },
  {
    actions: ["Observer", "Routing"],
    outcome: "Routed to Claude 3.5 -> Complex Intent -> Saved $0.04",
    savingAmount: 0.04
  }
];
