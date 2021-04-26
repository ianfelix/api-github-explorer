import { Flex } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import Link from 'next/link';

interface CardButtonProps {
  username: string;
}

export const CardButtons = ({ username }: CardButtonProps) => {
  return (
    <>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <Link href={`/repos/${username}`}>
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
            Repos
          </chakra.button>
        </Link>

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
          Starred
        </chakra.button>
      </Flex>
    </>
  );
};
