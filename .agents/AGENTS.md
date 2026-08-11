# Workspace Rules

## Premium UI Design Standards
When instructed to build "premium", "expensive", "Apple-style", or "overkill" interactive UI components, bypass basic CSS styling and immediately utilize the following high-end techniques:
- **Spring-Physics Motion**: Avoid linear or standard `ease` transitions. Use critically damped `cubic-bezier` curves (e.g., `cubic-bezier(0.175, 0.885, 0.32, 1.275)`) to simulate physical mass, tension, and overshoot.
- **Liquid Glass & Refraction**: Do not just use `backdrop-filter: blur()`. Combine it with SVG `<feDisplacementMap>` and `<feTurbulence>` to physically warp and refract light passing through glass elements.
- **Volumetric Lighting & Holographics**: Use multi-stop `conic-gradient` and `radial-gradient` masks coupled with `mix-blend-mode: color-dodge` and `overlay` to simulate dynamic specular highlights, reacting to user interaction or automated rotation.
- **Ambient Occlusion (Deep Shadows)**: Create depth not just with `translateZ`, but by stacking multiple, extremely soft, layered `box-shadow`s (both `inset` and outer) to simulate real-world ambient light blocking and mechanical depth.
- **Attention to Detail**: Implement micro-textures (like SVG noise filters for leather/metal) and ensure perfect Z-depth clipping (using `overflow-hidden` where appropriate) to prevent rogue shadows and layout seams.
