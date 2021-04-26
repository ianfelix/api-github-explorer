import { Box, Flex } from '@chakra-ui/react';
import { CardBody } from '../CardBody';
import { CardButtons } from '../CardButtons';
import { CardImage } from '../CardImage';

interface CardProps {
  name: string;
  username?: string;
  cardImageUrl?: string;
  description: string;
}

export const Card = (props: CardProps) => {
  const { description, username, name, cardImageUrl } = props;

  return (
    <>
      <Flex
        _hover={{
          transform: 'translateX(10px)',
        }}
        transition='transform 0.2s'
        mt={5}
        maxW='md'
        mx='auto'
        bg='gray.800'
        shadow='lg'
        rounded='lg'
        overflow='hidden'>
        {cardImageUrl && <CardImage cardImageUrl={cardImageUrl} />}

        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
          <CardBody name={name} description={description} />

          {cardImageUrl && <CardButtons username={username} />}
        </Box>
      </Flex>
      )
    </>
  );
};
