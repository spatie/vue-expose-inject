// https://github.com/vuejs/vuex/blob/dae213024b420e611afb53527254177a4b18e857/src/helpers.js#L46
export function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, property: key }))
        : Object.keys(map).map(key => ({ key, property: map[key] }));
}