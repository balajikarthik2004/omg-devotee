import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ChevronRight, Store as StoreIcon } from "lucide-react";
import type { Store } from "@/data/store";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const { t } = useTranslation();
  return (
    <Link to={`/store/${store.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-primary/20 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={store.image} 
            alt={store.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
            <div className="p-2 bg-primary/90 backdrop-blur-md rounded-lg shadow-lg">
              <StoreIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight tracking-tight shadow-sm drop-shadow-md">{t(store.name)}</h3>
              <div className="flex items-center text-xs text-white/80 mt-0.5">
                <MapPin className="w-3 h-3 mr-1" />
                {t("Temple Premises")}
              </div>
            </div>
          </div>
          <Badge className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white border-white/10 hover:bg-white/30">
            {store.products.length}{t(" Items")}
          </Badge>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {t(store.description)}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
            {t("Visit Store")} <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
