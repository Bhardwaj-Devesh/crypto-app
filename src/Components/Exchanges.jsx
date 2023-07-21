import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from "../index";
import Loader from "./Loader";
import ErrorComponent from './ErrorComponent';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
const Exchanges = () => {
    const [loading,setLoading]=useState(true);
    const [exchanges,setExchanges]=useState([]);
    const [error,setError] =useState(false);
    // we use use Effect becaues everytime the page is mounted it will fetch the data from the api
    useEffect(()=>{
        const fetchExchanges=async()=>{
            try {
                    const response=await axios.get(`${server}/exchanges`);
                    const data=response.data;
                    setExchanges(data);
                    setLoading(false);
                }
             catch (error) {
                setError(true);
                setLoading(false);
            };
        }
        fetchExchanges();
    },[])
    if(error){
        return <ErrorComponent messege={"Error while fecting Exchanges"}/>
    }
  return (
    <Container maxW={"container.lg"}>
        {
            loading?(<Loader/>):(
                <HStack wrap={'wrap'}>
                    {exchanges.map((i)=>(
                        <ExchangesCard
                            name={i.name}
                            key={i.id}
                            image={i.image}
                            rank={i.trust_score_rank}
                            url={i.url}
                        />
                    ))}
                </HStack>
            )
        }
    </Container>
  )
}
const ExchangesCard=({name,image,rank,url})=>{
    return (
        <a href={url} target="blank">
          <VStack w={'52'} p={'8'} m={'4'} shadow={'lg'} borderRadius={'lg'} transition={"all 0.3s"}
            css={{
                "&:hover":{
                    transform: "scale(1.1)",
                },
            }}
          >
            <Image src={image} alt="Exchanges" 
                h={'10'}
                w={'10'}
                objectFit={'contain'}

            />
            <Heading size={'md'}>{rank}</Heading>
            <Text textAlign={'center'} noOfLines={1}>{name}</Text>
          </VStack>
        </a>
      );
};
export default Exchanges
