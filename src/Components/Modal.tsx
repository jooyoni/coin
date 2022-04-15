import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { getCoinInfo, getCoinTicker } from "../api";
import { useQuery } from "react-query";


const Container=styled(motion.div)`
    position:absolute;
    left:0;
    right:0;
    margin:0 auto;
    border:1px solid black;
    border-radius:30px;
    min-width:500px;
    max-width:800px;
    width:40%;
    height:600px;
    background:${props=>props.theme.bgColor};
    color:${props=>props.theme.color};
`;
const Title=styled.div`
    font-size:32px;
    font-weight:bold;
    text-align: center;
    padding:20px;
`;
const Info=styled.div`
    padding:10px 0;
    border-radius:10px;
    width:90%;
    margin:0 auto;
    display: flex;
    background-color:${props=>props.theme.secondBgColor};
    justify-content: space-around;
    & > div{
        width:25%;
        min-width:120px;
        display:flex;
        flex-direction:column;
        align-items: center;
        & > :last-child{
            font-size:20px;
        }
    }
`;
const SecondInfo=styled.div`

    padding:10px 0;
    border-radius:10px;
    width:90%;
    margin:20px auto;
    display: flex;
    background-color:${props=>props.theme.secondBgColor};
    justify-content: space-around;
    & > div{
        display:flex;
        flex-direction: column;
        align-items: center;
        width:130px;
        & > :last-child{
            font-size:20px;
        }
    }
`;
const Price=styled.div`
    display:flex;
    justify-content:space-around;
    background-color:${props=>props.theme.secondBgColor};
    width:90%;
    margin:0 auto;
    margin-bottom:20px;
    border-radius:10px;
    padding:13px 0;
    font-size:26px;
    font-weight:bold;
    & > :last-child > span{
        text-decoration: underline;
    }
`;
const PriceChange=styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    width:90%;
    margin:0 auto;
    border-radius: 10px;
    background-color:${props=>props.theme.secondBgColor};
    & > div{
        text-align: center;
        height:70px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        & > :last-child{
            font-size:20px;
        }
    }
`;
interface IModalProps{
    coinId:string;
}
interface ICoinInfoProps{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface ITickerProps{
    id:string;
    name:string;
    symbol:string;
    rank:number;
    circulating_supply:number;
    total_supply:number;
    max_supply:number;
    beta_value:number;
    first_data_at:string;
    last_updated:string;
    quotes:{
        USD:{            
            price:number;
            volume_24h:number;
            volume_24h_change_24h:number;
            market_cap:number;
            market_cap_change_24h:number;
            percent_change_15m:number;
            percent_change_30m:number;
            percent_change_1h:number;
            percent_change_6h:number;
            percent_change_12h:number;
            percent_change_24h:number;
            percent_change_7d:number;
            percent_change_30d:number;
            percent_change_1y:number;
            ath_price:number;
            ath_date:string;
            percent_from_price_ath:number;
        }
    };
}



function Modal({coinId}:IModalProps){
    const {scrollY}=useViewportScroll();
    const {data:coin, isLoading}=useQuery<ICoinInfoProps>(["info", coinId], ()=>getCoinInfo(coinId)) ;
    const {data:ticker, isLoading:tickerLoading}=useQuery<ITickerProps>(["ticker", coinId],()=>getCoinTicker(coinId));
    console.log(ticker);
    return (
        <Container style={{top:scrollY.get()+150}} transition={{type:"linear"}}  layoutId={coinId}>
            <Title>{coin?.name}</Title>
            <Info>
                <div><span>RANK:</span><span>{coin?.rank}</span></div>
                <div><span>SYMBOL:</span><span>{coin?.symbol}</span></div>
                <div><span>OPEN SOURCE:</span><span>{coin?.open_source?"YES":"NO"}</span></div>
            </Info>
            <SecondInfo>
                <div><span>TOTAL SUPLY:</span><span>{ticker?.total_supply}</span></div>
                <div><span>MAX SUPLY:</span><span>{ticker?.max_supply}</span></div>
            </SecondInfo>
            <Price>
                <div>price:</div>
                <div><span>{ticker?.quotes.USD.price.toFixed(4)}</span>$</div>
            </Price>
            <PriceChange>
                <div>
                    <div>percent_change_15m:</div>
                    <div>{ticker?.quotes.USD.percent_change_15m}%</div>
                </div>
                <div>
                    <div>percent_change_1h:</div>
                    <div>{ticker?.quotes.USD.percent_change_1h}%</div>
                </div>
                <div>
                    <div>percent_change_24h:</div>
                    <div>{ticker?.quotes.USD.percent_change_24h}%</div>
                </div>
                <div>
                    <div>percent_change_7d:</div>
                    <div>{ticker?.quotes.USD.percent_change_7d}%</div>
                </div>
                <div>
                    <div>percent_change_30d:</div>
                    <div>{ticker?.quotes.USD.percent_change_30d}%</div>
                </div>
                <div>
                    <div>percent_change_1y:</div>
                    <div>{ticker?.quotes.USD.percent_change_1y}%</div>
                </div>
            </PriceChange>
        </Container>
    );
}
export default Modal;