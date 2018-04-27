(function (Global, document) {
    /* ----------------------------------------------------------------------------
         General utils
    ---------------------------------------------------------------------------- */
    const _curry = (fn, arr = []) => (...args) => (a => a.length === fn.length ? fn(...a) : _curry(fn, a))([...arr, ...args]);

    const _compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

    const _pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

    const _not = (fn) => (...args) => !fn(...args);

    const _flip = (fn) => (...args) => fn(...args.reverse());

    const _all = (...args) => args.reduce((acc, curr) => !!(acc && curr), true);

    const _any = (...args) => args.reduce((acc, curr) => !!(acc || curr), false);

    const _box = (x) => Array.isArray(x) ? x : [x];

    /* ----------------------------------------------------------------------------
        Misc
    ---------------------------------------------------------------------------- */
    const _toDate = (x) => new Date(x);

    const _dtFieldToDate = (x) => Object.prototype.toString.call(x) === '[object String]' ? _toDate($$.getElement(x)) : x;

    /**
     * Allows the use Handlebars notation to encapsulate variable names for Evolv's DB like functions (getDataValue, setDataFromValue etc.).
     * @example eval( _where('program_info_id = {{programId}}') );
     *
     * @param {any} qry
     * @returns {string}
     */
    const _where = (qry) => {
        let res = qry.replace(/{{/g, "\\\'\\\'\' + {{")
            .replace(/}}/g, " + '\\\'\\\' {{")
            .replace(/{#/g, "\' + {{")
            .replace(/#}/g, " + ' {{")
            .split('{{');
        return "\'" + res.reduce((acc, val) => acc + val, '') + "\'";
    }
    /* ----------------------------------------------------------------------------
        Validation
    ---------------------------------------------------------------------------- */
    const _exists = (x) => ((x !== undefined && x !== null) || !!x);

    const _fromNullable = (x) => (x === undefined || !x);

    const _isDateTimeField = (fieldName) => ($('#' + fieldName).attr('type_code') === 'DT') || ($('#' + fieldName).attr('type_code') === 'D');



    // TODO - Replace with Left/Right/Either
    const _tryCatch = (fn) => {
        try {
            return fn
        } catch (e) {}
    }

    const _isBlankDtTm = (fieldName) => (_getFormElement(fieldName) === '' && _getFormElement('time_' + fieldName) === '');

    const _isBlankDtOrTm = (fieldName) => (_getFormElement(fieldName) === '' || _getFormElement('time_' + fieldName) === '');
    const _hasDtOrTm = _not(_isBlankDtTm);

    const _isBlank = (fieldName) => _isDateTimeField(fieldName) ? _isBlankDtTm(fieldName) : (_getFormElement(fieldName) === '');
    const _hasValue = (fieldName) => _isDateTimeField(fieldName) ? _not(_isBlankDtOrTm)(fieldName) : _not(_isBlank)(fieldName);


    const _wasModified = (fieldName) => {
        var oldValue = $('#' + fieldName).attr('old_value');
        var currValue = $$.getElement(fieldName);

        if (!_exists(oldValue)) {
            $('#' + fieldName).attr('old_value', '');
        }

        if (_hasValue(fieldName)) {
            return (_exists(oldValue) && (oldValue !== currValue))
        }
        return false
    }

    const _keepValue = (fieldName) => {
        var currValue = $$.getElement(fieldName);
        if (_hasValue(fieldName)) {
            $('#' + fieldName).attr('old_value', currValue);
        }
    }

    const _valueChanged = (fieldName) => _wasModified(fieldName) && _fromNullable(_keepValue(fieldName));

    /* ----------------------------------------------------------------------------
        Interfaces
    ---------------------------------------------------------------------------- */





    Global.$$ = {
        hasActiveEnrollment: (peopleId, programId) => {
            const cond = eval(_where('program_info_id = {{programId}}'));
            const has_enrollment = _getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'program_name', cond);
            const end_date = _getDataValue('current_program_enrollment_view', 'people_id', peopleId, 'end_date', cond);

            return (has_enrollment && !end_date);
        },

        setXMLAttribute: (xs, attr, val) => {
            xs = _box(xs).slice();

            if (typeof (val) === 'number') {
                val = (val) ? 'true' : 'false';
            }
            for (let i = 0; i < xs.length; i++) {
                _tryCatch($$.getNodeFromXML(xs[i], formXML).setAttribute(attr, val));
            }
            refreshView(xs[0]);
        },

        getXMLAttribute: (fieldName, attr) => {
            return _tryCatch($$.getNodeFromXML(fieldName, formXML).getAttribute(attr));
        },

        setRequired: (xs, bool) => {
            xs = _box(xs).slice();
            let fn = (bool) ? makeRequired : makeUnRequired;
            xs.map(x => _tryCatch(fn({
                id: x
            })))
        },

        setRequiredIfEntered: (fieldName) => {
            $$.setRequired(fieldName, !_isBlank(fieldName));
            if (_isDateTimeField(fieldName)) {
                $('#time_' + fieldName)
                    .prev()
                    .attr('style', $('#caption_' + fieldName).attr('style'))
            }
        },

        setElement: (el, val) => {
            if (_formElementExists(el)) {
                var xmlNode = $$.getNodeFromXML(el, formXML);
                var notModifiable = xmlNode.getAttribute('is_modifiable') === 'true' ? true : false;

                xmlNode.setAttribute('is_modifiable', 'true');

                // Sets DateTime type fields appropriately
                if (_isDateTimeField(el)) {
                    var dtTime = val.split(/\s/i)
                    var date = dtTime[0];
                    var time = (dtTime[1] ? dtTime[1] : '') + (dtTime[2] ? dtTime[2] : '');
                    _tryCatch(_setFormElement(el, date));
                    _tryCatch(_setFormElement('time_' + el, time));
                    notModifiable && $('#time_' + el).attr('disabled', !notModifiable);
                } else {
                    _tryCatch(_setFormElement(el, val));
                }

                notModifiable && $('#' + el).attr('disabled', !notModifiable);
            }
        },

        getElement: (el, src) => _fromNullable(src) ? _getElementFromXML(formXML, el) : _getFormElement(el),

        getClientAge: (peopleId) => _getDataValue('client_personal_view', 'people_id', peopleId, 'age'),

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

        showErrMsg: (fieldName, errMsg) => {
            var elObj = $('#' + fieldName)[0];
            var cssErr = {
                margin: '10px 0px',
                padding: '10px',
                float: 'left',
                width: '50%',
                color: '#D8000C',
                backgroundColor: '#FFD2D2',
                fontFamily: 'arial',
                fontSize: '.8em',
                verticalAlign: 'middle'
            }
            $$.hideErrMsg(fieldName)

            errMsg = '❌ ' + errMsg;

            $(elObj)
                .parent()
                .parent()
                .parent()
                .prepend('<tr id="' + elObj.id + '_err_row"><td width="120"></td><td rowSpan="1" colSpan="1"><div id=' + elObj.id + '_err_msg >' + errMsg + '</div></td></tr>');
            $('#' + elObj.id + '_err_msg').css(cssErr);
        },

        hideErrMsg: (fieldName) => {
            $('#' + fieldName + '_err_row').remove();
        },

        dtComp: (dt1, comp, dt2) => {
            dt1 = _dtFieldToDate(dt1);
            dt2 = _dtFieldToDate(dt2);
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
        },

        dateIsAfter: (dt1, dt2, errMsg) => {
            if (_valueChanged(dt1) && !$$.dtComp(dt1, 'after', dt2) && _hasValue(dt1)) {
                $$.showErrMsg(dt1, errMsg);
                (_hasValue(dt1)) && $$.setElement(dt1, '');
            } else if (_hasValue(dt1)) {
                $$.hideErrMsg(dt1)
            }
        },

        dateIsBefore: (dt1, dt2, errMsg) => {
            if (_valueChanged(dt1) && !$$.dtComp(dt1, 'before', dt2) && !_isBlankDtTm(dt1)) {
                $$.showErrMsg(dt1, errMsg);
                (!_isBlankDtTm(dt1)) && $$.setElement(dt1, '');
            } else if (!_isBlankDtTm(dt1)) {
                $$.hideErrMsg(dt1)
            }
        },

        allDt: (arr) => {
            let errMsg = '';
            let passedAllChecks = arr.reduce((acc, xs) => {
                let [dt1, comp, dt2, msg] = [...xs];
                let chkCurrCondition = $$.dtComp(dt1, comp, dt2)
                if (!chkCurrCondition) {
                    errMsg += msg + '\n';
                    $$.setElement(dt1, '');
                }
                return acc && chkCurrCondition
            }, true)

            if (!passedAllChecks) {
                alert(errMsg);
            }
        },

        isAtMostHoursAfter: (dt1, hours, dt2, errMsg) => {
            dt1 = _dtFieldToDate(dt1);
            dt2 = _dtFieldToDate(dt2);
            const timeDiff = (dt2 - dt1) / 60 / 60 / 1000;

            if (timeDiff > hours) {
                alert(errMsg);
                $$.setElement(dt1, '');
            }
        },

        eraseOnDisable: (currEl, eraseList) => {
            eraseList = _box(eraseList);
            eraseList.map(el => {
                if (_tryCatch(eval($$.getXMLAttribute(el, 'disable_rule_code')))) {
                    _tryCatch(_setFormElement(el, ''));
                    $('#' + el + '_prompt').val('')
                }
            });
        }

    };

    return $$
})(window.parent, document);