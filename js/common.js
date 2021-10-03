// 로고가 투명해지면서 작아진다. 배경은 마지막에 다 움직이고 나서 투명해짐
setTimeout(function() {
    $("#firstWindow").addClass("active")
    let time = parseInt($("#firstWindow").css("transition-duration"))*1000
    setTimeout(function() {
        $("#firstWindow").fadeOut(500, function() {
            $(this).hide()
            setTimeout(print, 200)
        })
    }, time)
}, 500)
// 타이핑 효과
const hi = document.querySelector("#pWrap p")
let hiText = "안녕하세요!n이제 막 웹개발에 발걸음을 뗀ne입니다.n아직은 부족한 능력이지만,n남은 기간 동안 열심히 노력해서n스스로 만족할만한 실력을n갖추는 것이 목표입니다!!"
let i = 0;
console.log(hiText)
function print() {
    if (i < hiText.length) {
        if(hiText[i] === "n") hi.innerHTML += "<br />"
        else if(hiText[i] === "e") hi.innerHTML += "<em>김보령</em>"
        else hi.innerHTML += hiText[i]
        i++
        setTimeout(print, 50)
    }
}
// 옆으로 움직여야 한다.
const contents = document.querySelectorAll("#main > section")
let pos1 = $("#content1").position().left
let pos2 = $("#content2").position().left
let pos3 = $("#content3").position().left
let pos4 = $("#content4").position().left
// console.log(pos3)
let windowN = 1
let windowMvState = 0
let mvPos, mvPoint;
let firstN = 1;
let slideState = 0;
$("#gnb > li > a").eq(0).addClass("on")
window.addEventListener("wheel", function(e) {
    if (windowMvState == 0) {
        windowMvState = 1;
        if (e.wheelDelta < 0) { // 아래로 휠
            if (windowN < contents.length) {
                windowN++;
                $("#gnb > li > a").removeClass("on")
                $("#gnb > li > a").eq(windowN-1).addClass("on")
                mvPos = $(window).innerWidth()
                $("#main:not(:animated)").animate({marginLeft: "-=" + mvPos}, 600, function() {
                    windowMvState = 0
                    animation()
                })
            }
        }
        else { // 위로 휠
            if (windowN > 1) {
                windowN--;
                $("#gnb > li > a").removeClass("on")
                $("#gnb > li > a").eq(windowN-1).addClass("on")
                mvPos = $(window).innerWidth()
                $("#main:not(:animated)").animate({marginLeft: "+=" + mvPos}, 600, function() {
                    windowMvState = 0
                    animation()
                })
            }
            
        }
    }    
})
// 메뉴 클릭 시 부드럽게 이동
const menu = document.querySelectorAll("#gnb > li > a")
// console.log(menu)
$("#gnb > li > a").on("click", function(e) {
    e.preventDefault();
    windowMvState = 1
    $("#gnb > li > a").removeClass("on")
    $(this).addClass("on")
    mvPoint = $(this).attr("href").substr(8, 1)
    windowN = parseInt(mvPoint)
    mvPos = $("#content1").innerWidth() * (windowN - 1)
    // console.log(windowN)
    $("#main").stop().animate({marginLeft: -mvPos}, 1000, function() {
        windowMvState = 0
        animation()
    })
})
// 새로 고침 시 가장 앞으로 이동
window.addEventListener("load", function() {
    setTimeout(function() {
        scrollTo(0, 0)
    }, 20)
})
// content3 슬라이드 만들기
// 각방향으로 마우스가 올라가면 addClass("on")
$("#content3").on("mousemove", function(e) {
    // console.log(e.clientX)
    // console.log($("#content3").innerWidth())
    if (e.clientX < $("#content3").innerWidth()*0.1) {
        $("#posNum a").removeClass("on")
        $("#posNum a:eq(0)").addClass("on")
    }
    else if (e.clientX > $("#content3").innerWidth()*0.9) {
        $("#posNum a").removeClass("on")
        $("#posNum a:eq(1)").addClass("on")
    }
    else $("#posNum a").removeClass("on")
})
$("#numBtn li a").eq(0).addClass("on")
$("#content3 article").eq(0).addClass("active")
// 우 버튼 누르면 슬라이드 이동
$("#posNum a:eq(1)").on("click", function(e) {
    e.preventDefault();
    let slideWidth = $("#content3 article").width()
    firstN = parseInt($("#articleWrap article:first").attr("class").substr(5, 1))
    firstN++
    if(firstN == 4) firstN = 1
    $("#numBtn li a").removeClass("on")
    $("#numBtn li a").eq(firstN-1).addClass("on")
    $("#articleWrap article:eq(1):not(:animated)").addClass("active")
            .css("opacity", 0)
            .animate({opacity: 1}, function() {
                $("#articleWrap article").not($(this)).removeClass("active")
                $("#articleWrap").append($("#articleWrap article:first"))
            })
})
// 좌 버튼 누를 시
$("#posNum a:eq(0)").on("click", function(e) {
    e.preventDefault();
    let slideWidth = $("#content3 article").width()
    firstN = parseInt($("#articleWrap article:first").attr("class").substr(5, 1))
    firstN--
    if(firstN == 0) firstN = 3
    $("#numBtn li a").removeClass("on")
    $("#numBtn li a").eq(firstN-1).addClass("on")
    $("#articleWrap article:last:not(:animated)").addClass("active")
            .css("opacity", 0)
            .animate({opacity: 1}, function() {
                $("#articleWrap article").not($(this)).removeClass("active")
                $("#articleWrap").prepend($(this))
            })
})
// 숫자 버튼 누를 시
$("#numBtn li").on("click", function(e) {
    e.preventDefault();
    if (slideState == 1 || $(this).hasClass("on")) {
        return false        
    }
    else {
        slideState = 1;
        let targetN = $(this).index() + 1
        $("#numBtn li a").removeClass("on")
        $("#numBtn li a").eq(targetN-1).addClass("on")
        $("#articleWrap article.slide" + targetN).addClass("active")
            .css("opacity", 0)
            .animate({opacity: 1}, function() {
                $("#articleWrap article").not($(this)).removeClass("active")
                let sIndex = $(this).index()
                for (let i=0; i<sIndex; i++){
                    $("#articleWrap").append($("#articleWrap article:first"))
                }
                slideState = 0
            })
    }
})
// study 화면 도착 시 라인 나타나기
function animation() {
    if(windowN == 2 && windowMvState == 0) {
        setTimeout(function() {
            $(".subject:eq(0) li").addClass("stretch")
        }, 300)
        setTimeout(function() {
            $(".subject:eq(1) li").addClass("stretch")
        }, 1300)
    }
    else if (windowN != 2) $(".subject li").removeClass("stretch")
    console.log(windowN)
    if(windowN == 4 && windowMvState == 0) {
        setTimeout(function() {
            $("#content4 div").animate({right: 0})
        }, 300)
    }
    else if (windowN != 4) $("#content4 div").css({right: "-80%"})
}
