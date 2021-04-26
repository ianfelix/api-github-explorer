import { chakra } from '@chakra-ui/system';

interface CardBodyProps {
  name: string;
  bio: string;
}

export const CardBody = ({ name, bio }: CardBodyProps) => {
  return (
    <>
      <chakra.h1 fontSize='2xl' fontWeight='bold' color='white'>
        {name}
      </chakra.h1>

      <chakra.p mt={2} fontSize='sm' color='gray.400'>
        {bio ?? 'Descrição não encontrada'}
      </chakra.p>
    </>
  );
};
