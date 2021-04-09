import {useState} from "react";


import Form from "./components/Form";
import Results from "./components/Results";

import './App.css';

function App() {
    const [formData, setFormData] = useState({})
    const setInput = (inputId,value) => {
        setFormData(values => ({...values,[inputId]:value}))
    }
    const setBooks = (bookId,qty) => {
        setFormData(values =>({...values,books:{...values.books,[bookId]:qty} }))
    }
    const setMaterials = (materialId,qty) => {
        setFormData(values=>({...values,materials:{...values.materials,[materialId]:qty}}))
    }
    return (
        <div className='App'>
            <h2 className='app-title'>Genshin Impact Time Calculator</h2>
            <Form  formData={formData} setFormData={setInput} setBooks={setBooks} setMaterials={setMaterials}/>
            { Object.keys(formData).length > 0 && <Results data={formData}/>
            }
        </div>
    );
}

export default App;
