"use strict";
const href1 = window.location.href.split("#");
if (href1.length > 1) {
    window.location.href = href1[0];
}
const searchBtn1 = document.querySelector("#searchBtn");
searchBtn1.addEventListener("click", () => {
    fetch("/search", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            term: "mca"
        })
    })
        .then((res) => {
        return res.json();
    })
        .then((results) => {
        alert(JSON.stringify(results));
    });
});
const regForm2 = document.querySelector("#regForm");
regForm2.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(regForm2);
    let postData = {};
    formData.forEach((value, key) => {
        postData[key] = value;
    });
    fetch("auth/login", {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify(postData)
    })
        .then((res) => {
        return res.json();
    })
        .then((data) => {
        console.log("DATATAT");
        console.log(data);
    });
});
