/**
 * Renaming AppSettings to be more generic
 */
// class ArcGISContext {
//   readonly portalUrl: string;
//   constructor(portalUrl: string = 'https://www.arcgis.com') {
//     this.portalUrl = portalUrl;
//   }
// }

interface IHubObjectBase {
  context: ArcGISContext;
}

interface IHubItemBase extends IHubObjectBase {
  readonly id: string;
  readonly owner?: string;
  title: string;
}

interface IHubProject extends IHubItemBase {
  timeline: any;
}

type ProjectOptions = Partial<IHubProject>;

interface WithResources {
  loadResources(): Promise<string[]>;
}
function WithResources<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class WithResourcesClass extends constructor {
    loadResources(): Promise<string[]> {
      return Promise.resolve(['luke.jpg', 'yoda.jpg']);
    }
  };
}

@WithResources
class HubProject implements IHubItemBase {
  readonly context: ArcGISContext;
  readonly owner: string = '';
  readonly id: string = '';

  title: string = '';
  timeline: any;

  constructor(context: ArcGISContext, options: Partial<ProjectOptions>) {
    this.context = context;
    this.title = options.title || '';
    this.id = options.id || '';
    this.owner = options.owner || '';
    this.timeline = options.timeline;
  }
}

const ctx = new ArcGISContext();
const prj = new HubProject(ctx, { title: 'Hello World' });
// Although present, the function is not seen by the typesystem
// because class decorators do not change the TypeScript type
// Issue: https://github.com/Microsoft/TypeScript/issues/4881
prj.loadResources();
