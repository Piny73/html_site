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
    let txdata = data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
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
            let prodotti=objJson["products"];
            let ris="";
            for(pr of prodotti){
                let riga=creaTRServizio(pr);
                ris+=riga;
            }
            let outputtag=document.querySelector("#tservizi tbody");
            outputtag.innerHTML=ris;
        });
}

function creaTRServizio(prodotto){
/*<tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
</tr>*/

let htmltr="<tr>";
htmltr+="<td>" + prodotto ["title"] + "</td>";
htmltr+="<td>" + prodotto ["category"] + "</td>";
htmltr+="<td width='50%'>" + prodotto ["description"] + "</td>";
htmltr+="<td><img class='thumb' src='" + prodotto ["images"][0] + "'></td>";
htmltr+="</tr>";
return htmltr;
}
