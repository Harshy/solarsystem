// ==================================================
// FIREBASE + INSTANT HEART LIKE SYSTEM
// ==================================================

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    increment
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



// ==================================================
// FIREBASE CONFIG
// ==================================================

const firebaseConfig = {

    apiKey: "AIzaSyCc4vVxwZgkPSi7zErNwiMd_w64zUH_p5Q",

    authDomain: "solarsystem-69aca.firebaseapp.com",

    projectId: "solarsystem-69aca",

    storageBucket: "solarsystem-69aca.firebasestorage.app",

    messagingSenderId: "294308578332",

    appId: "1:294308578332:web:ba2b3a203e0ca916278bd9"

};



// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



// Firestore location

const heartRef = doc(
    db,
    "likes",
    "counter"
);



// ==================================================
// ELEMENTS
// ==================================================

const heartBtn =
document.getElementById("heartBtn");


const heartCount =
document.getElementById("heartCount");



// ==================================================
// LOAD HEART COUNT
// ==================================================

async function loadHearts(){

    try{

        const snap =
        await getDoc(heartRef);


        if(snap.exists()){


            const count =
            snap.data().count;


            heartCount.dataset.value =
            count;


            heartCount.textContent =
            count + " ❤️";


        }


    }

    catch(error){

        console.error(
            "Firebase loading error:",
            error
        );


        heartCount.textContent =
        "❤️ Error";

    }

}



// ==================================================
// CHECK SAVED LIKE
// ==================================================

if(localStorage.getItem("hearted")){

    heartBtn.classList.add(
        "liked"
    );

}



// ==================================================
// CLICK LIKE / UNLIKE
// ==================================================

heartBtn.addEventListener(

"click",

async()=>{


    const liked =
    localStorage.getItem("hearted");



    let current =
    Number(
        heartCount.dataset.value || 1543
    );



    // =============================
    // REMOVE HEART
    // =============================

    if(liked){


        localStorage.removeItem(
            "hearted"
        );


        heartBtn.classList.remove(
            "liked"
        );


        current--;


        heartCount.dataset.value =
        current;


        heartCount.textContent =
        current + " ❤️" ;



    }


    // =============================
    // ADD HEART
    // =============================

    else{


        localStorage.setItem(
            "hearted",
            "true"
        );


        heartBtn.classList.remove(
            "liked"
        );


        void heartBtn.offsetWidth;


        heartBtn.classList.add(
            "liked"
        );


        current++;


        heartCount.dataset.value =
        current;


        heartCount.textContent =
        current + " ❤️";



        // Floating hearts

        for(
            let i=0;
            i<10;
            i++
        ){

            setTimeout(
                spawnHeart,
                i*80
            );

        }


    }



    // =============================
    // UPDATE FIREBASE
    // =============================

    try{


        await updateDoc(

            heartRef,

            {

                count:
                increment(
                    liked ? -1 : 1
                )

            }

        );


    }

    catch(error){

        console.error(
            "Firebase update failed:",
            error
        );

    }



});




// ==================================================
// FLOATING HEARTS
// ==================================================

function spawnHeart(){


    const h =
    document.createElement(
        "span"
    );


    h.className =
    "floating-heart";


    h.innerHTML =
    "❤";



    h.style.setProperty(

        "--x",

        (Math.random()*90-45)
        + "px"

    );



    const container =
    document.getElementById(
        "heartParticles"
    );


    if(container){

        container.appendChild(h);

    }



    setTimeout(()=>{

        h.remove();

    },1600);


}



// Start

loadHearts();

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

cancelAnimationFrame(animationId);

}else{

requestAnimationFrame(animateStars);

}

});
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 180;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", () => {
    resizeCanvas();
    createStars();
});

function createStars() {

    stars = [];

    for(let i=0;i<STAR_COUNT;i++){

        stars.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            radius:Math.random()*2,

            speed:0.1+Math.random()*0.3,

            alpha:0.3+Math.random()*0.7,

            twinkle:Math.random()*Math.PI*2

        });

    }

}

createStars();

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.y+=star.speed;

        if(star.y>canvas.height){

            star.y=0;

            star.x=Math.random()*canvas.width;

        }

        star.twinkle+=0.03;

        let opacity=star.alpha+Math.sin(star.twinkle)*0.2;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI*2
        );

        ctx.fillStyle=`rgba(255,255,255,${opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(animate);

}

animate();
