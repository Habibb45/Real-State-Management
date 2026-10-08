export type PropertyType = "Apartment" | "House" | "Villa" | "Office";
export type TransactionType = "Rent" | "Sale";
export type PropertyStatus = "available" | "sold" | "rented";
export type UserRole = "user" | "admin";

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  properties_count?: number;
  favorites_count?: number;
  contacts_count?: number;
}

export interface ApiPropertyImage {
  id: number;
  path: string;
  url: string;
  is_primary: boolean;
}

export interface ApiProperty {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  property_type: PropertyType;
  transaction_type: TransactionType;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  status: PropertyStatus;
  created_at?: string;
  owner?: Pick<ApiUser, "id" | "name" | "email" | "phone">;
  images?: ApiPropertyImage[];
  favorites_count?: number;
  is_favorited?: boolean;
}

export interface PropertyFilters {
  search?: string;
  location?: string;
  property_type?: PropertyType | "";
  transaction_type?: TransactionType | "";
  bedrooms?: string;
  min_price?: string;
  max_price?: string;
}

export interface DashboardPayload {
  stats: {
    total_properties: number;
    total_users: number;
    available_properties: number;
    sold_or_rented_properties: number;
  };
  charts: {
    monthly_registrations: Array<{ month: string; total: number }>;
    property_categories: Array<{ property_type: string; total: number }>;
  };
}
