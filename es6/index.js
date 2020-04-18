'use strict';

document.addEventListener("DOMContentLoaded", function() {
  let lazyloadImages = document.querySelectorAll("img.lazy");    
  let lazyloadThrottleTimeout;
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        let scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});


jQuery(document).ready(function($) {
    $('.elements-gride').masonry({
        itemSelector: '.element-item',
    });
});

$('.hh').hover(function(){
    $('.news_content_read').css('display', 'flex');
});

function ValidMail() {
    let re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let myMail = document.getElementById('email').value;
    let valid = re.test(myMail);
    if (valid) {
        console.log('Email Address mail entered correctly!');
    }
    else document.getElementById('comment-mail').innerHTML = 'Wrong email format';
    return;
}

  
let newsArray=[];
let offset = 0;
let loading = document.getElementById('news_loading');
document.querySelector(".load_button").onclick = function(){
    if (newsArray.length === 0) {
    let request = new XMLHttpRequest();
    request.open('GET','https://jsonplaceholder.typicode.com/posts',true);
    request.addEventListener('readystatechange', function() {
      if ((request.readyState==4) && (request.status==200)) {
        JSON.parse(request.responseText).forEach((el) => {
            console.log(el);
            newsArray.push(el);
        });
        display();
      }
    });
    request.send();
    } else {
        display();
    }
}

let display = function() {
    for (let i=offset; i<offset+6; i++){
        let el = newsArray[i];     
        let newImg = document.createElement('div');
        let newLi = document.createElement('li');
        let newName = document.createElement('h2');
        let newText = document.createElement('p');

        newImg.className = "list-img";
        newLi.className = "list";
        newName.className = "new-title";
        newText.className = "new-body";

        newLi.append(newImg, newName, newText);

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        newImg.innerHTML = "<img src='https://i.picsum.photos/id/" +  getRandomInt(1000) + "/432/288.jpg'>";
        newName.innerHTML = el.title;
        newText.innerHTML = el.body;

        loading.append(newLi);
    }
    offset=+6;
}