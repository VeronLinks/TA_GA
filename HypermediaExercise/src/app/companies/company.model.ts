export interface Company {
  id: number;
  company_typeId: number;
  name: string;
  address?: string;
  phone?: string;
  cif?: string;
  active: boolean;
  admin: boolean;
}
