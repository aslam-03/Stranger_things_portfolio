# Stranger Things Background References

These notes capture color, texture, and motion cues observed from publicly released "Stranger Things" promotional imagery (e.g., Season 3 fireworks poster, Season 4 Vecna storm stills). They describe stylistic inspiration only—no copyrighted artwork is bundled in the repo.

## Normal (Hawkins Night) Palette
- Horizon glow: electric crimson (#e50914) bleeding into warm ember oranges (#ff6b3d) near the midline.
- Upper sky: indigo-to-violet gradient (#2a1b79 → #43115a) with faint cyan streaks mimicking aurora bands.
- Light leaks: soft magenta lens flares and a subtle teal rim behind silhouettes.
- Texture: fine VHS grain plus a wide vignette to keep focus on the hero section.

## Upside Down Palette & Motion
- Base tone: near-black navy (#04030d) with desaturated teal fog patches (#123347).
- Accent lightning: saturated azure cores (#4cc9f0) edged with neon red to echo Vecna's storms.
- Spores: slow-floating particles switching between pale coral (#ffb4a2) and icy lilac (#c8b6ff) for depth.
- Motion cues: low-frequency thunder flicker (0.7–1.5s pulses) and continuous spore drift tied to scroll position for persistence.

## Implementation Notes
- Generate gradients procedurally via CSS/radial layers—avoid embedding poster files.
- Render lightning and spores with react-three-fiber primitives so visuals remain original.
- Keep overlays abstract (silhouettes, noise) to stay within fair-use inspiration guidelines.
