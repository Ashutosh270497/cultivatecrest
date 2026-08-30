import rawProducts from "@/data/products.json";

export type VariantPrice = {
  price: number;
  originalPrice: number;
  discount?: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  originalPrice: number;
  active: boolean;
  description: string;
  image: string;
  images: string[];
  amazonLink: string;
  flipkartLink?: string;
  rating?: number;
  reviews?: number;
  variants: string[];
  variantPricing: Record<string, VariantPrice>;
  benefits: string[];
  nutritionFocus: string;
  bestFor: string;
  flavour: string;
};

type RawProduct = Omit<
  Product,
  "slug" | "shortName" | "active" | "image" | "images" | "variantPricing" | "nutritionFocus" | "bestFor" | "flavour"
> & {
  active?: boolean;
  image?: string;
  images?: string[];
  icon?: string;
  variantPricing?: Record<string, VariantPrice>;
};

const productDetails: Record<number, Pick<Product, "slug" | "shortName" | "nutritionFocus" | "bestFor" | "flavour">> = {
  1: {
    slug: "raw-chia-seeds",
    shortName: "Chia seeds",
    nutritionFocus: "Omega-3 & fibre",
    bestFor: "Smoothies, puddings and breakfast bowls",
    flavour: "Mild and versatile",
  },
  2: {
    slug: "raw-flax-seeds",
    shortName: "Flax seeds",
    nutritionFocus: "ALA omega-3 & lignans",
    bestFor: "Grinding into rotis, oats and salads",
    flavour: "Warm and nutty",
  },
  3: {
    slug: "roasted-pumpkin-seeds",
    shortName: "Pumpkin seeds",
    nutritionFocus: "Magnesium & zinc",
    bestFor: "Straight-from-the-pack snacking",
    flavour: "Roasted and crunchy",
  },
  4: {
    slug: "sunflower-seeds",
    shortName: "Sunflower seeds",
    nutritionFocus: "Vitamin E & healthy fats",
    bestFor: "Salads, trail mixes and baking",
    flavour: "Light and crisp",
  },
};

function publicPath(path?: string) {
  if (!path) return "/images/logo.png";
  return path.startsWith("/") ? path : `/${path}`;
}

export const products: Product[] = (rawProducts as RawProduct[])
  .filter((product) => product.active !== false && productDetails[product.id])
  .map((product) => {
    const detail = productDetails[product.id];
    const images = (product.images ?? (product.image ? [product.image] : [])).map(publicPath);

    return {
      ...product,
      ...detail,
      active: true,
      image: publicPath(product.image ?? images[0]),
      images,
      rating: product.rating,
      reviews: product.reviews,
      variants: product.variants ?? ["200g"],
      variantPricing: product.variantPricing ?? {
        [product.variants?.[0] ?? "200g"]: {
          price: product.price,
          originalPrice: product.originalPrice,
        },
      },
    } as Product;
  });

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products.filter((item) => item.id !== product.id).slice(0, 3);
}

export function discountPercentage(product: Pick<Product, "price" | "originalPrice">) {
  if (product.originalPrice <= product.price) return 0;
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

export const journalArticles = [
  {
    slug: "chia-for-everyday-breakfasts",
    category: "Everyday nutrition",
    readTime: "4 min read",
    title: "A simple guide to adding chia to breakfast",
    excerpt: "Three low-effort ways to make chia part of an Indian or Middle Eastern morning routine.",
    image: "/images/Banners/A+_2.png",
  },
  {
    slug: "how-to-use-flax-seeds",
    category: "Kitchen guide",
    readTime: "5 min read",
    title: "Whole or ground? Getting more from flax seeds",
    excerpt: "How to store, grind and add flax seeds to rotis, oats, salads and homemade snacks.",
    image: "/images/products/Flax_Seeds/Free Tea 3.jpg",
  },
  {
    slug: "seed-mix-for-snacking",
    category: "Recipes",
    readTime: "6 min read",
    title: "Build a better desk-side seed mix",
    excerpt: "A balanced, travel-friendly mix using pumpkin, sunflower, flax and chia seeds.",
    image: "/images/Banners/A+_9.png",
  },
];
