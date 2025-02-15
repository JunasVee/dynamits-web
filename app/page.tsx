"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIProvider, Map, AdvancedMarker, Pin, MapControl, ControlPosition, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Search, ArrowRight, Package, LocateIcon, File, MapPinHouse, MapPinCheck, User, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios"
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import HomeHeader from "@/components/HomeHeader";

export default function Home() {
  // MARKERS
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral | undefined>(undefined);
  const [destPos, setDestPos] = useState<google.maps.LatLngLiteral | undefined>(undefined);

  // SENDER DETAILS
  const [senderName, setSenderName] = useState<string>("");
  const [senderNum, setSenderNum] = useState<string>("");
  const [pickup, setPickup] = useState<string>("");
  const [inputPickup, setInputPickup] = useState<string>("");
  const [pickupErr, setPickupErr] = useState<boolean>(false);
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  // RECEIVER DETAILS
  const [receiverName, setReceiverName] = useState<string>("");
  const [receiverNum, setReceiverNum] = useState<string>("");
  const [dest, setDest] = useState<string>("");
  const [inputDest, setInputDest] = useState<string>("");
  const [destErr, setDestErr] = useState<boolean>(false);
  const [isSearchTwoClicked, setIsSearchTwoClicked] = useState<boolean>(false);

  // PACKAGE DETAILS
  const [desc, setDesc] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>("sender");

  // ORDERED OR NOT
  const [isOrdered, setIsOrdered] = useState(false);

  // ORDER DATE
  const [currentDate, setCurrentDate] = useState("")

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API || "",
    libraries: ["places"],
  });

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const destRef = useRef<google.maps.places.Autocomplete | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  console.log("is mobile", isMobile);


  const handlePlaceSelect = (type: "pickup" | "dest") => {
    const place = type === "pickup" ? pickupRef.current?.getPlace() : destRef.current?.getPlace();
    if (!place || !place.geometry) return;

    if (type === "pickup") {
      setPickup(place.formatted_address || "");
      setMarkerPos(place.geometry.location?.toJSON());
      setPickupErr(false);
      setIsSearchClicked(true);
    } else {
      setDest(place.formatted_address || "");
      setDestPos(place.geometry.location?.toJSON());
      setDestErr(false);
      setIsSearchTwoClicked(true);
    }
  };

  const handleSearchClick = () => {

    try {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputPickup}&key=${process.env.NEXT_PUBLIC_MAPS_API}`)
        .then(function (response) {

          if (response.data.status === "OK" && response.data.results.length > 0) {
            const answer = response.data.results[0];
            setPickup(answer.formatted_address);
            setMarkerPos(answer.geometry.location);
            setPickupErr(false);
            setIsSearchClicked(true);
            setPickup(inputPickup);
          } else {
            setPickupErr(true);
            setIsSearchClicked(false);
          }

        })
        .catch(function (error) {
          console.log(error);

        })
    } catch (error) {
      console.log(error)
    }


  };

  const handleSearchTwoClick = () => {

    try {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${inputDest}&key=${process.env.NEXT_PUBLIC_MAPS_API}`)
        .then(function (response) {

          if (response.data.status === "OK" && response.data.results.length > 0) {
            const answer = response.data.results[0];
            setDest(answer.formatted_address);
            setDestPos(answer.geometry.location);
            setDestErr(false);
            setIsSearchTwoClicked(true);
            setDest(inputDest);
          } else {
            setDestErr(true);
            setIsSearchTwoClicked(false);
          }

        })
        .catch(function (error) {
          console.log(error);

        })
    } catch (error) {
      console.log(error)
    }

  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPos({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <Image
          src="/assets/scooter.jpg"
          width={100}
          height={100}
          className="w-[25%] h-[25%]"
          alt=""
          priority
          loading="eager"
        />
      </div>
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <HomeHeader />

      {/* ORDER TITLE */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        {"Let's Make an"} <span className="text-blue-500">Order!</span>
      </h1>

      {/* ORDER */}
      <div className="w-full flex flex-col justify-center items-center mt-10 mb-20 gap-10 lg:flex-row">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API || ""}>
          <Map
            mapId="bd607af67d5b8861"
            defaultCenter={{ lat: -7.250445, lng: 112.768845 }}
            defaultZoom={13}
            gestureHandling="greedy"
            disableDefaultUI={true}
            className="w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[25rem] "
          >

            {/* My location marker */}
            {isMobile && (
              <MapControl position={ControlPosition.TOP_LEFT}>
                <Button onClick={handleGetLocation} className="m-2 rounded-full" variant={"outline"}>
                  <LocateIcon />
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

            {isSearchTwoClicked && (<Directions origin={pickup} destination={dest} />)}

          </Map>
        </APIProvider>

        {/* ORDER FORM */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[20rem] sm:w-[30rem]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sender">Sender</TabsTrigger>
            <TabsTrigger value="receiver" disabled={!isSearchClicked}>Receiver</TabsTrigger>
            <TabsTrigger value="package" disabled={!isSearchClicked || !isSearchTwoClicked}>Package</TabsTrigger>
          </TabsList>

          {/* SENDER TAB */}
          <TabsContent value="sender">
            <Card>
              <CardHeader>
                <CardTitle>Sender</CardTitle>
                <CardDescription>Please fill in sender details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="senderName">{"Sender's Name"}</Label>
                  <Input id="senderName" value={senderName} onChange={(e) => setSenderName(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="senderNum">{"Sender's Number"}</Label>
                  <Input id="senderNum" value={senderNum} onChange={(e) => setSenderNum(e.target.value)} placeholder="Ex: 08XXX" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="w-full flex items-center gap-1.5">
                    <Autocomplete className="w-full" onLoad={(autocomplete) => (pickupRef.current = autocomplete)} onPlaceChanged={() => handlePlaceSelect("pickup")}>
                      <Input className="w-full" id="pickup" value={inputPickup} onChange={(e) => setInputPickup(e.target.value)} placeholder="Enter pickup location" />
                    </Autocomplete>
                    <Button onClick={handleSearchClick}><Search /></Button>
                  </div>

                  {pickupErr && <p className="text-red-500 text-sm">Location not found, please try again.</p>}
                </div>
              </CardContent>
              <CardFooter>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      disabled={!isSearchClicked}
                      onClick={() => setActiveTab("receiver")}
                    >
                      Next<ArrowRight />
                    </Button>
                  </HoverCardTrigger>
                  {!isSearchClicked && (
                    <HoverCardContent className="w-80">
                      <div>
                        <p className="text-sm text-red-500">Please search for a pickup location first.</p>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              </CardFooter>
            </Card>
          </TabsContent>


          {/* RECEIVER TAB */}
          <TabsContent value="receiver">
            <Card>
              <CardHeader>
                <CardTitle>Receiver</CardTitle>
                <CardDescription>Please fill in receiver details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="receiverName">{"Receiver's Name"}</Label>
                  <Input id="receiverName" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="receiverNum">{"Receiver's Number"}</Label>
                  <Input id="receiverNum" value={receiverNum} onChange={(e) => setReceiverNum(e.target.value)} placeholder="Ex: 08XXX" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="dest">Destination</Label>
                  <div className="flex items-center gap-1.5">
                    <Autocomplete className="w-full" onLoad={(autocomplete) => (destRef.current = autocomplete)} onPlaceChanged={() => handlePlaceSelect("dest")}>
                      <Input id="dest" value={inputDest} onChange={(e) => setInputDest(e.target.value)} placeholder="Enter destination" />
                    </Autocomplete>
                    <Button onClick={handleSearchTwoClick}><Search /></Button>
                    {destErr && <p className="text-red-500 text-sm">Location not found, please try again.</p>}
                  </div>

                </div>
              </CardContent>
              <CardFooter>
                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      disabled={!isSearchTwoClicked}
                      onClick={() => setActiveTab("package")}
                    >
                      Next<ArrowRight />
                    </Button>
                  </HoverCardTrigger>
                  {!isSearchTwoClicked && (
                    <HoverCardContent className="w-80">
                      <div>
                        <p className="text-sm text-red-500">Please search for a destination first.</p>
                      </div>
                    </HoverCardContent>
                  )}
                </HoverCard>
              </CardFooter>
            </Card>
          </TabsContent>
          {/* PACKAGE TAB */}


          <TabsContent value="package">
            <Card>
              <CardHeader>
                <CardTitle>Package</CardTitle>
                <CardDescription>Please tell us about your package!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="receiverName">What is your package?</Label>
                  <Input id="receiverName" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ex: food, clothes, flowers" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="receiverNum">Weight (KG)</Label>
                  <Input id="receiverNum" type="number" value={weight}
                    onChange={(e) => {
                      if (Number(parseFloat(e.target.value).toFixed(2)) > 5) {
                        setWeight("5");
                      } else if (Number(parseFloat(e.target.value).toFixed(2)) < 0.1) {
                        setWeight("0.1");
                      } else {
                        setWeight(e.target.value);
                      }
                    }
                    }
                    placeholder="Max: 5 KG" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {

                    const date = new Date();
                    const formattedDate = date.toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    });
                    setCurrentDate(formattedDate);

                    setIsOrdered(!isOrdered);
                  }}
                >
                  Order Now <Package />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>


        </Tabs>
      </div>

      {/* ORDER RESULT */}
      <section className="bg-blue-500 flex flex-col items-start justify-center">

        {!isOrdered && (<div className="w-full flex flex-col items-center justify-center my-10 gap-6">
          <h1 className="text-3xl text-white font-semibold">{"It's time to create your first order."}</h1>
          <Button variant="outline">Make an Order</Button>
        </div>)}

        {isOrdered && (
          <div className="w-full flex flex-col items-center justify-center my-10 gap-6">
            <h1 className="text-3xl text-white font-semibold flex items-center gap-2">Your Order Summary <File /> </h1>
            <div className="w-[40rem] bg-white flex p-4 flex-col rounded-md gap-2">
              <p className="text-center text-sm text-gray-800">Order ID: 12345</p>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">From:</p>
                  <p className="text-gray-900 flex items-center gap-2 text-sm"><MapPinHouse className="text-red-500" />{pickup}</p>
                  <p className="text-gray-900 flex items-center gap-2 text-sm"><User />{senderName}</p>
                  <p className="text-gray-900 flex items-center gap-2 text-sm"><Phone className="text-green-500" />{senderNum}</p>
                </div>
                <div>
                  <p className="text-nowrap">{currentDate}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">To:</p>
                <p className="text-gray-900 flex items-center gap-2 text-sm"><MapPinCheck className="text-blue-500" />{dest}</p>
                <p className="text-gray-900 flex items-center gap-2 text-sm"><User />{receiverName}</p>
                <p className="text-gray-900 flex items-center gap-2 text-sm"><Phone className="text-green-500" />{receiverNum}</p>
              </div>
            </div>
          </div>
        )}

      </section>

    </>
  );
}

const Directions = ({ origin, destination }: { origin?: string; destination?: string }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [info, setInfo] = useState({ distance: "", duration: "" });

  useEffect(() => {

    if (!routesLibrary || !map || !origin || !destination) return;

    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true,
    }));

  }, [routesLibrary, map, origin, destination])

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination) return;

    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {
      directionsRenderer.setDirections(response);
      const result = response.routes[0].legs[0];
      console.log(response);
      setInfo({ distance: result.distance?.text || "", duration: result.duration?.text || "" });

    });
  }, [directionsService, directionsRenderer, origin, destination]);

  return (
    <>
      <p>{info.distance}</p>
      <p>{info.duration}</p>
    </>
  );
}
