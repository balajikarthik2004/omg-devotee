import { createFileRoute } from "@tanstack/react-router";
import { stores } from "@/data/store";
import { StoreCard } from "@/features/store/components/StoreCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_app/store/")({
  component: StoreIndex,
});

function StoreIndex() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  
  const filteredStores = stores.filter(
    (s) => 
      s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/5 py-12 px-6 lg:px-12 border-b border-border/50">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-tight text-foreground text-primary">
            {t("Temple Stores")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t("Purchase authentic prasadam, sacred idols, and merchandise directly from temple premises.")}
          </p>
          
          <div className="relative max-w-md pt-4">
            <Search className="absolute left-3 top-1/2 mt-2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder={t("Search for a temple store...")} 
              className="pl-10 h-12 text-base rounded-xl shadow-sm border-border/50 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {filteredStores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("No stores found")}</h3>
            <p className="text-muted-foreground">{t("Try adjusting your search term.")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
