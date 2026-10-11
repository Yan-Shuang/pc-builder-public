import test from "node:test";
import assert from "node:assert/strict";
import { catalog } from "../src/catalog";
import { recommendBuild, validateBuild } from "../src/recommender";
import { categories } from "../src/types";
import { planAssembly } from "../src/scene/assembly";

test("public catalog contains exactly two entries and unique models per category",()=>{
  for(const category of categories) assert.equal(catalog.filter(part=>part.category===category).length,2);
  assert.equal(new Set(catalog.map(part=>part.modelId)).size,catalog.length);
  assert.equal(catalog.length,16);
});

test("same budget produces the same stable recommendation",()=>{
  const first=recommendBuild(catalog,6500),second=recommendBuild(catalog,6500);
  assert.equal(first.status,"ok"); assert.equal(second.status,"ok");
  if(first.status==="ok"&&second.status==="ok"){assert.equal(first.best.key,second.best.key);assert.ok(first.best.total<=650000);assert.equal(first.evaluated,256);}
});

test("low budget returns no complete result",()=>{assert.equal(recommendBuild(catalog,1000).status,"no-result");});

test("mismatched socket moves the CPU to the waiting area",()=>{
  const result=recommendBuild(catalog,6500); assert.equal(result.status,"ok"); if(result.status!=="ok")return;
  const arch=catalog.find(part=>part.id==="board-arch")!; const selection={...result.best.selection,board:arch};
  assert.match(validateBuild(selection).map(issue=>issue.message).join("\n"),/接口不一致/);
  const cpu=planAssembly(selection).find(node=>node.category==="cpu"); assert.equal(cpu?.waiting,true); assert.match(cpu?.reason??"",/接口不一致/);
});
