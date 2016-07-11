'use strict';

const moment = require('moment');

function consolidateQueries (data) {
  let historicalQueries = {};
  let consolidatedQueries = [];
  data.querys.forEach(function(query){
    if(query.identifier === 'not historical' || !query.identifier){
      query.createdAt = moment(query.createdAt).format('LLLL');
      consolidatedQueries.push(query);
    }else {
      let currentQueryIdentifier = query.identifier;
      if(currentQueryIdentifier in historicalQueries){
        historicalQueries[currentQueryIdentifier].push(query);
      }else{
        historicalQueries[currentQueryIdentifier] = [query];
      }
    }
  });
  for(var key in historicalQueries) {
    consolidatedQueries.push(historicalQueries[key]);
  }
  return consolidatedQueries;
}

module.exports = consolidateQueries;
