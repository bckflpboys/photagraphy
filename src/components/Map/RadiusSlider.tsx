"use client"

interface RadiusSliderProps {
  radius: number
  onChange: (value: number) => void
}

export default function RadiusSlider({ radius, onChange }: RadiusSliderProps) {
  return (
    <div className="w-full max-w-xs">
      <label htmlFor="radius" className="block text-dark font-medium mb-2">
        Search Radius: {radius} km
      </label>
      <input
        type="range"
        id="radius"
        min="1"
        max="50"
        value={radius}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #8B4513 0%, #8B4513 ${(radius / 50) * 100}%, #D7CCC8 ${(radius / 50) * 100}%, #D7CCC8 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-dark mt-1">
        <span>1km</span>
        <span>25km</span>
        <span>50km</span>
      </div>
    </div>
  )
}
