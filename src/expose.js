import { normalizeMap } from './util';

function expose(keys) {
    return {
        created() {
            if (! this.hasOwnProperty('$expose')) {
                this.$expose = {};
            }

            const expose = normalizeMap(keys).reduce((expose, { key, property }) => {
                if (! this.hasOwnProperty(property)) {
                    throw new Error(`Can't expose \`${key}\` since it's not set`);
                }

                expose[key] = this[property];

                return expose;
            }, {});

            this.$expose = { ...this.$expose, ...expose };
        },
    };
}

export default expose;