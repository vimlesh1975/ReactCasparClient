# Swimming Graphics Module (`games2`) Walkthrough

## Summary of Accomplishments

We built a modular, 1-to-1 visual parity graphics generator for Swimming (`SW`) templates in `client/src/games2/sports2/swimming2.js`, wired directly into `TemplateGenerator2.js`.

### Completed Swimming Graphic Templates:
1. **`SW002` (Venue ID)**:
   - **Gun Silhouette Header Banner**: Gun handle slant, ocean dark navy linear gradient fill (`#00223e` → `#00355c` → `#00477a`), bright cyan border (`#0088cc`).
   - **Icon & Typography**: 42px Swimmer pictogram (`🏊`), bold italic `AQUATICS CENTRE` venue title, and white Olympic rings SVG in barrel tip.

2. **`SW003` (Event Schedule)**:
   - **Header & Sub-Header**: Header banner + metallic silver/light sub-bar (`AQUATICS CENTRE`).
   - **8 Event Rows**: Stacked ocean navy blue event rows (`MEN'S 50M FREESTYLE - HEATS`, etc.).

3. **`SW004` (Event ID)**:
   - **Gun Header (`SWIMMING`)**: Pistol silhouette with swimmer icon, bold italic title, and Olympic rings.
   - **Metallic Silver Sub-Bar (`WOMEN'S 200M BUTTERFLY - HEAT 1`)**: Skewed left edge matching gun handle slant; right edge flush with gun barrel.

4. **`SW005` (Start List)**:
   - **Header & Sub-Header**: `WOMEN'S 200M BUTTERFLY` + `START LIST - HEAT 5`.
   - **8 Athlete Rows (Single Continuous Strips)**:
     - **Direct Numbering**: Lane numbers (`1` to `8`) directly on the strip without a separate cyan box.
     - **Alternating Dark & Lighter Blue Rows**: Even rows in dark navy blue (`#00192e`); odd rows in lighter navy blue (`#002e4d`).
     - **Double-Width Base64 Country Flags**: High-resolution country flag images (`58px x 22px`) dynamically fetched from `FLAGS_BASE64` module (`KOR`, `AUS`, `USA`, `POL`, `FRA`, `CHN`, `HUN`, `BRA`, etc.).
     - **Athlete Names**: Bold 900 italic uppercase athlete names.

---

## Verification & Build
- `swimming2.js` handles both Fabric.js vector canvas groups (`generateSwimming2Fabric`) and 1920x1080 HTML broadcast overlays (`generateSwimming2HTML`).
- `FLAGS_BASE64` from `client/src/GamesAIPanel/flagsBase64.js` supplies crisp NOC flag images.
