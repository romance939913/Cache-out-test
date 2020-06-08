import {
    fetchRealTimePrice,
    fetchProfile,
    fetchFinancials,
    fetchStocks,
    fetchAdvancedStats } from "../util/securities_api_util";

export const RECEIVE_FINANCIALS = "RECEIVE_FINANCIALS";    
export const RECEIVE_ADVANCED_STATS = "RECEIVE_ADVANCED_STATS";    
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_REALTIME = "RECEIVE_REALTIME";
export const CLEAR_REALTIME = "CLEAR_REALTIME";

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
});

const receiveTheFinancials = (financials) => ({
    type: RECEIVE_FINANCIALS,
    financials
})

const receiveTheAdvancedStats = (stats) => ({
    type: RECEIVE_ADVANCED_STATS,
    stats
})

const receiveTheProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});

const receiveTheRealTimePrice = (price, symbol) => ({
    type: RECEIVE_REALTIME,
    price,
    symbol
});

const clearTheRealTimePrice = () => ({
    type: CLEAR_REALTIME
});

export const receiveStocks = () => dispatch => fetchStocks()
    .then(stocks => dispatch(receiveTheStocks(stocks)));

export const receiveProfile = (company) => dispatch => fetchProfile(company)
    .then(profile => dispatch(receiveTheProfile(profile)));

export const receiveRealTimePrice = (company) => dispatch => fetchRealTimePrice(company)
    .then(price => dispatch(receiveTheRealTimePrice(price, company)));

export const receiveFinancials = (ticker) => dispatch => fetchFinancials(ticker)
    .then(financials => dispatch(receiveTheFinancials(financials)))

export const receiveAdvancedStats = (ticker) => dispatch => fetchAdvancedStats(ticker)
    .then(stats => dispatch(receiveTheAdvancedStats(stats)))

export const clearRealTimePrice = () => dispatch(clearTheRealTimePrice())
    