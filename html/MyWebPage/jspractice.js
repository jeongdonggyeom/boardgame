function setClock(){
    var dateInfo = new Date(); 
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = dateInfo.getMonth()+1; //monthIndex를 반환해주기 때문에 1을 더해준다.
    var date = dateInfo.getDate();
    document.getElementById("time").innerHTML = hour + ":" + min  + ":" + sec;
    document.getElementById("date").innerHTML = year + ". " + month + ". " + date;
}
function modifyNumber(time){
    if(parseInt(time)<10){
        return "0"+ time;
    }
    else
        return time;
}
window.onload = function(){
    setClock();
    setInterval(setClock,1000); //1초마다 setClock 함수 실행
}
function fnMove(seq){

    if(seq==0){
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    if(seq==1){
        var offset = $("#time").offset();
        $('html, body').animate({scrollTop: offset.top-200, behavior: 'smooth'});
    }
    if(seq==2){
        var offset = $("#site").offset();
        $('html, body').animate({scrollTop: offset.top-200, behavior: 'smooth'});
    }
    if(seq==3){
        var offset = $("#usecode").offset();
        $('html, body').animate({scrollTop: offset.top-200, behavior: 'smooth'});
    }
}
$(".hover").mouseleave(
    function(){
        $(this).removeClass("hover");
    }
);
