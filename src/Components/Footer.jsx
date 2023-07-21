import { Avatar, Box, Button, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {FaYoutube,FaInstagram,FaGithub} from 'react-icons/fa';
import avatarSrc from '../Assets/photo.jpg'
const Footer = () => {
  return (
    <Box bg={"blackAlpha.900"} color={"white"} p="16" minH={'40'}>
        <Stack direction={["column","row"]}>
            <VStack alignItems={'stretch'} w={'full'}>
                
                <HStack
                    borderBottom={' 2px solid white'}
                    p={'2px'}
                    py={'3px'}
                >
                    <Avatar boxSize={"20"} mt={["4", "0"]}
                    src={avatarSrc} />
                    <Text p={"2"}>Made by Devesh Bhardwaj with Love
                    </Text>
                </HStack>
            </VStack>
            <VStack 
                w={'full'}
                borderLeft={['none','1px']}
                borderRight={['none','1px']}
            >
                <Heading textTransform={"uppercase"} textAlign={'center'}>
                    Crypto Hub
                </Heading>
                <Text>@ all right reserved</Text>
            </VStack>
            <VStack w={'full'}>
                <Heading
                    textTransform={'uppercase'}
                    size={'md'}
                    textAlign={'center'}
                >
                    Social Media
                </Heading>
                <Stack direction={["Column","row"]}>
                    <Button mx={'2px'} colorScheme={'white'} variant={'ghost'}>
                        <FaYoutube/>
                        &nbsp;
                        <a target='blank' href='https://www.youtube.com/@deveshbhardwaj3625'>Youtube</a>
                    </Button>
                    <Button mx={'2'} colorScheme={'white'} variant={'ghost'}>
                        <FaGithub />
                        &nbsp;
                        <a target='blank' href='https://github.com/Bhardwaj-Devesh'>GitHub</a>
                    </Button>
                    <Button mx={'2px'} colorScheme={'white'} variant={'ghost'}>
                        <FaInstagram />
                        &nbsp;
                        <a target='blank' href='https://www.instagram.com/devesh_bhardwajj/?next=%2F'>Instagram</a>
                    </Button>
                </Stack>
            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer
