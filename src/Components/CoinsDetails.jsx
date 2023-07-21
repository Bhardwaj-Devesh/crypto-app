import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import { server } from '../index';
import {useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';
import ChartComponent from './ChartComponent';
const CoinsDetails = () => {
  const [coin,setCoin]=useState({});
  const [currency,setCurrency]=useState('inr');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const currencySymbol= currency==='inr'?"₹":currency==='eur'?"€ ":"$";
  const [days,setDays]=useState("24h")
  const param=useParams();
  const [chartData,setChartData]=useState([])
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const switchchart=(key)=>{
    switch(key){
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }
  useEffect(()=>{
    const fetchcoin=async()=>{
      try {
        const response= await axios.get(`${server}/coins/${param.id}`)
        const data=response.data;
        setCoin(data);
        const response1= await axios.get(`${server}/coins/${param.id}/market_chart?vs_currency=${currency}&id=${param.id}&days=${days}`)
        const chartData=response1.data.prices;
        // console.log(chartData);
        setChartData(chartData);
        setLoading(false);
        
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchcoin();
  },[param.id,days,currency])

  if(error){
    return <ErrorComponent messege={`Error In fetching ${param.id} Coin Details`}/>
  }
  return (
    <Container maxW={"container.lg"}>
       {
        loading?<Loader/>:(
          <>
          

            <Box width={"full"} borderWidth={'1'}>
              <ChartComponent chartData={chartData} currencySymbol={currencySymbol} days={days} />
            </Box>

            <RadioGroup onChange={setCurrency} value={currency}>
              <HStack p={'8'}>
                <Radio value='inr'>INR</Radio>
                <Radio value='eur'>EUR</Radio>
                <Radio value='usd'>USD</Radio>
              </HStack>
            </RadioGroup>
            
            <HStack p={"4"} overflowX={"auto"}>
              
                {
                  btns.map((item)=>{
                  return(
                    <Button
                      onClick={()=>(switchchart(item))}
                    >
                      {item}
                    </Button>
                  )
                  })
                }
              
            </HStack>
            
            <VStack spacing={'4'} p={"16"} alignItems={"flex-start"}>
              <Text fontSize={'sm'} opacity={"0.7"} alignSelf={'center'} >
                Last Updated on {Date(coin.market_data.last_updated).split('G')[0]} 
              </Text>
              <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"}/>
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol} {coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                <StatArrow type= {coin.market_data.price_change_percentage_24h}>0?"increase":"decrease" </StatArrow> 
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge
                fontSize={"2xl"}
                bgColor={"blackAlpha.800"}
                color={"white"}
              >#{coin.market_data.market_cap_rank}</Badge>
              <Custombar high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} 
              low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} />
              <Box w={"full"} p={'4'}>
                <Item
                  title={"Max Supply"}
                  value={`${coin.market_data.max_supply}`}
                />
                <Item title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}/>
                <Item title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
                <Item title={"ALL TIME HIGH"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
                <Item title={"ALL TIME LOW"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
              </Box>
            </VStack>
          </>
        )
       }
    </Container>
  )
}
const Custombar=({high,low})=>{
  return (
    <VStack w={"full"}>
      <Progress value={39} colorScheme={'teal'} w={"full"}/>
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} bgColor={"red"} color={'white'} >{low}</Badge>
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} bgColor={"green"} color={"white"}>{high}</Badge>
      </HStack>
    </VStack>
  )
}
const Item =({title,value})=>{
  return(
    <HStack w={"full"} justifyContent={"space-between"}>
      <Text fontFamily={"Bebas Neue"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  )
}
export default CoinsDetails
