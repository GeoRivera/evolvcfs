var d1 = "04/02/2018 7:00 AM";
var d2 = "04/02/2018 7:00 PM";
var d3 = "04/02/2018 8:00 PM";

Object.prototype.toString.call(d1) //?

// d1 = new Date(d1);
// d2 = new Date(d2);


// Object.prototype.toString.call(d2) === '[object Date]' //?


var _toDate = (x) => new Date(x);

d1 = _toDate(d1);
d2 = _toDate(d2);
d2 = 'actual_date'


console.log(Object.prototype.toString.call(d2));
console.log(d1);
console.log(d2);

var res

(Object.prototype.toString.call(d2) === '[object String]') && (res = 'string');

console.log(res);


console.log(d1 > d2);

var dtCompare = (dt1, comp, dt2) => {
    dt1 = _toDate(dt1);
    dt2 = _toDate(dt2);
    console.log(dt1);
    console.log(dt2);
    console.log(dt1.toString() === dt2.toString());
    switch (comp) {
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
        case '=':
            return dt1.toString() === dt2.toString()
        case 'equal':
            return dt1.toString() === dt2.toString()
        case '!=':
            return dt1.toString() !== dt2.toString()
        case 'different':
            return dt1.toString() !== dt2.toString()

        default:
            return false;
    }
}

d1 == d2

var blah = dtCompare(d1, '!=', d1) //&& dtCompare(d3, d2, '>');
console.log(blah);

console.log(d1 === d1);

blah.ds().de()
.dr()
.dd()