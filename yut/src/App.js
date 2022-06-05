import './App.css';

function App() {

  const pan = Array.from(Array(6), () => new Array(6).fill(0));
  let more = false;
  let place;

  //윷놀이 판의 값을 저장하는 2차원 배열 생성
  for(let i=0;i<6;i++)
    for(let j=0;j<6;j++)
      if(i===0 || j===0 || i===5 || j===5) pan[i][j] = 1;

  //앞면 개수인 count를 이용해 도개걸윷모중 무엇인지 html에 띄워주고 이동칸을 리턴, 만약 윷이나 모라면 한번 더 던질 수 있도록
  //more에 true값을 넣어줌.
  function yutNum(count){
    const numEl = document.getElementById("number");
    if(count === 0) {
      numEl.innerHTML += "<p class='result'>모</p>"
      more = true;
      return 5;
    }
    else if(count === 1) {
      numEl.innerHTML += "<p class='result'>도</p>"
      return 1;
    }
    else if(count === 2) {
      numEl.innerHTML += "<p class='result'>개</p>"
      return 2;
    }
    else if(count === 3) {
      numEl.innerHTML += "<p class='result'>걸</p>"
      return 3;
    }
    else if(count === 4) {
      numEl.innerHTML += "<p class='result'>윷</p>"
      more = true;
      return 4;
    }
  }

  //윷던지기 함수. yut이라는 배열에 앞면이면 1, 뒷면이면 0을 넣어서 도개걸윷모를 구분. count는 1를 새기 위한 용도
  function throwYut(){
    let yut = [];
    let count = 0;
    const numEl = document.getElementById("number");

    numEl.innerHTML = "";
    for(let i=0;i<4;i++)
    {
      yut[i] = Math.round(Math.random());
    }
    console.log(yut);
    for(let i=0;i<4;i++)
    {
      if(yut[i] === 1) {
        numEl.innerHTML += "<img src='images/yut1.png' alt='profile' class='yut'/>"
      }
      else {
        numEl.innerHTML += "<img src='images/yut2.png' alt='profile' class='yut'/>"
        count++;
      }
    }
    place = yutNum(count);
  }
  return (
    <div className="App">
      <div className={"container"}>
        <div className={"number"} id={"number"}></div>
        <button onClick={throwYut} className={"throwYut"}>윷 던지기</button>
      </div>
    </div>
  );
}

export default App;
