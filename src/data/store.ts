import { temples } from "./temples";
import type { Temple } from "./temples";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in USD for US Payment Flow
  category: "Photos" | "Merchandise" | "Lamps" | "Idols" | "Hangings" | "Sachets" | "Apparel";
  image: string;
  stock: number;
}

export interface Store {
  id: string;
  templeId: number;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

const defaultProducts: Product[] = [
  {
    id: "p1",
    name: "Divine Brass Oil Lamp (Diya)",
    description: "Traditional brass oil lamp, perfect for daily pooja and special occasions. Heavy base, premium quality.",
    price: 25.99,
    category: "Lamps",
    image: "/store/diya.png",
    stock: 50,
  },
  {
    id: "p2",
    name: "Premium Kumkum & Turmeric Sachet Set",
    description: "Auspicious set of pure kumkum and turmeric from the temple premises, blessed by the priests.",
    price: 9.99,
    category: "Sachets",
    image: "/store/kumkum.png",
    stock: 200,
  },
  {
    id: "p3",
    name: "Handcrafted Toran / Door Hanging",
    description: "Beautiful marigold and mango leaf design door hanging to welcome prosperity.",
    price: 18.50,
    category: "Hangings",
    image: "/store/garlands.png",
    stock: 30,
  },
  {
    id: "p4",
    name: "Om & Swastika Wall Hanging",
    description: "Metal alloy wall hanging with traditional symbols for peace and good fortune.",
    price: 14.99,
    category: "Hangings",
    image: "/store/om.png",
    stock: 45,
  },
  {
    id: "p5",
    name: "Customized Temple T-Shirt (Unisex)",
    description: "100% Cotton t-shirt featuring the temple deity's artwork. Available in multiple sizes.",
    price: 22.00,
    category: "Apparel",
    image: "/store/devotee.png",
    stock: 100,
  },
  {
    id: "p6",
    name: "Framed Deity Photo (8x10)",
    description: "High-resolution photo print of the main deity, beautifully framed in synthetic wood.",
    price: 29.99,
    category: "Photos",
    image: "/store/venkateswara.png",
    stock: 25,
  },
];

// Generate store data based on temples
export const stores: Store[] = temples.map((temple) => {
  // Add some specific items based on temple id
  const specificProducts = [...defaultProducts];
  
  if (temple.slug.includes('murugan')) {
    specificProducts.push({
      id: `p-murugan-${temple.id}`,
      name: "Silver Vel (Spear) Replica",
      description: "Miniature silver-plated Vel, the divine weapon of Lord Murugan.",
      price: 35.00,
      category: "Idols",
      image: "/store/vel.svg",
      stock: 15,
    });
  }

  if (temple.slug.includes('shiva') || temple.deity.toLowerCase().includes('shiva')) {
    specificProducts.push({
      id: `p-shiva-${temple.id}`,
      name: "Crystal Shiva Lingam",
      description: "Small pure crystal (Sphatik) Shiva Lingam for home worship.",
      price: 45.00,
      category: "Idols",
      image: "/deities/shiva_lingam_1779692728170.png",
      stock: 10,
    });
  }

  return {
    id: `store-${temple.slug}`,
    templeId: temple.id,
    name: `${temple.name} Official Store`,
    description: `Purchase authentic prasadam, merchandise, and pooja items directly from ${temple.name}. Includes a temple pickup option for your convenience.`,
    image: temple.image || "/store/diya.svg", // fallback
    products: specificProducts,
  };
});

export function getStoreById(storeId: string): Store | undefined {
  return stores.find((s) => s.id === storeId);
}

export function getProductById(storeId: string, productId: string): Product | undefined {
  const store = getStoreById(storeId);
  return store?.products.find((p) => p.id === productId);
}
