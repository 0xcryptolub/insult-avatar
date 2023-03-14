const avatarImg = document.querySelector('.avatar');
var userName = document.querySelector('.nameInput');
const button = document.querySelector('#button');
const insp = document.querySelector('.up-ins');
const instr = document.querySelector('.instr');
let h1 = document.querySelector('h1');
const refresh = document.querySelector('#refresh')
const download = document.querySelector('#download')
const copyr = document.querySelector('#copyr')
const share = document.querySelector('#share')
const Insult_Avatar_Key = "insult-avatar"

refresh.style.display='none'
download.style.display='none'
copyr.style.display='none'
share.style.display='none'

var inputName = "";
var gender;

var urlExtra = 'https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50';
var seed = '';
var hair = '';
var num;

var url = "https://api.dicebear.com/5.x/adventurer/svg?size=200&scale=90&radius=50";

const earring = parseInt(Math.random() * 6);
// url += "&earrings=variant0" + earring + "&earringsProbability=100";
// console.log(url);

userName.addEventListener('keyup', () => {
    inputName = userName.value;
    // console.log(inputName)
    var foundGender = "";
    fetch('https://api.genderize.io/?name=' + inputName)
    .then((res) => res.json())
    .then((data) => {
        foundGender = data.gender;
        gender = foundGender;
        if(inputName.length > 3){
            changeAvatar();
        }
        // console.log(foundGender + gender);
    })
    // console.log(url);
})
// Change the avatar
const changeAvatar = function(){
    seed = '&seed=' + userName.value;
    if(gender == 'male'){
        num = parseInt(Math.random() * 19);
        if(num==0) num=1;
        hair = '&hair=short' + ("0" + num).slice(-2);
    }
    if(gender == 'female'){
        num = parseInt(Math.random() * 26);
        if(num == 0) num = 1;
        hair = '&hair=long' + ("0" + num).slice(-2);
    }
    urlExtra = `${url}${seed}${hair}`
    // console.log(urlExtra);
    avatarImg.innerHTML = `
    <img
        src=${urlExtra}
        alt="avatar"
    />
    `
}

//trying to add insult feature

button.addEventListener('click', e =>{
    e.preventDefault()
    fetch('./insult.json')
    .then(response => response.json())
    .then(myObj => {
        refresh.style.display='block'
        download.style.display='block'
        copyr.style.display='block'
        share.style.display='block'
        h1.innerText= userName.value
        userName.style.display = 'none'

        let data = JSON.parse(localStorage.getItem('data')) || {"expire": "", "avatar": []};
        if (data.avatar.includes(userName.value)) {
            //console.log('hi');
            // instr.innerHTML='';
            instr.innerText="How many times in a day should i insult you ?";
        } 
        else 
        {
            const randomIndex = Math.floor(Math.random() * myObj["insults"].length);
            const randomInsult = myObj["insults"][randomIndex];
            // instr.innerHTML = '';
            instr.innerText = randomInsult;

            // Add userName.value to avatar array
            data.avatar.push(userName.value);
            localStorage.setItem('data', JSON.stringify(data));

            // Set expiresin date in local storage
            let expiresin = new Date();
            expiresin.setDate(expiresin.getDate() + 1);
            data.expire = expiresin.toISOString().slice(0,10);
            localStorage.setItem('data', JSON.stringify(data));
        }
  });
  
    button.style.display = 'none'
    refresh.addEventListener('click', ()=>{
        window.location.reload()
    })
})



