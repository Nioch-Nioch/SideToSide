import React, { useEffect, useState } from 'react';
import './index.css';

let index = 0;

function App() {

  const [isVisable, setIsVisable] = useState(null)
  const [list, setList] = useState(null);
  const [visableImg, setVisableImg] = useState(null);

  useEffect(() => {
    fetch('https://picsum.photos/v2/list')
    .then(res => {
      if(!res.ok){
          throw new Error('Dane nie zostały pobrane z serwera');
      }
      return res.json();
  }).then(json => {
       setList(json);
       setVisableImg(json.slice(index, 3))
    })
  }, [])

  function next() {
    if(index === 27){
      index = 0;
    } else { 
      index = index+3 
    }
    setVisableImg(list.slice(index, index+3))
  }
 
  return ( 
    <div className = "App" >
      {isVisable && 
        <div className='bg__single' onClick={()=> setIsVisable(null)}>
          <img key={ isVisable.id } className="single" src={isVisable.download_url} alt="photo"/>
        </div>}
      <div className="list">
        {console.log(list)}
            {visableImg && visableImg.map(item => (
              <div className='list__box'><img key={ item.id } className="box__img" src={item.download_url} onClick={()=> setIsVisable(item)} alt="photo"/></div>
            ))}
      </div>
      <button className="button" onClick={next}>Next</button>
    </div>
  );
}

export default App;