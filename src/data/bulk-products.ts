export const bulkProductCategories = [
  {
    id: "superfood-seeds",
    title: "Super Food Seeds",
    description: "A versatile seed portfolio for retail packs, food service, ingredient supply and wellness-led ranges.",
    products: [
      "Pumpkin Seeds",
      "Chia Seeds",
      "Sunflower Seeds",
      "Watermelon Seeds",
      "Sabja (Basil) Seeds",
      "Flax Seeds",
      "Tulsi Seeds",
      "Haleem (Garden Cress) Seeds",
    ],
  },
  {
    id: "premium-dry-fruits",
    title: "Premium Dry Fruits",
    description: "High-demand pantry and snacking essentials suited to consumer, gifting and hospitality requirements.",
    products: ["Premium Makhana (Fox Nuts)", "Premium Cashew Nuts"],
  },
  {
    id: "herbal-wellness",
    title: "Ayurvedic & Herbal Wellness",
    description: "Traditional Indian botanicals in root, seed, leaf, mineral and powder formats for qualified buyers.",
    products: [
      "Ashwagandha Roots",
      "Ashwagandha Powder",
      "Kali Musli",
      "Moringa Powder",
      "Tulsi Seed",
      "Tulsi Leaf Powder",
      "Shilajit",
      "Black Turmeric",
      "Neem Leaf Powder",
      "Arjun Chhal",
      "Giloy Roots",
      "Giloy Powder",
      "Calcium Bentonite Clay (Fuller's Earth)",
    ],
  },
  {
    id: "essential-foods",
    title: "Essential Food Products",
    description: "Everyday Indian staples spanning premium rice and widely used pulses for retail and institutional supply.",
    products: [
      "Premium Basmati Rice",
      "Pigeon Pea (Toor Dal)",
      "Green Gram (Split Yellow Moong Dal)",
      "Red Lentils (Masoor Dal)",
      "Black Gram (Urad Dal)",
      "Split Bengal Gram (Chana Dal)",
    ],
  },
  {
    id: "premium-spices",
    title: "Premium Spice Collection",
    description: "Core Indian spice ingredients available across whole-seed and ground-powder requirements.",
    products: ["Coriander Seeds", "Coriander Powder", "Red Chilli Powder", "Cumin Seeds", "Black Pepper"],
  },
  {
    id: "instant-food-powders",
    title: "Signature Instant Food Gravy Range",
    description: "Ready-to-use powdered ingredients for restaurants, hotels, cloud kitchens, manufacturers and home cooking.",
    products: ["Onion Powder", "Garlic Powder", "Ginger Powder", "Tomato Powder", "Green Chilli Powder"],
  },
  {
    id: "fruit-nutrition",
    title: "Fruit-Based Nutrition Products",
    description: "Fruit formats designed for practical shelf life while retaining their natural nutritional character.",
    products: ["Banana Chips", "Banana Powder", "Kiwi Fruit Powder", "Sapota (Chikoo) Powder"],
  },
] as const;

export type BulkProductCategoryId = (typeof bulkProductCategories)[number]["id"];

export const bulkProductCount = bulkProductCategories.reduce(
  (total, category) => total + category.products.length,
  0,
);
