function init() {
    let liorario = document.getElementById("orario");
    let time = getCurrentTime();
    liorario.innerHTML = "<a>" + time + "</a>";
    let aorario = document.querySelector("#orario a");
    aorario.innerHTML = time;
    let btndata = document.querySelector("#btnData");
    /*btndata.addEventListener("click",  ()=>   {
        let data= new Date();
        let txdata=data.getUTCDate();
        alert(txdata);
     });
     */
    btndata.addEventListener("click", showData);
    fetchProducts();
}

function showOra() {
    let time = getCurrentTime();
    alert(time);
}


function showData() {
    let data = new Date();
    let txdata = data.getFullYear() + "-" + data.getMonth() + "-" + data.getDay();
    alert(txdata);
}

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    init();
});

function fetchProducts() {
    let url = "https://dummyjson.com/products";
    fetch(url, {})
        .then((resp) => {
            return resp.json()
        })
        .then((json) => {
            let objJson = json;
            console.log(objJson);
        });
}

