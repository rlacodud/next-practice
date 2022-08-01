import Link from 'next/link'

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <h1>Welcome to My Blog!</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

// 서버에서 데이터가 자주 변동될 때에 사용
// export const getServerSideProps = async () => {
//   const res = await fetch(`http://localhost:8080/api/posts`)
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }

// 미리 파일을 생성하여 바로 접근할 수 있도록 함.
// => 서버에서 데이터가 변경되어도 해당 버전으로 빌드를 한 게 아니라면 바로 반영 안됨.
export const getStaticProps = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`)
    const posts = await res.json();
  
    return {
      props: {
        posts
      },
      // 20초 지난 시점부터 (언제든) 접속이 일어나면 새롭게 data를 받아서 재정의
      revalidate: 20
    }
  }