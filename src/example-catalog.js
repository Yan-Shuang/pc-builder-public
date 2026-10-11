export const categories = ["cpu", "board", "memory", "gpu", "ssd", "cooler", "psu", "case"];

export const categoryLabels = {
  cpu: "处理器", board: "主板", memory: "内存", gpu: "显卡",
  ssd: "存储", cooler: "散热", psu: "电源", case: "机箱"
};

// Fictional records only. Names and numbers are designed to exercise the rules,
// not to describe products currently sold in the market.
export const exampleCatalog = [
  { id:"cpu-a6", category:"cpu", name:"示例 A6 处理器", price:119900, cpuScore:0.82, socket:"S1", tdp:65 },
  { id:"cpu-a8", category:"cpu", name:"示例 A8 处理器", price:179900, cpuScore:1.08, socket:"S1", tdp:105 },
  { id:"cpu-b9", category:"cpu", name:"示例 B9 处理器", price:239900, cpuScore:1.31, socket:"S2", tdp:125 },

  { id:"board-s1-lite", category:"board", name:"示例 S1 紧凑主板", price:89900, socket:"S1", memoryType:"D5", form:"M" },
  { id:"board-s1-pro", category:"board", name:"示例 S1 扩展主板", price:139900, socket:"S1", memoryType:"D5", form:"A" },
  { id:"board-s2-pro", category:"board", name:"示例 S2 扩展主板", price:169900, socket:"S2", memoryType:"D5", form:"A" },

  { id:"memory-16", category:"memory", name:"示例 D5 16GB", price:39900, memoryType:"D5", capacity:16 },
  { id:"memory-32", category:"memory", name:"示例 D5 32GB", price:69900, memoryType:"D5", capacity:32 },
  { id:"memory-64", category:"memory", name:"示例 D5 64GB", price:119900, memoryType:"D5", capacity:64 },

  { id:"gpu-g6", category:"gpu", name:"示例 G6 显卡", price:169900, gpuScore:0.76, watts:500, length:245 },
  { id:"gpu-g7", category:"gpu", name:"示例 G7 显卡", price:269900, gpuScore:1.0, watts:600, length:285 },
  { id:"gpu-g8", category:"gpu", name:"示例 G8 显卡", price:399900, gpuScore:1.34, watts:750, length:330 },

  { id:"ssd-1", category:"ssd", name:"示例 NVMe 1TB", price:42900, capacity:1000 },
  { id:"ssd-2", category:"ssd", name:"示例 NVMe 2TB", price:69900, capacity:2000 },

  { id:"cooler-air", category:"cooler", name:"示例塔式散热", price:19900, sockets:["S1","S2"], maxTdp:130, height:154 },
  { id:"cooler-aio", category:"cooler", name:"示例 240 水冷", price:49900, sockets:["S1","S2"], maxTdp:220, height:55 },

  { id:"psu-650", category:"psu", name:"示例 650W 电源", price:39900, watts:650 },
  { id:"psu-850", category:"psu", name:"示例 850W 电源", price:59900, watts:850 },

  { id:"case-m", category:"case", name:"示例紧凑机箱", price:34900, forms:["M"], gpuMax:280, coolerMax:158 },
  { id:"case-a", category:"case", name:"示例标准机箱", price:49900, forms:["M","A"], gpuMax:350, coolerMax:170 }
];
