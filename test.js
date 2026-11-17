const test = require("node:test");
const assert = require("node:assert/strict");
const s = require("./index.js");

test("every platform has an export size and https sources", () => {
  const slugs = new Set();
  for (const p of s.all()) {
    assert.ok(!slugs.has(p.slug));
    slugs.add(p.slug);
    assert.ok(p.export.width > 0 && p.export.height > 0, p.slug);
    assert.ok(p.sources.length && p.sources.every((u) => u.startsWith("https://")), p.slug);
  }
});

test("get / exportSize / byCategory", () => {
  assert.equal(s.get("LinkedIn").name, "LinkedIn");
  assert.deepEqual([s.exportSize("linkedin").width, s.exportSize("linkedin").height], [400, 400]);
  assert.ok(s.byCategory("passport").length >= 5);
  assert.equal(s.get("nope"), undefined);
});

test("check flags wrong ratio, too small, too big and bad format", () => {
  assert.equal(s.check("linkedin", { width: 800, height: 800, bytes: 200000, format: "jpg" }).ok, true);
  const r = s.check("linkedin", { width: 300, height: 200, bytes: 9 * 1024 * 1024, format: "gif" });
  assert.equal(r.ok, false);
  assert.equal(r.issues.length, 5);
});

test("ESM entry", async () => {
  const m = await import("./index.mjs");
  assert.equal(m.get("github").export.width, 500);
});
