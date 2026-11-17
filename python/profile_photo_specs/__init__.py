"""Profile picture size, format and file-size rules for LinkedIn, X, Tinder, Slack, passports and more.

Data: https://github.com/photo-intelligence-lab/profile-photo-specs
Try it: https://narkis.ai/tools/profile-photo-resizer
"""
import json
from importlib import resources

__version__ = "1.0.0"

SPECS = json.loads(resources.files(__package__).joinpath("specs.json").read_text(encoding="utf-8"))
_BY_SLUG = {p["slug"]: p for p in SPECS}


def all_platforms():
    """Every platform spec, in file order."""
    return SPECS


def get(slug):
    """One platform by slug ("linkedin", "tinder", "passport-uk"...), or None."""
    return _BY_SLUG.get(str(slug).lower())


def by_category(category):
    """Platforms in a category: social, professional, dating, messaging, developer, video, passport."""
    return [p for p in SPECS if p["category"] == category]


def export_size(slug):
    """The size to export for a platform: {width, height, basis, note}."""
    p = get(slug)
    return p["export"] if p else None


def check(slug, width=None, height=None, bytes=None, format=None):
    """Check an image against a platform's profile photo rules. Returns {"ok": bool, "issues": [str]}."""
    p = get(slug)
    if p is None:
        raise KeyError("profile-photo-specs: unknown platform %s" % slug)
    r = p.get("profilePhoto") or {}
    e = p["export"]
    issues = []
    if width and height:
        if abs(width / height - e["width"] / e["height"]) > 0.02:
            issues.append("aspect ratio %d:%d should be %d:%d" % (width, height, e["width"], e["height"]))
        if r.get("minWidth") and width < r["minWidth"]:
            issues.append("width %dpx is below the %dpx minimum" % (width, r["minWidth"]))
        if r.get("minHeight") and height < r["minHeight"]:
            issues.append("height %dpx is below the %dpx minimum" % (height, r["minHeight"]))
        if r.get("maxWidth") and width > r["maxWidth"]:
            issues.append("width %dpx is above the %dpx maximum" % (width, r["maxWidth"]))
        if r.get("maxHeight") and height > r["maxHeight"]:
            issues.append("height %dpx is above the %dpx maximum" % (height, r["maxHeight"]))
    if bytes and r.get("maxFileSizeMB") and bytes > r["maxFileSizeMB"] * 1024 * 1024:
        issues.append("file is over %s MB" % r["maxFileSizeMB"])
    if format and r.get("formats"):
        f = str(format).lower().replace("jpeg", "jpg")
        if f not in r["formats"]:
            issues.append("%s is not accepted (use %s)" % (f, ", ".join(r["formats"])))
    return {"ok": not issues, "issues": issues}


__all__ = ["SPECS", "all_platforms", "get", "by_category", "export_size", "check"]
