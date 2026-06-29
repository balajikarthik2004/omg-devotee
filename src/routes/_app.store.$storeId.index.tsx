import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getStoreById } from "@/data/store";
import { ProductCard } from "@/features/store/components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_app/store/$storeId/")({
  loader: ({ params }) => {
    const store = getStoreById(params.storeId);
    if (!store) throw notFound();
    return { store };
  },
  component: StoreDetails,
});

function StoreDetails() {
  const { t } = useTranslation();
  const { store } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-[30vh] lg:h-[40vh] w-full bg-muted overflow-hidden">
        <img 
          src={store.image} 
          alt={store.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12 max-w-7xl mx-auto">
          <Link 
            to="/store" 
            className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" /> {t("Back to Stores")}
          </Link>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-white mb-2">{t(store.name)}</h1>
          <p className="text-white/80 max-w-2xl">{t(store.description)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-foreground">{t("Available Items")}</h2>
          <div className="text-sm text-muted-foreground">{store.products.length}{t(" Products")}</div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {store.products.map((product) => (
            <ProductCard key={product.id} storeId={store.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
