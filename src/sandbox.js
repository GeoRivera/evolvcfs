const _tryCatch = (fn) => {
    try {
        fn()
    } catch (e) {}
}

function makeRequired(x) {
    x.id = 'Required'
    return x //?
}

function makeUnRequired(x) {
    x.id = 'UnRequired'
    return x //?
}

const _box = (x) => {
    return Array.isArray(x) ? x : [x]
};

const setRequired = (xs, bool) => {
    xs = _box(xs).slice();
    let fn = (bool) ? makeRequired : makeUnRequired;
    xs.map(x => _tryCatch(fn({
        id: x
    })))
}

// setRequired('blah', 0)
setRequired(['foo', 'bar', 'baz'], 1)

_box(['blah']) //?