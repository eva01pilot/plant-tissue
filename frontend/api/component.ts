import type { Axios, AxiosInstance } from "axios";

export interface ComponentRow {
  id: number;
  name: string;
}

export interface ComponentRowFull extends ComponentRow {
  formula: string;
  type: ComponentType | null;
}

export interface ComponentType {
  id: number;
  name: string;
  has_formula: boolean;
}

export interface CreateComponentInput {
  name: string;
  type_id: number;
  formula: string;
}

export interface ComponentFull{
  id: number;
  type_id: number;
  name: string;
  formula: string;
  elements: ElementSign[]
}


export interface ElementSign {
  sign: string;
  quantity:number;
}

export class Component {
  instance: AxiosInstance
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async searchComponents(search:string) {
    return await this.instance.post<ComponentRow[]>('/components/search', {search})
  }

  async getComponentTypes() {
    return await this.instance.get<ComponentType[]>('/component_types')
  }

  async createComponent(payload: CreateComponentInput) {
    return await this.instance.post('/components', payload)
  }
  async getComponents(){
    return await this.instance.get<ComponentFull[]>('/components')
  }
}
