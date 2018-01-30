import './App.css'

import React, {Component} from 'react'
import tgacPathways from './data/tgac'

var xenaQuery = require('ucsc-xena-client/dist/xenaQuery');
var Rx = require('ucsc-xena-client/dist/rx');

// var Rx = require('rx');
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
//     'ABCA13', 'ABCB5'
];

// var geneList = [
// ];

var dataSetIdDemo = 'TCGA.OV.sampleMap/mutation_wustl';
var dataSetCohortDemo = 'TCGA Ovarian Cancer (OV)';
// var cohortList = [];

var {allCohorts, cohortSamples, fetchCohortPreferred, sparseData} = xenaQuery;

// call fetchCohortPreferred onPageLoad, call the rest when selecting cohorts


// to get the expression, we make a call using dataset, gene(s), samples
// queries are in jq/queries/XXX.xq


// cohortSamples('https://tcga.xenahubs.net')
//     .subscribe(resp => console.log(resp));

// var selectedCohort;
// var options = [];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCohort: {},
            cohortList: [],
            options: []
        };
    }

    onLoadData() {
        // alert('loading daata')
        this.fetchCohortData()
    }

    fetchCohortData() {
        // var options = [];
        console.log("fetching cohort data");
        // cohortList = allCohorts('https://tcga.xenahubs.net');
        var options = [] ;

        var cohortList = allCohorts('https://tcga.xenahubs.net').flatMap((cohort) => {
            // console.log(cohort)
            // this.state.options.push(<option>cohort</option>);
            return cohort;
        })
        .subscribe(resp => {
            // console.log(resp)
            options.push(<option value={resp}>{resp}</option>);
            // console.log(this.state.options)
        }) ;

        this.setState({
            options: options,
            cohortList: cohortList
        });
        // console.log('returning cohortList: '+cohortList);
        // console.log(cohortList);
        // console.log('returning options: '+options);
        // console.log(options);
        // this.setState({cohortList:this.state.cohortList});
    }

    componentWillMount() {
        // this.fetchCohortData();

    }

    componentDidMount() {
        this.fetchCohortData();
        var loadCount = 0 ;
        allCohorts('https://tcga.xenahubs.net')
            .flatMap((cohorts) => {
                // cohortList = cohorts;
                console.log('first cohort: ' + cohorts[0] + ' vs ' + dataSetCohortDemo);
                // return cohortSamples('https://tcga.xenahubs.net', cohorts[0], null)
                return cohortSamples('https://tcga.xenahubs.net', dataSetCohortDemo, null)
            })
            .flatMap((sampleList) => {
                console.log('sample list size: ' + sampleList.length);
                return Rx.Observable.zipArray(
                    geneList.map(gene => {
                        // console.log('map calling gene: ' + gene);
                        // options += '<option>abcd</option>';
                        return sparseData('https://tcga.xenahubs.net', dataSetIdDemo, sampleList, gene)
                    })
                );
            })
            .subscribe(resp =>
                document.getElementById("output").innerHTML= JSON.stringify(resp)
                // console.log(resp)
            );

    }

    render() {
        // options += '<option>xxxx</option>';
        // var options = this.state.cohortList.map(cohort => {
        //     // console.log('handingl chort: '+cohort);
        //     // return '<option>'+cohort+'</option>';
        // });
        // this.state.cohortList.forEach(value => {
        //     console.log(value);
        //     this.state.options.push(<option>value</option>);
        // });
        // options.push(<option>XXXX</option>);
        console.log('options:')
        console.log(this.state.options);
        console.log(this.state.cohortList);
        return <div className="App">
            <div className="App-instructions App-flex">
                XenaTest
                <select onChange={this.onLoadData} value={this.state.selectedCohort}>
                    {this.state.options}
                    {/*<option>DDDD</option>*/}
                </select>
                {/*<select multiple={true} value={['B', 'C']}>*/}
                {/*{this.tgacPathways}*/}
                {/*</select>*/}
                {/*<img className="App-logo" src={require('./react.svg')}/>*/}
                {/*<p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>*/}
            </div>
        </div>
    }
}


export default App
