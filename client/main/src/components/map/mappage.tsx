export interface OutletMapInfo {
  id: string
  name: string
  address: string
  area: string
  city: string
  state: string
  mapUrl: string
}

export const outletMaps: OutletMapInfo[] = [
  {
    id: 'boisar',
    name: 'Napkiq Boisar',
    address: 'Boisar',
    area: 'Boisar',
    city: 'Palghar',
    state: 'Maharashtra',
    mapUrl: 'https://maps.app.goo.gl/VExXpmDYZBSGBBBh9',
  },
  {
    id: 'palghar',
    name: 'Napkiq Palghar',
    address: 'Palghar',
    area: 'Palghar',
    city: 'Palghar',
    state: 'Maharashtra',
    mapUrl: 'https://maps.app.goo.gl/zTwLHfX3wNAJdhR29',
  },
  {
    id: 'virar',
    name: 'Napkiq Virar',
    address: 'Virar',
    area: 'Virar West',
    city: 'Vasai-Virar',
    state: 'Maharashtra',
    mapUrl: 'https://maps.app.goo.gl/6r2wkPVLqkVGY68E9',
  },
  {
    id: 'vasai',
    name: 'Napkiq Vasai',
    address: 'Vasai',
    area: 'Vasai West',
    city: 'Vasai-Virar',
    state: 'Maharashtra',
    mapUrl: 'https://maps.app.goo.gl/7ApqJNWNuG4B5Ne18',
  },
]

export function getOutletMapById(id: string): OutletMapInfo | undefined {
  return outletMaps.find((o) => o.id === id)
}

export default function MapPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-secondary mb-1">Our Locations</h1>
      <p className="text-sm text-secondary-light mb-6">Find a Napkiq near you</p>

      <div className="space-y-4">
        {outletMaps.map((outlet) => (
          <div key={outlet.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-secondary">{outlet.name}</h2>
                <p className="text-sm text-secondary-light mt-0.5">
                  {outlet.area}, {outlet.city}
                </p>
                <p className="text-xs text-neutral-medium">{outlet.state}</p>
              </div>
              <a
                href={outlet.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 bg-gradient-primary text-white rounded-lg text-sm font-medium hover:brightness-110 transition-all"
              >
                📍 Get Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
