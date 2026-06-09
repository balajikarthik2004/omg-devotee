export interface TempleEvent {
  title: string;
  date: string;
  daysAway?: number;
  description: string;
  isMajor?: boolean;
}

export const templeEvents: Record<string, TempleEvent[]> = {
  "palani-murugan": [
    { title: "Aadi Krithigai", date: "August 7, 2026", description: "Highly auspicious day dedicated to Lord Murugan. Devotees carry special Kavadis.", isMajor: true },
    { title: "Kanda Sashti", date: "Nov 10 - Nov 15, 2026", description: "6-day festival celebrating Lord Murugan's victory over Surapadman.", isMajor: true },
    { title: "Thirukarthigai", date: "November 24, 2026", description: "Festival of Lights with special Deepam lit across the temple hill.", isMajor: false }
  ],
  "madurai-meenakshi": [
    { title: "Aani Unjal Festival", date: "June 15 - June 24, 2026", description: "The deities are placed on a beautifully decorated swing.", isMajor: false },
    { title: "Aavani Moolam", date: "Aug 20 - Aug 31, 2026", description: "Celebrates the coronation of Lord Sundareswarar.", isMajor: true },
    { title: "Navarathri Festival", date: "Oct 10 - Oct 19, 2026", description: "Goddess Meenakshi is adorned in different alankarams each day.", isMajor: true }
  ],
  "srirangam": [
    { title: "Vaikunta Ekadasi", date: "Dec 29, 2026", description: "The most important festival. The Paramapada Vasal is opened.", isMajor: true },
    { title: "Panguni Uthiram", date: "Mar 2027", description: "Divine marriage of Lord Ranganatha and Goddess Andal.", isMajor: false }
  ],
  "tiruvannamalai": [
    { title: "Karthigai Deepam", date: "Nov 23, 2026", description: "A massive beacon is lit on top of the Annamalai hill. Over 1 million devotees expected.", isMajor: true },
    { title: "Chitra Pournami", date: "Apr 2027", description: "Highly auspicious day for Girivalam (circumambulation of the hill).", isMajor: true }
  ]
};

export function getUpcomingEvents(slug: string): TempleEvent[] {
  return templeEvents[slug] || [
    { title: "Pournami (Full Moon) Pooja", date: "Next Full Moon", description: "Special abhishekam and crowd surge expected.", isMajor: false },
    { title: "Pradosham", date: "Bi-monthly", description: "Auspicious evening pooja dedicated to Lord Shiva.", isMajor: false }
  ];
}
