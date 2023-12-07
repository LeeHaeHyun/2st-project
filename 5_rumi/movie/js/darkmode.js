//dark mode 토글 버튼
const checkbox = document.getElementById('checkbox');

//change_d_l

//darkmode를 적용하기위해 태그를 가져오고 <html>에 class="dark"를 적요앻야 함
const html = document.querySelector('html');

// const toggleDarkmode = () => checkbox.checked ? html.classList.add('dark')  : html.classList.remove('dark');

const toggleDarkmode = function (){

    if(checkbox.checked)
    {
        html.classList.add('dark');
        document.querySelector('img').src = "./img/moon.png";
    }
    else{
        html.classList.remove('dark');
        document.querySelector('img').src = "./img/sun.png";
    }
}

checkbox.addEventListener('click', toggleDarkmode);
