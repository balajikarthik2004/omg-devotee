import { Link } from "@tanstack/react-router";
import { ShoppingCart, Plus } from "lucide-react";
import type { Product } from "@/data/store";
import { useCart } from "@/features/store/context/CartContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  storeId: string;
  product: Product;
}

export function ProductCard({ storeId, product }: ProductCardProps) {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(t("Added to cart"), {
      description: `${product.name}${t(" has been added to your shopping cart.")}`,
      icon: <ShoppingCart className="w-4 h-4" />,
    });
  };

  return (
    <div className="group relative flex flex-col h-full bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-saffron/40 transition-all">
      <Link to="/store/$storeId/item/$itemId" params={{ storeId, itemId: product.id }} className="flex flex-col flex-1">
        <div className="relative aspect-square overflow-hidden bg-rose-50">
          <img
            src={product.image}
            alt={t(product.name)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm">
            {t(product.category)}
          </span>
        </div>
        <div className="flex flex-col flex-1 p-4 pb-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2 group-hover:text-saffron transition-colors">{t(product.name)}</h3>
            <span className="font-black text-saffron text-base tabular-nums shrink-0">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{t(product.description)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full h-10 rounded-full border border-saffron/30 bg-rose-50 text-saffron text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-saffron hover:text-white hover:border-saffron transition-colors"
        >
          <Plus className="w-4 h-4" /> {t("Add to Cart")}
        </button>
      </div>
    </div>
  );
}
