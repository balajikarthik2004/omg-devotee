export type CrowdStatus = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export interface Temple {
  id: number;
  slug: string;
  name: string;
  deity: string;
  district: string;
  city: string;
  established?: string;
  tier?: string;
  openTime: string;
  closeTime: string;
  afternoonClose?: string;
  afternoonOpen?: string;
  crowd: number;
  capacity: number;
  crowdPct: number;
  waitMin: number;
  parking: { lotA: number; lotB: number; overflow: number };
  color: string;
  gradientFrom: string;
  gradientTo: string;
  specialDay: string;
  crowdStatus: CrowdStatus;
  poojas: string[];
}

const basePoojas = [
  "6:00 AM Thiruvannamalai Pooja",
  "7:30 AM Thiru Neeru Pooja",
  "9:00 AM Kalasa Pooja",
  "12:00 PM Uchikala Pooja",
  "3:00 PM Sayaratchai Pooja",
  "6:00 PM Arthajama Pooja",
  "8:00 PM Iranda Kala Pooja",
  "9:00 PM Palliyarai Pooja",
];

export const temples: Temple[] = [
  { id:1, slug:"palani-murugan", name:"Palani Murugan Temple", deity:"Lord Murugan (Dhandayuthapani Swamy)", district:"Dindigul", city:"Palani", established:"2000+ years", tier:"Tier 1 Major Kshetram", openTime:"06:00", closeTime:"21:00", afternoonClose:"12:30", afternoonOpen:"15:00", crowd:12450, capacity:20000, crowdPct:62, waitMin:45, parking:{lotA:80,lotB:68,overflow:0}, color:"#F97316", gradientFrom:"#FFF7ED", gradientTo:"#FFEDD5", specialDay:"Tuesday", crowdStatus:"MODERATE", poojas: basePoojas },
  { id:2, slug:"madurai-meenakshi", name:"Madurai Meenakshi Temple", deity:"Goddess Meenakshi & Lord Sundareswarar", district:"Madurai", city:"Madurai", openTime:"05:00", closeTime:"22:00", afternoonClose:"12:30", afternoonOpen:"16:00", crowd:18320, capacity:25000, crowdPct:73, waitMin:62, parking:{lotA:91,lotB:78,overflow:45}, color:"#7C3AED", gradientFrom:"#F5F3FF", gradientTo:"#EDE9FE", specialDay:"Friday", crowdStatus:"HIGH", poojas: basePoojas },
  { id:3, slug:"srirangam", name:"Srirangam Temple", deity:"Lord Ranganatha (Vishnu)", district:"Tiruchirappalli", city:"Srirangam", openTime:"06:00", closeTime:"21:00", crowd:9840, capacity:22000, crowdPct:45, waitMin:28, parking:{lotA:54,lotB:38,overflow:0}, color:"#059669", gradientFrom:"#F0FDF4", gradientTo:"#DCFCE7", specialDay:"Saturday", crowdStatus:"LOW", poojas: basePoojas },
  { id:4, slug:"tiruvannamalai", name:"Tiruvannamalai Arunachaleswarar Temple", deity:"Lord Shiva (Arunachaleswarar)", district:"Tiruvannamalai", city:"Tiruvannamalai", openTime:"05:30", closeTime:"21:30", crowd:22100, capacity:25000, crowdPct:88, waitMin:85, parking:{lotA:96,lotB:94,overflow:82}, color:"#DC2626", gradientFrom:"#FFF1F2", gradientTo:"#FFE4E6", specialDay:"Full Moon", crowdStatus:"CRITICAL", poojas: basePoojas },
  { id:5, slug:"rameswaram", name:"Rameswaram Temple", deity:"Lord Shiva (Ramanathaswamy)", district:"Ramanathapuram", city:"Rameswaram", openTime:"05:00", closeTime:"21:00", crowd:7650, capacity:20000, crowdPct:38, waitMin:18, parking:{lotA:42,lotB:30,overflow:0}, color:"#0284C7", gradientFrom:"#F0F9FF", gradientTo:"#E0F2FE", specialDay:"Monday", crowdStatus:"LOW", poojas: basePoojas },
  { id:6, slug:"chidambaram", name:"Chidambaram Natarajar Temple", deity:"Lord Shiva (Nataraja)", district:"Cuddalore", city:"Chidambaram", openTime:"06:00", closeTime:"22:00", crowd:5320, capacity:18000, crowdPct:30, waitMin:15, parking:{lotA:31,lotB:20,overflow:0}, color:"#B45309", gradientFrom:"#FFFBEB", gradientTo:"#FEF3C7", specialDay:"Friday", crowdStatus:"LOW", poojas: basePoojas },
  { id:7, slug:"tiruchendur", name:"Tiruchendur Murugan Temple", deity:"Lord Murugan (Senthilandavar)", district:"Thoothukudi", city:"Tiruchendur", openTime:"05:00", closeTime:"21:00", crowd:11200, capacity:20000, crowdPct:56, waitMin:35, parking:{lotA:67,lotB:52,overflow:0}, color:"#D97706", gradientFrom:"#FFFBEB", gradientTo:"#FEF9C3", specialDay:"Tuesday", crowdStatus:"MODERATE", poojas: basePoojas },
  { id:8, slug:"samayapuram", name:"Samayapuram Mariamman Temple", deity:"Goddess Mariamman", district:"Tiruchirappalli", city:"Samayapuram", openTime:"05:30", closeTime:"21:00", crowd:14500, capacity:20000, crowdPct:72, waitMin:52, parking:{lotA:83,lotB:71,overflow:25}, color:"#DB2777", gradientFrom:"#FFF0F9", gradientTo:"#FCE7F3", specialDay:"Sunday", crowdStatus:"HIGH", poojas: basePoojas },
  { id:9, slug:"kapaleeshwarar", name:"Kapaleeshwarar Temple", deity:"Lord Shiva (Kapaleeshwarar)", district:"Chennai", city:"Mylapore, Chennai", openTime:"05:30", closeTime:"22:00", crowd:6400, capacity:15000, crowdPct:43, waitMin:20, parking:{lotA:45,lotB:35,overflow:0}, color:"#0891B2", gradientFrom:"#F0FDFA", gradientTo:"#CCFBF1", specialDay:"Monday", crowdStatus:"LOW", poojas: basePoojas },
  { id:10, slug:"brihadeeswarar", name:"Brihadeeswarar Temple", deity:"Lord Shiva (Brihadeeswarar)", district:"Thanjavur", city:"Thanjavur", openTime:"06:00", closeTime:"20:30", crowd:4200, capacity:15000, crowdPct:28, waitMin:12, parking:{lotA:28,lotB:18,overflow:0}, color:"#7C3AED", gradientFrom:"#F5F3FF", gradientTo:"#EDE9FE", specialDay:"Monday", crowdStatus:"LOW", poojas: basePoojas },
];

