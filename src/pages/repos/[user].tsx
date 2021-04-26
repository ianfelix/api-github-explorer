import { Center, Container, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

interface RepositoryProps {
  full_name: string;
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

  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    const getRepositories = async () => {
      const response = await api.get(`/users/${user}/repos`);
      const repositories = await response.data;
      setRepository(repositories);
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

        {repository.map((repos) => {})}
      </Container>
    </>
  );
}
