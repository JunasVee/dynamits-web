"use client";

import { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

interface DirectionsProps {
  origin?: string;
  destination?: string;
}

const Directions = ({ origin, destination }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [info, setInfo] = useState({ distance: "", duration: "" });

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true,
    });

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(newDirectionsRenderer);

    return () => {
      newDirectionsRenderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        const result = response.routes[0].legs[0];

        setInfo({
          distance: result.distance?.text || "",
          duration: result.duration?.text || "",
        });
      })
      .catch((error) => console.error("Error fetching directions:", error));
  }, [directionsService, directionsRenderer, origin, destination]);

  return (
    <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
      <p>Distance: {info.distance}</p>
      <p>Duration: {info.duration}</p>
    </div>
  );
};

export default Directions;
