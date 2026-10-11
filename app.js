import { exampleCatalog, categories, categoryLabels } from "./src/example-catalog.js";
import { recommendBuild, yuan } from "./src/deterministic-recommender.js";

const form = document.querySelector("#budget-form");
const input = document.querySelector("#budget");
const result = document.querySelector("#result");

function render(value) {
  const response = recommendBuild(exampleCatalog, value);
  if (response.status === "invalid") {
    result.innerHTML = `<p class="empty">${response.message}</p>`;
    return;
  }
  if (response.status !== "ok") {
    result.innerHTML = `<p class="empty">这个预算下没有通过全部门禁的完整组合。试试提高预算。</p>`;
    return;
  }
  const { best } = response;
  const rows = categories.map(category => `<li><span>${categoryLabels[category]}</span><strong>${best.selection[category].name}</strong><i>${yuan(best.selection[category].price)}</i></li>`).join("");
  result.innerHTML = `<div class="score"><span>本站示例性能分</span><strong>${best.score.toFixed(1)}</strong><small>检查了 ${response.evaluated.toLocaleString("zh-CN")} 种组合</small></div><ul>${rows}</ul><div class="total"><span>参考总价 <strong>${yuan(best.total)}</strong></span><span>预算余量 ${yuan(response.remaining)}</span></div>`;
}

form.addEventListener("submit", event => { event.preventDefault(); render(input.value); });
render(input.value);
