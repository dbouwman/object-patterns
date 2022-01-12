/**
 * Tranditional typescript mixin approach
 */

import { ArcGISContext, IHubLayout, IHubObjectBase } from './common';

interface IHubLayoutManger {
  layout: IHubLayout;
  saveVersion(name: string): Promise<void>;
  listVersions(): Promise<string[]>;
}

class HubObject implements IHubObjectBase {
  context: ArcGISContext;
  constructor(context: ArcGISContext) {
    this.context = context;
  }
}

// interface name must match ed class so that
// typescript's declaration merging works as expected
interface HubProject extends HubObject, IHubLayout {
  timeline: any;
}

class HubProject {
  private _id: string;
  private _owner: string;
  title: string;
  timeline: any;
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
}

class withLayout implements IHubLayoutManger {
  layout: IHubLayout = { sections: [] };
  versionName: string = '';
  constructor() {}

  saveVersion(name: string): Promise<void> {
    console.info(`saveVersion: ${this.context.portalUrl} Version: ${name}`);
    this.versionName = name;
    return Promise.resolve();
  }
  listVersions(): Promise<string[]> {
    console.info(`listVersions: ${this.context.portalUrl}`);
    return Promise.resolve(['one', 'two', 'three']);
  }
}

applyMixins(HubProject, [HubObject, withLayout]);

// use it
const ctx = new ArcGISContext();
const p = new HubProject(ctx, {
  id: '3ef',
  owner: 'dave',
  title: 'YOLO Merging',
});
p.timeline;

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}
