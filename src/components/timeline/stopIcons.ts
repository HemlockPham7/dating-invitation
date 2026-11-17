import { Camera, Car, House, IceCreamCone, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import type { StopIconType } from '../../types/itinerary';

/** Maps each stop's icon type to a lucide icon (shared by node & card). */
export const stopIcons: Record<StopIconType, LucideIcon> = {
  car: Car,
  utensils: UtensilsCrossed,
  camera: Camera,
  'ice-cream': IceCreamCone,
  'home-heart': House,
};

