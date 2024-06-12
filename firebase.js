const firebaseConfig = {
    apiKey: "AIzaSyDFPQAUK0r16olbrPpdAWXFxhbt15ss5FQ",
    authDomain: "project-jy-69a06.firebaseapp.com",
    databaseURL: "https://project-jy-69a06-default-rtdb.firebaseio.com",
    projectId: "project-jy-69a06",
    storageBucket: "project-jy-69a06.appspot.com",
    messagingSenderId: "821416339018",
    appId: "1:821416339018:web:ec902fe22789be79e528b3",
    measurementId: "G-BXWY87C8E6"
};

  // 파이어베이스 앱 초기화
const app = firebase.initializeApp(firebaseConfig);

// 파이어베이스 실시간 데이터베이스 생성
const database = firebase.database();

// 데이터 저장 실습
function writeUserData(userId, email, nick) {
    database.ref("users/"+userId).set({ //데이터베이스 안에 user를 찾는데 만약 없을 경우 새로 만든다. 입력받은 아이디를 저장한다.
        email: email,
        nick : nick
    });
}

// 데이터 읽기 실습
// 1. 전체 조회된 결과 출력
// - 테이블 태그 or 목록 태그를 활용해서 출력

// 2. 특정 사용자 조회
// -id값 입력받은 후 해당 사용자의 email, nick 출력
function readUserData(){
    // database.ref("users/jeongyoon").on('value', (snapshot)=>{ // 객체 접근 방법이 두가지 (1)
    database.ref("users/").on('value', (snapshot)=>{
        // 실시간 데이터베이스 값 접근
        console.log(snapshot.val());

        let data = snapshot.val();
        let keys = Object.keys(data);

        // 객체에 있는 키값들만 뽑아냄 //(2)
        console.log(Object.keys(data));
        console.log(data["jeongyoon"]);
        console.log(data[keys[2]]);

        const result = document.getElementById("result");
        const result2 = document.getElementById("result2");

        // 데이터베이스 웹 페이지 출력
        result.innerText=`${data[keys[0]].email} / ${data[keys[0]].nick}`; //이메일 / 닉네임

        let array = [];

        for(i = 0; i < keys.length; i++){
            
            array[i] = `${data[keys[i]].email} / ${data[keys[i]].nick}<br>`; 
        }
        result.innerHTML = array;

        if(Object.keys(data) === data["jeongyoon"]){
            result2.innerText=`${data[keys[0]].email} / ${data[keys[0]].nick}`;
        }
        
    })
}

////////////////////////////////////////////////////////////////////////////////

const sub = document.form.submit;
const btn = document.getElementById("btn");

btn.addEventListener("click", ()=>{
    readUserData();
})

sub.addEventListener("click",(event)=>{
    event.preventDefault();

    const id = document.form.id;
    const email = document.form.email;
    const nick = document.form.nick;

    console.log(`아이디: ${id.value}`);
    console.log(`이메일: ${email.value}`);
    console.log(`닉네임: ${nick.value}`);

    writeUserData(id.value, email.value, nick.value);
})