# A React context-like solution for Vue.js

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-expose-inject.svg?style=flat-square)](https://npmjs.com/package/vue-expose-inject)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/vue-expose-inject/master.svg?style=flat-square)](https://travis-ci.org/spatie/vue-expose-inject)

Exposes a set of properties to all of a components descendants.  

```js
// Expose a property...
const vm = new Vue({
    mixins: [expose],

    data: () => ({
        bus: new Bus(),
    }),

    expose() {
        return {
            bus: this.bus,
        };
    },
});

// ...to be able to inject it in a child component
const child = new Vue({
    parent: vm,

    computed: {
        ...inject(['bus']),
    },
});

child.bus; // EventBus instance
```

## Postcardware

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we'd appreciate if you send us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

You can install the package via yarn:

```bash
yarn add vue-expose-inject
```

## Use Cases

This package is based on React's [context](https://facebook.github.io/react/docs/context.html) feature. Exposes and inject are useful for giving your components access to global-ish objects, like event busses or authentication data. Expose/inject can make your application harder to reason about, and depends on a certain hierarchy with your components, so use with care!    

## Usage

Child components can inject properties that are exposed by one of their ancestors. This goes beyond parent-child communitation, the distance between the parent and child, grandchild, etc. doesn't matter.

To get started, expose an object from a parent component by adding the `expose` mixin and an `expose` function, which returns the object:

```js
// Parent.js

import { expose } from 'vue-expose-inject';

export default {
    mixins: [expose],

    expose() {
        return {
            bus: new Bus(),
        };
    },
}
```

Vue instance properties can also be exposed by passing their names in an array:

```js
export default {
    mixins: [expose],

    data: () => ({
        bus: new Bus(),
    }),

    expose: ['bus'],
}
``` 

Descendant components can then inject the property using the `inject` helper function, which uses the same syntax as Vuex's `map` helpers:

```js
// Child.js

import { inject } from 'vue-expose-inject';

export default {
    parent: vm,

    computed: {
        ...inject(['bus']),
    },
}
```

> If you try to inject a property that hasn't been exposed by an ancestor, an error gets thrown 

Injected properties can be renamed by passing in an object instead of an array:

```js
export default {
    // ...

    computed: {
        ...inject({
            myBus: 'bus',
        }),
    },
}
```

If you're not using the spread operator, you can `assign` the properties:

```js
export default {
    // ...
    
    computed: Object.assign(inject(['bus']), {
        // My computed properties...
    }),
}
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Sebastian De Deyne](https://github.com/sebastiandedeyne) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
