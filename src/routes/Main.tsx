import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, Navigate, Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getCoins, ICoinProps } from "../api";
import { isDarkAtom } from "../atoms";
import Modal from "../Components/Modal";

const Title=styled(motion.div)`
  color:${props=>props.theme.color};
  font-size:76px;
  font-weight: bold;
  width:50%;
  margin:0 auto;
  text-align:center;
  padding:30px 0;
  position:relative;
  & > span{
      cursor: pointer;
  }

`;
const CoinList=styled(motion.div)`
  width:100%;
   a{
    color:inherit;
    text-decoration: inherit;
  }
`;
const Item=styled(motion.div)`
  min-width:400px;
  width:50%;
  border:3px solid black;
  margin:20px auto;
  border-radius:20px;
  padding:20px 0px;
  background-color: ${props=>props.theme.secondBgColor};
  font-size:22px;
  font-weight:bold;
  cursor: pointer;
  display:flex;
  align-items:center;
  color:${props=>props.theme.color};
  img{
      width:50px;
      margin:0 10px 0 20px;
  }
`;
const Container=styled.div`
  width:100%;
  height:100%;
  min-height:100vh;
  background:${props=>props.theme.bgColor};
  position:relative;
`;

const ModalBg=styled(motion.div)`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:black;
    opacity:0.3;

`;
const Search=styled.div`
    position:absolute;
    bottom:0;
    right:0;
    & > svg{
        width:30px;
        position:absolute;
        bottom:2px;
        right:0;
    }
    & > input{
        position:absolute;
        bottom:0;
        right:0;
        width:150px;
        transform-origin: right center;
        background-color:white;
        color:${props=>props.theme.color};
        height:30px;
        border:1px solid white;
        font-size:23px;
        padding-left:35px;
        border-radius:5px;
        border:1px solid black;
    }
`;

const titleVariants={
  normal:{
    color:"#20100e",
  },
  active:{
    color:["#cc4343","#20100e","#cc4343"],
    transition:{
      repeat:Infinity,
      duration:1.5
    }
  }
}

interface ICoinMatchProps{
    params:{
        coinId:string;
    }
}

function Main(){
    const {data, isLoading}=useQuery<ICoinProps[]>("coins", getCoins);
    const coinMatch=useMatch("/:coinId") as ICoinMatchProps;
    const navigate=useNavigate();
    const [dark,setDark]=useRecoilState(isDarkAtom);
    const [searchOpen, setSearchOpen]=useState(true);
    const [search, setSearch]=useState("");
    const onChange=(event:React.FormEvent<HTMLInputElement>)=>{
        setSearch(event.currentTarget.value);
    }
    return(
        <Container> 
        <Title>
            {isLoading?"is Loading...":<motion.span  onClick={()=>setDark(prev=>!prev)} variants={titleVariants} initial="normal" animate="active">Coins</motion.span>}
            <Search>
            <motion.input initial={{scaleX:0}} animate={{scaleX:searchOpen?1:0}} transition={{type:"linear"}} onChange={onChange} value={search}></motion.input>
            <motion.svg animate={{x:searchOpen?-155:0}} transition={{type:"linear"}} onClick={()=>setSearchOpen(prev=>!prev)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></motion.svg>
            </Search>
        </Title>
        <CoinList>
          {isLoading?null:(
            data?.slice(0,100).filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())).map((item)=>(
                <Item whileHover={{scale:1.05}} key={item.id} layoutId={item.id} onClick={()=>navigate(`/${item.id}`)}>
                <img src={`https://cryptocurrencyliveprices.com/img/${item.id}.png`} />{item.name} </Item>
        ))
          )}
        </CoinList>
        <AnimatePresence>
            {coinMatch ?(
                <>
                    <ModalBg initial={{opacity:0}}  animate={{opacity:0.3}} exit={{opacity:0}} onClick={()=>navigate("/")}></ModalBg>
                    <Modal coinId={coinMatch.params.coinId} />
                </>
            ):null}
        </AnimatePresence>
      </Container>
    )
}

export default Main;