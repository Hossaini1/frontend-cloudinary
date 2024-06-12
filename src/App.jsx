import { useState } from 'react'
import NavComponent from './components/NavComponent'
import CreateProduct from './components/CreateProduct';


function App() {


  return (
    <div>
      <NavComponent />
      <div className="container mx-auto p-5 lg:w-2/3 lg:p-2">
        <CreateProduct />
      </div>
    </div>
  );
}

export default App
