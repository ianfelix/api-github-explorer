import { Box, Center, Container, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from '../../components/CardContent/Card';
import { api } from '../../services/api';

interface RepositoryProps {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export default function Repos() {
  const [repository, setRepository] = useState<RepositoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    const getRepositories = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/${user}/repos`);
        const repositories = await response.data;
        setRepository(repositories);
        setLoading(false);
      } catch (error) {
        setError('Erro na busca dos repositórios');
      } finally {
        setLoading(false);
      }
    };
    getRepositories();
  }, []);

  return (
    <>
      <Head>
        <title>Repos | GitHub User Search</title>
      </Head>

      <Container>
        <Center mt={10}>
          <Heading color='white'>Repos' {user}</Heading>
        </Center>

        <Container>
          {loading && (
            <Center mt={10}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='gray.800'
                size='xl'
              />
            </Center>
          )}

          {error && (
            <Center mt={10}>
              <Heading size='md' color='white'>
                {error}
              </Heading>
            </Center>
          )}

          {repository.map((repos) => (
            <Card
              key={repos.name}
              name={repos.name}
              description={repos.description}
            />
          ))}
        </Container>
      </Container>
    </>
  );
}
