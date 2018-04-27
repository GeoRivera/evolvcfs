(function () {
    var _getFormElement = getFormElement;
    var _getDataValue = getDataValue;
    var _setFormElement = setFormElement;
    var _getElementFromXML = getElementFromXML;
    var _formElementExists = formElementExists;
    var _getFormElementDOM = getFormElementDOM;
    var loadEvalData = 'load_std_form_data';
    _tryCatch(_setFormElement(loadEvalData, 'updating...'));

    var evalId = getEvalId();

    !(_getFormElement('time_actual_date')) ? setCurrentDateTime('actual_date'): null;

    setAgeIfBlank('udf_clientAge_TA');
    setClientUnder21YesNo('udf_under21_TA');

    setDtFromDm('udf_evaldate_TA', 'event_log', 'event_log_id', evalId, 'actual_date');
    setDtFromDm('udf_datetimearrivedined_TA', 'test_header_x', 'test_header_id', evalId, 'udf_datetimearrivedined_TA');

    setElFromEval([
        ['udf_referralsource_TA', 'udf_referralsource_TA'],
        ['udf_opiodoverdose_TA', 'udf_opioidoverdose_TA'],
        ['udf_opioidoverdose_TA', 'udf_opioidoverdose_TA'],
        ['udf_autismspectrum_TA', 'udf_autismspectrum_TA'],
        ['udf_interventionlocation_TA', 'udf_interventionlocation_TA'],
        ['udf_nameofed_TA', 'udf_nameofed_TA'],
        ['udf_whodirectedtoed_TA', 'udf_whodirectedtoed_TA'],
        ['udf_directedbysection12_TA', 'udf_directedbysection12_TA'],
        ['udf_primaryfundingsource_TA', 'udf_primaryfundingsource_TA'],
        ['udf_commercialinsname_TA', 'udf_commercialinsname_TA'],
        ['udf_benefitrequeststatus_TA', 'udf_benefitrequeststatus_TA'],
        ['udf_diagnosistype_TA', 'udf_diagnosistype_TA'],
        ['udf_safetypanreviewed_TA', 'udf_safetypanreviewed_TA'],
        ['udf_wassafetyplancompleted_TA', 'udf_wassafetyplancompleted_TA'],
        ['udf_involvedDMH_TA', 'udf_involvedDMH_TA'],
        ['udf_involvedDYS_TA', 'udf_involvedDYS_TA'],
        ['udf_involvedDDS_TA', 'udf_involvedDDS_TA'],
        ['udf_involvedDCF_TA', 'udf_involvedDCF_TA'],
        ['udf_medclearancerequeted_TA', 'udf_medclearancerequeted_TA'],
        ['udf_whorequestedmedclear_TA', 'udf_whorequestedmedclear_TA'],
        ['udf_medicalclearanceprovided_TA', 'udf_medicalclearanceprovided_TA'],
        ['udf_whoprovidedmedclearance_TA', 'udf_whoprovidedmedclearance_TA'],
        ['udf_stateinvolvement_TA', 'udf_stateinvolvement_TA'],
        ['udf_homeless_TA', 'udf_homeless_TA'],
        ['udf_rapintervention_TA', 'udf_rapintervention_TA'],
        ['udf_whodidrap_TA', 'udf_whodidrap_TA'],
        ['udf_iccinvolved_TA', 'udf_iccinvolved_TA'],
        ['udf_wasicccontacted_TA', 'udf_wasicccontacted_TA'],
        ['udf_safetypanreviewed_TA', 'udf_safetypanreviewed_TA'],
        ['udf_wassafetyplancompleted_TA', 'udf_wassafetyplancompleted_TA'],
        ['udf_familypartnerintervention_TA', 'udf_familypartnerintervention_TA'],
        ['udf_whointitiatedfampartinter_TA', 'udf_whointitiatedfampartinter_TA'],
        ['udf_directedbysection12_TA', 'udf_directedbysection12_TA']
    ])

    setGenderForMBHP('udf_gender_TA');
    setZipAtEventDate('udf_zipcode_TA');
    isHispanicForMBHP('udf_hispanicorigin_TA');
    setLanguageForMBHP('udf_primarylanguage_TA');

    hideFormField(loadEvalData);



    function getClientAge() {
        return _getDataValue('client_personal_view ', 'people_id', _getElementFromXML(formXML, 'people_id'), 'age');
    }

    function hideFormField(fieldName) {
        _getFormElementDOM(fieldName).style.display = 'none';
        _getFormElementDOM('caption_' + fieldName).style.display = 'none';
    }

    function setCurrentDateTime(fieldName) {
        var dt = new Date();
        var currDate = dt.getMonth() + 1 + '/' + dt.getDate() + '/' + dt.getFullYear();
        var currTime = dt.getHours() + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes());
        _tryCatch(_setFormElement(fieldName, currDate));
        _tryCatch(_setFormElement('time_' + fieldName, currTime));
    }


    function setElFromEval(xs) {
        for (let i = 0; i < xs.length; i++) {
            if (!(_getFormElement(xs[i][0]))) {
                if (_formElementExists(xs[i][0])) {
                    _tryCatch(setFormElementFromData(xs[i][0], 'test_header_x', 'test_header_id', evalId, xs[i][1]));
                }
            }
        }
    }


    function setDtFromDm(fieldName, tableFrom, codeField, codeValue, returnField, conditionExpr) {
        var dateFromDb = _getDataValue(tableFrom, codeField, codeValue, returnField, conditionExpr);

        if (!(_getFormElement(fieldName))) {
            if (dateFromDb) {
                var dateTimeArray = dateFromDb.split(' ');
                var date = dateTimeArray[0];
                var timeArray = dateTimeArray[1].split(':');
                var time = String.prototype.concat(timeArray[0], ':', timeArray[1], ' ', dateTimeArray[2]);

                _tryCatch(_setFormElement(fieldName, date));
                _tryCatch(_setFormElement('time_' + fieldName, time));
            }
        }
    }


    function setAgeIfBlank(fieldName) {
        var currentAge = getClientAge();
        var formAge = _getFormElement(fieldName);
        if (!formAge) {
            if (currentAge) {
                _tryCatch(_setFormElement(fieldName, currentAge));
            }
        }
    }


    function setClientUnder21YesNo(fieldName) {
        var currentAge = getClientAge();
        var currYesNo = (currentAge < 21) ? '977497DC-9725-4DBC-9188-2AF053242399' : 'BE24AEBA-35C3-4448-8B8F-4676656C0CAC';
        var answerOnForm = _getFormElement(fieldName);

        if (!answerOnForm) {
            if (currYesNo) {
                _tryCatch(_setFormElement('udf_under21_TA', currYesNo));
            }
        }
    }


    function _tryCatch(fn) {
        try {
            return fn
        } catch (e) {}
    }

    function getEvalId() {
        var programId = _getElementFromXML(formXML, 'program_providing_service');
        var eventId = (programId === '{CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6}') ? 'F1192D0D-1416-48D5-A6DC-9115747419F0' : '2C31265D-9DAB-4CF0-826A-78FC33A25768';
        var peopleId = _getElementFromXML(formXML, 'people_id');
        var sqlCondition = 'people_id = \'\'' + peopleId + '\'\' AND is_deleted = 0 AND event_definition_id = \'\'' + eventId + '\'\' AND program_providing_service = \'\'' + programId + '\'\'';
        var sqlOrderBy = 'end_date DESC';
        var eventLogId = _getDataValue('event_view', 'people_id', peopleId, 'event_log_id', sqlCondition, sqlOrderBy);
        var evalId = eventLogId;
        return evalId;
    }

    function setGenderForMBHP(fieldName) {
        var people_id = _getElementFromXML(formXML, 'people_id');
        var gender_id = _getDataValue('people', 'people_id', people_id, 'gender_id');


        if (!_getFormElement(fieldName)) {
            if (gender_id) {
                switch (gender_id) {
                    case 'AB51774C-2D91-401A-A604-3C8B4AC13119':
                        var result = 'EDD8F98B-D282-4145-997C-653E71F737D4'
                        break;
                    case '7B80D1E4-27A2-49E0-B7A3-697495F789C9':
                        var result = '725A7DEA-1BD3-4F71-ACF8-FE7A0026A672'
                        break;
                    case '2120501D-E8DC-4641-8D60-12C099E79F40':
                        var result = 'F8505020-CCFF-4504-816A-3F0D1E754692'
                        break;
                    case '0C2E17E9-F5EC-4A23-A6AA-FC1C50235093':
                        var result = 'F8505020-CCFF-4504-816A-3F0D1E754692'
                        break;

                    default:
                        var result = 'C0DA946A-F0AD-4899-9C2D-C7123B6E1A36'
                        break;
                }
                _tryCatch(_setFormElement(fieldName, result));
            }
        }
    }

    function isHispanicForMBHP(fieldName) {
        var people_id = _getElementFromXML(formXML, 'people_id');
        var ethnicity = _getDataValue('people', 'people_id', people_id, 'ethnicity');

        var result = (ethnicity === 'C21C949F-DE18-48E1-8133-7E999CB9CEEF') ? '977497DC-9725-4DBC-9188-2AF053242399' : 'BE24AEBA-35C3-4448-8B8F-4676656C0CAC';
        if (!_getFormElement(fieldName)) {
            if (result) {
                _tryCatch(_setFormElement(fieldName, result));
            }
        }
    }

    function setLanguageForMBHP(fieldName) {
        var people_id = _getElementFromXML(formXML, 'people_id');
        var language_id = _getDataValue('people', 'people_id', people_id, 'primary_language');


        if (!_getFormElement(fieldName)) {
            if (language_id) {
                switch (language_id) {
                    case '785F9693-7DE5-400D-B51E-F2EB894DE76A':
                        var result = '781A58DE-5473-4A30-B9E1-18EF13DF3BF7'
                        break;
                    case '540DF61D-FD6F-4A0C-9EBE-58D4B27C0E37':
                        var result = '4AC644D8-D24A-4148-BBF8-251589719DF3'
                        break;
                    case '728E73AA-C4E7-49C2-ADB8-B7303455FACC':
                        var result = 'F22FA373-F1AD-4CBE-A915-25AB455B1147'
                        break;
                    case '28FA8610-B649-433D-A448-73C4486285AE':
                        var result = 'DF0C49C7-3A6C-4A50-85A6-4351DA9D50EA'
                        break;
                    case '0D554F80-B5E9-49FB-BD77-2CB89AEBC786':
                        var result = '8CE698D0-7C66-42E0-9248-4F51A18BFD19'
                        break;
                    case '1128F1F6-D927-4E4A-AFF3-BA6755A479EB':
                        var result = '000199F0-8E17-4699-91A9-700EC5947CA1'
                        break;
                    case 'A8CADB16-03DF-41BD-9C13-970FD2EE7914':
                        var result = 'D802201E-138F-40BA-96B2-74A430BD994F'
                        break;
                    case 'A4DCFB1C-9A3B-432A-93E5-6F9424BB5FB0':
                        var result = '8A5242EA-2D95-4AE0-B07C-86F6916F2555'
                        break;
                    case '5790D698-210D-4542-A2F2-5E6F280D9689':
                        var result = 'B1B6DE82-6C74-4626-A964-9097A4B14EED'
                        break;
                    case '888D9B90-EBAD-4EB0-A080-A317B528D274':
                        var result = 'BB83A7E4-1448-44B3-A7F7-B4CEB7F1D990'
                        break;
                    case '739C0CCA-CCAC-4DE8-A7E5-9AA4770AC5CD':
                        var result = '717FDACE-A6EF-4DC7-81FC-D3B1319317E0'
                        break;
                    case '9FA28B23-74E1-462E-8809-0453E9E4706E':
                        var result = 'FF5521A5-1BA0-48AE-9CB6-F651F8CECE3B'
                        break;
                    case '1742A1C9-4DBE-4E89-B126-5604EB8C2305':
                        var result = 'DE558F58-D8BB-47FA-9715-FC7FA74CB239'
                        break;

                    default:
                        var result = '63EAFC8E-1F3B-44BF-B8DD-F38E930C0FD4'
                        break;
                }
                _tryCatch(_setFormElement(fieldName, result));
            }
        }
    }

    function setZipAtEventDate(fieldName) {
        var people_id = _getElementFromXML(formXML, 'people_id');
        var event_date = _getElementFromXML(formXML, 'actual_date');
        var condition = 'people_id = \'\'' + people_id + '\'\' AND is_deleted = 0 AND convert( DATE, address_date, 101 ) <= convert( DATE,\'\'' + event_date + '\'\', 101)';
        var order_by = 'address_date DESC';

        var result = _getDataValue('address ', 'people_id', people_id, 'zip_code', condition, order_by).substring(0, 5);

        if (!_getFormElement(fieldName)) {
            if (result) {
                _tryCatch(_setFormElement(fieldName, result));
            }
        }
    }



})();