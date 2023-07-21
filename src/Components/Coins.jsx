import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import Loader from './Loader'
import CoinCard from './CoinCard'
import ErrorComponent from './ErrorComponent'
import '../Css/pagination.css'

const Coins = () => {
  const [coins,setCoins]=useState([]);
  const [currency,setCurrency]=useState('inr');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [page,setPage]=useState(1);
  const currencySymbol= currency==='inr'?"₹":currency==='eur'?"€ ":"$";
  const pagination=new Array(100).fill(0)
  useEffect(()=>{
    // fetch the API
    const fetchCoins=async()=>{
      try {
        const response=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        const data=response.data;
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  },[currency, page])
  if(error){
    return <ErrorComponent messege={"Error in Fetching Coins"}/>
  }
  const pagechange=(page)=>{
    setPage(page);
    setLoading(true);
  }
  return (
    <Container maxW={"container.lg"}>
        {
            loading?(<Loader/>):(
              <>
                <RadioGroup onChange={setCurrency} value={currency}>
                  <HStack p={'8'}>
                    <Radio value='inr'>INR</Radio>
                    <Radio value='eur'>EUR</Radio>
                    <Radio value='usd'>USD</Radio>
                  </HStack>
                </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={'center'}>
                    {coins.map((i)=>(
                        <CoinCard
                            id={i.id}
                            name={i.name}
                            key={i.id}
                            image={i.image}
                            coinSymbol={i.symbol}
                            currencySymbol={currencySymbol}
                            price={i.current_price}
                        />
                    ))}
                </HStack>
                <HStack  className='pagination'>
                  {
                    pagination.map((item,index)=>{
                      return (
                          <Button 
                            key={index}
                            bgColor={'blackAlpha.800'}
                            color={"white"}
                            p={2}
                            m={3}
                            onClick={()=>(pagechange(index+1))}
                            className='pg-btn'
                          >
                            {index+1}
                          </Button>
                      )
                    })
                  }
                </HStack>
                
                
              </>
            )
        }
    </Container>
  )
}
// then finally add the functionality of pagination this is important

export default Coins
