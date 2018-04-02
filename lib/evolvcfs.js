"use strict";

(function (Global, document) {
    var _fromNullable = function _fromNullable(x) {
        return x === undefined || !x;
    };

    var _toDate = function _toDate(x) {
        return new Date(x);
    };

    var _box = function _box(x) {
        return Array.isArray(x) ? x : [x];
    };

    var _where = function _where(qry) {
        var res = qry.replace(/{{/g, "\\\'\\\'\' + {{").replace(/}}/g, " + '\\\'\\\' {{").replace(/{#/g, "\' + {{").replace(/#}/g, " + ' {{").split('{{');
        return "\'" + res.reduce(function (acc, val) {
            return acc + val;
        }, '') + "\'";
    };

    var _tryCatch = function _tryCatch(fn) {
        try {
            fn();
        } catch (e) {}
    };

    Global.$$ = {

        hasActiveEnrollment: function hasActiveEnrollment(peopleId, programId) {
            var cond = eval(_where('program_info_id = {{programId}}'));
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
            refreshView(xs[0]);
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
        },

        getElement: function getElement(el, src) {
            return _fromNullable(src) ? getElementFromXML(formXML, el) : getFormElement(el);
        },

        getClientAge: function getClientAge(peopleId) {
            return getDataValue('client_personal_view', 'people_id', peopleId, 'age');
        },

        getNodeFromXML: function getNodeFromXML(el, obj) {
            obj = _fromNullable(obj) ? formXML : obj;
            var res = null;

            if (el.charAt(0) !== '#') {
                res = obj.selectSingleNode("form_object/form_group/form_item[@column_name='" + el + "']") || obj.selectSingleNode("form_group/form_item[@column_name='" + el + "']");
            } else {
                res = obj.selectSingleNode("form_object/form_group/form_item[@caption='" + el.slice(1) + "']") || obj.selectSingleNode("form_group/form_item[@caption='" + el.slice(1) + "']");
            }
            return res;
        },

        refreshView: function refreshView(obj) {
            xslTarget.innerHTML = transformXML(formXSL.XMLDocument.xml, formXML.xml);
            IsDirty() && formState(obj.form, true);
        },

        dtComp: function dtComp(dt1, dt2, comp) {
            dt1 = _toDate(dt1);
            dt2 = _toDate(dt2);
            switch (comp) {
                case '>':
                    return dt1 > dt2;
                case '>=':
                    return dt1 >= dt2;
                case '<':
                    return dt1 < dt2;
                case '<=':
                    return dt1 <= dt2;
                case '=':
                    return dt1 === dt2;
                case '!=':
                    return dt1 !== dt2;

                default:
                    return false;
            }
        }

    };

    return $$;
})(window.parent, document);