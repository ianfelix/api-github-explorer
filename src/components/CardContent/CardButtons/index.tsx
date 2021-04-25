import { Flex } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';

export const CardButtons = () => {
  return (
    <>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
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
    </>
  );
};
