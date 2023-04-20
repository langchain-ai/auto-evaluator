"use strict";
var _appPaths = require("./app-paths");
describe('normalizeRscPath', ()=>{
    describe('enabled', ()=>{
        it('should normalize url with .rsc', ()=>{
            expect((0, _appPaths).normalizeRscPath('/test.rsc', true)).toBe('/test');
        });
        it('should normalize url with .rsc and searchparams', ()=>{
            expect((0, _appPaths).normalizeRscPath('/test.rsc?abc=def', true)).toBe('/test?abc=def');
        });
    });
    describe('disabled', ()=>{
        it('should normalize url with .rsc', ()=>{
            expect((0, _appPaths).normalizeRscPath('/test.rsc', false)).toBe('/test.rsc');
        });
        it('should normalize url with .rsc and searchparams', ()=>{
            expect((0, _appPaths).normalizeRscPath('/test.rsc?abc=def', false)).toBe('/test.rsc?abc=def');
        });
    });
});

//# sourceMappingURL=app-paths.test.js.map