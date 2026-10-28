"""Generate the Padrão Pneus share card from approved repo assets.

This is only a preview for Rodolfo; not a claim about products or current inventory.
Outputs one 1200x630 JPEG with actual shop photography and existing brand SVG.
"""
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance
import cairosvg

ROOT = Path(__file__).resolve().parents[2]
W, H = 1200, 630
ASSETS = ROOT / "assets"
OG = ASSETS / "og"

def rasterize_svg(path: Path, width: int, height: int) -> Image.Image:
    raw = cairosvg.svg2png(
        url=str(path), output_width=width, output_height=height,
    )
    return Image.open(BytesIO(raw)).convert("RGBA")

# Crop authentic alignment equipment photograph to the visual's right panel.
photo = Image.open(ASSETS / "01-alinhamento-equipamento.jpg").convert("RGB")
photo = ImageOps.fit(photo, (800, H), method=Image.Resampling.LANCZOS,
                     centering=(0.60, 0.53))
photo = ImageEnhance.Contrast(photo).enhance(1.08)
card = Image.new("RGBA", (W, H), (9, 21, 35, 255))
card.alpha_composite(photo.convert("RGBA"), dest=(400, 0))

# SVG contains editorial typography, navy gradients and red accents, transparent
# background; render separately so embedded image references cannot go missing.
card.alpha_composite(rasterize_svg(OG / "padrao-pneus-card.svg", W, H))

# Use the actual same vector brand identity present in the site header and footer.
logo = rasterize_svg(
    ASSETS / "branding/padrao-pneus-horizontal-dark.svg", 630, 146
)
card.alpha_composite(logo, dest=(54, 136))

out = OG / "padrao-pneus-card.jpg"
card.convert("RGB").save(
    out, "JPEG", quality=82, optimize=True, progressive=True, subsampling=2
)
if out.stat().st_size > 600_000:
    card.convert("RGB").save(
        out, "JPEG", quality=72, optimize=True, progressive=True, subsampling=2
    )
if out.stat().st_size > 600_000:
    raise RuntimeError("Preview image exceeds 600KB")
with Image.open(out) as check:
    if check.size != (W, H):
        raise RuntimeError(f"Unexpected dimensions: {check.size}")

print(f"OG image rendered: {out}, {out.stat().st_size:,} bytes, {W}x{H}")
