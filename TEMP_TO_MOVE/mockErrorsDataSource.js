'use strict';

var Rx = require('rx');

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
}

var completionObserver;
var sensitivityTypeData = {
    'sources': [
        {
            'system': 'Murex',
            'impactedPortfolios': 0,
            'materiality': '0',
            'errors': []
        },
        {
            'system': 'Saber',
            'impactedPortfolios': 0,
            'materiality': '0',
            'errors': []
        },
        {
            'system': 'Test',
            'impactedPortfolios': 0,
            'materiality': '0',
            'errors': []
        }
    ]
};

var errorCategoryAndDetail = [
    {category: 'Validation Error', detail: 'DEM is an illegal currency code'},
    {category: 'Validation Error', detail: 'Unknown portfolio'},
    {category: 'Fatal', detail: 'File materiality does not match manifest'}
];

var generateError = function () {

    var template = errorCategoryAndDetail[Math.floor(Math.random() * errorCategoryAndDetail.length)];
    var error = clone(template);

    error.portfolio = "Portfolio " + Math.floor(Math.random() * 3000) + 1;
    error.materiality = (Math.floor(Math.random() * 30000) + 10000);

    return error;
};


var generateSomeErrors = function () {

    sensitivityTypeData.sources = sensitivityTypeData.sources.map(function (s) {

        if (s.errors.length > 10) {
            return {
                'system': s.system,
                'impactedPortfolios': 0,
                'materiality': '0',
                'errors': []
            };
        }

        s.errors.push(generateError());

        s.materiality = s.errors.reduce(function (acc, el) {
            return acc + el.materiality;
        }, 0);

        s.impactedPortfolios = uniq(s.errors.map(function (e) {
            return e.portfolio
        })).length;

        return s;
    });

    return sensitivityTypeData;
};

var completionStream = Rx.Observable.create(function (o) {
    completionObserver = o;
});
var initialStream = Rx.Observable.return(sensitivityTypeData);

var intervalStream = Rx.Observable.interval(5000)
    .select(function () {
        return generateSomeErrors();
    });

module.exports = Rx.Observable.concat(initialStream, intervalStream)
    .takeUntil(completionStream);