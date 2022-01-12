export interface IHubObjectBase {
  context: ArcGISContext;
}

export interface IHubItemBase extends IHubObjectBase {
  readonly id: string;
  readonly owner?: string;
  title: string;
}

export interface IHubProject extends IHubItemBase {
  timeline: any;
}

export interface IHubLayout {
  sections: Record<string, any>[];
}

export type ProjectOptions = Partial<IHubProject>;

export class ArcGISContext {
  readonly portalUrl: string;
  constructor(portalUrl: string = 'https://www.arcgis.com') {
    this.portalUrl = portalUrl;
  }
}

export interface IModel {
  item: any;
  data: any;
}

export interface IResource {
  name: string;
}
