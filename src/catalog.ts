import type { Part } from "./types";

// Every public entry owns a unique modelId and an independently defined procedural
// geometry. Names, specifications and prices are fictional demonstration data.
export const catalog: Part[] = [
  { id:"cpu-slate", category:"cpu", name:"Slate S1 处理器", modelId:"cpu-slate-square", modelLabel:"独立模型 C-01", price:119900, size:[42,6,42], cpuScore:.82, socket:"S1", tdp:65 },
  { id:"cpu-copper", category:"cpu", name:"Copper S2 处理器", modelId:"cpu-copper-wide", modelLabel:"独立模型 C-02", price:219900, size:[48,7,45], cpuScore:1.24, socket:"S2", tdp:125 },
  { id:"board-grid", category:"board", name:"Grid M 主板", modelId:"board-grid-m", modelLabel:"独立模型 B-01", price:89900, size:[244,8,244], socket:"S1", memoryType:"D5", form:"M" },
  { id:"board-arch", category:"board", name:"Arch A 主板", modelId:"board-arch-a", modelLabel:"独立模型 B-02", price:159900, size:[305,9,244], socket:"S2", memoryType:"D5", form:"A" },
  { id:"memory-ridge", category:"memory", name:"Ridge D5 16GB", modelId:"memory-ridge-16", modelLabel:"独立模型 M-01", price:39900, size:[8,34,133], memoryType:"D5", capacity:16 },
  { id:"memory-finned", category:"memory", name:"Finned D5 32GB", modelId:"memory-finned-32", modelLabel:"独立模型 M-02", price:69900, size:[9,43,136], memoryType:"D5", capacity:32 },
  { id:"gpu-dual", category:"gpu", name:"Dual 245 图形卡", modelId:"gpu-dual-compact", modelLabel:"独立模型 G-01", price:169900, size:[245,112,42], gpuScore:.76, watts:500, length:245 },
  { id:"gpu-triple", category:"gpu", name:"Triple 330 图形卡", modelId:"gpu-triple-long", modelLabel:"独立模型 G-02", price:389900, size:[330,132,58], gpuScore:1.31, watts:750, length:330 },
  { id:"ssd-flat", category:"ssd", name:"Flat NVMe 1TB", modelId:"ssd-flat-1", modelLabel:"独立模型 S-01", price:42900, size:[80,4,22], capacity:1000 },
  { id:"ssd-ribbed", category:"ssd", name:"Ribbed NVMe 2TB", modelId:"ssd-ribbed-2", modelLabel:"独立模型 S-02", price:69900, size:[80,7,23], capacity:2000 },
  { id:"cooler-tower", category:"cooler", name:"Tower 154 散热器", modelId:"cooler-tower", modelLabel:"独立模型 H-01", price:19900, size:[120,154,78], sockets:["S1","S2"], maxTdp:130, height:154 },
  { id:"cooler-loop", category:"cooler", name:"Loop 240 散热器", modelId:"cooler-loop", modelLabel:"独立模型 H-02", price:49900, size:[120,55,275], sockets:["S1","S2"], maxTdp:220, height:55 },
  { id:"psu-vent", category:"psu", name:"Vent 650 电源", modelId:"psu-vent-650", modelLabel:"独立模型 P-01", price:39900, size:[150,86,140], watts:650 },
  { id:"psu-modular", category:"psu", name:"Modular 850 电源", modelId:"psu-modular-850", modelLabel:"独立模型 P-02", price:59900, size:[150,86,160], watts:850 },
  { id:"case-frame", category:"case", name:"Frame M 机箱", modelId:"case-frame-m", modelLabel:"独立模型 K-01", price:34900, size:[230,390,360], forms:["M"], gpuMax:280, coolerMax:158 },
  { id:"case-arc", category:"case", name:"Arc A 机箱", modelId:"case-arc-a", modelLabel:"独立模型 K-02", price:59900, size:[260,470,440], forms:["M","A"], gpuMax:350, coolerMax:175 }
];
