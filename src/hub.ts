class Hub {
  readonly context: ArcGISContext;
  constructor(context: ArcGISContext) {
    this.context = context;
  }
  getSite(id: string): Promise<HubSite> {
    // get the site item + data
    // transform into a pojo we can pass into the HubSite ctor
    // Q: how can we limit `new` on the resulting mixed-in classes?
    // i.e. we want to do `Hub.createSite({...}):Promise<HubSite>`
    // not `const s = new HubSite(ctx, {...})`
  }
  getProject(id: string): Promise<HubProject> {}
}
