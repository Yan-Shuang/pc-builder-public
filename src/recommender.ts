import { categories, type Category, type Issue, type Part, type Recommendation, type Selection } from "./types";

export const categoryLabels: Record<Category,string> = { cpu:"处理器",board:"主板",memory:"内存",gpu:"显卡",ssd:"存储",cooler:"散热",psu:"电源",case:"机箱" };

export function validateBuild(selection: Selection): Issue[] {
  const issues: Issue[] = [];
  if (selection.cpu.socket !== selection.board.socket) issues.push({ message:"处理器与主板接口不一致", categories:["cpu"] });
  if (selection.memory.memoryType !== selection.board.memoryType) issues.push({ message:"内存代际与主板不一致", categories:["memory"] });
  if (!selection.cooler.sockets?.includes(selection.cpu.socket!)) issues.push({ message:"散热器不支持处理器接口", categories:["cooler"] });
  if ((selection.cooler.maxTdp ?? 0) < (selection.cpu.tdp ?? 0)) issues.push({ message:"散热能力低于处理器设计功耗", categories:["cooler"] });
  if (!selection.case.forms?.includes(selection.board.form!)) issues.push({ message:"机箱不支持主板尺寸", categories:["board"] });
  if ((selection.case.gpuMax ?? 0) < (selection.gpu.length ?? 0)) issues.push({ message:"显卡长度超过机箱示例限值", categories:["gpu"] });
  if ((selection.case.coolerMax ?? 0) < (selection.cooler.height ?? 0)) issues.push({ message:"散热器高度超过机箱示例限值", categories:["cooler"] });
  if ((selection.psu.watts ?? 0) < (selection.gpu.watts ?? 0)) issues.push({ message:"电源功率低于显卡示例建议值", categories:["gpu"] });
  return issues;
}

export function scoreBuild(selection: Selection) {
  return 1000 * Math.sqrt(selection.cpu.cpuScore! * selection.gpu.gpuScore!);
}

export function recommendBuild(catalog: Part[], budgetYuan: number | string): Recommendation {
  const budget = Math.round(Number(budgetYuan) * 100);
  if (!Number.isSafeInteger(budget) || budget <= 0) return { status:"invalid", message:"请输入大于 0 的整数预算。" };
  const pools = Object.fromEntries(categories.map(category => [category, catalog.filter(part => part.category === category)])) as Record<Category,Part[]>;
  let evaluated=0; const eligible: { selection:Selection; total:number; score:number; key:string }[]=[];
  const walk=(index:number,partial:Partial<Selection>)=>{
    if(index===categories.length){
      evaluated++; const selection=partial as Selection;
      const total=categories.reduce((sum,category)=>sum+selection[category].price,0);
      if(total<=budget && validateBuild(selection).length===0) eligible.push({ selection:{...selection},total,score:scoreBuild(selection),key:categories.map(c=>selection[c].id).join("|") });
      return;
    }
    const category=categories[index]; for(const part of pools[category]) walk(index+1,{...partial,[category]:part});
  };
  walk(0,{});
  eligible.sort((a,b)=>(b.score-a.score)||(a.total-b.total)||a.key.localeCompare(b.key));
  const best=eligible[0];
  return best?{status:"ok",best,evaluated,remaining:budget-best.total}:{status:"no-result",evaluated};
}

export const yuan=(cents:number)=>`¥${(cents/100).toLocaleString("zh-CN",{maximumFractionDigits:0})}`;
