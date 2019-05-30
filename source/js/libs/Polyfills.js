export default class Polyfills{
    static run(){
        /*
        closest
        */
        if (window.Element && !Element.prototype.closest) {
            console.log('closest', window.Element && !Element.prototype.closest);
            Element.prototype.closest = function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i, el = this;
                do {
                    i = matches.length;
                    while (--i >= 0 && matches.item(i) !== el) {};
                } while ((i < 0) && (el = el.parentElement));
                return el;
            };
        }

        /*
        foreach
        */
        if (typeof NodeList.prototype.forEach === "function") return false;
        NodeList.prototype.forEach = Array.prototype.forEach;


        if (!Array.prototype.forEach) {
            console.log('forEach', Array.prototype.forEach);

            Array.prototype.forEach = function(callback) {

                var T, k;

                if (this == null) {
                    throw new TypeError(' this vaut null ou n est pas défini');
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== "function") {
                    throw new TypeError(callback + ' n est pas une fonction');
                }
                if (arguments.length > 1) {
                    T = arguments[1];
                }

                k = 0;

                while (k < len) {

                    var kValue;
                    if (k in O) {

                        kValue = O[k];


                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }
    }
}
