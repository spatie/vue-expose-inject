import Vue from 'vue';
import { expose } from '../src';

describe('expose', () => {

    it('can mark an instance property as exposed', () => {
        const vm = new Vue({
            mixins: [expose],
            data() {
                return {
                    myProp: 'foo',
                };
            },
            expose() {
                return ['myProp'];
            },
        });

        expect(vm.$expose).toEqual({ myProp: 'foo' });
    });

    it('can expose any value', () => {
        const vm = new Vue({
            mixins: [expose],
            expose() {
                return {
                    myProp: 'foo',
                };
            },
        });

        expect(vm.$expose).toEqual({ myProp: 'foo' });
    });

    it('throws an error if a property that doesn\'t exist gets exposed', () => {
        expect(() => {
            new Vue({
                mixins: [expose],
                expose() {
                    return ['myProp'];
                },
            });
        }).toThrow();
    });
});