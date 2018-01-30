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
    'ABCA13', 'ABCB5', 'ACTB', 'ADCYAP1R1', 'AEBP1', 'AHR', 'AKR1B1', 'AP4M1', 'AQP1', 'ARHGEF5', 'ASL', 'BBS9', 'BCL7B', 'BZW2', 'C7orf31', 'C7orf36', 'C7orf43', 'C7orf51', 'CBLL1', 'CCDC129', 'CD36', 'CDC14C', 'CDC2L5', 'CHCHD2', 'CHN2', 'CLIP2', 'COL1A2', 'COL28A1', 'CYP2W1', 'CYTH3', 'DBF4', 'DGKB', 'DKFZp564N2472', 'DNAH11', 'ECOP', 'EIF3B', 'EIF3S9', 'ENSG00000179994', 'ENSG00000197320', 'EPDR1', 'ETV1', 'FAM126A', 'FBXO24', 'GCK', 'GHRHR', 'GLI3', 'GPER', 'GPNMB', 'GPR85', 'GTF2IRD2B', 'GUSB', 'HECW1', 'HOXA1', 'HOXA13', 'HOXA2', 'IGFBP1', 'INHBA', 'IRF5', 'LAMB1', 'LANCL2', 'LOC100131675', 'LOC100131859', 'LOC100133120', 'LOC100134747', 'LOC346329', 'LOC389465', 'LOC402509', 'LOC441228', 'LOC442572', 'LOC442668', 'LOC641765', 'LOC641922', 'LRWD1', 'MACC1', 'MAD1L1', 'MGC72080', 'MTERF', 'MUC17', 'NFE2L3', 'NPSR1', 'OSBPL3', 'PAPOLB', 'PDE1C', 'PHF14', 'PMS2', 'PMS2CL', 'PMS2L5', 'PON3', 'PRKAR1B', 'RAPGEF5', 'RELN', 'RINT1', 'RSPH10B', 'SCIN', 'SDK1', 'SEMA3A', 'SEMA3C', 'SEMA3D', 'SEPT14', 'SKAP2', 'SLC13A1', 'SLC29A4', 'STAG3', 'STEAP1', 'STK31', 'TBRG4', 'TMEM130', 'TMEM184A', 'TMEM196', 'TNPO3', 'VSTM2A', 'ZMIZ2', 'ZNF12', 'ZNF138', 'uc003vzh.2'
];

var dataSetIdDemo = 'TCGA.OV.sampleMap/mutation_wustl';
var dataSetCohortDemo = 'TCGA%20Ovarian%20Cancer%20(OV)';

var {allCohorts, cohortSamples, fetchCohortPreferred, sparseData} = xenaQuery;

// call fetchCohortPreferred onPageLoad, call the rest when selecting cohorts


allCohorts('https://tcga.xenahubs.net')
    .flatMap((cohorts) => {
        console.log('first cohort: ' + cohorts[0] + ' vs ' + dataSetCohortDemo);
        return cohortSamples('https://tcga.xenahubs.net', dataSetCohortDemo, null)
    })
    .flatMap((sampleList) => {
        return Rx.Observable.zipArray(
            geneList.map(gene => {
                return sparseData('https://tcga.xenahubs.net', dataSetIdDemo, sampleList, gene)
            })
        );
    })
    .subscribe(resp => console.log(resp));

// to get the expression, we make a call using dataset, gene(s), samples
// queries are in jq/queries/XXX.xq


// cohortSamples('https://tcga.xenahubs.net')
//     .subscribe(resp => console.log(resp));

export default App
