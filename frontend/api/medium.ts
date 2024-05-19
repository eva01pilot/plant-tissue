import type { AxiosInstance } from "axios";
import { objectToFormData } from "~/lib/helpers/formdata";

export interface CreateMediumComponentRelationInput {
  component: {
    id: number | null;
    name: string;
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
  component: number;
  type_id: number;
  formula: string;
  name: string;
  mass: number;
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
    return this.instance.get<MediumFull[]>('/mediums')
  }
}