export const districts = [
  "Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kanchipuram",
  "Kanyakumari","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai",
  "Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukudi","Tiruchirappalli","Tirunelveli",
  "Tirupathur","Tiruppur","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar"
];

export function getTemple(slug: string) {
  return temples.find(t => t.slug === slug);
}

export function statusColor(s: CrowdStatus) {
  if (s === "LOW") return "var(--status-low)";
  if (s === "MODERATE") return "var(--status-mod)";
  return "var(--status-high)";
}

export function statusLabel(s: CrowdStatus) {
  if (s === "LOW") return "Low crowd";
  if (s === "MODERATE") return "Moderate";
  if (s === "HIGH") return "High";
  return "Critical";
}

export function forecastFor(t: Temple) {
  // 6 AM to 9 PM hourly crowd %
  const hours = Array.from({length: 16}, (_, i) => 6 + i);
  return hours.map(h => {
    let base = 20;
    if (h >= 7 && h <= 10) base = 70 - (h-7)*4;
    if (h >= 10 && h <= 12) base = 80;
    if (h >= 12 && h <= 15) base = 0; // closed
    if (h >= 15 && h <= 17) base = 35;
    if (h >= 17 && h <= 19) base = 55;
    if (h >= 19 && h <= 21) base = 40;
    const variance = (t.crowdPct - 50) * 0.4;
    const val = h >= 12 && h <= 15 ? 0 : Math.max(5, Math.min(98, base + variance + (Math.sin(h*t.id)*8)));
    return { hour: h, label: `${h>12?h-12:h}${h>=12?'PM':'AM'}`, pct: Math.round(val), wait: Math.round(val*0.8) };
  });
}
