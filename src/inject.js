import { normalizeMap } from './util';

function resolveExposedProperty(key, vm) {

    if (key in (vm.$exposed || {})) {
        return vm.$exposed[key];
    }

    if (vm.$options.parent) {
        return resolveExposedProperty(key, vm.$options.parent);
    }

    throw new Error(`Dependency \`${key}\` couldn't be resolved`);
}

function inject(keys) {
    return normalizeMap(keys).reduce((resolvedProperties, { key, property }) => {
        resolvedProperties[key] = function () {
            return resolveExposedProperty(property, this);
        };
        return resolvedProperties; 
    }, {});
}

export default inject;