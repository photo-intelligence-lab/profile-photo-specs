const specs = require("./specs.json");

const bySlug = new Map(specs.map((p) => [p.slug, p]));

/** Every platform, in file order. */
function all() {
  return specs;
}

/** One platform by slug ("linkedin", "tinder", "passport-uk"...), or undefined. */
function get(slug) {
  return bySlug.get(String(slug).toLowerCase());
}

/** Platforms in a category: social, professional, dating, messaging, developer, video, passport. */
function byCategory(category) {
  return specs.filter((p) => p.category === category);
}

/** The size to export for a platform: { width, height, basis, note }. */
function exportSize(slug) {
  const p = get(slug);
  return p ? p.export : undefined;
}

/**
 * Check an image against a platform's profile photo rules.
 * image: { width, height, bytes?, format? } (format: "jpg" | "png" | "gif" | ...)
 * Returns { ok, issues: string[] }.
 */
function check(slug, image) {
  const p = get(slug);
  if (!p) throw new Error("profile-photo-specs: unknown platform " + slug);
  const r = p.profilePhoto || {};
  const issues = [];
  const { width, height, bytes, format } = image || {};
  const e = p.export;
  if (width && height) {
    const want = e.width / e.height;
    if (Math.abs(width / height - want) > 0.02) issues.push(`aspect ratio ${width}:${height} should be ${e.width}:${e.height}`);
    if (r.minWidth && width < r.minWidth) issues.push(`width ${width}px is below the ${r.minWidth}px minimum`);
    if (r.minHeight && height < r.minHeight) issues.push(`height ${height}px is below the ${r.minHeight}px minimum`);
    if (r.maxWidth && width > r.maxWidth) issues.push(`width ${width}px is above the ${r.maxWidth}px maximum`);
    if (r.maxHeight && height > r.maxHeight) issues.push(`height ${height}px is above the ${r.maxHeight}px maximum`);
  }
  if (bytes && r.maxFileSizeMB && bytes > r.maxFileSizeMB * 1024 * 1024) issues.push(`file is over ${r.maxFileSizeMB} MB`);
  if (format && r.formats && r.formats.length) {
    const f = String(format).toLowerCase().replace("jpeg", "jpg");
    if (!r.formats.includes(f)) issues.push(`${f} is not accepted (use ${r.formats.join(", ")})`);
  }
  return { ok: issues.length === 0, issues };
}

module.exports = { specs, all, get, byCategory, exportSize, check };
