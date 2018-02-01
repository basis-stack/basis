'use strict';

var Rx = require('rx');

var updateInterval = 5000;

function getDummyData() {
   return {
      cobDate: "2015-05-01",
      runType: "end_of_day",
      sources: [{
         system: "Murex",
         sensitivityType: "PV01",
         portfolioCount: 2000,
         received: 0,
         //processing: 1500,
         errored: 200,
         //completed: 490,
         accumulatedProcessTime: 0,
         completeMarker: 0,
         calculationComplete: false,
         aggregationComplete: false
      }, {
         system: "Dummy",
         sensitivityType: "Dummy",
         portfolioCount: 5000,
         received: 0,
         //processing: 2000,
         errored: 400,
         //completed: 2900,
         accumulatedProcessTime: 0,
         completeMarker: 0,
         calculationComplete: false,
         aggregationComplete: false
      }]
   };
}

var sensitivityTypeData = getDummyData();

function increment() {

   var incrementAmount = 200;

   for (var i = 0; i < sensitivityTypeData.sources.length; i++) {

      var currentSensi = sensitivityTypeData.sources[i];

      if ((currentSensi.received + currentSensi.errored) < currentSensi.portfolioCount) {
         currentSensi.received += incrementAmount;
      }

      if ((currentSensi.received + currentSensi.errored) === currentSensi.portfolioCount) {
         currentSensi.calculationComplete = true;
         currentSensi.completeMarker++;
      }

      currentSensi.accumulatedProcessTime += (updateInterval / 1000);

      if (currentSensi.calculationComplete && (currentSensi.completeMarker === 3)) {

         currentSensi.aggregationComplete = true;
      }
   }

   return sensitivityTypeData;
}

function checkCompletionState() {

   if (sensitivityTypeData.sources[0].aggregationComplete &&
       sensitivityTypeData.sources[1].aggregationComplete) {

      // Reset the stream so there is a continuous stream of push updates to the UI (for testing / demo purposes)
      sensitivityTypeData = getDummyData();
   }
}

var initialStream = Rx.Observable.return(sensitivityTypeData);
var intervalStream = Rx.Observable.interval(updateInterval)
                                  .select(function() { return increment(); })
                                  .doOnNext(function() { setTimeout(checkCompletionState, 1000) });

module.exports = Rx.Observable.concat(initialStream, intervalStream);