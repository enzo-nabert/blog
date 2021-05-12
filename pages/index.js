import Head from 'next/head'
import Link from 'next/link'

export default function Home({ posts }) {
  return (
   <div>
     <Head>
       <title>BLOG</title>
     </Head>
     <ul>
        {posts.map((p) => 
          <Link href={`/blog/${p.id}`}>
            <a>
              <li>{p.id} - {p.title}</li>
            </a>
          </Link>
        )}
     </ul>
   </div>
  )
}

export async function getStaticProps(){
  let posts = await fetch("http://jsonplaceholder.typicode.com/posts?_limit=5")
  .then(r => r.json());

  return {
    props : {posts}
  }
}