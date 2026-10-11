import test from "node:test";
import assert from "node:assert/strict";
import { exampleCatalog } from "../src/example-catalog.js";
import { recommendBuild, validateBuild } from "../src/deterministic-recommender.js";

test("same budget produces the same stable recommendation", () => {
  const first = recommendBuild(exampleCatalog, 6500);
  const second = recommendBuild(exampleCatalog, 6500);
  assert.equal(first.status, "ok");
  assert.equal(second.status, "ok");
  assert.equal(first.best.key, second.best.key);
  assert.ok(first.best.total <= 650000);
});

test("low budget returns no complete result", () => {
  assert.equal(recommendBuild(exampleCatalog, 1000).status, "no-result");
});

test("compatibility gate rejects mismatched socket", () => {
  const byId = id => exampleCatalog.find(part => part.id === id);
  const selection = {
    cpu:byId("cpu-b9"), board:byId("board-s1-lite"), memory:byId("memory-16"),
    gpu:byId("gpu-g6"), ssd:byId("ssd-1"), cooler:byId("cooler-air"),
    psu:byId("psu-650"), case:byId("case-m")
  };
  assert.match(validateBuild(selection).join("\n"), /接口不一致/);
});
