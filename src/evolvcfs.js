(function (Global, document) {
    const _fromNullable = (x) => (x === undefined || !x)

    const _toDate = (x) => new Date(x);

    const _box = (x) => {
        return Array.isArray(x) ? x : [x]
    }

    const _where = (qry) => {
        let res = qry.replace(/{{/g, "\\\'\\\'\' + {{")
            .replace(/}}/g, " + '\\\'\\\' {{")
            .replace(/{#/g, "\' + {{")
            .replace(/#}/g, " + ' {{")
            .split('{{');
        return "\'" + res.reduce((acc, val) => acc + val, '') + "\'";
    }

    const _tryCatch = (fn) => {
        try {
            fn()
        } catch (e) {}
    }



    Global.$$ = {

        hasActiveEnrollment: function (peopleId, programId) {
            const cond = eval(_where('program_info_id = {{programId}}'));
            const has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            const end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return (has_enrollment && !end_date);
        },

        setXMLAttribute: (xs, attr, val) => {
            xs = _box(xs).slice();

            if (typeof (val) === 'number') {
                val = (val) ? 'true' : 'false';
            }
            for (let i = 0; i < xs.length; i++) {
                _tryCatch(getNodeFromXML(formXML, xs[i]).setAttribute(attr, val));
            }
            refreshView(xs[0]);
        },

        setRequired: (xs, bool) => {
            xs = _box(xs).slice();
            let fn = (bool) ? makeRequired : makeUnRequired;
            xs.map(x => _tryCatch(fn({
                id: x
            })))
        },

        setElement: (el, val) => {
            if (formElementExists(el)) {
                var xmlNode = getNodeFromXML(el, formXML);
                var notModifiable = xmlNode.getAttribute('is_modifiable') === 'true' ? true : false;
                var elObj = $('#' + el);

                xmlNode.setAttribute('is_modifiable', 'true');

                // Sets DateTime type fields appropriately
                if ((elObj.attr('type_code') === 'DT') || (elObj.attr('type_code') === 'D')) {
                    var dtTime = val.split(/\s/i)
                    var date = dtTime[0];
                    var time = (dtTime[1] ? dtTime[1] : '') + (dtTime[2] ? dtTime[2] : '');
                    setFormElement(el, date);
                    setFormElement('time_' + el, time);
                    notModifiable && $('#time_' + el).attr('disabled', !notModifiable);
                } else {
                    setFormElement(el, val);
                }

                notModifiable && elObj.attr('disabled', !notModifiable);
            }
        },

        getElement: (el, src) => _fromNullable(src) ? getElementFromXML(formXML, el) : getFormElement(el),

        getClientAge: (peopleId) => getDataValue('client_personal_view', 'people_id', peopleId, 'age'),

        getNodeFromXML: (el, obj) => {
            obj = (_fromNullable(obj)) ? formXML : obj;
            var res = null;

            if (el.charAt(0) !== '#') {
                res = obj.selectSingleNode("form_object/form_group/form_item[@column_name='" + el + "']") || obj.selectSingleNode("form_group/form_item[@column_name='" + el + "']");
            } else {
                res = obj.selectSingleNode("form_object/form_group/form_item[@caption='" + el.slice(1) + "']") || obj.selectSingleNode("form_group/form_item[@caption='" + el.slice(1) + "']");
            }
            return res
        },

        refreshView: (obj) => {
            xslTarget.innerHTML = transformXML(formXSL.XMLDocument.xml, formXML.xml);
            IsDirty() && formState(obj.form, true);
        },

        dtComp: (dt1, comp, dt2) => {
            dt1 = Object.prototype.toString.call(dt1) === '[object String]' ? _toDate($$.getElement(dt1)) : dt1;
            dt2 = Object.prototype.toString.call(dt2) === '[object String]' ? _toDate($$.getElement(dt2)) : dt2;
            switch (comp) {
                case '=':
                    return dt1.toString() === dt2.toString()
                case 'equal':
                    return dt1.toString() === dt2.toString()
                case '!=':
                    return dt1.toString() !== dt2.toString()
                case 'different':
                    return dt1.toString() !== dt2.toString()
                case '>':
                    return dt1 > dt2
                case 'after':
                    return dt1 > dt2
                case '>=':
                    return dt1 >= dt2
                case '<':
                    return dt1 < dt2
                case 'before':
                    return dt1 < dt2
                case '<=':
                    return dt1 <= dt2

                default:
                    return false;
            }
        }

    };

    return $$
})(window.parent, document)