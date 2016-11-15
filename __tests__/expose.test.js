import Vue from 'vue';
import { expose } from '../src';

describe('expose', () => {

    it('can mark an instance property as exposed', () => {
        const vm = new Vue({
            mixins: [
                expose(['propA']),
            ],
            data() {
                return {
                    propA: 'foo',
                };
            },
        });

        expect(vm.$expose).toEqual({ propA: 'foo' });
    });

    it('can rename an exposed property', () => {
        const vm = new Vue({
            mixins: [
                expose({
                    myProp: 'propA',
                }),
            ],
            data() {
                return {
                    propA: 'foo',
                };
            },
        });

        expect(vm.$expose).toEqual({ myProp: 'foo' });
    });

    it('can mark multiple instance properties as exposed', () => {
        const vm = new Vue({
            mixins: [
                expose(['propA', 'propB']),
            ],
            data() {
                return {
                    propA: 'foo',
                    propB: 'bar',
                };
            },
        });

        expect(vm.$expose).toEqual({ propA: 'foo', propB: 'bar' });
    });

    it('throws an error if a property that doesn\'t exist gets exposed', () => {
        expect(() => {
            new Vue({
                mixins: [
                    expose(['propA']),
                ],
            });
        }).toThrow();
    });
});