"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = void 0;
var Element = /** @class */ (function () {
    function Element() {
        console.log('Element !');
    }
    //constructor(properties){
    //this.$el = properties.element;
    //this.id = {
    //html : properties.id.html,
    //fo : properties.id.fo,
    //fi : properties.id.fi,
    //}
    //this.params = properties.params;
    //this.state = properties.state;
    //this.rules = properties.rules;
    //this.middleware = properties.middleware;
    //this.mode = properties.mode;
    //// this.id.fo = properties.id.fo;
    //// console.log(this);
    //}
    //event
    Element.prototype.on = function (ev, callback, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        //this.$el.addEventListener(ev,(e)=>{
        //callback(e, this);
        //}, useCapture);
    };
    return Element;
}());
exports.Element = Element;
