export interface ICoinProps{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

export function getCoins(){
    return fetch("https://api.coinpaprika.com/v1/coins").then(response=>response.json());
}

export function getCoinInfo(coinId:string){
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(response=>response.json());
}

export function getCoinTicker(coinId:string){
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(response=>response.json());
}