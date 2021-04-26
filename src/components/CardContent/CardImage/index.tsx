import { Box } from '@chakra-ui/layout';

interface CardImageProps {
  cardImageUrl: string;
}

export const CardImage = ({ cardImageUrl }: CardImageProps) => {
  return (
    <>
      <Box
        w={1 / 3}
        bgSize='cover'
        style={{
          backgroundImage: `url(${cardImageUrl})`,
        }}></Box>
    </>
  );
};
