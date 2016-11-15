import { normalizeMap } from './util';

function resolveDependency(key, vm) {

    if (key in (vm.$expose || {})) {
        return vm.$expose[key];
    }

    if (vm.$options.parent) {
        return resolveDependency(key, vm.$options.parent);
    }

    throw new Error(`Dependency \`${key}\` couldn't be resolved`);
}

function inject(keys) {
    return normalizeMap(keys).reduce((properties, { key, property }) => {
        properties[key] = function () {
            return resolveDependency(property, this);
        };
        return properties; 
    }, {});
}

export default inject;