export type RoiParams = {
    initialCapitalValue: number;
    periodicInvestmentValue: number; 
    timeForCompounding: number;
    rateForCompounding: number;
    periodForCompounding: string;
}

export type RoiRes = {
    totalInvestmentValueAfterCompounding: number;
    investmentValueAfterEachPeriod: Array<{date:string, value:number}>;
}