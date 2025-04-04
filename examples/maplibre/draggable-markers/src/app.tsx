import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Marker, NavigationControl} from 'react-map-gl/maplibre';

import ControlPanel from './control-panel';
import Pin from './pin';

import type {MarkerDragEvent, LngLat} from 'react-map-gl/maplibre';

const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 3.5
};

export default function App() {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  return (
    <>
      <Map
        initialViewState={initialViewState}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl position="top-left" />
      </Map>
      <ControlPanel events={events} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
