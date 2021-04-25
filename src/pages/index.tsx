import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, Container, Heading, Stack } from '@chakra-ui/layout';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Card } from '../components/Card';
import { api } from '../services/api';

interface UsersProps {
  name: string;
  avatar_url: string;
  bio: string;
}

export default function Home() {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (newUser.length === 0) {
      setInputError('Digite o nome do usuário');
    } else {
      setInputError('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputError) validate();
    setNewUser(e.target.value.trim());
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!newUser) return setInputError('Digite o nome do usuário');

    try {
      setLoading(true);
      const response = await api.get(`users/${newUser}`);
      const user = await response.data;

      setUsers([...users, user]);
      console.log(users);
      setNewUser('');
      setInputError('');
      setLoading(false);
    } catch (error) {
      setInputError('Erro na busca do usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Center mt={10}>
        <Heading color='white'>GitHub User Search</Heading>
      </Center>

      <Box mt='10'>
        <form onSubmit={handleSubmitForm}>
          <Stack spacing={3}>
            <FormControl id='search'>
              <Input
                type='search'
                color='white'
                placeholder='Digite um usuário'
                onChange={handleInputChange}
                value={newUser}
                onBlur={() => validate()}
              />
              {inputError && (
                <FormHelperText color='red.500'>{inputError}</FormHelperText>
              )}
            </FormControl>

            <Button
              bg='gray.900'
              color='gray.100'
              fontWeight='semibold'
              rounded='lg'
              _hover={{ bg: 'gray.800' }}
              isLoading={loading}
              loadingText='Submitting'>
              Search
            </Button>
          </Stack>
        </form>
      </Box>

      <Card users={users} />
    </Container>
  );
}
