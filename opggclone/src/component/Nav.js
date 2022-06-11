import "../styleComponent/nav.css"

function Nav(){
    return(
        <div>
            <nav className={"div--nav"}>
                <a href={"/"}>
                    <img src={"https://s-lol-web.op.gg/images/icon/opgglogo.svg?v=1654157118862"} className={"nav--opggLogo"} alt={"icon"}/>
                </a>
                <div className={"nav--loldiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-lol-white.svg?image=q_auto,f_webp,w_48&v=1654157118862"} className={"nav--lolLogo"} alt={"icon"}/>
                    <span className={"nav--loldiv--text"}>리그오브레전드</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-duo-gray.svg?image=q_auto,f_webp,w_48&v=1654157118862"} className={"nav--duoicon_special"} alt={"icon"}/>
                    <span className={"nav--duodiv--text"}>
                        <p>N</p>
                    </span>
                    <span>Duo</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/opgg%20favicon%20white_220107.svg?image=q_auto,f_webp,w_48&v=1654157118862"} className={"nav--duoicon"} alt={"icon"}/>
                    <span className={"nav--duodiv--text"}>
                        <p>N</p>
                    </span>
                    <span>QWER (이스포츠전적)</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-valorant-white.svg?image=q_auto,f_webp,w_48&v=1654157118862"} className={"nav--duoicon"} alt={"icon"}/>
                    <span className={"nav--duodiv--text"}>
                        <p>B</p>
                    </span>
                    <span>발로란트</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-pubg-gray.svg?image=q_auto,f_webp,w_48&v=1654157118862"} className={"nav--duoicon"} alt={"icon"}/>
                    <span>배틀그라운드</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-overwatch-gray.svg?image=q_auto,f_webp,w_64&v=1654157118674"} className={"nav--duoicon"} alt={"icon"}/>
                    <span>오버워치</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img_navi_bs.svg?image=q_auto,f_webp,w_64&v=1654157118674"} className={"nav--duoicon"} alt={"icon"}/>
                    <span>이터널 리턴</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/img-navi-talk-gray.svg?image=q_auto,f_webp,w_64&v=1654157118674"} className={"nav--duoicon"} alt={"icon"}/>
                    <span>톡피지지</span>
                </div>
                <div className={"nav--duodiv"}>
                    <img src={"https://opgg-gnb.akamaized.net/static/images/icons/01-icon-00-logo-icon-opggsquare.svg?image=q_auto,f_webp,w_64&v=1654157118674"} className={"nav--duoicon"} alt={"icon"}/>
                    <span>데스크톱</span>
                </div>
                <button className={"nav--change"}>
                    <img src={"https://s-lol-web.op.gg/images/icon/icon-darkmode.svg?image=q_auto,f_webp,w_48&v=1654157118674"} alt={"icon"}/>
                </button>
                <div className={"nav--language"}>
                    <img src={"https://s-lol-web.op.gg/images/icon/icon-world-light-blue.svg?v=1654157118862"} className={"nav--language--img"} alt={"icon"}/>
                    <button className={"nav--language--button"}>
                        <span>한국어</span>
                        <img src={"triangle.png"} alt={"icon"} className={"nav--language--triangle"} />
                    </button>
                </div>
                <div className={"nav--login"}>
                    <button className={"nav--login--button"}>로그인</button>
                </div>
            </nav>
            <nav className={"div--nav2"}>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>홈</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>챔피언 분석</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link2"}>칼바람</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link2"}>우르프</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>통계</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>랭킹</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>프로관전</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>멀티서치</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>OP셜</a>
                </div>
                <div className={"div--nav2--under"}>
                    <a href={"/"} className={"div--nav2--link"}>커뮤니티</a>
                </div>
            </nav>
        </div>
    )
}
export default Nav;
