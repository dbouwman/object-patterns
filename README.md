## Hub Objects Research

In the course of building out `HubProjects` it was determined that we should consider looking at a variety of compositional patterns to see if we can do this "elegantly"

Considered 5 approaches:

- [Typescript Mixins](./src/new-mixins.ts)
- ["Alternative" Typescript Mixins](./src/declaration-merging.ts)
- [Decorators](./src/decorators.ts)
- [classes with function delegation](./src/classes-with-delegation.ts)
- [classes with internal "Managers"](./src/classes-with-internals.ts)

## Typescript Mixins

This follows the currenly recommended patters from Microsoft.

The challenge here is that the mixins are functions that extend the type that's passed in - seems very challenging to test independently.

Inheritance is needed in order to access host object props from the mixins (i.e. AppSettings). This may work for simple cases, but I suspect we'll get into some corner with this.

This [very indepth article](https://www.bryntum.com/blog/the-mixin-pattern-in-typescript-all-you-need-to-know/) mentions that compile time increases signficantly even in a mid-sized project. They also list other limitations, and in my experimentation, the typeings are unreadable:

```
WithResources<{new (...args: any[]): WithLayout<HubConstructor<HubBase>>.WithLayout;
    prototype: WithLayout<any>.WithLayout;
} & HubConstructor<...>>.WithResources & WithLayout<...>.WithLayout & HubBase>(value: (WithResources<...>.WithResources & ... 1 more ... & HubBase) | PromiseLike<...>): Promise<...>
```

WAT.

Also, I could not get this to compile... seems close, but after reading the limitations I moved on.

## Alternative Typescript Mixins

This is older guidance from Microsoft, and relies on "declaration merging"

While the syntax is less complex (you're basically merging classes), there are severe limits on constructors, and I could not get the mixins to access props on the host class, which is a show stopper.

## Decorators

While this syntax would be amazing, the short story here is that class decorators do not change the Typescript type. So we can decorate all we want, but all typings are lost. There is an open issue from 2015 about this. Apparently it's "difficult"

## Classes with Function Delegation

This is about as vanilla as it gets - just an ES6 Class, and the methods delegate to functions hosted in other modules.

This is the simplest approach as it has no restrictions, each entity has complete autonomy to do whatever it wants.

## Classes with Managers

Similar to the previous approach, but we create Manager classes, which the main entities instantiate in their constructors and then utilize.

This is interesting as it really goes all-in on Classes, but not really sure it's much more useful than Function Delegation

# Summary

Simply creating classes for the various Hub object is likely the simplest, least risky approach. Each entity can handle everything how it would like to. There will be duplication of method signatures, but implementation should all delegate. We _could_ use some inheritance here:

HubObject -> HubItemObject -> HubProject
