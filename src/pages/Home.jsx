import { useState } from 'react'
import heroImg from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import { fetchPosts } from '../api'
import imgArr from '../imgArr'

const Home = () => {

      const [posts, setPosts] = useState({})

  const fetchingNow = async () => {
    const data = await fetchPosts(1)
    setPosts(data.data)
  }

  return (
    <main>
<section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <button
          type="button"
          className="counter"
          onClick={() => fetchingNow()}
        >
          click to fetch posts
        </button>
        
      </section>

      <div>

        {posts.data ? 
        <div>
          a post exists!{console.log(posts)} 
          {
          
          posts.data.map(x=><ul key={x._id}>
            {
              Object.entries(x).map(([y,z]) => (<li key={x._id+y}>
                {y} : {y == "selectedFile" ? <img src={imgArr[Math.floor(Math.random()*5)]}/> : z}
              </li>))
              }
          </ul>)
          
          
          }
          </div> 
          : <></>}
      </div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </main>
  )
}

export default Home