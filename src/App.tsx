import { useMemo, useState, type FormEvent } from "react";
import { catalog } from "./catalog";
import { categoryLabels, recommendBuild, validateBuild, yuan } from "./recommender";
import { Viewer } from "./scene/Viewer";
import { categories, type Category, type Selection } from "./types";

const initialResult=recommendBuild(catalog,6500);
const initial=initialResult.status==="ok"?initialResult:(()=>{throw new Error("Example catalog must provide the default recommendation");})();

export default function App(){
  const [budget,setBudget]=useState("6500");
  const [selection,setSelection]=useState<Selection>(initial.best.selection);
  const [reply,setReply]=useState(`已检查 ${initial.evaluated.toLocaleString("zh-CN")} 种组合。`);
  const [view,setView]=useState<"perspective"|"top">("perspective");
  const [internal,setInternal]=useState(true);
  const [showLabels,setShowLabels]=useState(true);
  const [resetId,setResetId]=useState(0);
  const [highlight,setHighlight]=useState<Category|null>(null);
  const issues=useMemo(()=>validateBuild(selection),[selection]);
  const total=categories.reduce((sum,category)=>sum+selection[category].price,0);
  const score=1000*Math.sqrt(selection.cpu.cpuScore!*selection.gpu.gpuScore!);
  function submit(event:FormEvent){
    event.preventDefault(); const result=recommendBuild(catalog,budget);
    if(result.status==="invalid"){setReply(result.message);return;}
    if(result.status==="no-result"){setReply("这个预算下没有通过全部门禁的完整组合，请提高预算。");return;}
    setSelection(result.best.selection); setHighlight(null); setReply(`已检查 ${result.evaluated.toLocaleString("zh-CN")} 种组合，并同步到 3D 装配。`);
  }
  function choose(category:Category,id:string){const part=catalog.find(item=>item.id===id&&item.category===category);if(!part)return;setSelection(current=>({...current,[category]:part}));setHighlight(category);setReply("已手动换件；冲突项会进入 3D 待安装区。");}
  return <>
    <a className="skip" href="#workspace">跳到 3D 装配演示</a>
    <header className="site-header"><a className="brand" href="./"><span>PC</span> BUILDER</a><div><span className="safe-chip">16 个独立示意模型</span><a className="source" href="https://github.com/Yan-Shuang/pc-builder-public">查看源码 ↗</a></div></header>
    <main>
      <section className="hero"><p className="eyebrow">DETERMINISTIC 3D ASSEMBLY · ZERO PAID API</p><h1>规则推荐，<br/><em>实时装进 3D。</em></h1><p className="lead">每个公开条目都有唯一的无品牌原创示意模型。预算推荐、换件、兼容门禁与装配状态全部在浏览器中运行。</p><div className="facts"><span>独立模型条目</span><span>无品牌示意</span><span>无后端与 AI 请求</span></div></section>
      <section className="boundary-note" role="note"><strong>展示边界</strong><p>模型不是实物外观、厂家 CAD 或机械兼容认证。名称、尺寸、价格和性能分均为虚构示例；六款授权未明确的品牌 GLB 未进入公开演示。</p></section>
      <section className="workspace" id="workspace" aria-label="3D 装机与配件选择">
        <div className="stage" data-labels={showLabels?"visible":"hidden"}>
          <div className="stage-head"><div><p className="eyebrow">LIVE ASSEMBLY</p><h2>无品牌独立模型装配</h2></div><span>{issues.length?`${issues.length} 项待处理`:"规则检查通过"}</span></div>
          <div className="canvas-wrap"><Viewer selection={selection} highlight={highlight} view={view} internal={internal} resetId={resetId} showLabels={showLabels}/></div>
          <div className="view-tools"><button aria-pressed={view==="perspective"} onClick={()=>setView("perspective")}>立体</button><button aria-pressed={view==="top"} onClick={()=>setView("top")}>俯视</button><button onClick={()=>setResetId(value=>value+1)}>重置视角</button><button aria-pressed={internal} onClick={()=>setInternal(value=>!value)}>{internal?"装上侧板":"隐藏侧板"}</button><button aria-pressed={showLabels} onClick={()=>setShowLabels(value=>!value)}>{showLabels?"隐藏标注":"显示标注"}</button></div>
          <div className="stage-footer"><span>拖动旋转 · 滚轮 / 双指缩放 · 右键平移</span><span>{issues.length?"冲突配件已移至待安装区":"当前部件按示意锚点归位"}</span></div>
        </div>
        <aside className="control-panel">
          <form onSubmit={submit}><label htmlFor="budget">整机预算（元）</label><div className="input-row"><span>¥</span><input id="budget" value={budget} onChange={event=>setBudget(event.target.value)} inputMode="numeric" min="1" step="1"/><button>生成并装配</button></div></form>
          <p className="reply" aria-live="polite">{reply}</p>
          <div className="score"><span>本站示例性能分</span><strong>{score.toFixed(1)}</strong><small>当前总价 {yuan(total)}</small></div>
          <div className="issues" aria-live="polite">{issues.length?<>{issues.map(issue=><p key={issue.message}>{issue.message}</p>)}</>:<p className="ok">接口、尺寸、散热与电源示例规则通过</p>}</div>
          <h3>独立模型配件库</h3><p className="library-note">每个条目对应唯一模型 ID。点选后立即更新装配，高亮所选类别。</p>
          <div className="part-library">{categories.map(category=><section key={category}><div><b>{categoryLabels[category]}</b><span>{selection[category].modelLabel}</span></div>{catalog.filter(part=>part.category===category).map(part=><button key={part.id} className={selection[category].id===part.id?"selected":""} aria-pressed={selection[category].id===part.id} onMouseEnter={()=>setHighlight(category)} onMouseLeave={()=>setHighlight(null)} onFocus={()=>setHighlight(category)} onClick={()=>choose(category,part.id)}><strong>{part.name}</strong><span>{part.modelLabel} · {yuan(part.price)}</span></button>)}</section>)}</div>
        </aside>
      </section>
      <section className="method"><article><b>01</b><h3>确定性推荐</h3><p>穷举 256 种组合，先通过兼容门禁，再按固定性能公式、总价和稳定键排序。</p></article><article><b>02</b><h3>独立模型</h3><p>16 个条目、16 个唯一模型 ID；只使用项目原创的无品牌程序化几何。</p></article><article><b>03</b><h3>状态可解释</h3><p>手动换件后，冲突部件进入待安装区，规则原因保留在清单与模型标注中。</p></article></section>
    </main>
    <footer><span>Designed and built by Yan Shuang</span><span>MIT · 2026</span></footer>
  </>;
}
