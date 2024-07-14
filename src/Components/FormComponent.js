import React, { useState } from 'react';
import ListCoins from "./ListComponent";
import InputComponent from "./InputComponent";
import "./formatStyle.css"

export default function FormComponent() {

    const [inputValue, setInputValue] = useState('');
    const [coins, setCoins] = useState([0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000]);
    const [selectedCoins, setSelectedCoins] = useState(new Array(coins.length).fill(false));
    const [result, setResult] = useState([]);
    const [error,setError] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleCheckboxChange = (index) => {
        const newSelectedCoins = [...selectedCoins];
        newSelectedCoins[index] = !newSelectedCoins[index];
        setSelectedCoins(newSelectedCoins);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedCoinValues = coins.filter((_, index) => selectedCoins[index]);

        const data = {
            inputValue: inputValue,
            selectedCoins: selectedCoinValues
        };
        console.log('Submitting data:', data);

        try{
            const response = await fetch('http://localhost:8080/api/submit',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if(result === null){
                return(
                    setError("Please select new coins")
                );
            }
            else {
                const sortedResult = result.sort((a, b) => a - b);
                setResult(sortedResult);
                console.log('success:',result);
            }




        }catch (error){
            console.error('Error:',error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputComponent
                    value={inputValue}
                    onChange={handleInputChange}/>
            </div>
            <div>
                <ListCoins
                    coins={coins}
                    selectedCoins={selectedCoins}
                    handleCheckboxChange={handleCheckboxChange}/>
            </div>
            <button type="submit">Submit</button>
            <div>
                <h3>Result:</h3>
                <div className="result-container">
                    {result.map((coin, index) => (
                        <div key={index} className="result-item">{coin}</div>
                    ))}
                </div>
            </div>
        </form>
    );
}

