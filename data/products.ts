import type { Product } from "@/types/product"
import pat1 from "@/public/pat (1).jpg"
import pat2 from "@/public/pat (2).jpg"
import pat3 from "@/public/pat (3).jpg"
import pat4 from "@/public/pat (4).jpg"
import pat5 from "@/public/pat (5).jpg"
import pat6 from "@/public/pat (6).jpg"
import pat7 from "@/public/pat (7).jpg"
import pat8 from "@/public/pat (8).jpg"
import pat9 from "@/public/pat (9).jpg"
import pat10 from "@/public/pat (10).jpg"
import pat11 from "@/public/pat (11).jpg"
import pat12 from "@/public/pat (12).jpg"
import pat13 from "@/public/pat (13).jpg"
import pat14 from "@/public/pat (14).jpg"
import pat15 from "@/public/pat (15).jpg"
import pat16 from "@/public/pat (16).jpg"
import pat17 from "@/public/pat (17).jpg"
import pat18 from "@/public/pat (18).jpg"
import pat19 from "@/public/pat (19).jpg"
import pat20 from "@/public/pat (20).jpg"
import pat21 from "@/public/pat (21).jpg"
import pat22 from "@/public/pat (22).jpg"
import pat23 from "@/public/pat (23).jpg"
import pat24 from "@/public/pat (24).jpg"
import pat25 from "@/public/pat (25).jpg"
import pat26 from "@/public/pat (26).jpg"
import pat27 from "@/public/pat (27).jpg"
import pat28 from "@/public/pat (28).jpg"
import pat29 from "@/public/pat (29).jpg"
import pat30 from "@/public/pat (30).jpg"
import pat31 from "@/public/pat (31).jpg"
import pat32 from "@/public/pat (32).jpg"
import pat33 from "@/public/pat (33).jpg"
import pat34 from "@/public/pat (34).jpg"
import pat35 from "@/public/pat (35).jpg"
import pat36 from "@/public/pat (36).jpg"
import pat37 from "@/public/pat (37).jpg"
import pat38 from "@/public/pat (38).jpg"
import pat39 from "@/public/pat (39).jpg"
import pat40 from "@/public/pat (40).jpg"
import pat41 from "@/public/pat (41).jpg"
import pat42 from "@/public/pat (42).jpg"
import pat43 from "@/public/pat (43).jpg"
import pat44 from "@/public/pat (44).jpg"
import pat45 from "@/public/pat (45).jpg"
import pat46 from "@/public/pat (46).jpg"
import pat47 from "@/public/pat (47).jpg"
import pat48 from "@/public/pat (48).jpg"
import pat49 from "@/public/pat (49).jpg"
import pat50 from "@/public/pat (50).jpg"
import pat51 from "@/public/pat (51).jpg"
import pat52 from "@/public/pat (52).jpg"
import pat53 from "@/public/pat (53).jpg"
import pat54 from "@/public/pat (54).jpg"
import pat55 from "@/public/pat (55).jpg"
import pat56 from "@/public/pat (56).jpg"
import pat57 from "@/public/pat (57).jpg"
import pat58 from "@/public/pat (58).jpg"
import pat59 from "@/public/pat (59).jpg"
import pat60 from "@/public/pat (60).jpg"
import pat61 from "@/public/pat (61).jpg"
import pat62 from "@/public/pat (62).jpg"
import pat63 from "@/public/pat (63).jpg"
import pat64 from "@/public/pat (64).jpg"
import pat65 from "@/public/pat (65).jpg"
import pat66 from "@/public/pat (66).jpg"
import pat67 from "@/public/pat (67).jpg"
import pat68 from "@/public/pat (68).jpg"
import pat69 from "@/public/pat (69).jpg"
import pat70 from "@/public/pat (70).jpg"
import pat71 from "@/public/pat (71).jpg"
import pat72 from "@/public/pat (72).jpg"
import pat73 from "@/public/pat (73).jpg"

// 1. Create an array of all the imported images
const images = [
  pat1, pat2, pat3, pat4, pat5, pat6, pat7, pat8, pat9, pat10,
  pat11, pat12, pat13, pat14, pat15, pat16, pat17, pat18, pat19, pat20,
  pat21, pat22, pat23, pat24, pat25, pat26, pat27, pat28, pat29, pat30,
  pat31, pat32, pat33, pat34, pat35, pat36, pat37, pat38, pat39, pat40,
  pat41, pat42, pat43, pat44, pat45, pat46, pat47, pat48, pat49, pat50,
  pat51, pat52, pat53, pat54, pat55, pat56, pat57, pat58, pat59, pat60,
  pat61, pat62, pat63, pat64, pat65, pat66, pat67, pat68, pat69, pat70,
  pat71, pat72, pat73,
]

// 2. Define the common data for this product in one place
const chebakiaData = {
  name: {
    en: "Traditional Chebakia",
    fr: "Chebakia Traditionnelle",
    ar: "شباكية تقليدية",
  },
  description: {
    en: "A delicate flower-shaped pastry dipped in honey and sprinkled with sesame seeds",
    fr: "Pâtisserie délicate en forme de fleur trempée dans le miel et saupoudrée de graines de sésame",
    ar: "معجنات رقيقة على شكل زهرة مغموسة في العسل ومرشوشة ببذور السمسم",
  },
  price: 259.9,
  originalPrice: undefined, // FIX: Use 'undefined' as required by the Product type
  category: {
    en: "Traditional Sweets",
    fr: "Douceurs Traditionnelles",
    ar: "حلويات تقليدية",
  },
  ingredients: {
    en: ["Flour", "Honey", "Sesame Seeds", "Orange Blossom Water", "Cinnamon"],
    fr: ["Farine", "Miel", "Graines de Sésame", "Eau de Fleur d'Oranger", "Cannelle"],
    ar: ["دقيق", "عسل", "بذور السمسم", "ماء زهر البرتقال", "قرفة"],
  },
  isNew: false,
  isBestseller: false,
  inStock: true,
  rating: 4.8,
  reviewCount: 127,
}

// 3. Generate the final products array by mapping over the images
export const products: Product[] = images.map((image, index) => ({
  ...chebakiaData,
  id: `${index + 1}`,
  images: [image],
}));