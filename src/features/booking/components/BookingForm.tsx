import { useTranslation } from "react-i18next";
import { Users, User, Phone, FileDigit, Star, Crown } from "lucide-react";

export function BookingForm({ details, setDetails, errors }: any) {
  const { t: tStr } = useTranslation();

  const update = (field: string, val: any) => setDetails((prev: any) => ({ ...prev, [field]: val }));

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm mb-6">
      <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-saffron" />
        {tStr("Devotee Details")}
      </h2>

      <div className="space-y-4">
        {/* Darshan Category */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Darshan Category")}</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { id: "special", name: "Special Darshan", price: 50, desc: "Standard special queue", icon: Users },
              { id: "vip", name: "VIP Darshan", price: 200, desc: "Fast-track entry", icon: Star },
              { id: "vvip", name: "VVIP Darshan", price: 500, desc: "Direct sanctum access", icon: Crown }
            ].map(cat => {
              const Icon = cat.icon;
              const isSelected = details.categoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => update("categoryId", cat.id)}
                  className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? "border-saffron bg-amber-50/30 shadow-md shadow-saffron/10"
                      : "border-slate-100 bg-white hover:border-saffron/30"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full transition-colors ${isSelected ? "bg-saffron/10" : "bg-slate-50 group-hover:bg-amber-50"}`} />
                  <Icon className={`w-6 h-6 mb-3 relative z-10 ${isSelected ? "text-saffron" : "text-slate-400"}`} />
                  <div className="font-bold text-slate-800 relative z-10">{tStr(cat.name)}</div>
                  <div className="text-xs text-slate-500 mb-2 relative z-10">{tStr(cat.desc)}</div>
                  <div className={`font-black text-lg relative z-10 ${isSelected ? "text-saffron" : "text-slate-900"}`}>
                    ₹{cat.price}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Number of persons */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Number of Persons")}</label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                onClick={() => update("persons", num)}
                className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${
                  details.persons === num
                    ? "bg-saffron text-white shadow-md border border-saffron"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:border-saffron/50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Primary Devotee Name")}</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={details.name}
              onChange={e => update("name", e.target.value)}
              placeholder={tStr("Enter full name")}
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-saffron transition-all ${
                errors?.name ? "border-rose-500 bg-rose-50" : "border-slate-200"
              }`}
            />
          </div>
          {errors?.name && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Phone Number")}</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
            <input
              type="tel"
              value={details.phone}
              onChange={e => update("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="00000 00000"
              className={`w-full pl-20 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-saffron transition-all tracking-wide ${
                errors?.phone ? "border-rose-500 bg-rose-50" : "border-slate-200"
              }`}
            />
          </div>
          {errors?.phone && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.phone}</p>}
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Aadhaar / Gov ID Number")}</label>
          <div className="relative">
            <FileDigit className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={details.idNumber}
              onChange={e => update("idNumber", e.target.value)}
              placeholder={tStr("Enter ID number (required at entry)")}
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:bg-white focus:border-saffron transition-all tracking-wide ${
                errors?.idNumber ? "border-rose-500 bg-rose-50" : "border-slate-200"
              }`}
            />
          </div>
          {errors?.idNumber && <p className="text-xs text-rose-600 mt-1 font-medium">{errors.idNumber}</p>}
          <p className="text-xs text-slate-500 mt-1.5">{tStr("Must carry original ID during temple visit.")}</p>
        </div>
      </div>
    </div>
  );
}
