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
    // 'ABCA13', 'ABCB5', 'ACTB', 'ADCYAP1R1', 'AEBP1', 'AHR', 'AKR1B1', 'AP4M1', 'AQP1', 'ARHGEF5', 'ASL', 'BBS9', 'BCL7B', 'BZW2', 'C7orf31', 'C7orf36', 'C7orf43', 'C7orf51', 'CBLL1', 'CCDC129', 'CD36', 'CDC14C', 'CDC2L5', 'CHCHD2', 'CHN2', 'CLIP2', 'COL1A2', 'COL28A1', 'CYP2W1', 'CYTH3', 'DBF4', 'DGKB', 'DKFZp564N2472', 'DNAH11', 'ECOP', 'EIF3B', 'EIF3S9', 'ENSG00000179994', 'ENSG00000197320', 'EPDR1', 'ETV1', 'FAM126A', 'FBXO24', 'GCK', 'GHRHR', 'GLI3', 'GPER', 'GPNMB', 'GPR85', 'GTF2IRD2B', 'GUSB', 'HECW1', 'HOXA1', 'HOXA13', 'HOXA2', 'IGFBP1', 'INHBA', 'IRF5', 'LAMB1', 'LANCL2', 'LOC100131675', 'LOC100131859', 'LOC100133120', 'LOC100134747', 'LOC346329', 'LOC389465', 'LOC402509', 'LOC441228', 'LOC442572', 'LOC442668', 'LOC641765', 'LOC641922', 'LRWD1', 'MACC1', 'MAD1L1', 'MGC72080', 'MTERF', 'MUC17', 'NFE2L3', 'NPSR1', 'OSBPL3', 'PAPOLB', 'PDE1C', 'PHF14', 'PMS2', 'PMS2CL', 'PMS2L5', 'PON3', 'PRKAR1B', 'RAPGEF5', 'RELN', 'RINT1', 'RSPH10B', 'SCIN', 'SDK1', 'SEMA3A', 'SEMA3C', 'SEMA3D', 'SEPT14', 'SKAP2', 'SLC13A1', 'SLC29A4', 'STAG3', 'STEAP1', 'STK31', 'TBRG4', 'TMEM130', 'TMEM184A', 'TMEM196', 'TNPO3', 'VSTM2A', 'ZMIZ2', 'ZNF12', 'ZNF138', 'uc003vzh.2'
