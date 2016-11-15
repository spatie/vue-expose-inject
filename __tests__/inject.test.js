import Vue from 'vue';
import { expose, inject } from '../src';

describe('inject', () => {

    it('can inject a property that\'s set on a parent', () => {
        const parent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    propA: 'foo',
                };
            },
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject(['propA']),
            },
        });

        expect(child.propA).toBe('foo');
    });

    it('can inject multiple properties', () => {
        const parent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    propA: 'foo',
                    propB: 'bar',
                };
            },
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject(['propA', 'propB']),
            },
        });

        expect(child.propA).toBe('foo');
        expect(child.propB).toBe('bar');
    });

    it('can rename injected properties', () => {
        const parent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    propA: 'foo',
                };
            },
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject({
                    myProp: 'propA',
                }),
            },
        });

        expect(child.myProp).toBe('foo');
    });

    it('can inject a property that\'s set on a further ancestor', () => {
        const grandParent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    propA: 'foo',
                };
            },
        });

        const parent = new Vue({
            parent: grandParent,
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject(['propA']),
            },
        });

        expect(child.propA).toBe('foo');
    });

    it('returns the last exposed property if there are multiple with the same name', () => {
        const grandParent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    propA: 'foo',
                };
            },
        });

        const parent = new Vue({
            parent: grandParent,
            mixins: [expose],
            expose() {
                return {
                    propA: 'bar',
                };
            },
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject(['propA']),
            },
        });

        expect(child.propA).toBe('bar');
    });

    it.only('can inject a property that was exposed as a symbol', () => {
        const myProp = Symbol();

        const parent = new Vue({
            mixins: [expose],
            expose() {
                return {
                    [myProp]: 'foo',
                };
            },
        });

        const child = new Vue({
            parent,
            computed: {
                ...inject({
                    myProp,
                }),
            },
        });

        expect(child.myProp).toBe('foo');
    });

    it('throws an error if it tries to inject a property that hasn\'t been exposed', () => {

        expect(() => {
            const vm = new Vue({
                computed: {
                    ...inject(['propA']),
                },
            });

            vm.propA;
        }).toThrow();
    });
});