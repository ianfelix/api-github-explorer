import { Button } from '@chakra-ui/button';
import { FormControl, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Center, Container, Heading, Stack } from '@chakra-ui/layout';
import Head from 'next/head';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card } from '../components/CardContent/Card';
import { api } from '../services/api';

interface UsersProps {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  repos_url: string;
}

export default function Home() {
  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersProps[]>(() => {
    if (typeof window !== 'undefined') {
      const storageUsers = sessionStorage.getItem('@GithubExplorer:users');

      if (storageUsers) {
        return JSON.parse(storageUsers);
      } else {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('@GithubExplorer:users', JSON.stringify(users));
    }
  }, [users]);

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

      setUsers([user, ...users]);
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
    <>
      <Head>
        <title>GitHub User Search</title>
      </Head>

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

        {users.map((user) => (
          <Card
            key={user.avatar_url}
            cardImageUrl={user.avatar_url}
            description={user.bio}
            name={user.name}
            username={user.login}
          />
        ))}
      </Container>
    </>
  );
}
