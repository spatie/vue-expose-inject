import { isArray, isFunction } from './util';

function retrieveExposedProperties(vm) {
    const expose = vm.$options.expose;

    if (isFunction(expose)) {
        return expose.call(vm);
    }

    if (isArray(expose)) {
        return expose.reduce((expose, property) => {
            if (! vm.hasOwnProperty(property)) {
                throw new Error(`Can't expose \`${property}\` since it's not set`);
            }

            expose[property] = vm[property];

            return expose;
        }, {});
    }

    throw new Error(`\`expose\` must be an array or a factory method, \`${typeof expose}\` given`);
} 

const expose = {
    created() {
        if (this.$options.expose === undefined) {
            return;
        }

        this.$exposed = retrieveExposedProperties(this);
    },
};

export default expose;
