import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  icon: ReactNode;
}

export const Header = ({ title, icon }: HeaderProps) => {
  return (
    <>
      <Container mt={5}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Heading as='h3' color='white'>
            {title}
          </Heading>
          <Box
            color='white'
            _hover={{ color: 'gray.300' }}
            transition='color 0.2s'>
            {icon}
          </Box>
        </Flex>
      </Container>
    </>
  );
};
