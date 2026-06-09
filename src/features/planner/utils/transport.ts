export function getTransportInfo(origin: string, dest: string, tStr: any) {
  const o = (origin || "").toLowerCase();

  const internationalKeywords = ["us", "usa", "united states", "new york", "california", "london", "uk", "dubai", "singapore", "malaysia", "australia", "canada"];
  const isIntl = internationalKeywords.some(k => o === k || o.includes(` ${k}`) || o.includes(`${k} `) || o.includes(`,${k}`) || o.includes(`, ${k}`));

  if (isIntl) {
    const destAirport = dest === "palani-murugan" ? "Coimbatore (CJB) or Madurai (IXM)" : "Madurai (IXM)";
    return {
      isInternational: true,
      roadTime: "18h+",
      route: `Flight to ${destAirport}`,
      flights: [
        { name: `Emirates / Qatar Airways to ${destAirport}`, time: "18h - 24h (1 or 2 stops)", price: "Duration: 18h+" },
        { name: "Air India via DEL/BOM", time: "20h+", price: "Duration: 20h+" }
      ],
      buses: [],
      trains: [],
      airportCab: {
        route: dest === "palani-murugan" ? "Coimbatore Airport to Palani" : "Madurai Airport to Temple",
        time: dest === "palani-murugan" ? "2h 30m" : "45m",
        price: dest === "palani-murugan" ? "Rs. 2500 - 3000" : "Rs. 800 - 1000",
        distance: dest === "palani-murugan" ? "110 km" : "15 km"
      }
    };
  }

  if (o.includes("bangalore") || o.includes("bengaluru") || o.includes("blr")) {
    if (dest === "palani-murugan") return {
      isInternational: false,
      roadTime: "6h 30m", route: "NH 44 and NH 83 via Salem",
      buses: [
        { name: "SETC (Non-AC Seater)", time: "11:00 PM, 11:45 PM", price: "Duration: 7h 30m" }, 
        { name: "TNSTC (AC Sleeper)", time: "10:30 PM", price: "Duration: 7h 00m" },
        { name: "National Travels (Volvo)", time: "11:15 PM", price: "Duration: 6h 45m" }
      ],
      trains: [
        { name: "Tuticorin Exp to Dindigul (16732)", time: "09:15 PM", price: "Duration: 8h 10m" },
        { name: "Nagercoil Exp to Dindigul (16340)", time: "08:45 PM", price: "Duration: 7h 30m" }
      ]
    };
    if (dest === "madurai-meenakshi") return {
      isInternational: false,
      roadTime: "7h 00m", route: "NH 44 via Salem",
      buses: [{ name: "SETC (Ultra Deluxe)", time: "10:30 PM", price: "Duration: 8h 00m" }, { name: "SRM Transports (AC Sleeper)", time: "10:00 PM", price: "Duration: 7h 30m" }],
      trains: [{ name: "Tuticorin Exp (16236)", time: "09:15 PM", price: "Duration: 9h 30m" }, { name: "Nagercoil Exp (16340)", time: "10:30 PM", price: "Duration: 9h 15m" }]
    };
  } else if (o.includes("chennai") || o.includes("madras") || o.includes("maa")) {
    if (dest === "palani-murugan") return {
      isInternational: false,
      roadTime: "8h 00m", route: "NH 38 via Trichy",
      buses: [
        { name: "SETC (AC Seater)", time: "10:00 PM", price: "Duration: 9h 00m" }, 
        { name: "SETC (Non-AC Seater)", time: "11:00 PM, 11:45 PM", price: "Duration: 9h 30m" },
        { name: "TNSTC (Ultra Deluxe)", time: "08:30 PM", price: "Duration: 9h 30m" },
        { name: "YBM Travels (AC Sleeper)", time: "09:30 PM", price: "Duration: 8h 30m" },
        { name: "KPN Travels (Volvo A/C)", time: "11:00 PM", price: "Duration: 8h 15m" }
      ],
      trains: [
        { name: "Palakkad Exp (22651)", time: "09:40 PM", price: "Duration: 9h 45m" },
        { name: "Vaigai SF Exp to Dindigul (12635)", time: "01:50 PM", price: "Duration: 6h 15m" }
      ]
    };
    if (dest === "madurai-meenakshi") return {
      isInternational: false,
      roadTime: "7h 30m", route: "NH 38 via Trichy",
      buses: [{ name: "SETC (Ultra Deluxe)", time: "10:30 PM", price: "Duration: 8h 30m" }, { name: "Parveen Travels (Volvo)", time: "10:15 PM", price: "Duration: 8h 00m" }],
      trains: [{ name: "Pandian Exp (12637)", time: "09:40 PM", price: "Duration: 7h 50m" }, { name: "Kanyakumari Exp (12633)", time: "05:15 PM", price: "Duration: 8h 20m" }]
    };
  }

  return { isInternational: false, roadTime: "Check Maps", route: "Fastest route via highway", buses: [], trains: [] };
}
