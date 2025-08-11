declare namespace google.maps {
  export interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
  }

  export class Map {
    constructor(mapDiv: HTMLElement, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    panTo(latLng: LatLng | LatLngLiteral): void;
    fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void;
  }

  export class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    setTitle(title: string): void;
    setIcon(icon: string | Icon | Symbol): void;
    addListener(eventName: string, handler: Function): MapsEventListener;
  }

  export interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string | Icon | Symbol;
  }

  export interface Icon {
    url: string;
    scaledSize?: Size;
    size?: Size;
    origin?: Point;
    anchor?: Point;
  }

  export interface Symbol {
    path?: SymbolPath | string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    scale?: number;
    rotation?: number;
    anchor?: Point;
    labelOrigin?: Point;
  }

  export interface Size {
    width: number;
    height: number;
    widthUnit?: string;
    heightUnit?: string;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export class LatLng {
    constructor(lat: number, lng: number, noWrap?: boolean);
    lat(): number;
    lng(): number;
  }

  export interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  export class LatLngBounds {
    constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
    contains(latLng: LatLng | LatLngLiteral): boolean;
    equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    extend(point: LatLng | LatLngLiteral): LatLngBounds;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    isEmpty(): boolean;
    toJSON(): LatLngBoundsLiteral;
    toSpan(): LatLng;
    toString(): string;
    toUrlValue(precision?: number): string;
    union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
  }

  export interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  export interface MapTypeStyle {
    elementType?: 'all' | 'geometry' | 'geometry.fill' | 'geometry.stroke' | 'labels' | 'labels.icon' | 'labels.text' | 'labels.text.fill' | 'labels.text.stroke';
    featureType?: string;
    stylers: MapTypeStyler[];
  }

  export type MapTypeStyler = {
    color?: string;
    gamma?: number;
    hue?: string;
    invert_lightness?: boolean;
    lightness?: number;
    saturation?: number;
    visibility?: string;
    weight?: number;
  };

  export type SymbolPath = 'CIRCLE' | 'BACKWARD_CLOSED_ARROW' | 'FORWARD_CLOSED_ARROW' | 'BACKWARD_OPEN_ARROW' | 'FORWARD_OPEN_ARROW';

  export interface MapsEventListener {
    remove(): void;
  }

  export const event: {
    addDomListener(instance: object, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
    addDomListenerOnce(instance: object, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
    addListener(instance: object, eventName: string, handler: Function): MapsEventListener;
    addListenerOnce(instance: object, eventName: string, handler: Function): MapsEventListener;
    clearInstanceListeners(instance: object): void;
    clearListeners(instance: object, eventName: string): void;
    removeListener(listener: MapsEventListener): void;
    trigger(instance: object, eventName: string, ...args: any[]): void;
  };
}

declare global {
  interface Window {
    google: {
      maps: typeof google.maps;
    };
    initMap: () => void;
  }
}
