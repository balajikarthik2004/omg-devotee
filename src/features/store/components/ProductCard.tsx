import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(t("Added to cart"), {
      description: `${product.name}${t(" has been added to your shopping cart.")}`,
      icon: <ShoppingCart className="w-4 h-4" />,
    });
  };

  return (
    <Link to={`/store/${storeId}/item/${product.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 flex flex-col bg-white">
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <Badge className="absolute top-3 left-3 bg-white/80 text-foreground hover:bg-white/90 backdrop-blur-md shadow-sm">
            {t(product.category)}
          </Badge>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              variant="secondary" 
              className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white text-primary rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t("Quick Add")}
            </Button>
          </div>
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight flex-1">
              {t(product.name)}
            </h3>
            <div className="font-bold text-primary shrink-0 text-lg">
              ${product.price.toFixed(2)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {t(product.description)}
          </p>
          <Button 
            className="w-full mt-auto bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors group-hover:shadow-md"
            onClick={handleAddToCart}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t("Add to Cart")}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
