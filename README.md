# profile-photo-specs

Profile picture size, format and file-size rules for 28 platforms: LinkedIn, X, Instagram, Facebook, TikTok, YouTube, Tinder, Hinge, Bumble, Slack, Microsoft Teams, Zoom, Gmail, GitHub, Discord, WhatsApp, Telegram, Threads, Pinterest, Reddit, plus passport and visa photos (US, UK, Schengen, Canada, India, China, Australia).

Every entry links its source and says whether the number is official, from guides, or a pick where the platform publishes nothing. No guessing dressed up as fact.

- Try it without code: **[Profile Photo Resizer](https://narkis.ai/tools/profile-photo-resizer)** crops any photo to these exact sizes in your browser.
- Plain JSON over HTTP: `https://narkis.ai/api/profile-photo-specs` (CORS on).
- More free tools: [narkis.ai/tools](https://narkis.ai/tools) · Placeholder faces for your UI: [Narkis avatar API](https://narkis.ai/developers/avatars)

## Install

```sh
npm install profile-photo-specs
# or
pip install profile-photo-specs
```

## Use

```js
import { get, exportSize, check, byCategory } from "profile-photo-specs";

exportSize("linkedin");            // { width: 400, height: 400, basis: "official", ... }
get("slack").profilePhoto.maxWidth; // 1024
byCategory("dating").map(p => p.slug); // ["tinder", "hinge", "bumble"]

check("linkedin", { width: 300, height: 200, bytes: 9_000_000, format: "gif" });
// { ok: false, issues: ["aspect ratio 300:200 should be 400:400", "width 300px is below the 400px minimum", ...] }
```

```python
from profile_photo_specs import get, export_size, check

export_size("passport-uk")  # {'width': 600, 'height': 750, 'basis': 'official', ...}
check("github", width=500, height=500, bytes=2_000_000, format="png")
# {'ok': False, 'issues': ['file is over 1 MB']}
```

Raw data: [`specs.json`](./specs.json).

## The data

| Platform | slug | Export size | Basis | Max file | Formats | Shown as |
|---|---|---|---|---|---|---|
| [LinkedIn](https://narkis.ai/tools/profile-photo-resizer/linkedin) | `linkedin` | 400x400 | official | 8 MB | JPG, PNG | circle |
| [X (Twitter)](https://narkis.ai/tools/profile-photo-resizer/x) | `x` | 400x400 | official | 2 MB | JPG, PNG, GIF | circle |
| [Instagram](https://narkis.ai/tools/profile-photo-resizer/instagram) | `instagram` | 320x320 | guides | – | – | circle |
| [Facebook](https://narkis.ai/tools/profile-photo-resizer/facebook) | `facebook` | 320x320 | official | – | – | circle |
| [TikTok](https://narkis.ai/tools/profile-photo-resizer/tiktok) | `tiktok` | 200x200 | guides | – | – | circle |
| [YouTube](https://narkis.ai/tools/profile-photo-resizer/youtube) | `youtube` | 800x800 | no official size | 15 MB | JPG, GIF, BMP, PNG | circle |
| [Tinder](https://narkis.ai/tools/profile-photo-resizer/tinder) | `tinder` | 1080x1350 | no official size | – | – | rounded-square |
| [Hinge](https://narkis.ai/tools/profile-photo-resizer/hinge) | `hinge` | 1080x1350 | no official size | – | – | – |
| [Bumble](https://narkis.ai/tools/profile-photo-resizer/bumble) | `bumble` | 1024x1024 | official | 128 MB | JPG, PNG | – |
| [Slack](https://narkis.ai/tools/profile-photo-resizer/slack) | `slack` | 1024x1024 | official | – | JPG, PNG, GIF | rounded-square |
| [Microsoft Teams](https://narkis.ai/tools/profile-photo-resizer/microsoft-teams) | `microsoft-teams` | 648x648 | guides | 4 MB | – | circle |
| [Zoom](https://narkis.ai/tools/profile-photo-resizer/zoom) | `zoom` | 800x800 | no official size | 10 MB | JPG, PNG, GIF | circle |
| [Google Account (Gmail)](https://narkis.ai/tools/profile-photo-resizer/gmail) | `gmail` | 800x800 | no official size | 5 MB | JPG, PNG | circle |
| [GitHub](https://narkis.ai/tools/profile-photo-resizer/github) | `github` | 500x500 | official | 1 MB | PNG, JPG, GIF | circle |
| [Discord](https://narkis.ai/tools/profile-photo-resizer/discord) | `discord` | 512x512 | no official size | 10 MB | PNG, JPG, GIF | circle |
| [WhatsApp](https://narkis.ai/tools/profile-photo-resizer/whatsapp) | `whatsapp` | 640x640 | guides | – | – | circle |
| [Telegram](https://narkis.ai/tools/profile-photo-resizer/telegram) | `telegram` | 640x640 | guides | – | – | circle |
| [Threads](https://narkis.ai/tools/profile-photo-resizer/threads) | `threads` | 320x320 | guides | – | – | circle |
| [Pinterest](https://narkis.ai/tools/profile-photo-resizer/pinterest) | `pinterest` | 280x280 | guides | – | – | circle |
| [Reddit](https://narkis.ai/tools/profile-photo-resizer/reddit) | `reddit` | 256x256 | guides | – | PNG, JPG | circle |
| [US Passport](https://narkis.ai/tools/profile-photo-resizer/passport-us) | `passport-us` | 600x600 (51x51 mm) | 300 dpi print | – | – | rectangle |
| [UK Passport](https://narkis.ai/tools/profile-photo-resizer/passport-uk) | `passport-uk` | 600x750 (35x45 mm) | official | – | – | rectangle |
| [EU / Schengen Passport (Germany)](https://narkis.ai/tools/profile-photo-resizer/passport-schengen) | `passport-schengen` | 413x531 (35x45 mm) | 300 dpi print | – | – | rectangle |
| [Canadian Passport](https://narkis.ai/tools/profile-photo-resizer/passport-canada) | `passport-canada` | 1200x1800 (50x70 mm) | official | – | – | rectangle |
| [Indian Passport](https://narkis.ai/tools/profile-photo-resizer/passport-india) | `passport-india` | 630x810 (35x45 mm) | official | – | – | rectangle |
| [Chinese Passport](https://narkis.ai/tools/profile-photo-resizer/passport-china) | `passport-china` | 390x567 (33x48 mm) | 300 dpi print | – | – | rectangle |
| [Australian Passport](https://narkis.ai/tools/profile-photo-resizer/passport-australia) | `passport-australia` | 413x531 (35x45 mm) | 300 dpi print | – | – | rectangle |
| [US Visa (DS-160)](https://narkis.ai/tools/profile-photo-resizer/visa-us) | `visa-us` | 600x600 (51x51 mm) | official | – | – | rectangle |

"Export size" is what to upload. **official** = the platform's own docs; **guides** = no official number, most-cited size in current guides; **no official size** = the platform publishes nothing, so we picked a size that stays sharp (the `note` field says why); **300 dpi print** = the passport's mm size at 300 dpi.

Each entry also has `profilePhoto` (min/max, file size, formats, display shape and sizes), `coverPhoto` where the platform has one, `datingPhotos` (photo counts) for dating apps, `passport` (mm size, head size, background, glasses, expression, photo age) for passports, and `sources` + `verified` date.

## Contributing

Platforms change their rules. If a number is wrong or stale, open an issue or PR with a link to the source. Official help pages beat blog posts.

## License

MIT. Built by [Photo Intelligence Lab](https://github.com/photo-intelligence-lab) at [Narkis.ai](https://narkis.ai), the AI headshot and dating photo app. If this saved you time, a link to [narkis.ai/tools](https://narkis.ai/tools) is appreciated.
