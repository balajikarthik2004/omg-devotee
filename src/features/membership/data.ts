import { Star, Users, Flame, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type BillingCycle = "year" | "lifetime";

export interface MembershipPlan {
  id: string;
  name: string;
  sanskritName: string;
  tagline: string;
  /** Price for temples inside India (₹). */
  inr: number;
  /** Price for the overseas (USA) temples ($). */
  usd: number;
  cycle: BillingCycle;
  /** How many devotees the membership covers. */
  seats: number;
  icon: LucideIcon;
  accent: string;
  gradient: string;
  popular?: boolean;
  benefits: string[];
  /** Short line printed under the price. */
  note: string;
}

/**
 * Tier structure and amounts follow the schemes actually run by Indian temple
 * trusts — annual devotee membership, the ₹5,000 "lifetime archana" scheme,
 * TTD SRIVANI-style break-darshan entitlement, and the ₹55,555 ISKCON-style
 * life patron donation. USD amounts mirror the US temple pattern
 * ($101 individual / $251 family / $1,116 life member).
 */
export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "nithya",
    name: "Nithya Sevak",
    sanskritName: "நித்ய சேவகர்",
    tagline: "For the devotee who visits through the year",
    inr: 1116,
    usd: 101,
    cycle: "year",
    seats: 1,
    icon: Star,
    accent: "#0284C7",
    gradient: "from-sky-500 to-cyan-500",
    note: "Renews every year · cancel anytime",
    benefits: [
      "Photo membership ID card, valid at the temple",
      "80G tax exemption receipt (Sec. 80G, IT Act 1961)",
      "One free archana in your name on your birth star",
      "Monthly panchangam & festival calendar",
      "Priority queue lane on non-festival days",
    ],
  },
  {
    id: "kudumba",
    name: "Kudumba Sevak",
    sanskritName: "குடும்ப சேவகர்",
    tagline: "One membership for the whole household",
    inr: 2500,
    usd: 251,
    cycle: "year",
    seats: 4,
    icon: Users,
    accent: "#7C3AED",
    gradient: "from-violet-500 to-fuchsia-500",
    popular: true,
    note: "Covers 4 family members · renews yearly",
    benefits: [
      "Everything in Nithya Sevak, for 4 family members",
      "10% off private poojas, abhishekam & homam",
      "2 annadhanam prasadam coupons on every visit",
      "Reserved seating at monthly cultural programmes",
      "Priority booking for children's Veda & classical classes",
    ],
  },
  {
    id: "archana",
    name: "Archana Life Member",
    sanskritName: "அர்ச்சனை வாழ்நாள்",
    tagline: "Your name in the sanctum, every year, for life",
    inr: 5000,
    usd: 501,
    cycle: "lifetime",
    seats: 2,
    icon: Flame,
    accent: "#D97706",
    gradient: "from-amber-500 to-orange-500",
    note: "One-time offering · never renews",
    benefits: [
      "Lifetime archana on your birth star, every single year",
      "Prasadam couriered to your address after each archana",
      "Lifetime membership card — no renewal, ever",
      "All Nithya Sevak benefits, for life",
      "80G tax exemption receipt for the full amount",
    ],
  },
  {
    id: "patron",
    name: "Life Patron",
    sanskritName: "வாழ்நாள் புரவலர்",
    tagline: "For families who endow the temple's future",
    inr: 55555,
    usd: 1116,
    cycle: "lifetime",
    seats: 6,
    icon: Crown,
    accent: "#B45309",
    gradient: "from-yellow-500 via-amber-500 to-orange-600",
    note: "One-time endowment · instalments available",
    benefits: [
      "Hologram photo patron card honoured at all partner temples",
      "2 break-darshan (VIP entry) passes every year",
      "3 nights at the temple guest house with 2 meals daily",
      "Name engraved on the temple donor plaque",
      "VIP seating at Brahmotsavam & festival processions",
    ],
  },
];

/** Perks that ship with every tier — shown once instead of repeated per card. */
export const UNIVERSAL_PERKS = [
  "Instant 80G tax exemption receipt on e-mail",
  "Digital membership card in the app, ready to scan",
  "Every rupee goes to the temple you choose",
];

export const PLAN_COMPARISON: { label: string; values: Record<string, string> }[] = [
  {
    label: "Devotees covered",
    values: { nithya: "1", kudumba: "4", archana: "2", patron: "6" },
  },
  {
    label: "Validity",
    values: { nithya: "1 year", kudumba: "1 year", archana: "Lifetime", patron: "Lifetime" },
  },
  {
    label: "Annual archana in your name",
    values: { nithya: "1", kudumba: "4", archana: "Lifetime", patron: "Lifetime" },
  },
  {
    label: "Pooja discount",
    values: { nithya: "—", kudumba: "10%", archana: "10%", patron: "20%" },
  },
  {
    label: "Break darshan passes",
    values: { nithya: "—", kudumba: "—", archana: "—", patron: "2 / year" },
  },
  {
    label: "Guest house stay",
    values: { nithya: "—", kudumba: "—", archana: "—", patron: "3 nights" },
  },
  {
    label: "Name on donor plaque",
    values: { nithya: "—", kudumba: "—", archana: "—", patron: "Yes" },
  },
];

export const MEMBERSHIP_FAQ = [
  {
    q: "Is my membership eligible for tax deduction?",
    a: "Yes. The temple trust is registered under Section 12A and 80G of the Income Tax Act, 1961. Your 80G receipt is e-mailed the moment the payment succeeds — add your PAN during checkout so it can be claimed.",
  },
  {
    q: "Does my membership work at other temples?",
    a: "Your benefits — archana, pooja discounts and prasadam — apply at the temple you select. The Life Patron hologram card is additionally honoured for darshan at every partner temple on the OMG network.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Life Patron can be split into 3, 6 or 12 monthly instalments through Razorpay EMI at checkout. Annual plans are charged once and can be cancelled before the renewal date.",
  },
  {
    q: "How do I use the membership at the temple?",
    a: "Show the digital card in the app at the members' counter, or carry the printed card posted to your address. The QR code on the card is scanned at the priority lane.",
  },
];

/** USA temples bill in dollars; everything else bills in rupees. */
export function currencyFor(state: string) {
  return state === "USA" ? "USD" : "INR";
}

export function priceFor(plan: MembershipPlan, currency: string) {
  return currency === "USD" ? plan.usd : plan.inr;
}

export function formatMoney(amount: number, currency: string) {
  return currency === "USD"
    ? `$${amount.toLocaleString("en-US")}`
    : `₹${amount.toLocaleString("en-IN")}`;
}
