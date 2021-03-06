import { Box, Center, Container, Flex, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { Card } from '@components/CardContent/Card';
import { Header } from '@components/Header';
import { api } from '@services/api';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

interface RepositoryProps {
  name: string;
  description: string;
  html_url: string;
}

export default function Repos() {
  const [repository, setRepository] = useState<RepositoryProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get(`users/${user}/starred`);
        const repositories = await response.data;
        setRepository(repositories);
        setLoading(false);
      } catch (error) {
        setError('Erro na busca dos repositórios');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Starred | GitHub User Search</title>
      </Head>

      <Header
        title={`Starred ${user}`}
        icon={
          <Link href='/'>
            <a>
              <Flex justifyContent='center' alignItems='center'>
                <FaChevronLeft size={16} />
                <Box ml={2}>Voltar</Box>
              </Flex>
            </a>
          </Link>
        }
      />

      <Container>
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
            <a href={repos.html_url} key={repos.html_url} target='_blank'>
              <Card name={repos.name} description={repos.description} />
            </a>
          ))}
        </Container>
      </Container>
    </>
  );
}
