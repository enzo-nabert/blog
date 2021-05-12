import Head from 'next/head'
import Link from 'next/link'

import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export default function Home({ data }) {
  return (
   <div>
     <Head>
       <title>BLOG</title>
     </Head>
     <ul>
          <Link href={`/blog/${data.id}`}>
            <a>
              <li>{data.id} - {data.titre}</li>
            </a>
          </Link>
     </ul>
   </div>
  )
}

export async function getStaticProps(){
  const httpLink = createHttpLink({
    uri: `https://graphql.datocms.com/`
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query {
        allModelmultiples {
          id
          titre
          float
          integer
        }
      }
    `
  });
  return {
    props: { data }
  };
}