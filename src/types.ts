export const categories = ["cpu", "board", "memory", "gpu", "ssd", "cooler", "psu", "case"] as const;
export type Category = typeof categories[number];
export type Vec3 = [number, number, number];
export type ModelId =
  | "cpu-slate-square" | "cpu-copper-wide"
  | "board-grid-m" | "board-arch-a"
  | "memory-ridge-16" | "memory-finned-32"
  | "gpu-dual-compact" | "gpu-triple-long"
  | "ssd-flat-1" | "ssd-ribbed-2"
  | "cooler-tower" | "cooler-loop"
  | "psu-vent-650" | "psu-modular-850"
  | "case-frame-m" | "case-arc-a";

export type Part = {
  id: string;
  category: Category;
  name: string;
  modelId: ModelId;
  modelLabel: string;
  price: number;
  size: Vec3;
  cpuScore?: number;
  gpuScore?: number;
  socket?: "S1" | "S2";
  tdp?: number;
  memoryType?: "D5";
  form?: "M" | "A";
  capacity?: number;
  watts?: number;
  length?: number;
  sockets?: ("S1" | "S2")[];
  maxTdp?: number;
  height?: number;
  forms?: ("M" | "A")[];
  gpuMax?: number;
  coolerMax?: number;
};

export type Selection = Record<Category, Part>;
export type Issue = { message: string; categories: Category[] };
export type Candidate = { selection: Selection; total: number; score: number; key: string };
export type Recommendation =
  | { status: "invalid"; message: string }
  | { status: "no-result"; evaluated: number }
  | { status: "ok"; best: Candidate; evaluated: number; remaining: number };
