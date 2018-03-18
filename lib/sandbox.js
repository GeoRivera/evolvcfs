'use strict';

var _tryCatch = function _tryCatch(fn) {
    try {
        fn();
    } catch (e) {}
};

function makeRequired(x) {
    x.id = 'Required';
    return x; //?
}

function makeUnRequired(x) {
    x.id = 'UnRequired';
    return x; //?
}

var _box = function _box(x) {
    return Array.isArray(x) ? x : [x];
};

var setRequired = function setRequired(xs, bool) {
    xs = _box(xs).slice();
    var fn = bool ? makeRequired : makeUnRequired;
    xs.map(function (x) {
        return _tryCatch(fn({
            id: x
        }));
    });
};

// setRequired('blah', 0)
setRequired(['foo', 'bar', 'baz'], 1);

_box(['blah']); //?