/**
 * Exploring the "new" typescript mixin pattern
 */

import {
  ArcGISContext,
  IHubProject,
  IHubLayout,
  IResource,
  ProjectOptions,
} from './common';

// Props on this base will be accessible across mixins
interface IHubBaseObject {
  chk: string;
  context: ArcGISContext;
}

class HubBase implements IHubBaseObject {
  chk: string;
  context: ArcGISContext;
  constructor(context: ArcGISContext, opts: Partial<IHubBaseObject>) {
    this.context = context;
    this.chk = opts.chk || 'not set';
  }
}

type HubConstructor<T = HubBase> = new (...args: any[]) => T;

function WithLayout<TBase extends HubConstructor>(Base: TBase) {
  return class WithLayout extends Base implements IHubLayout {
    constructor(...args: any[]) {
      super(...args);
      this.sections = [];
    }
    sections: Record<string, any>[] = [];
    versionName: string = '';
    saveVersion(name: string): Promise<void> {
      this.versionName = name;
      console.info(
        `withLayout.createVersion: ${this.context.portalUrl} Version: ${name}`
      );
      return Promise.resolve();
    }
    listVersions(): Promise<string[]> {
      console.info(`withLayout.listVersions: ${this.context.portalUrl}`);
      return Promise.resolve(['one', 'two', 'three']);
    }
  };
}

interface IHubResources {
  resources: IResource[];
  loadResources(): Promise<void>;
}
function WithResources<TBase extends HubConstructor>(Base: TBase) {
  return class WithResources extends Base implements IHubResources {
    constructor(...args: any[]) {
      super(...args);
      this.resources = [];
    }
    resources: IResource[] = [];

    loadResources(): Promise<void> {
      console.info(`withLayout.createVersion: ${this.context.portalUrl} `);
      this.resources = [{ name: 'jabba.jpg' }, { name: 'boba-fett.png' }];
      return Promise.resolve();
    }
  };
}

class HubProjectBase implements IHubProject {
  readonly context: ArcGISContext;
  private _id: string;
  private _owner: string;
  title: string;
  timeline: any = {};

  public get id() {
    return this._id;
  }

  public get owner() {
    return this._owner;
  }
  static async get(id: string, context: ArcGISContext): Promise<IHubProject> {
    const opts = {
      id,
      owner: 'dave',
      title: 'AnyTown',
    };
    const s = new HubProject(context, opts);
    return Promise.resolve(s);
  }
  constructor(context: ArcGISContext, opts: ProjectOptions) {
    this.context = context;
    // We need a generic means of copying these props over
    this._id = opts.id || '';
    this._owner = opts.owner || '';
    this.title = opts.title || '';
  }
}

const HubProject = WithResources(WithLayout(HubProjectBase));

const ctx = new ArcGISContext();

const project = new HubProject(ctx, { title: 'hello world' });

project.loadResources();
console.log(`Resources: ${project.resources}`);
project.saveVersion('willowsticks');
console.log(`site.versionName: ${project.versionName}`);
