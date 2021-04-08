
function Post({post}){

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

export async function getStaticProps({params}){
    let post = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`)
    .then(r => r.json());
  
    return {
      props : {post}
    }
  }

export async function getStaticPaths(){
    let posts = await fetch("http://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(r => r.json());

    return {
        paths : posts.map(
            p => (
                {params : 
                    {id: 
                        p.id.toString()
                    }
                }
            )
        ),
        fallback : false
    }
}

export default Post;