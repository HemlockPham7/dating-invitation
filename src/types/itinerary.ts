/**
 * Data model for the invitation & itinerary.
 * Intentionally no `time` field — the timeline shows order, not clock times (see PRD §4.2).
 */

export type TimelineSide = 'left' | 'right';

export type StopIconType = 'car' | 'utensils' | 'camera' | 'ice-cream' | 'home-heart';

export interface TimelineStop {
  id: string;
  /** Display order, e.g. "01" … "05" */
  stepNumber: string;
  /** Portfolio-style label, e.g. "THE PICK-UP" */
  categoryTag: string;
  /** Main activity title */
  title: string;
  /** Short romantic subtitle */
  subtitle?: string;
  /** Message / description for Gia Hân */
  description: string;
  /** Venue name, only for stops with a concrete place */
  locationName?: string;
  /** Full venue address */
  address?: string;
  /** Google Maps link; when present the card renders a "Xem trên Google Maps" button */
  googleMapsUrl?: string;
  imageUrl: string;
  imageAlt: string;
  icon: StopIconType;
  /** 'left' for odd stops (1, 3, 5), 'right' for even stops (2, 4) */
  side: TimelineSide;
}

export interface InvitationConfig {
  recipientName: string;
  occasionDate: string;
  occasionTitle: string;
  heroHeadline: string;
  heroSubtext: string;
  /** Rotating teasing messages shown each time the "Từ chối" button escapes */
  evasiveMessages: string[];
}

