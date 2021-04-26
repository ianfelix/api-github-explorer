import { chakra } from '@chakra-ui/system';

interface CardBodyProps {
  name: string;
  description: string;
}

export const CardBody = ({ name, description }: CardBodyProps) => {
  return (
    <>
      <chakra.h1 fontSize='2xl' fontWeight='bold' color='white'>
        {name ?? 'Nome não encontrado'}
      </chakra.h1>

      <chakra.p mt={2} fontSize='sm' color='gray.400'>
        {description ?? 'Descrição não encontrada'}
      </chakra.p>
    </>
  );
};
