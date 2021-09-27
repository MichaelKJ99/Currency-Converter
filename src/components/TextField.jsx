import "../styles/TextField.css"

const legalSigns = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]

const TextField = ({ value, setValue }) => {

  const onKeyDown = event => {
    if (event.key === "Backspace") {
      setValue(value => value.substring(0, value.length - 1))
    }
    if (legalSigns.includes(event.key)) {
      setValue(value => value + event.key)
    }
  }

  return (
    <input className="input-box" value={`${value}`} onKeyDown={e => onKeyDown(e)}></input>
  );
}

export default TextField;
