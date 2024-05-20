import type { AxiosInstance } from "axios";
import { objectToFormData } from "~/lib/helpers/formdata";

export interface CreateMediumComponentRelationInput {
  component: {
    id: number | null;
    component_formula: string;
    component_molar_mass: number;
    type_id: number;
  };
  mass: string;
}

export interface CreateMediumComponentRelationInputFormatted {
  component_id: number | null;
  mass: string;
}
export interface CreateMediumInput {
  name: string;
  description: string;
  thumbnail: File | null;
  components: CreateMediumComponentRelationInput[];
}
export interface CreateMediumInputFormatted {
  name: string;
  description: string;
  thumbnail: File | null;
  components: CreateMediumComponentRelationInputFormatted[];
}

export interface MediumFull {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  components: MediumComponent[];
}

export interface MediumComponent {
  component: {
    id: number|null;
    type_id: number;
    component_formula: string;
    component_molar_mass: number;
  };
  mass: string;
}

export class Medium {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }
  async createMedium(payload: CreateMediumInputFormatted) {
    const data = objectToFormData(payload);
    return this.instance.post("/mediums", data);
  }
  async getMediums() {
    return this.instance.get<MediumFull[]>("/mediums");
  }
}
