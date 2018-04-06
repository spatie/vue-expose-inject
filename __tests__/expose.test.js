import Vue from 'vue';
import { expose } from '../src';

describe('expose', () => {
    it('can expose any value', () => {
        const vm = new Vue({
            mixins: [expose],
            data() {
                return {
                    myOtherProp: 'bar',
                };
            },
            expose() {
                return {
                    myProp: 'foo',
                    myOtherProp: this.myOtherProp,
                };
            },
        });

        expect(vm.$exposed).toEqual({ myProp: 'foo', myOtherProp: 'bar' });
    });

    it('can expose an array of named properties', () => {
        const vm = new Vue({
            mixins: [expose],
            data() {
                return {
                    myProp: 'foo',
                };
            },
            expose: ['myProp'],
        });

        expect(vm.$exposed).toEqual({ myProp: 'foo' });
    });

    it('throws an error if a property that doesn\'t exist gets exposed', () => {
        expect(() => {
            new Vue({
                mixins: [expose],
                expose: ['myProp'],
            });
        }).toThrow();
    });
});
