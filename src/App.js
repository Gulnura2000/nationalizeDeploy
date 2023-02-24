import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.scss';
import axios from 'axios';

import { useState } from 'react';
function App() {
  const [name, setname] = useState(null)
  const [state, setstate] = useState()
  let [inp, setinp] = useState()

  let DataF = async () => {
    if (inp != null) {
      let namedata = await axios({
        url: `https://api.nationalize.io/?name=${inp}`,
        method: "get"
      })
      if (namedata != null) {
        if (namedata.status == 200) {
          setname(namedata.data)
        }
      }
    } else {
      setstate(
        <b className='text-danger  '> пожалуйста, введите имя! </b>
      )
    }

  }

  return (
    <div className="App">
      <div className='input-block'>
        <div className='col-lg-12 text-center py-3'> 
        {state}
        </div>
        <input id='name' onChange={(e) => { setinp(e.target.value) }} placeholder='enter name' type="text" />
        <button onClick={DataF}  > click </button>
      </div>
      {name != null ?
        <>
          <div className='data co-md-6 mx-auto '>
            <h2>{name.name}</h2>
            {name.country.map(i =>
              <div className='col-lg-12 my-5'>
                <div className='row border-bottom border-secondary pb-3 '>
                  <div className='col-6'> <p > {i.country_id} </p></div>
                  <div className='col-6'> <span> {i.probability * 100}% </span></div>
                </div>


              </div>

            )}

          </div>

        </>


        : <></>}












    </div>
  );
}

export default App;
