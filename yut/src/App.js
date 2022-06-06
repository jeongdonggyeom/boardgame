import './App.css';

function App() {

  const player = {
    num: 0,
    more: false,
    count: 0,
    placeH: 5,
    placeW: 5
  }
  const pan = Array.from(Array(6), () => new Array(6).fill(0));
  let place;
  let top = true;
  let under = false;
  let left = false;
  let right = false;
  let shortcut = false;
  let shortcut2 = false;

  //윷놀이 판의 값을 저장하는 2차원 배열 생성
  function init(){
    for(let i=0;i<6;i++){
      for(let j=0;j<6;j++){
        if(i===0 || j===0 || i===5 || j===5) pan[i][j] = 1;
        else if(i===j || i+j===5) pan[i][j] = 1;
      }
    }
    console.log(pan)
    player.num = 2;
    pan[5][5] = player.num;
  }
  //앞면 개수인 count를 이용해 도개걸윷모중 무엇인지 html에 띄워주고 이동칸을 리턴, 만약 윷이나 모라면 한번 더 던질 수 있도록
  //more에 true값을 넣어줌.
  function yutNum(count){
    const numEl = document.getElementById("number");
    if(count === 0) {
      numEl.innerHTML += "<p class='result'>모</p>"
      player.more = true;
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
      player.more = true;
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
    move(place);
  }
  function move(place){
    let move;
    if(player.placeH === 0 || player.placeW === 0) {
      shortcut = true;
    }
    if(shortcut === true) {
      top = false;
      under = false;
      left = false;
      right = false;
      if(place === 3) {
        shortcut2 = true;
      }
      player.placeW = place-1;
      player.placeH = place-1;
    }
    else if(top === true){
      move = player.placeH - place;
      if(move < 0) {
        top = false;
        left = true;
        player.placeH = 0;
        player.placeW -= 6-place;
      }
      else player.placeH -= place;
    }
    else if(left === true) {
      move = player.placeW - place;
      if(move < 0) {
        left = false;
        under = true;
        player.placeW = 0;
        player.placeH += 6-move;
      }
      else player.placeW -= place;
    }
    else if(under === true) {
      move = player.placeH + place;
      if(move > 5) {
        right = true;
        under = false;
        player.placeH = 5;
        player.placeW += 6-move;
      }
      else player.placeH += place;
    }
    else if(right === true) {
      move = player.placeW + place;
      if(move > 5) {
        top = true;
        right = false;
        player.placeW = 5;
        player.placeH -= 6-move;
        player.count += 1;
      }
      else player.placeH += place;
    }
    pan[player.placeH][player.placeW] = player.num;
    console.log(pan);
  }
  return (
    <div className="App">
      <div className={"container"}>
        <div className={"number"} id={"number"}></div>
        <button onClick={init}>판 생성</button>
        <button onClick={throwYut} className={"throwYut"}>윷 던지기</button>
      </div>
    </div>
  );
}

export default App;
