export interface TempleEvent {
  title: string;
  date: string;
  daysAway?: number;
  description: string;
  isMajor?: boolean;
}

export const templeEvents: Record<string, TempleEvent[]> = {
  "palani-murugan": [
    { title: "Aani Kiruthigai", date: "June 19, 2026", description: "Highly auspicious monthly observance dedicated to Lord Murugan. Special abhishekam performed.", isMajor: false },
    { title: "Aadi Krithigai", date: "August 7, 2026", description: "Devotees carry special Kavadis for Lord Murugan. Massive crowds expected.", isMajor: true },
    { title: "Kanda Sashti", date: "Nov 10 - Nov 15, 2026", description: "6-day festival celebrating Lord Murugan's victory over Surapadman.", isMajor: true }
  ],
  "madurai-meenakshi": [
    { title: "Aani Unjal Festival", date: "June 15 - June 24, 2026", description: "The deities are placed on a beautifully decorated swing.", isMajor: false },
    { title: "Aavani Moolam", date: "Aug 20 - Aug 31, 2026", description: "Celebrates the coronation of Lord Sundareswarar.", isMajor: true },
    { title: "Navarathri Festival", date: "Oct 10 - Oct 19, 2026", description: "Goddess Meenakshi is adorned in different alankarams each day.", isMajor: true }
  ],
  "srirangam": [
    { title: "Jyeshtaabhishekam", date: "June 25, 2026", description: "Annual cleansing ceremony of the main deity with holy water.", isMajor: true },
    { title: "Vaikunta Ekadasi", date: "Dec 29, 2026", description: "The most important festival. The Paramapada Vasal is opened.", isMajor: true }
  ],
  "tiruvannamalai": [
    { title: "Aani Brahmotsavam", date: "June 20 - June 29, 2026", description: "Ten days of special celebrations and chariot processions around the Annamalai hill.", isMajor: true },
    { title: "Karthigai Deepam", date: "Nov 23, 2026", description: "A massive beacon is lit on top of the Annamalai hill. Over 1 million devotees expected.", isMajor: true }
  ]
};

export function getUpcomingEvents(slug: string): TempleEvent[] {
  return templeEvents[slug] || [
    { title: "Pournami (Full Moon) Pooja", date: "Next Full Moon", description: "Special abhishekam and crowd surge expected.", isMajor: false },
    { title: "Pradosham", date: "Bi-monthly", description: "Auspicious evening pooja dedicated to Lord Shiva.", isMajor: false }
  ];
}
