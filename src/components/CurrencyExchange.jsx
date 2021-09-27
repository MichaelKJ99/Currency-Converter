import "../styles/CurrencyExchange.css"

import { useEffect, useState } from "react"

import { Button } from "@material-ui/core"
import Select from 'react-select'
import TextField from "./TextField"

const CurrencyExchange = () => {

  const [currencies, setCurrencies] = useState([])
  const [selectedCurrFrom, setSelectedCurrFrom] = useState([{ value: "PLN", label: "PLN" }])
  const [selectedCurrTo, setSelectedCurrTo] = useState("")
  const [value, setValue] = useState("")
  const [exchangedValue, setExchangedValue] = useState("")
  const [swapSwitch, setSwapSwitch] = useState(true)

  useEffect(() => {
    fetch("https://api.nbp.pl/api/exchangerates/tables/A/")
      .then(response => response.json())
      .then(data => setCurrencies(data[0].rates))
  }, [])

  const exchange = () => {
    const currency = currencies.filter(currency => currency.code === selectedCurrTo.value)
    value ? (swapSwitch ? setExchangedValue(Math.round((value / currency[0].mid) * 100) / 100) : setExchangedValue(Math.round((value * currency[0].mid) * 100) / 100)) : alert("A value hasn't been written yet!")
  }

  const swap = () => {
    setSwapSwitch(swapSwitch => !swapSwitch)
    swapSwitch ? setSelectedCurrFrom("Select...") : setSelectedCurrTo("Select...")
  }

  return (
    <div className="wrapper">
      <h2>Write value and choose currency:</h2>
      <div className="inner-box-swap">
        <Select className="select-box" onChange={setSelectedCurrFrom} options={currencies.map(curr => ({ value: curr.code, label: curr.code }))} value={swapSwitch ? [{ value: "PLN", label: "PLN" }] : selectedCurrFrom} isDisabled={swapSwitch} />
        <i class="fas fa-arrow-right icon" />
        <Select className="select-box" onChange={setSelectedCurrTo} options={currencies.map(curr => ({ value: curr.code, label: curr.code }))} value={!swapSwitch ? [{ value: "PLN", label: "PLN" }] : selectedCurrTo} isDisabled={!swapSwitch} />
        <Button className="button swap" variant="outlined" color="primary" onClick={() => swap()}>Swap</Button>
      </div>
      <TextField value={value} setValue={setValue} />
      <Button className="button" variant="outlined" color="primary" onClick={() => exchange()} disabled={!selectedCurrTo} >Exchange</Button>
      <p className="result">{`Result: ${exchangedValue}`}</p>
    </div>
  );
}

export default CurrencyExchange;