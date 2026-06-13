export interface OutletConfig {
  id: string
  name: string
  location: string
  hasMenu: boolean
}

export const outletConfig: Record<string, OutletConfig> = {
  boisar:  { id: 'boisar',  name: 'Napkiq Boisar',  location: 'Boisar, Palghar, Maharashtra', hasMenu: true },
  palghar: { id: 'palghar', name: 'Napkiq Palghar', location: 'Palghar, Maharashtra',          hasMenu: true },
  virar:   { id: 'virar',   name: 'Napkiq Virar',   location: 'Virar, Palghar, Maharashtra',   hasMenu: true },
  vasai:   { id: 'vasai',   name: 'Napkiq Vasai',   location: 'Vasai, Palghar, Maharashtra',   hasMenu: true },
}
