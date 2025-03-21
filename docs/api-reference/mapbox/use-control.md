# useControl

The `useControl` hook is used to create React wrappers for custom map controls.

```tsx
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Map, {useControl} from 'react-map-gl/mapbox';

function DrawControl(props: DrawControlProps) {
  useControl(() => new MapboxDraw(props), {
    position: props.position
  });

  return null;
}

function App() {
  return (
    <Map
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
    >
      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true
        }}
      />
    </Map>
  );
}
```

See a full example [here](/examples/mapbox/draw-polygon).

## Signature

```js
useControl<T extends IControl>(
  onCreate: ({map: MapRef, mapLib: mapboxgl}) => IControl,
  options?: {
    position?: ControlPosition;
  }
): T

useControl<T extends IControl>(
  onCreate: ({map: MapRef, mapLib: mapboxgl}) => IControl,
  onRemove: ({map: MapRef, mapLib: mapboxgl}) => void,
  options?: {
    position?: ControlPosition;
  }
): T

useControl<T extends IControl>(
  onCreate: ({map: MapRef, mapLib: mapboxgl}) => IControl,
  onAdd: ({map: MapRef, mapLib: mapboxgl}) => void,
  onRemove: ({map: MapRef, mapLib: mapboxgl}) => void,
  options?: {
    position?: ControlPosition;
  }
): T
```

The hook creates an [IControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol) instance, adds it to the map when it's available, and removes it upon unmount.

Parameters:

- `onCreate`: (`{map: MapRef, mapLib: mapboxgl}`) => [IControl](./types.md#icontrol) - called to create an instance of the control.
- `onAdd`: (`{map: MapRef, mapLib: mapboxgl}`) => void - called when the control has been added to the map.
- `onRemove`: (`{map: MapRef, mapLib: mapboxgl}`) => void - called when the control is about to be removed from the map.
- `options`: object
  + `position`: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' - control position relative to the map

Returns:

[IControl](./types.md#icontrol) - the control instance from `onCreate`.


## Source

[use-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-mapbox/src/components/use-control.ts)
