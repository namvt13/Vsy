"use strict";
const href = window.location.href.split("#");
if (href.length > 1) {
    window.location.href = href[0];
}
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", () => {
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
const regForm = document.querySelector("#regForm");
regForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(regForm);
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
