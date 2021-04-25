import { Box } from '@chakra-ui/layout';

interface CardImageProps {
  avatar_url: string;
}

export const CardImage = ({ avatar_url }: CardImageProps) => {
  return (
    <>
      <Box
        w={1 / 3}
        bgSize='cover'
        style={{
          backgroundImage: `url(${avatar_url})`,
        }}></Box>
    </>
  );
};
