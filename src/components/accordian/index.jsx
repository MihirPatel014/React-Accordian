import { useState } from "react"
import data from './data.js';
import './style.css';
export default function Accordian() {
  const [selected, setSelection] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelection(getCurrentId === selected ? null : getCurrentId);
  }
  function handleMultipleSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if(findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId,1);

    setMultiple(cpyMultiple);
    
  }

  console.log(selected);


  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)} >Enabled Mulitple Selection</button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map(dataItem => (
            <div className="item" key={dataItem.id}>
              <div className="title"
               onClick={enableMultiSelection ? 
                () => handleMultipleSelection(dataItem.id) :
               () => handleSingleSelection(dataItem.id)}>
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No Data Found!</div>
        )}
      </div>
    </div>
  );
}