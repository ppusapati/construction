import { component$, useStore, $ } from '@builder.io/qwik';

export default component$(() => {
  // Store for handling inputs and results
  const store = useStore({
    area: 0,
    floors: 0,
    windows: 0,
    doors: 0,
    slabThickness: 0.15, // Default slab thickness in meters
    concreteVolume: 0,
    steelRequirement: 0,
    brickRequirement: 0,
    plasterRequirement: 0,
    shutteringRequirement: 0,
  });

  // Function to handle calculation
  const calculateConstructionRequirements = $(() => {
    const { area, floors, windows, doors, slabThickness } = store;

    // 1. Concrete volume calculation
    const slabVolume = area * slabThickness;
    const beamAndColumnVolume = area * 0.05; // Example assumption
    const concreteVolume = (slabVolume + beamAndColumnVolume) * floors;

    // 2. Steel calculation (assuming 1% steel of total concrete volume)
    const steelRequirement = concreteVolume * 7850 * 0.01;

    // 3. Brick requirement (assuming walls height = 3m, brick volume with mortar)
    const wallArea = (area * floors * 3) - ((windows * 1.5) + (doors * 2)); // Assumed sizes for windows/doors
    const brickRequirement = wallArea / 0.002; // Standard brick volume (0.002 m³)

    // 4. Plaster requirement (plaster both sides of the wall, thickness 12 mm)
    const plasterRequirement = wallArea * 2 * 0.012; // Thickness of plaster

    // 5. Shuttering requirement (example: only slab)
    const shutteringRequirement = area * floors; // Slab area in m²

    // Updating store with results
    store.concreteVolume = concreteVolume;
    store.steelRequirement = steelRequirement;
    store.brickRequirement = brickRequirement;
    store.plasterRequirement = plasterRequirement;
    store.shutteringRequirement = shutteringRequirement;
  });

  return (
    <div>
      <h2>Construction Calculator</h2>
      <form preventdefault:submit>
        <label>
          Built-up Area (m²):
          <input type="number" value={store.area} onInput$={(e) => (store.area = parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Number of Floors:
          <input type="number" value={store.floors} onInput$={(e) => (store.floors = parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Number of Windows:
          <input type="number" value={store.windows} onInput$={(e) => (store.windows = parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Number of Doors:
          <input type="number" value={store.doors} onInput$={(e) => (store.doors = parseInt(e.target.value))} />
        </label>
        <br />
        <button type="button" onClick$={calculateConstructionRequirements}>
          Calculate
        </button>
      </form>

      <div>
        <h3>Results:</h3>
        <p>Total Concrete Volume: {store.concreteVolume.toFixed(2)} m³</p>
        <p>Total Steel Requirement: {store.steelRequirement.toFixed(2)} kg</p>
        <p>Total Brick Requirement: {store.brickRequirement.toFixed(0)} bricks</p>
        <p>Total Plaster Requirement: {store.plasterRequirement.toFixed(2)} m³</p>
        <p>Total Shuttering Requirement: {store.shutteringRequirement.toFixed(2)} m²</p>
      </div>
    </div>
  );
});
