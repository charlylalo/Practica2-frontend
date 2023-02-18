import * as React from 'react';
import "./Home.css"
import Form from './Form';
import Tabla from './Tabla';

export default function Home() {
  const [res, setRes] = React.useState([])
  return (
    <div className='home'>
      <div className='main'>
        <Form setRes={setRes} />
        <Tabla res={res}/>
      </div>
    </div>
  );
}