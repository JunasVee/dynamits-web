"use client";

import { APIProvider, Map, MapControl, AdvancedMarker, Pin, ControlPosition } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import Directions from "@/components/Directions";

interface CustomMapProps {
  pickup?: google.maps.LatLngLiteral;
  destination?: google.maps.LatLngLiteral;
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  isMobile: boolean;
  handleGetLocation: () => void;
  markerPos?: google.maps.LatLngLiteral;
  destPos?: google.maps.LatLngLiteral;
  isSearchTwoClicked: boolean;
  warningNote?: string;
}

const CustomMap = ({
  pickup,
  destination,
  onMapClick,
  isMobile,
  handleGetLocation,
  markerPos,
  destPos,
  isSearchTwoClicked,
  warningNote,
}: CustomMapProps) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API || ""}>
      <Map
        mapId="bd607af67d5b8861"
        defaultCenter={{ lat: -7.250445, lng: 112.768845 }}
        defaultZoom={13}
        gestureHandling="greedy"
        disableDefaultUI={true}
        className="w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[25rem]"
        onClick={onMapClick}
      >
        {/* My location marker */}
        {isMobile && (
          <MapControl position={ControlPosition.TOP_LEFT}>
            <Button onClick={handleGetLocation} className="m-2 rounded-full" variant={"outline"}>
              📍
            </Button>
          </MapControl>
        )}

        {/* Pickup Marker */}
        {markerPos && (
          <AdvancedMarker position={markerPos}>
            <Pin glyphColor="white" borderColor="none" background="red">
              A
            </Pin>
          </AdvancedMarker>
        )}

        {/* Destination Marker */}
        {destPos && (
          <AdvancedMarker position={destPos}>
            <Pin glyphColor="white" borderColor="none" background="blue">
              B
            </Pin>
          </AdvancedMarker>
        )}

        {/* Directions */}
        {isSearchTwoClicked && <Directions origin={pickup} destination={destination} />}

        {/* Warning Note */}
        {warningNote && <p className="text-red-500 absolute bottom-2 left-2">{warningNote}</p>}
      </Map>
    </APIProvider>
  );
};

export default CustomMap;
