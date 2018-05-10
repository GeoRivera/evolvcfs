require('es5-shim');

function copyEvents(fromEl, toEl, events) {
    events.forEach(function (ev, i) {
        var func = fromEl[ev];
        if (func) {
            toEl[ev] = function (evt) {
                func.call(this);
            };
        }
    });
}