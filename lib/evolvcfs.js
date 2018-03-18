"use strict";

(function (Global, document) {
    var _fromNullable = function _fromNullable(x) {
        return x === undefined || !x;
    };

    var _box = function _box(x) {
        return Array.isArray(x) ? x : [x];
    };

    var _where = function _where(str) {
        var res = '';
        qry = qry.replace(/{{/g, "''{{").replace(/}}/g, "{{''").replace(/{#/g, "{{").replace(/#}/g, "{{").split('{{');

        if (qry.length % 2 !== 0) {
            qry[qry.length] = 'String.fromCharCode(32)';
        };
        for (var i = 0; i < qry.length; i += 2) {
            res += qry[i] + eval(qry[i + 1]);
        }
        return res;
    };

    var _tryCatch = function _tryCatch(fn) {
        try {
            fn();
        } catch (e) {}
    };

    Global.$$ = {

        getElement: function getElement(el, src) {
            return _fromNullable(src) ? getElementFromXML(formXML, el) : getFormElement(el);
        },

        getClientAge: function getClientAge(peopleId) {
            return getDataValue('client_personal_view', 'people_id', peopleId, 'age');
        },

        hasActiveEnrollment: function hasActiveEnrollment(peopleId, programId) {
            var cond = _where('program_info_id = {{programId}}');
            var has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            var end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return has_enrollment && !end_date;
        },

        setXMLAttribute: function setXMLAttribute(xs, attr, val) {
            xs = _box(xs).slice();

            if (typeof val === 'number') {
                val = val ? 'true' : 'false';
            }
            for (var i = 0; i < xs.length; i++) {
                _tryCatch(getNodeFromXML(formXML, xs[i]).setAttribute(attr, val));
            }
        },

        setRequired: function setRequired(xs, bool) {
            xs = _box(xs).slice();
            var fn = bool ? makeRequired : makeUnRequired;
            xs.map(function (x) {
                return _tryCatch(fn({
                    id: x
                }));
            });
        },

        setElement: function setElement(el, val) {
            if (formElementExists(el)) {
                var xmlNode = getNodeFromXML(formXML, el);
                var isMod = xmlNode.getAttribute('is_modifiable');

                xmlNode.setAttribute('is_modifiable', 'true');
                setElementFromXML(formXML, el, val);
                xmlNode.setAttribute('is_modifiable', isMod);
            }
        }
    };

    return $$;
})(window.parent, document);