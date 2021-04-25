import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, Container, Heading, Stack } from '@chakra-ui/layout';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Card } from '../components/Card';
import { api } from '../services/api';

interface UserDataProps {
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export default function Home() {
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState<UserDataProps[]>([]);
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (newUser.length === 0) {
      setInputError('Digite o nome do usuário');
      // return false;
    } else {
      setInputError('');
      // return true;
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
      const response = await api.get<UserDataProps>(`users/${newUser}`);
      const user = await response.data;

      setUsers([...users, user]);
      setNewUser('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca do usuário');
    }
  };

  return (
    <Container>
      <Center mt={10}>
        <Heading color='white'>GitHub API Search</Heading>
      </Center>

      <Box mt='10'>
        <form onSubmit={handleSubmitForm}>
          <Stack spacing={3}>
            <FormControl id='search'>
              <Input
                type='search'
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

        {users.map((user) => (
          <h1 key={user.avatar_url}>{user.name}</h1>
        ))}

        <Card />
      </Box>
    </Container>
  );
}
