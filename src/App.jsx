import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Home from './pages/Home'

function App() {


  

                    // const convertToBase64 = async (file) => {
                    //   console.log('started conversion')
                    //     let reader = new FileReader();
                    //     console.log('created filereader', file.type, posts.data[0])
                    //     await reader.readAsDataURL(imgArr[0])
                    //     console.log('read the file')
                    //     reader.onload = () => {
                    //       console.log('got into onload')
                    //       setPosts(...posts, posts[0].selectedFile = reader.result)
                    //       console.log('set the posts!', reader.result)
                    //     }
                    // }

      //               <input 
      //   type="file" 
      //   accept="image/*" 
      //   onChange={convertToBase64(this.value)} 
      // />
        //         {
        //   !posts.data ? <></> :
        //   <button
        //   type="button"
        //   className="counter"
        //   onClick={() => convertToBase64(posts.data[0].selectedFile)}
        // >
        //   click to update image
        // </button>}


  return (
    
      
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home /> } />
          {/* <Route path="about" element={ <About /> } />
          <Route path="/drink/:id" element={ <SingleDrink/> }/>
        <Route path='/checkout' element={ <Checkout /> }/>
        <Route path='/login' element={ <LogIn /> } /> */}
        <Route path="*" element={ <Error /> }/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
