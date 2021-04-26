import { Box, Flex } from '@chakra-ui/react';
import { CardBody } from '../CardBody';
import { CardButtons } from '../CardButtons';
import { CardImage } from '../CardImage';

interface CardProps {
  users: {
    name: string;
    login: string;
    avatar_url: string;
    bio: string;
    repos_url: string;
  }[];
}

export const Card = ({ users }: CardProps) => {
  return (
    <>
      {users.map((user) => (
        <Flex
          // key={user.avatar_url}
          mt={5}
          maxW='md'
          mx='auto'
          bg='gray.800'
          shadow='lg'
          rounded='lg'
          overflow='hidden'>
          <CardImage avatar_url={user.avatar_url} />

          <Box w={2 / 3} p={{ base: 4, md: 4 }}>
            <CardBody name={user.name} bio={user.bio} />

            <CardButtons username={user.login} />
          </Box>
        </Flex>
      ))}
    </>
  );
};
