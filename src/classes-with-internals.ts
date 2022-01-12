import { ArcGISContext, IHubLayout, IModel } from './common';

class HubProject3 implements IHubProject {
  // Helper Classes
  private store: ModelStore;
  private layoutManager: LayoutManager;

  // context
  readonly context: ArcGISContext;

  // props
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
    this.store = new ModelStore(context);
    this.layoutManager = new LayoutManager(context);
    // We need a generic means of copying these props over
    this._id = opts.id || '';
    this._owner = opts.owner || '';
    this.title = opts.title || '';
  }

  // Static fn to get an instance by id
  // could also look up be domain, or slug
  public static get(id: string, context: ArcGISContext): Promise<HubProject3> {
    const p = new HubProject3(context, { id, title: 'hello world' });
    return Promise.resolve(p);
  }

  listResources(): Promise<string[]> {
    return listResources(this.id, this.context);
  }

  toModel(): IModel {
    // map props from object to IModel
    return {
      item: {
        id: this.id,
        owner: this.owner,
        title: this.title,
      },
      data: {
        timeline: this.timeline,
      },
    };
  }

  fromModel(model: IModel): void {
    // load the props from the model
    this._id = model.item.id;
    this._owner = model.item.owner;
    this.title = model.item.title;
    this.timeline = model.data.timeline;
  }

  async create(): Promise<void> {
    const updates = await this.store.create(this.toModel());
    this.fromModel(updates);
  }

  async update(): Promise<void> {
    if (!this.id) {
      return this.create();
    }
    // transform into IModel & persist to ModelStore
    return Promise.resolve();
  }

  async saveVersion(name: string): Promise<void> {
    await this.layoutManager.saveVersion(name, this.layout);
    this.versionName = name;
  }

  async listVersions(): Promise<string[]> {
    return this.layoutManager.listVersions();
  }
}

class ModelStore {
  context: ArcGISContext;
  constructor(context: ArcGISContext) {
    this.context = context;
  }

  async create(model: IModel): Promise<IModel> {
    model.item.id = '3ef';
    model.item.created = new Date().getTime();
    model.item.modified = new Date().getTime();
    return Promise.resolve(model);
  }

  async update(model: IModel): Promise<IModel> {
    model.item.modified = new Date().getTime();
    return Promise.resolve(model);
  }

  async destroy(id: string): Promise<void> {
    return Promise.resolve();
  }

  async get(id: string): Promise<IModel> {
    return Promise.resolve({
      item: {
        id,
        owner: 'vader',
      },
      data: {},
    });
  }
}

class LayoutManager {
  context: ArcGISContext;
  constructor(context: ArcGISContext) {
    this.context = context;
  }
  saveVersion(name: string, layout: IHubLayout): Promise<string> {
    console.info(`saveVersion: ${this.context.portalUrl} Version: ${name}`);
    return Promise.resolve(name);
  }
  listVersions(): Promise<string[]> {
    console.info(`listVersions: ${this.context.portalUrl}`);
    return Promise.resolve(['one', 'two', 'three']);
  }
}

// Helper fns from other modules
function listResources(id: string, context: ArcGISContext): Promise<string[]> {
  return Promise.resolve(['fett.png', 'vader.jpg']);
}

// Using the class as a container for functions
// Can also do this via
//   `export * as ModelStoreHelpers from './modelStoreHelpers'`
class ModelStoreHelpers {
  private constructor() {}

  static async create(model: IModel, context: ArcGISContext): Promise<IModel> {
    model.item.id = '3ef';
    model.item.created = new Date().getTime();
    model.item.modified = new Date().getTime();
    return Promise.resolve(model);
  }

  static async update(model: IModel, context: ArcGISContext): Promise<IModel> {
    model.item.modified = new Date().getTime();
    return Promise.resolve(model);
  }

  static async destroy(id: string, context: ArcGISContext): Promise<void> {
    return Promise.resolve();
  }

  static async get(id: string, context?: ArcGISContext): Promise<IModel> {
    return Promise.resolve({
      item: {
        id,
        owner: 'vader',
      },
      data: {},
    });
  }
}
