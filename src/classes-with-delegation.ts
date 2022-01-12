import { ArcGISContext, IHubLayout } from './common';

class HubProject2 implements IHubProject {
  readonly context: ArcGISContext;
  private _id: string;
  private _owner: string;
  title: string;
  timeline: any;

  versionName: string = '';
  layout: IHubLayout = { sections: [] };

  public get id() {
    return this._id;
  }

  public get owner() {
    return this._owner;
  }

  constructor(context: ArcGISContext, opts: ProjectOptions) {
    this.context = context;
    // We need a generic means of copying these props over
    this._id = opts.id || '';
    this._owner = opts.owner || '';
    this.title = opts.title || '';
  }
  // Static fn to get an instance by id
  // could also look up be domain, or slug
  public static get(id: string, context: ArcGISContext): Promise<HubProject2> {
    const p = new HubProject2(context, { id, title: 'hello world' });
    return Promise.resolve(p);
  }

  listResources(): Promise<string[]> {
    return listResources(this.id, this.context);
  }

  update(): Promise<void> {
    if (!this.id) {
      return this.save();
    }
    // transform into IModel & persist to ItemStore
    return Promise.resolve();
  }

  save(): Promise<void> {
    // actually
    return Promise.resolve();
  }
}

// Helper fns from other modules
function listResources(id: string, context: ArcGISContext): Promise<string[]> {
  return Promise.resolve(['fett.png', 'vader.jpg']);
}
