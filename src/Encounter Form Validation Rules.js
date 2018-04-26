// 1 actual_date
// Equal or Greater than {udf_datetimearrivedined_TA}
$$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');

setTimeout(function () {
    var fieldName = 'actual_date';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');
        })
}, 50);


// *** Group 2
// Was this a RAP...
// [onchange]
$$.eraseOnDisable('udf_rapintervention_TA', 'udf_whodidrap_TA');


// Was a Doc to Doc...
// [onchange]
$$.eraseOnDisable('udf_docperformed_TA', 'udf_docinitiaed_TA');


// *** Group 3
// Is Client Under 21?
// [onchange]
$$.eraseOnDisable('udf_under21_TA', ['udf_iccinvolved_TA', 'udf_familypartnerintervention_TA', 'udf_madirectunits_TA', 'udf_macollateralunits_TA']);

// Is ICC Involved...
// [onchange]
$$.eraseOnDisable('udf_iccinvolved_TA', 'udf_wasicccontacted_TA');

// Was ICC Contacted...
// [onchange]
$$.eraseOnDisable('udf_wasicccontacted_TA', ['udf_safetypanreviewed_TA', 'udf_wassafetyplancompleted_TA']);

// Was ESP Peer or FP...
// [onchange]
$$.eraseOnDisable('udf_familypartnerintervention_TA', 'udf_whointitiatedfampartinter_TA');



// Group - 11
// udf_datetimeofrequest_TA
// Equal or Greater than {actual_date}
$$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');
$$.setRequiredIfEntered('udf_datetimeofrequest_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeofrequest_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');
        })
}, 50);




// Group - 12
// udf_datetimeofreadiness_TA
// Equal or Greater than 11
$$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');
$$.setRequiredIfEntered('udf_datetimeofreadiness_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeofreadiness_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');
        })
}, 50);




// Group - 13
// udf_datetimeinterventinbegan_TA
// Equal or Greater than 12
// At most 24h after 12
$$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');
$$.setRequiredIfEntered('udf_datetimeinterventinbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeinterventinbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');
        })
}, 50);




// Group - 14
// udf_datetimeinterventionended_TA
// Equal or Greater than 13
// At most 14dd after 13
$$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimeinterventionended_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeinterventionended_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');
        })
}, 50);




// Group - 15
// udf_datetimebedsearchbegan_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimebedsearchbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimebedsearchbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
        })
}, 50);




// Group - 16
// udf_datetimeplacementsecured_TA
// Equal or Greater than 15
// At most 14dd after 15
$$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
$$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimeplacementsecured_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
            $$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');
        })
}, 50);




// Group - 17
// udf_datetimecallplacedforconsult_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimecallplacedforconsult_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
            $$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');
        })
}, 50);




// Group - 18
// udf_datetimesonsultbegan_TA
// Equal or Greater than 17
// At most 12h after 17
$$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
$$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');

setTimeout(function () {
    var fieldName = 'udf_datetimesonsultbegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
            $$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');
        })
}, 50);




// Group - 19
// udf_dateforemrgencypschopharm_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');

setTimeout(function () {
    var fieldName = 'udf_dateforemrgencypschopharm_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
            $$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');
        })
}, 50);




// Group - 20
// udf_dateemergencypsychopharmgegan_TA
// Equal or Greater than 19
// At most 12h after 19
$$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
$$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');

setTimeout(function () {
    var fieldName = 'udf_dateemergencypsychopharmgegan_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
            $$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');
        })
}, 50);




// udf_datetimefinaldisposecured_TA
// Equal or Greater than all other Dates
// At most 30dd after 13