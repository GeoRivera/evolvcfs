(function () {
    const _fromNullable = (x) => (x === undefined || !x)

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

    $$ = {

        getElement: (el, src) => _fromNullable(src) ? getElementFromXML(formXML, el) : getFormElement(el),

        getClientAge: (peopleId) => getDataValue('client_personal_view', 'people_id', peopleId, 'age'),

        hasActiveEnrollment: function (peopleId, programId) {
            const cond = _where('program_info_id = {{programId}}');
            const has_enrollment = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            const end_date = getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return (has_enrollment && !end_date);
        },

        setXMLAttribute: (xs, attr, val) => {
            xs = xs.slice();

            if (typeof (val) === 'number') {
                val = (val) ? 'true' : 'false';
            }
            for (let i = 0; i < xs.length; i++) {
                _tryCatch(getNodeFromXML(formXML, xs[i]).setAttribute(attr, val));
            }
        },

        setRequired: (xs, bool) => {
            for (let i = 0; i < xs.length; i++) {
                let fn = (bool) ? makeRequired : makeUnRequired;

                _tryCatch(fn({
                    id: xs[i]
                }));
            }
        },

        setElement: (el, val) => {
            if (formElementExists(el)) {
                const xmlNode = getNodeFromXML(formXML, el);
                const isMod = xmlNode.getAttribute('is_modifiable');

                xmlNode.setAttribute('is_modifiable', 'true');
                setElementFromXML(formXML, el, val);
                xmlNode.setAttribute('is_modifiable', isMod);
            }
        }
    };

    return $$
})()