//     'ABCA13', 'ABCB5'
    '1433G', '34CC1', 'ABL1', 'ABRAXAS1', 'ACKR3', 'ACTL6A', 'ACVR1', 'ACVR1B', 'ACVRL1', 'ADAM10', 'ADAM17', 'ADAM9', 'ADAMTSL2', 'AEN', 'AES', 'AFAF', 'AGT', 'AGTR2', 'AKAP8', 'AKR1C3', 'AKT1', 'AKT2', 'AKT3', 'ALDH3B1', 'ALK', 'ALKBH2', 'ALKBH3', 'ANKRD1', 'ANKRD2', 'ANKZF1', 'APC', 'APEX1', 'APEX2', 'APLF', 'APOA1', 'APOA4', 'APTX', 'AQP1', 'AR', 'ARF1', 'ARHGAP35', 'ARHGEF2', 'ARL6IP5', 'ARNT', 'ARRB1', 'ARRB2', 'ASH1L', 'ASH2L', 'ASPN', 'ATF2', 'ATF3', 'ATF4', 'ATM', 'ATP13A2', 'ATP2A1', 'ATR', 'ATRIP', 'ATRX', 'ATXN7', 'ATXN7L3', 'AUTS2', 'AXIN1', 'BABAM1', 'BABAM2', 'BAD', 'BAG3', 'BAG5', 'BAG6', 'BAMBI', 'BAP1', 'BAX', 'BAZ1B', 'BCAP31', 'BCL10', 'BCL2', 'BCL2L1', 'BCL2L11', 'BCL3', 'BCL9', 'BCL9L', 'BCLAF1', 'BCOR', 'BEND3', 'BFD1', 'BID', 'BIRC6', 'BLM', 'BLOC1S2', 'BNIP3', 'BOK', 'BOP1', 'BRAF', 'BRCA1', 'BRCA2', 'BRCC3', 'BRD7', 'BRD8', 'BRF2', 'BRIP1', 'BRPF1', 'BRSK1', 'BRSK2', 'BTBD12', 'BTK', 'BUB1', 'BUB1B', 'BUB3', 'CADH1', 'CAMK1', 'CARM1', 'CASP2', 'CASP4', 'CASP8', 'CASP8AP2', 'CASP9', 'CAV1', 'CC14A', 'CC14B', 'CCAR2', 'CCNA1', 'CCNA2', 'CCNB1', 'CCNB2', 'CCNB3', 'CCND1', 'CCND2', 'CCND3', 'CCNE1', 'CCNE2', 'CCNH', 'CD109', 'CD27', 'CD2A2', 'CD44', 'CD70', 'CD74', 'CDC14B', 'CDC45', 'CDC5L', 'CDC6', 'CDC7', 'CDH5', 'CDIP1', 'CDK1', 'CDK2', 'CDK4', 'CDK5RAP3', 'CDK6', 'CDK7', 'CDK9', 'CDKN1A', 'CDKN1C', 'CDKN2B', 'CDKN2D', 'CDN1A', 'CDN1B', 'CETN2', 'CFLAR', 'CHAC1', 'CHAF1A', 'CHD5', 'CHD6', 'CHEK1', 'CHEK2', 'CHK1', 'CHK2', 'CHTOP', 'CHUK', 'CITED1', 'CLDN5', 'CLK2', 'CLOCK', 'CLSPN', 'CLU', 'CNKSR1', 'CNKSR2', 'COL1A2', 'COL3A1', 'COPRS', 'CRADD', 'CREB3', 'CREBBP', 'CRIP1', 'CRYGD', 'CSF2', 'CSNK1A1', 'CSNK1D', 'CSNK1G1', 'CSNK2A1', 'CTBP1', 'CTBP2', 'CTCFL', 'CTNNB1', 'CTNNBIP1', 'CTR9', 'CUL4B', 'CXCL12', 'CXXC1', 'CXXC4', 'CYLD', 'CYTH2', 'DAB2', 'DAB2IP', 'DAPK1', 'DAPK2', 'DBF4A', 'DCAF1', 'DCLRE1A', 'DCLRE1B', 'DCLRE1C', 'DDB1', 'DDB2', 'DDIAS', 'DDIT3', 'DDX39B', 'DDX3X', 'DDX47', 'DDX5', 'DEDD2', 'DEPTOR', 'DHRS2', 'DIXDC1', 'DKK1', 'DLL1', 'DMAP1', 'DMC1', 'DNAJA1', 'DNAJC10', 'DNM1L', 'DNMT1', 'DNMT3B', 'DONSON', 'DOT1L', 'DPY30', 'DTL', 'DTX1', 'DTX3L', 'DUSP1', 'DUSP2', 'DUSP3', 'DUSP4', 'DUSP5', 'DUSP6', 'DUT', 'DVL1', 'DVL2', 'DYRK2', 'E2F1', 'E2F2', 'E2F3', 'E2F4', 'E2F5', 'E2F6', 'E2F7', 'E4CC6', 'ECT2', 'EED', 'EGFR', 'EHMT1', 'EHMT2', 'EID2', 'EIF2AK3', 'EIF4EBP1', 'EIF4EBP2', 'EIF4EBP3', 'ELK4', 'ELP3', 'ELP4', 'EME1', 'EME2', 'ENDOV', 'ENG', 'ENO1', 'ENY2', 'EP000', 'EP300', 'EP400', 'EPC1', 'EPHA2', 'EPO', 'ERBB2', 'ERBB3', 'ERCC2', 'ERCC3', 'ERCC4', 'ERCC5', 'ERCC6L2', 'ERCC8', 'ESF1', 'ESPL1', 'ETAA1', 'ETS1', 'ETS2', 'ETV5', 'EXO1', 'EXOC1', 'EXOC2', 'EXOC3', 'EXOC4', 'EXOC5', 'EXOC6', 'EXOC7', 'EXOC8', 'EYA1', 'EYA2', 'EYA3', 'EZH2', 'FAAP20', 'FAAP24', 'FABP1', 'FADD', 'FAIM2', 'FAN1', 'FANCA', 'FANCB', 'FANCC', 'FANCD2', 'FANCE', 'FANCF', 'FANCG', 'FANCI', 'FANCL', 'FANCM', 'FAS', 'FASLG', 'FBL', 'FBXO18', 'FBXO31', 'FBXW7', 'FEM1B', 'FEN1', 'FERMT2', 'FGA', 'FGB', 'FGFR1', 'FGFR2', 'FGFR3', 'FGFR4', 'FGG', 'FHIT', 'FIS1', 'FLCN', 'FLT3', 'FMR1', 'FNTA', 'FNTB', 'FOS', 'FOXM1', 'FOXN3', 'FOXP3', 'FRAT1', 'FSHB', 'FXN', 'FZD1', 'FZD2', 'FZD3', 'FZD4', 'FZD5', 'FZD6', 'FZD7', 'FZD8', 'FZR1', 'G0S2', 'G6PD', 'GA45A', 'GABARAP', 'GATA1', 'GBA', 'GCNT2', 'GDNF', 'GEN1', 'GFB2', 'GIYD1', 'GIYD2', 'GPX1', 'GRB10', 'GRB2', 'GSDME', 'GSK3A', 'GSK3B', 'GSKIP', 'GSTP1', 'GTF2H1', 'GTF2H2', 'GTF2H3', 'GTF2H5', 'H2AFX', 'H2AFY', 'HASPIN', 'HAT1', 'HCFC1', 'HDAC1', 'HDAC10', 'HDAC11', 'HDAC2', 'HDAC3', 'HDAC4', 'HDAC5', 'HDAC6', 'HDAC7', 'HDAC8', 'HELQ', 'HERPUD1', 'HEXIM1', 'HIC1', 'HIF1A', 'HINFP', 'HINT1', 'HIPK1', 'HIPK2', 'HLCS', 'HLTF', 'HMGA2', 'HMOX1', 'HPGD', 'HSP90AB1', 'HSPA1A', 'HSPA1B', 'HSPB1', 'HTF2H4', 'HTRA2', 'HTT', 'HUS1', 'HUWE1', 'HYOU1', 'ICAM1', 'ICMT', 'IFI16', 'IFI6', 'IFNG', 'IGF1', 'IKBKE', 'IL12A', 'IL17F', 'IL1B', 'IL6', 'ILK', 'ING2', 'ING3', 'ING4', 'ING5', 'INHBA', 'INSR', 'INSRR', 'INTS7', 'IRS1', 'IRS2', 'ITGA3', 'ITGA6', 'ITGAV', 'ITGB5', 'IWS1', 'JADE1', 'JADE2', 'JADE3', 'JAG1', 'JAG2', 'JAK2', 'JUN', 'KANSL1', 'KANSL2', 'KANSL3', 'KAT14', 'KAT2A', 'KAT2B', 'KAT5', 'KAT6A', 'KAT6B', 'KAT7', 'KAT8', 'KDM1A', 'KDM1B', 'KDM2A', 'KDM2B', 'KDM3A', 'KDM4A', 'KDM4B', 'KDM4D', 'KDM5A', 'KDM5B', 'KDM5C', 'KDM5D', 'KDM6B', 'KDM7A', 'KDM8', 'KIAAO141', 'KMT2A', 'KMT2B', 'KMT2C', 'KMT5A', 'KMT5B', 'KRAS', 'KSR1', 'KSR2', 'LATS2', 'LCK', 'LDLRAD4', 'LEF1', 'LEMD3', 'LEO1', 'LGALS12', 'LGALS3', 'LIF', 'LIG1', 'LIG3', 'LIG4', 'LRP5', 'LRP6', 'LRRK2', 'LTBR', 'MAD2L2', 'MADD', 'MAGEA2', 'MAGEA3', 'MAP2K1', 'MAP2K2', 'MAP3K20', 'MAP3K5', 'MAP3K7', 'MAPK1', 'MAPK3', 'MAPK7', 'MAPK8', 'MAPK9', 'MBD4', 'MBIP', 'MCL1', 'MCM10', 'MCM2', 'MCM3', 'MCM4', 'MCM5', 'MCM6', 'MCM7', 'MCM8', 'MCM9', 'MCRS1', 'MD1L1', 'MD2L1', 'MD2L2', 'MDC1', 'MDM2', 'MDM4', 'MEN1', 'MET', 'MGMT', 'MGST1', 'MIER1', 'MIER2', 'MIF', 'MLH1', 'MLH3', 'MLLT11', 'MLST8', 'MMP9', 'MMS19', 'MNAT1', 'MOAP1', 'MOB1A', 'MOB1B', 'MORF4L1', 'MPAK7', 'MPEG1', 'MPG', 'MPIP1', 'MPIP2', 'MPIP3', 'MRAS', 'MRE11A', 'MRNIP', 'MSH2', 'MSH3', 'MSH4', 'MSH5', 'MSH6', 'MSL1', 'MSL2', 'MSL3', 'MST1', 'MSX1', 'MT3', 'MTCP1', 'MTOR', 'MUC1', 'MUS81', 'MUTYH', 'MYB', 'MYBBP1A', 'MYO6', 'MYSM1', 'NAA40', 'NAA50', 'NAA60', 'NACC2', 'NBN', 'NCF1', 'NCK1', 'NCOA3', 'NDRG1', 'NDUFA13', 'NDUFS3', 'NEIL1', 'NEIL2', 'NEIL3', 'NEK11', 'NER-related', 'NET1', 'NF1', 'NFE2L2', 'NFKB1', 'NGF', 'NHEJ1', 'NIPBL', 'NKD1', 'NKX2-1', 'NKX3-1', 'NLK', 'NOC2L', 'NOL3', 'NONO', 'NOP2', 'NOP53', 'NOS3', 'NR1H4', 'NRAS', 'NSD1', 'NSD3', 'NTHL1', 'NTMT1', 'NUDT1', 'OBFC2B', 'OGG1', 'OGT', 'OPA1', 'ORC1', 'ORC2', 'ORC3', 'ORC4', 'ORC5', 'ORC6', 'OTUB1', 'P4HB', 'P53', 'PADI2', 'PAF1', 'PAK1', 'PAK1IP1', 'PAK2', 'PAK3', 'PAK4', 'PALB2', 'PARK7', 'PARP1', 'PARP2', 'PARP3', 'PAXIP1', 'PBLD', 'PCGF6', 'PCNA', 'PDCD10', 'PDGFRA', 'PDGFRB', 'PDK1', 'PDK2', 'PDPK1', 'PEA15', 'PEBP1', 'PEG10', 'PELI3', 'PER1', 'PF4', 'PHC1', 'PHF1', 'PHF19', 'PHF2', 'PHF20', 'PHF8', 'PHIP', 'PHLDA3', 'PIC3R5', 'PICI3CB', 'PIDD1', 'PIH1D1', 'PIK3CA', 'PIK3CD', 'PIK3CG', 'PIK3R1', 'PIK3R2', 'PIK3R3', 'PIK3R4', 'PIK3R6', 'PIN1', 'PINK1', 'PKN1', 'PLA2R1', 'PLAUR', 'PLEKHA1', 'PLK1', 'PLXNB1', 'PMAIP1', 'PMEPA1', 'PML', 'PMS1', 'PMS2', 'PMS2L3', 'PMYT1', 'PNKP', 'PNPT1', 'POLB', 'POLD1', 'POLE', 'POLE3', 'POLE4', 'POLG', 'POLH', 'POLI', 'POLK', 'POLL', 'POLM', 'POLN', 'POLQ', 'PORCN', 'PPIF', 'PPM1A', 'PPM1F', 'PPP1CA', 'PPP1R13B', 'PPP2CA', 'PPP2R1A', 'PPP2R1B', 'PRDM12', 'PRDM16', 'PRDM5', 'PRDX2', 'PRDX3', 'PRDX5', 'PREX2', 'PRKAA1', 'PRKAA2', 'PRKAB1', 'PRKAB2', 'PRKAG1', 'PRKAG2', 'PRKAG3', 'PRKCA', 'PRKCB', 'PRKCD', 'PRKCZ', 'PRKD1', 'PRKDC', 'PRKN', 'PRMT1', 'PRMT2', 'PRMT6', 'PRMT7', 'PRMT8', 'PRPF19', 'PRR5L', 'PSEN1', 'PSEN2', 'PSENEN', 'PSMD10', 'PSME3', 'PTEN', 'PTK2', 'PTPRK', 'PTTG1', 'PTTG1IP', 'PTTG2', 'PTTG3', 'PXN', 'PYCARD', 'PYCR1', 'PYCR2', 'PYGO1', 'PYHIN1', 'PYROXD1', 'RAC1', 'RAC2', 'RAC3', 'RACK1', 'RAD1', 'RAD17', 'RAD18', 'RAD23A', 'RAD23B', 'RAD50', 'RAD51', 'RAD51B', 'RAD51C', 'RAD51D', 'RAD52', 'RAD54B', 'RAD54L', 'RAD9A', 'RAF1', 'RALA', 'RALB', 'RALBP1', 'RALGDS', 'RAPGEF1', 'RAPGEF2', 'RAPGEF3', 'RASA1', 'RASA2', 'RASA3', 'RASAL1', 'RASAL2', 'RASAL3', 'RASGRF1', 'RASGRF2', 'RASGRP1', 'RASGRP2', 'RASGRP3', 'RASGRP4', 'RASSF1', 'RASSF10', 'RASSF2', 'RASSF3', 'RASSF4', 'RASSF5', 'RASSF6', 'RASSF7', 'RASSF8', 'RASSF9', 'RB', 'RB1', 'RBBP5', 'RBBP8', 'RBL1', 'RBM11', 'RBM14', 'RCE1', 'RCOR1', 'RDM1', 'RECQL', 'RECQL4', 'RECQL5', 'RELA', 'REST', 'REV1L', 'REV3L', 'RFFL', 'RFWD3', 'RHEB', 'RHNO1', 'RHOA', 'RHOB', 'RHOC', 'RIF1', 'RING1', 'RIPK1', 'RNF168', 'RNF2', 'RNF20', 'RNF34', 'RNF4', 'RNF40', 'RNF41', 'RNF8', 'ROCK1', 'ROCK2', 'ROMO1', 'ROS1', 'RPA1', 'RPA2', 'RPA3', 'RPA4', 'RPF2', 'RPL11', 'RPL23', 'RPL26', 'RPL5', 'RPS27L', 'RPS3', 'RPS6KA1', 'RPS6KA2', 'RPS6KA3', 'RPS6KA4', 'RPS6KA5', 'RPS6KA6', 'RPS6KB1', 'RPS6KB2', 'RPS7', 'RPTOR', 'RRM2B', 'RRP8', 'RRS1', 'RUVBL1', 'RUVBL2', 'RYBP', 'S100A8', 'S1OOAO', 'SART3', 'SAV1', 'SCF', 'SCG2', 'SCRIB', 'SDCBP', 'SELENOK', 'SELENOS', 'SENP2', 'SEPT4', 'SERPINE1', 'SESN2', 'SETD1A', 'SETD1B', 'SETD2', 'SETD6', 'SETD7', 'SETDB2', 'SETMAR', 'SETX', 'SFN', 'SFPQ', 'SFRP1', 'SFRP4', 'SH3RF1', 'SHC1', 'SHC2', 'SHC3', 'SHC4', 'SHFM1', 'SHOC2', 'SHPRH', 'SIAH1', 'SIAH2', 'SIN3A', 'SIRT1', 'SIRT6', 'SIVA1', 'SKI', 'SKOR2', 'SKP2', 'SKR16C5', 'SLC25A24', 'SLC9A3R1', 'SMAD2', 'SMAD3', 'SMAD4', 'SMAD6', 'SMAD7', 'SMARCAD1', 'SMARCB1', 'SMC1A', 'SMUG1', 'SMURF1', 'SMURF2', 'SMYD2', 'SMYD3', 'SNAI1', 'SNAI2', 'SNCA', 'SNW1', 'SNX25', 'SNX6', 'SOD1', 'SOD2', 'SORT1', 'SOS1', 'SOS2', 'SOX11', 'SOX17', 'SOX4', 'SP100', 'SPI1', 'SPO11', 'SPRED1', 'SPRED2', 'SPRED3', 'SPRTN', 'SPRY1', 'SPRY2', 'SPRY3', 'SPRY4', 'SRC', 'STK11', 'STK24', 'STK25', 'STK3', 'STK4', 'STRAP', 'STUB1', 'STX4', 'SUDS3', 'SUPT3H', 'SUPT6H', 'SUPT7L', 'SUV39H1', 'SUV39H2', 'SUZ12', 'SYVN1', 'TADA1', 'TADA2A', 'TADA3', 'TAF1', 'TAF12', 'TAF5', 'TAF5L', 'TAF6L', 'TAF7', 'TAF9', 'TAOK1', 'TAOK2', 'TAOK3', 'TAZ', 'TBK1', 'TCF7', 'TCF7L1', 'TCL1A', 'TDG', 'TDP1', 'TDP2', 'TERT', 'TET1', 'TET2', 'TET3', 'TFAP4', 'TFDP1', 'TFDP2', 'TFIIH', 'TGFB1', 'TGFB1I1', 'TGFB2', 'TGFB3', 'TGFBR1', 'TGFBR2', 'TGFBR3', 'THBS1', 'THOC1', 'THOC5', 'TIAM1', 'TIAM2', 'TIMP3', 'TIPIN', 'TIPRL', 'TLR3', 'TMBIM1', 'TMBIM6', 'TMC8', 'TMEM117', 'TMEM161A', 'TNF', 'TNFAIP3', 'TNFRSF10A', 'TNFRSF10B', 'TNFRSF12A', 'TNFSF10', 'TNFSF12', 'TOPBP1', 'TOPORS', 'TP53', 'TP53BP1', 'TP53BP2', 'TP73', 'TPM1', 'TPT1', 'TRADD', 'TRAF1', 'TRAF2', 'TREX1', 'TREX2', 'TRIAP1', 'TRIB3', 'TRIM16', 'TRIM32', 'TRIM33', 'TRIP12', 'TRPM2', 'TRRAP', 'TSC1', 'TSC2', 'TTDN1', 'TWIST1', 'TWSG1', 'TXNDC12', 'UBB', 'UBE2A', 'UBE2B', 'UBE2E1', 'UBE2F', 'UBE2N', 'UBE2V2', 'UBQLN1', 'UBR5', 'UHRF1', 'UIMC1', 'UNC5B', 'UNG', 'URI1', 'URS0000065D58_9606', 'URS00002C6949_9606', 'URS0000324096_9606', 'URS000039ED8D_9606', 'URS00003D1AE3_9606', 'USP10', 'USP15', 'USP16', 'USP22', 'USP28', 'USP3', 'USP49', 'USP51', 'USP9X', 'UVSSA', 'VASN', 'VAV1', 'VKORC1L1', 'VRK2', 'WAC', 'WBP2', 'WDR5', 'WDR61', 'WEE1', 'WFIKKN1', 'WFIKKN2', 'WIF1', 'WNT1', 'WNT10A', 'WNT16', 'WNT2', 'WNT2B', 'WNT3', 'WNT3A', 'WNT4', 'WNT6', 'WNT7A', 'WNT7B', 'WNT8A', 'WRN', 'WWTR1', 'XAB2', 'XBP1', 'XPA', 'XPC', 'XRCC1', 'XRCC2', 'XRCC3', 'XRCC4', 'XRCC5', 'XRCC6', 'YAP1', 'YBX3', 'YEATS4', 'YWHAB', 'YWHAE', 'YWHAG', 'YWHAH', 'YWHAQ', 'YWHAZ', 'ZFYVE9', 'ZMYND11', 'ZNF274', 'ZNF304', 'ZNF335', 'ZNF385A', 'ZNF385B', 'ZNF451', 'ZNF580', 'ZNF622', 'ZNF703', 'ZYX', 'saga_human'
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
                // console.log(sampleList)
                document.getElementById("samples").innerHTML= JSON.stringify(sampleList)
                return sparseData('https://tcga.xenahubs.net', dataSetIdDemo, sampleList, geneList)
            })
            .subscribe(resp =>{
                console.log('resp')
                console.log(resp)
                    document.getElementById("output").innerHTML= JSON.stringify(resp)
                    // console.log(resp)
            } );

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
