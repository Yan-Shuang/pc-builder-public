import { categories } from "./example-catalog.js";

const stableKey = selection => categories.map(category => selection[category].id).join("|");

export function validateBuild(selection) {
  const issues = [];
  if (selection.cpu.socket !== selection.board.socket) issues.push("处理器与主板接口不一致");
  if (selection.memory.memoryType !== selection.board.memoryType) issues.push("内存代际与主板不一致");
  if (!selection.cooler.sockets.includes(selection.cpu.socket)) issues.push("散热器不支持处理器接口");
  if (selection.cooler.maxTdp < selection.cpu.tdp) issues.push("散热能力低于处理器设计功耗");
  if (!selection.case.forms.includes(selection.board.form)) issues.push("机箱不支持主板尺寸");
  if (selection.case.gpuMax < selection.gpu.length) issues.push("显卡长度超过机箱限值");
  if (selection.case.coolerMax < selection.cooler.height) issues.push("散热器高度超过机箱限值");
  if (selection.psu.watts < selection.gpu.watts) issues.push("电源功率低于显卡建议值");
  return issues;
}

export function scoreBuild(selection) {
  return 1000 * Math.sqrt(selection.cpu.cpuScore * selection.gpu.gpuScore);
}

export function recommendBuild(catalog, budgetYuan) {
  const budget = Math.round(Number(budgetYuan) * 100);
  if (!Number.isSafeInteger(budget) || budget <= 0) return { status:"invalid", message:"请输入大于 0 的整数预算。" };
  const pools = Object.fromEntries(categories.map(category => [category, catalog.filter(part => part.category === category)]));
  if (categories.some(category => pools[category].length === 0)) return { status:"no-result", evaluated:0 };

  let evaluated = 0;
  const eligible = [];
  const walk = (index, selection) => {
    if (index === categories.length) {
      evaluated += 1;
      const issues = validateBuild(selection);
      const total = categories.reduce((sum, category) => sum + selection[category].price, 0);
      if (issues.length === 0 && total <= budget) eligible.push({
        selection: { ...selection }, total, score: scoreBuild(selection), key: stableKey(selection)
      });
      return;
    }
    const category = categories[index];
    for (const part of pools[category]) walk(index + 1, { ...selection, [category]:part });
  };
  walk(0, {});
  eligible.sort((a,b) => (b.score-a.score) || (a.total-b.total) || a.key.localeCompare(b.key));
  const best = eligible[0] ?? null;
  return best
    ? { status:"ok", best, evaluated, remaining:budget-best.total }
    : { status:"no-result", evaluated };
}

export const yuan = cents => `¥${(cents/100).toLocaleString("zh-CN", { maximumFractionDigits:0 })}`;
