const expose = {
    created() {
        if (! this.$options.hasOwnProperty('expose')) {
            return;
        }
        
        if (! this.hasOwnProperty('$expose')) {
            this.$expose = {};
        }

        let expose = this.$options.expose();

        if (Array.isArray(expose)) {
            expose = expose.reduce((expose, property) => {
                if (! this.hasOwnProperty(property)) {
                    throw new Error(`Can't expose \`${property}\` since it's not set`);
                }

                expose[property] = this[property];

                return expose;
            }, {});
        }

        this.$expose = { ...this.$expose, ...expose };
    },
};

export default expose;