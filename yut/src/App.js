import './App.css';

function App() {
  function throwYut(){
    let yut = [];
    let count = 0;
    const numEl = document.querySelector("div");

    for(let i=0;i<4;i++)
    {
      yut[i] = Math.round(Math.random());
    }
    console.log(yut);
    for(let i=0;i<4;i++)
    {
      if(yut[i] === 1) {
        numEl.innerHTML += "<img src='images/yut1.png' alt='profile' width='50px' height='200px'/>"
      }
      else {
        numEl.innerHTML += "<img src='images/yut2.png' alt='profile' width='50px' height='200px'/>"
        count++;
      }
    }
    if(count === 0) numEl.innerHTML += "<p>모</p>"
    else if(count === 1) numEl.innerHTML += "<p>도</p>"
    else if(count === 2) numEl.innerHTML += "<p>개</p>"
    else if(count === 3) numEl.innerHTML += "<p>걸</p>"
    else if(count === 4) numEl.innerHTML += "<p>윷</p>"
  }
  return (
    <div className="App">
      <button onClick={throwYut}>클릭</button>
      <div className={"number"}></div>
    </div>
  );
}

export default App;
