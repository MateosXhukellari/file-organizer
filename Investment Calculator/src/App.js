import Header from './util/Header'
import DataInput from './util/DataInput'
import {useState} from "react";
import Results from './util/Results'

function App() {
    const [enteries, setEnteries] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 4
    })

    function handleChange(inputIdentifier, setValue){
        setEnteries(prevEntries=> {
            return {
                ...prevEntries,
                [inputIdentifier]: +setValue
            }
        })
    }

  return (
      <>
          <Header/>
          <DataInput enteries={enteries} onChange={handleChange}/>
          <Results inputs={enteries}/>
      </>
  )
}

export default App
