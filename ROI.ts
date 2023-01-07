import { RoiParams, RoiRes } from "./constants";

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const getDaysInYear = (year) => ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;

const COMPOUND_STRATAGIES = {
    MONTHLY: getDaysInYear,
    YEARLY: getDaysInMonth,
    WEEKLY: ()=>7,
    DAILY: ()=>1,
};

const getDateAfterSomeDays = (initialDate, days) => new Date(initialDate.getTime() + days*24*60*60*1000);

export const getRoiValueAfterCompounding = async (params:RoiParams): Promise<RoiRes> => {
    const {initialCapitalValue, periodicInvestmentValue, timeForCompounding, rateForCompounding, periodForCompounding} = params;
    const startingDate = new Date();
    let lastRecordedDate = startingDate;
    let currentInvestmentValue = initialCapitalValue;
    let totalInvestmentValueAfterCompounding:number = 0;
    const investmentValueAfterEachPeriod: Array<{date:string, value:number}> = [];
    for(let count = 0; count < timeForCompounding; count++){
        let newInvestmentValue = currentInvestmentValue*(rateForCompounding/100) + periodicInvestmentValue;
        currentInvestmentValue = newInvestmentValue;
        const year = lastRecordedDate.getFullYear();
        const month = lastRecordedDate.getMonth()+1;
        lastRecordedDate = getDateAfterSomeDays(lastRecordedDate, COMPOUND_STRATAGIES[periodForCompounding](year, month));
        investmentValueAfterEachPeriod.push({
            date: lastRecordedDate.toString(),
            value: currentInvestmentValue
        });
    }
    totalInvestmentValueAfterCompounding = currentInvestmentValue
    return {
        totalInvestmentValueAfterCompounding,
        investmentValueAfterEachPeriod,
    };
}