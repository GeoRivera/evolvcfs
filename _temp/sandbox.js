(function() {
  var _getFormElement = _tryCatch(getFormElement);
  var _getDataValue = _tryCatch(getDataValue);
  var _setFormElement = _tryCatch(setFormElement);
  var _setFormElementFromData = _tryCatch(setFormElementFromData);
  var _getElementFromXML = _tryCatch(getElementFromXML);
  var _formElementExists = _tryCatch(formElementExists);
  var _getFormElementDOM = _tryCatch(getFormElementDOM);
  var _formState = _tryCatch(formState);

  function _tryCatch(fn) {
    try {
      return fn;
    } catch (e) {
      console.warn("_tryCatch: ", e);
    }
  }

  function getFormId(eventId) {
    var programId = _getElementFromXML(formXML, "program_providing_service");
    var peopleId = _getElementFromXML(formXML, "people_id");
    var sqlCondition =
      "people_id = ''" + peopleId + "'' AND is_deleted = 0 AND event_definition_id = ''" + eventId + "'' AND program_providing_service = ''" + programId + "''";
    var sqlOrderBy = "end_date DESC";
    var eventLogId = _getDataValue("event_view", "people_id", peopleId, "event_log_id", sqlCondition, sqlOrderBy);
    var formId = eventLogId;
    return formId;
  }

  function createFormElementSetter(formID) {
    return function(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (!_getFormElement(xs[i][0])) {
          if (_formElementExists(xs[i][0])) {
            _setFormElementFromData(xs[i][0], "test_header_x", "test_header_id", formID, xs[i][1]);
          }
        }
      }
    };
  }

  var setElFromEval = createFormElementSetter(
    getFormId(
      _getElementFromXML(formXML, "program_providing_service") === "{CE6F5DE7-9ADA-4815-A849-1ECB2186ADA6}"
        ? "F1192D0D-1416-48D5-A6DC-9115747419F0"
        : "2C31265D-9DAB-4CF0-826A-78FC33A25768"
    )
  );
  var setElFromDispo = createFormElementSetter(getFormId("762182AD-CE07-4CF3-8939-D22589CAAA68"));



  
  setElFromEval([
    ['udf_referralsource_TA', 'udf_referralsource_TA'],
    ['udf_rapintervention_TA', 'udf_rapintervention_TA'],
    ['udf_whodidrap_TA', 'udf_whodidrap_TA'],
    ['udf_opiodoverdose_TA', 'udf_opioidoverdose_TA'],
    ['udf_opioidoverdose_TA', 'udf_opioidoverdose_TA'],
    ['udf_autismspectrum_TA', 'udf_autismspectrum_TA']
]);

  setElFromDispo([
    ["udf_docperformed_TA", "udf_docperformed_TA"],
    ["udf_docinitiaed_TA", "udf_docinitiaed_TA"]
    // ["udf_inpatientdispo_TA", "udf_inpatientdispo_TA"]
  ]);
})();
