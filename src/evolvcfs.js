(function (Global, document) {
    const _fromNullable = (x) => (x === undefined || !x)

    const _box = (x) => {
        return Array.isArray(x) ? x : [x]
    }

    const _where = (str) => {
        let res = '';
        qry = qry.replace(/{{/g, "''{{").replace(/}}/g, "{{''").replace(/{#/g, "{{").replace(/#}/g, "{{").split('{{');

        if (qry.length % 2 !== 0) {
            qry[qry.length] = 'String.fromCharCode(32)'
        };
        for (let i = 0; i < qry.length; i += 2) {
            res += qry[i] + eval(qry[i + 1]);
        }
        return res
    }

    const _tryCatch = (fn) => {
        try {
            fn()
        } catch (e) {}
    }


    Global.$$ = {

        hasActiveEnrollment: function (peopleId, programId) {
            const cond = _where('program_info_id = {{programId}}');
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
                const xmlNode = getNodeFromXML(formXML, el);
                const isMod = xmlNode.getAttribute('is_modifiable');

                xmlNode.setAttribute('is_modifiable', 'true');
                setElementFromXML(formXML, el, val);
                xmlNode.setAttribute('is_modifiable', isMod);
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
        }

    };

    return $$
})(window.parent, document)