import './App.css'

import React, {Component} from 'react'
import tgacPathways from './data/tgac'

var xenaQuery = require('ucsc-xena-client/dist/xenaQuery');
var Rx = require('ucsc-xena-client/dist/rx');
// var Rx = require('rx');


class App extends Component {
    render() {
        return <div className="App">
            <div className="App-instructions App-flex">
                XenaTest
                {/*<select multiple={true} value={['B', 'C']}>*/}
                {/*{this.tgacPathways}*/}
                {/*</select>*/}
                {/*<img className="App-logo" src={require('./react.svg')}/>*/}
                {/*<p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>*/}
            </div>
        </div>
    }
}

console.log('query results:');
console.log(xenaQuery);
console.log('tgac pathways:');
console.log(tgacPathways);

// hard-coded data-set, preferred for first cohort
// Here is the ID: TCGA.OV.sampleMap/mutation_wustl

// can get default mutation dataset from some JSON file, etc.

// otherwies use fetch-Cohort-preferred

var geneList = [
'RB1','CALN1'
];

var dataSetIdDemo = 'TCGA.OV.sampleMap/mutation_wustl';
var dataSetCohortDemo = 'TCGA%20Ovarian%20Cancer%20(OV)';

var {allCohorts, cohortSamples, fetchCohortPreferred, sparseData} = xenaQuery;

// call fetchCohortPreferred onPageLoad, call the rest when selecting cohorts


allCohorts('https://tcga.xenahubs.net')
    .flatMap((cohorts) => {
        console.log('first cohort: '+ cohorts[0] + ' vs '+ dataSetCohortDemo);
        return cohortSamples('https://tcga.xenahubs.net', dataSetCohortDemo, null)
    })
    .flatMap((sampleList) => {
        return Rx.Observable.zipArray(
            geneList.map(gene => {
                return sparseData('https://tcga.xenahubs.net', dataSetIdDemo, sampleList,gene)
            })
        );
    })
    .subscribe(resp => console.log(resp));

// to get the expression, we make a call using dataset, gene(s), samples
// queries are in jq/queries/XXX.xq


// cohortSamples('https://tcga.xenahubs.net')
//     .subscribe(resp => console.log(resp));

export default App
