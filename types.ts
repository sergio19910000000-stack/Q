
export interface User {
  email: string;
  name: string;
}

export interface AppFeature {
  name: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface DataModel {
  name: string;
  fields: { name: string; type: string; description: string }[];
}

export interface AppPage {
  name: string;
  route: string;
  components: string[];
  purpose: string;
}

export interface InfrastructureSpec {
  ram: string;
  cpu: string;
  storage: string;
  scalingStrategy: string;
}

export interface AppBlueprint {
  appName: string;
  tagline: string;
  description: string;
  targetAudience: string;
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    auth: string;
  };
  infrastructure: InfrastructureSpec;
  features: AppFeature[];
  dataModels: DataModel[];
  pages: AppPage[];
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export interface GeneratedCode {
  files: {
    name: string;
    language: string;
    content: string;
  }[];
}

export enum ViewMode {
  AUTH = 'AUTH',
  CREATE = 'CREATE',
  BLUEPRINT = 'BLUEPRINT',
  PREVIEW = 'PREVIEW'
}
