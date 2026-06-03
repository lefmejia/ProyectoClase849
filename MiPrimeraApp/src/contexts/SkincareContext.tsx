import { createContext, useContext, useState } from "react";
import {
  Product,
  ProductReview,
  Routine,
  UserProfile,
} from "../utils/types/Skincare";

type SkincareContextType = {
  products: Product[];
  routine: Routine;
  profile: UserProfile;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addReview: (productId: string, review: ProductReview) => void;
  addToRoutine: (type: "morning" | "night", productId: string) => void;
  removeFromRoutine: (type: "morning" | "night", productId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addMedicalCondition: (condition: string) => void;
  removeMedicalCondition: (condition: string) => void;
  addTreatment: (treatment: string) => void;
  removeTreatment: (treatment: string) => void;
};

const defaultProfile: UserProfile = {
  name: "",
  age: "",
  skinType: "normal",
  medicalConditions: [],
  dermatologicalTreatments: [],
};

const SkincareContext = createContext<SkincareContextType | null>(null);

export const useSkincare = () => {
  const context = useContext(SkincareContext);
  if (!context)
    throw new Error("useSkincare debe usarse dentro de SkincareProvider");
  return context;
};

export const SkincareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [routine, setRoutine] = useState<Routine>({ morning: [], night: [] });
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setRoutine((prev) => ({
      morning: prev.morning.filter((pid) => pid !== id),
      night: prev.night.filter((pid) => pid !== id),
    }));
  };

  const addReview = (productId: string, review: ProductReview) => {
    updateProduct(productId, { review });
  };

  const addToRoutine = (type: "morning" | "night", productId: string) => {
    setRoutine((prev) => {
      if (prev[type].includes(productId)) return prev;
      return { ...prev, [type]: [...prev[type], productId] };
    });
  };

  const removeFromRoutine = (type: "morning" | "night", productId: string) => {
    setRoutine((prev) => ({
      ...prev,
      [type]: prev[type].filter((pid) => pid !== productId),
    }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const addMedicalCondition = (condition: string) => {
    const trimmed = condition.trim();
    if (!trimmed || profile.medicalConditions.includes(trimmed)) return;
    setProfile((prev) => ({
      ...prev,
      medicalConditions: [...prev.medicalConditions, trimmed],
    }));
  };

  const removeMedicalCondition = (condition: string) => {
    setProfile((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((c) => c !== condition),
    }));
  };

  const addTreatment = (treatment: string) => {
    const trimmed = treatment.trim();
    if (!trimmed || profile.dermatologicalTreatments.includes(trimmed)) return;
    setProfile((prev) => ({
      ...prev,
      dermatologicalTreatments: [...prev.dermatologicalTreatments, trimmed],
    }));
  };

  const removeTreatment = (treatment: string) => {
    setProfile((prev) => ({
      ...prev,
      dermatologicalTreatments: prev.dermatologicalTreatments.filter(
        (t) => t !== treatment
      ),
    }));
  };

  return (
    <SkincareContext.Provider
      value={{
        products,
        routine,
        profile,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        addToRoutine,
        removeFromRoutine,
        updateProfile,
        addMedicalCondition,
        removeMedicalCondition,
        addTreatment,
        removeTreatment,
      }}
    >
      {children}
    </SkincareContext.Provider>
  );
};