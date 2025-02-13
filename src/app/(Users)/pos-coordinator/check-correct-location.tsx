"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUpdateSchedule } from "./query";
import { Visit } from "@/types/types";
interface Location {
  latitude: number;
  longitude: number;
}

export const CheckIn = ({ schedule }: { schedule: Visit }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const { setCheckInTime } = useCheckInTime();

  const { mutate: updateSchedule } = useUpdateSchedule();

  // Predefined shop location
  const shopLocation: Location = {
    latitude: schedule.latitude ?? 0,
    longitude: schedule.longitude ?? 0,
  };

  const radius = 20;

  // Calculate distance between two locations
  const calculateDistance = (loc1: Location, loc2: Location): number => {
    const earthRadius = 6371000;

    const dLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const dLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const lat1 = (loc1.latitude * Math.PI) / 180;
    const lat2 = (loc2.latitude * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  };

  console.log("Schedule status:", schedule.status);

  const handleCheckInSuccess = () => {
    const checkInTime = new Date().toISOString();
    localStorage.setItem("checkInTime", checkInTime);
    updateSchedule(
      { id: schedule.id, status: "IN_PROGRESS" },
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: (error) => {
          console.error("Update failed", error);
          setError("Failed to check in.");
          setLoading(false);
        },
      }
    );
  };

  // Handle check-in
  const handleCheckIn = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { latitude, longitude };

        const distance = calculateDistance(userLocation, shopLocation);

        if (distance <= radius) {
          handleCheckInSuccess();
        } else {
          setLoading(false);
          setError("You are not within the shop location.");
        }
      },
      (err: GeolocationPositionError) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(
            "Location permission denied. Please enable location services in your browser."
          );
        } else {
          setError(`Error: ${err.message}`);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="check-in-container p-4">
      <Button onClick={handleCheckIn}>
        {loading ? "Checking In ..." : "Check in"}
      </Button>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};
