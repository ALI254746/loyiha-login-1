'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, name: string) => void;
  selectedLocation: { lat: number; lng: number; name: string } | null;
}

export default function MapPicker({ onLocationSelect, selectedLocation }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;
        await import('leaflet/dist/leaflet.css');

        if (!isMounted || !mapRef.current || mapInstanceRef.current) return;

        // Fix leaflet default icons
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        const map = L.map(mapRef.current, {
          center: [41.2995, 69.2401],
          zoom: 12,
          zoomControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Custom purple marker
        const customIcon = L.divIcon({
          html: `<div style="
            width: 40px; height: 40px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(99,102,241,0.5);
          "></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          className: ''
        });

        map.on('click', async (e) => {
          const { lat, lng } = e.latlng;

          if (markerRef.current) {
            (markerRef.current as ReturnType<typeof L.marker>).remove();
          }

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
          markerRef.current = marker;

          // Reverse geocode
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await res.json();
            const name = data.address?.city || data.address?.town || data.address?.suburb ||
                         data.address?.county || data.display_name?.split(',')[0] ||
                         `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

            marker.bindPopup(`
              <div style="font-family: sans-serif; padding: 4px;">
                <strong style="color: #6366f1;">📍 ${name}</strong><br/>
                <small style="color: #666;">Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}</small>
              </div>
            `).openPopup();

            onLocationSelect(lat, lng, name);
          } catch {
            onLocationSelect(lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          }
        });

        mapInstanceRef.current = map;
        if (isMounted) setIsLoading(false);
      } catch (err) {
        console.error('Map init error:', err);
        if (isMounted) {
          setMapError(true);
          setIsLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" style={{ minHeight: 400 }}>
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center glass-card rounded-2xl">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-indigo-700 font-medium">Xarita yuklanmoqda...</p>
          </div>
        </div>
      )}

      {mapError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center glass-card rounded-2xl">
          <div className="text-center p-6">
            <MapPin className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
            <p className="text-indigo-700 font-medium mb-2">Xarita yuklanmadi</p>
            <p className="text-indigo-500 text-sm">Internet ulanishini tekshiring</p>
          </div>
        </div>
      )}

      {!mapError && selectedLocation && (
        <div className="absolute bottom-4 left-4 z-10 glass-card px-3 py-2 rounded-xl text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-800 font-medium">{selectedLocation.name}</span>
          </div>
          <p className="text-indigo-500 text-xs mt-1">
            {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
          </p>
        </div>
      )}

      {!mapError && !selectedLocation && !isLoading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 glass-card px-4 py-2 rounded-full text-sm whitespace-nowrap">
          <span className="text-indigo-700">🗺️ Xaritada joy tanlang</span>
        </div>
      )}

      <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: 400 }} />
    </div>
  );
}
