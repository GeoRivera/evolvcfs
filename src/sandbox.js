// Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Enum\PCI\VEN_8086&DEV_9D03&SUBSYS_073D1028&REV_21\3&11583659&0&B8\Device Parameters\Interrupt Management\MessageSignaledInterruptProperties




$$.dateIsAfter('actual_date', 'amended_dt_tm', 'Actual Date must be after Amended Date');


setTimeout(function () {
    var fieldName = 'actual_date';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('actual_date', 'amended_dt_tm', 'Actual Date must be after Amended Date');
        })
}, 50);







var d1 = new Date("4/11/2018 9:00");
var d2 = new Date("4/11/2018 20:00");

var blah = [
    [d1, '<', d2, 'd1 < d2'],
    [d1, '=', d2, 'd1 = d2'],
    [d1, '<=', d2, 'd1 <= d2'],
    [d1, 'after', d2, 'd1 > d2']
]

function alert(x) {
    console.log(x)
}
$$.allDt(blah);

console.log(null !== null);
console.log($$._fromNullable(undefined));

[
    ['actual_date', '>=', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED'],
    ['udf_datetimeofrequest_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time of Request must be after Date/Time Arrived in ED'],
    ['udf_datetimeofreadiness_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Readiness must be after Date/Time Arrived in ED'],
    ['udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Began must be after Date/Time Arrived in ED'],
    ['udf_datetimeinterventionended_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Ended must be after Date/Time Arrived in ED'],
    ['udf_datetimebedsearchbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Bed Search Began must be after Date/Time Arrived in ED'],
    ['udf_datetimeplacementsecured_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Placement Secured must be after Date/Time Arrived in ED'],
    ['udf_datetimecallplacedforconsult_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Call Placed for Consult must be after Date/Time Arrived in ED'],
    ['udf_datetimesonsultbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Consult Began must be after Date/Time Arrived in ED'],
    ['udf_dateforemrgencypschopharm_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Arrived in ED']
]




setTimeout(function () {
    var fieldName = 'udf_datetimearrivedined_TA';
    $('#time_' + fieldName)
        .change(function () {
            $$.allDt(
                [
                    ['actual_date', '>=', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED'],
                    ['udf_datetimeofrequest_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time of Request must be after Date/Time Arrived in ED'],
                    ['udf_datetimeofreadiness_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Readiness must be after Date/Time Arrived in ED'],
                    ['udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Began must be after Date/Time Arrived in ED'],
                    ['udf_datetimeinterventionended_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Ended must be after Date/Time Arrived in ED'],
                    ['udf_datetimebedsearchbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Bed Search Began must be after Date/Time Arrived in ED'],
                    ['udf_datetimeplacementsecured_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Placement Secured must be after Date/Time Arrived in ED'],
                    ['udf_datetimecallplacedforconsult_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Call Placed for Consult must be after Date/Time Arrived in ED'],
                    ['udf_datetimesonsultbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Consult Began must be after Date/Time Arrived in ED'],
                    ['udf_dateforemrgencypschopharm_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Arrived in ED']
                ]
            )
        })
}, 50);




/* ****************************************************************************
    Validation Rules
**************************************************************************** */
// 5 udf_datetimearrivedined_TA
// Earliest Date/Time in the Form
$$.allDt(
    [
        ['actual_date', '>=', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED'],
        ['udf_datetimeofrequest_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time of Request must be after Date/Time Arrived in ED'],
        ['udf_datetimeofreadiness_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Readiness must be after Date/Time Arrived in ED'],
        ['udf_datetimeinterventinbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Began must be after Date/Time Arrived in ED'],
        ['udf_datetimeinterventionended_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Ended must be after Date/Time Arrived in ED'],
        ['udf_datetimebedsearchbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Bed Search Began must be after Date/Time Arrived in ED'],
        ['udf_datetimeplacementsecured_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Placement Secured must be after Date/Time Arrived in ED'],
        ['udf_datetimecallplacedforconsult_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Call Placed for Consult must be after Date/Time Arrived in ED'],
        ['udf_datetimesonsultbegan_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Consult Began must be after Date/Time Arrived in ED'],
        ['udf_dateforemrgencypschopharm_TA', '>=', 'udf_datetimearrivedined_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Arrived in ED']
    ]
)

// $$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimeofrequest_TA', 'udf_datetimearrivedined_TA', 'Date/Time of Request must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimearrivedined_TA', 'Date/Time Readiness must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Began must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimearrivedined_TA', 'Date/Time Intervention Ended must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimearrivedined_TA', 'Date/Time Bed Search Began must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimearrivedined_TA', 'Date/Time Placement Secured must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimearrivedined_TA', 'Date/Time Call Placed for Consult must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimearrivedined_TA', 'Date/Time Consult Began must be after Date/Time Arrived in ED');
// $$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimearrivedined_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Arrived in ED');

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

// 11 udf_datetimeofrequest_TA
// Equal or Greater than {actual_date}
$$.dateIsAfter('udf_datetimeofrequest_TA', 'actual_date', 'Date/Time of Request must be after Actual Date');
$$.setRequiredIfEntered('udf_datetimeofrequest_TA');
setTimeout(function () {
    var fieldName = 'actual_date';
    $('#time_' + fieldName)
        .change(function () {
            $$.dateIsAfter('actual_date', 'udf_datetimearrivedined_TA', 'Actual Date must be after Date/Time Arrived in ED');
        })
}, 50);


// 12 udf_datetimeofreadiness_TA
// Equal or Greater than 11
$$.dateIsAfter('udf_datetimeofreadiness_TA', 'udf_datetimeofrequest_TA', 'Date/Time Readiness must be after Date/Time of Request');
$$.setRequiredIfEntered('udf_datetimeofreadiness_TA');

// 13 udf_datetimeinterventinbegan_TA
// Equal or Greater than 12
// At most 24h after 12
$$.dateIsAfter('udf_datetimeinterventinbegan_TA', 'udf_datetimeofreadiness_TA', 'Date/Time Intervention Began must be after Date/Time of Readiness');
$$.setRequiredIfEntered('udf_datetimeinterventinbegan_TA');

// 14 udf_datetimeinterventionended_TA
// Equal or Greater than 13
// At most 14dd after 13
$$.dateIsAfter('udf_datetimeinterventionended_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Intervention Ended must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimeinterventionended_TA');

// 15 udf_datetimebedsearchbegan_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimebedsearchbegan_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Bed Search Began must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimebedsearchbegan_TA');

// 16 udf_datetimeplacementsecured_TA
// Equal or Greater than 15
// At most 14dd after 15
$$.dateIsAfter('udf_datetimeplacementsecured_TA', 'udf_datetimebedsearchbegan_TA', 'Date/Time Placement Secured must be after Date/Time Bed Search Began');
$$.setRequiredIfEntered('udf_datetimeplacementsecured_TA');

// 17 udf_datetimecallplacedforconsult_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_datetimecallplacedforconsult_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Call Placed for Consult must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_datetimecallplacedforconsult_TA');

// 18 udf_datetimesonsultbegan_TA
// Equal or Greater than 17
// At most 12h after 17
$$.dateIsAfter('udf_datetimesonsultbegan_TA', 'udf_datetimecallplacedforconsult_TA', 'Date/Time Consult Began must be after Date/Time Call Placed for Consult');
$$.setRequiredIfEntered('udf_datetimesonsultbegan_TA');

// 19 udf_dateforemrgencypschopharm_TA
// Equal or Greater than 13
$$.dateIsAfter('udf_dateforemrgencypschopharm_TA', 'udf_datetimeinterventinbegan_TA', 'Date/Time Called for Emergency Psychopharm must be after Date/Time Intervention Began');
$$.setRequiredIfEntered('udf_dateforemrgencypschopharm_TA');

// 20 udf_dateemergencypsychopharmgegan_TA
// Equal or Greater than 19
// At most 12h after 19
$$.dateIsAfter('udf_dateemergencypsychopharmgegan_TA', 'udf_dateforemrgencypschopharm_TA', 'Date/Time Emergency Psychopharm Began must be after Date/Time Called for Emergency Psychopharm');
$$.setRequiredIfEntered('udf_dateemergencypsychopharmgegan_TA');


// udf_datetimefinaldisposecured_TA
// Equal or Greater than all other Dates
// At most 30dd after 13