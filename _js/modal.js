var auth = document.getElementById('auth'); //로그인 모달창 배경
var reg = document.getElementById('reg');   //회원가입 모달창 배경
var loginbtn = document.getElementById('loginbtn'); //로그인 버튼
var logoutbtn = document.getElementById('logoutbtn');   //로그아웃 버튼
var regbtn = document.getElementById('regbtn'); //회원가입 버튼
var replycontent;   //댓글 내용 임시저장 변수

function ShowAuth(){    //로그인 버튼 클릭시 모달창 보이게
    auth.style.display = "block";
}
function ShowReg(){ //회원가입 버튼 클릭시 모달창 보이게
    reg.style.display = "block";
}

//흰색 부분 외의 부분을 클릭하면 모달창, 검색창 닫기
window.onclick = function(event){
    //로그인 모달창
    if(event.target == auth){
        auth.style.display = "none";
    }
    //회원가입 모달창
    if(event.target == reg){
        reg.style.display = "none";
    }
}

//회원가입 (로컬스토리지에 회원정보 저장)
function register(){
    var id = document.getElementById("regid").value;
    var pw = document.getElementById("regpw").value;
    var pwdcheck = document.getElementById("regpwck").value;
    //id 중복시 예외처리
    if(localStorage.getItem(id)!=null){
        alert("이미 존재하는 ID 입니다.");
        return;
    }

    //회원가입 양식이 올바른지 확인하는 알고리즘
    //참고 : 학번, 이름, 학과 필드는 현재는 아무 기능이 없는 장식임.
    if(pw==pwdcheck && id!="" && pw!=""){
        //id를 키값으로, pw를 데이터값으로 가지게 하여 로컬스토리지에 회원 정보를 저장
        localStorage.setItem(id, pw);
        //모달창 자동닫힘
        reg.style.display = "none";
        alert("회원가입 되었습니다. 로그인 해주세요.");
    }
    else{
        if(id==""||pw==""){ //아이디나 비밀번호가 공백인 경우(입력하지 않은 경우)
            alert("아이디와 비밀번호는 공백일 수 없습니다!");
        }
        else{   //입력한 비밀번호와 비밀번호 확인이 일치하지 않는 경우
            alert("비밀번호 / 비밀번호 확인값이 서로 일치하지 않습니다!");
        }
    }
}

//로그인 (세션스토리지에 로그인 세션 저장)
function login(){
    var id = document.getElementById("authid").value;
    var pw = document.getElementById("authpw").value;
    if(localStorage.getItem(id)==pw && id!=""){
        //해당 아이디의 비밀번호값을 로드해서 입력된 비밀번호 값과 대조, 맞는지 확인하고 맞으면 계속 진행
        alert("로그인 되었습니다!");
        //로그인 세션 생성
        sessionStorage.setItem("presentid",id);
        sessionStorage.setItem("islogin","1");
        //로그인, 회원가입 버튼 제거 및 로그아웃, 회원탈퇴 버튼 생성
        loginbtn.style.display = "none";
        regbtn.style.display = "none";
        logoutbtn.style.display = "block";
        resignbtn.style.display = "block";
        //모달창 자동닫힘
        auth.style.display = "none";
        return;
    }
    else{
        alert("아이디와 비밀번호를 다시 확인하세요.");
        return;
    }
}

//로그아웃 (세션스토리지의 로그인 세션 삭제)
function logout(){
    alert("로그아웃 되었습니다!");
    //로그인 세션 제거(무력화)
    sessionStorage.clear();
    //로그인, 회원가입 버튼 생성 및 로그아웃, 회원탈퇴 버튼 제거
    loginbtn.style.display = "block";
    regbtn.style.display = "block";
    logoutbtn.style.display = "none";
    resignbtn.style.display = "none";
}

//회원탈퇴 (로컬스토리지에서 해당 회원정보 삭제)
function resign(){
    localStorage.removeItem(sessionStorage.getItem("presentid"));
    alert("회원탈퇴 되었습니다. 잠시 후 자동으로 로그아웃 됩니다.");
    logout();
}

//로그인 되었는지 여부를 확인하는 함수
function islogin(){
    if(sessionStorage.getItem("islogin")=="1"){
        return 1;
    }
    else{
        return 0;
    }
}

//페이지가 로드될 때마다 회원여부 확인 및 댓글 달기 기능 활성화
$(document).ready(function btnctrl(){
    //로그인 여부에 따라 버튼을 다르게 표출해주는 분기문
    if(islogin()==1){
        //로그인 된 경우
        loginbtn.style.display = "none";
        regbtn.style.display = "none";
        logoutbtn.style.display = "block";
        resignbtn.style.display = "block";
    }
    else{
        //로그인 되지 않은 경우
        loginbtn.style.display = "block";
        regbtn.style.display = "block";
        logoutbtn.style.display = "none";
        resignbtn.style.display = "none";
    }

    //댓글 달기 기능
    $("#submitreply").click(function(){
        if(islogin()==1){
            //로그인 한 경우
            replycontent=$('#replycontent').val();  //댓글입력창(textarea) 부분 내용 읽어와 임시변수에 저장
            $("#reply").append("<div><br/><b>" + sessionStorage.getItem("presentid")+ "</b><br/>" + replycontent + "<hr/></div>");
            //댓글 내용을 페이지에 추가
            document.getElementById("replycontent").value='';   //입력창 부분 내용 초기화
        }
        else{
            //로그인 하지 않은 경우
            alert("댓글은 회원만 달 수 있습니다! 먼저 로그인을 해주세요.");
        }
    });
});
