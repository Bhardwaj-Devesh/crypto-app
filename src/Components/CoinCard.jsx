import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const CoinCard=({id,name,image,coinSymbol,currencySymbol,price})=>{
  return (
      <Link to={`/coin/${id}`}>
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
          <Heading size={'md'}>{coinSymbol}</Heading>
          <Text>{name}</Text>
          <Text>{`${currencySymbol}${price}`}</Text>
        </VStack>
      </Link>
    );
};

export default CoinCard
