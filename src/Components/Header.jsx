import { Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <HStack 
        bgColor={'blackAlpha.900'}
        p={4}
        shadow={'base'}
      >
        <Button
          variant={'unstyled'}
          color={'white'}
        >
          <Link to={'/'}>Home</Link>
        </Button>
        <Button
          variant={'unstyled'}
          color={'white'}
        >
          <Link to={'/coins'}>Coins</Link>
        </Button>
        <Button
          variant={'unstyled'}
          color={'white'}
        >
          <Link to={'/exchanges'}>Exchanges</Link>
        </Button>
      </HStack>
    </div>
  )
}

export default Header
