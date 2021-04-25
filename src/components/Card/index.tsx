import React from 'react';
import { chakra, Box, Flex, useColorModeValue, Center } from '@chakra-ui/react';

interface CardProps {
  users: {
    name: string;
    avatar_url: string;
    bio: string;
  }[];
}

export const Card = ({ users }: CardProps) => {
  return (
    <>
      {users.map((user) => (
        <Flex
          mt={5}
          maxW='md'
          mx='auto'
          bg='gray.800'
          shadow='lg'
          rounded='lg'
          overflow='hidden'>
          <Box
            w={1 / 3}
            bgSize='cover'
            style={{
              backgroundImage: `url(${user.avatar_url})`,
            }}></Box>

          <Box w={2 / 3} p={{ base: 4, md: 4 }}>
            <chakra.h1 fontSize='2xl' fontWeight='bold' color='white'>
              {user.name}
            </chakra.h1>

            <chakra.p mt={2} fontSize='sm' color='gray.400'>
              {user.bio}
            </chakra.p>

            <Flex mt={3} alignItems='center' justifyContent='space-between'>
              <chakra.h1 color='white' fontWeight='bold' fontSize='lg'>
                $220
              </chakra.h1>
              <chakra.button
                px={2}
                py={1}
                bg='white'
                fontSize='xs'
                color='gray.900'
                fontWeight='bold'
                rounded='lg'
                textTransform='uppercase'
                _hover={{
                  bg: 'gray.200',
                }}
                _focus={{
                  bg: 'gray.400',
                }}>
                Add to cart
              </chakra.button>
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  );
};
