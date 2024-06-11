document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    init();
});

function init() {
    loadSelCategory();
    btnselcategory.addEventListener("click", selCategory);
    btnsort.addEventListener("click", selCategory);
    selCategory();
    setLoginForm();
    var timer = setInterval(refreshClock, 1000);
}

function refreshClock() {   
    const liorario = document.getElementById("orario");
    const time = getCurrentTime();
    liorario.innerHTML = "<a>" + time + "</a>";
}


function loadSelCategory() {
    let url = "https://dummyjson.com/products/categories";

    fetch(url)
        .then((resp) => {
            return resp.json()
        })
        .then((arrJson) => {
            let ris = "<option value=''>All categories</option>";
            for (let cat of arrJson) {
                //let opt = "<option value='" + cat["slug"] +"'>" + cat["name"] + "</option>";
                let opt = `<option value='${cat["slug"]}'>${cat.name}</option>`;

                ris += opt;
            }
            let outputtag = document.querySelector("#selcategory");
            outputtag.innerHTML = ris;

        });

}

function selCategory() {
    let selcat = document.querySelector("#selcategory");
    let url = "https://dummyjson.com/products/category/" + selcat.value;
    if (selcat.value == '')
        url = "https://dummyjson.com/products/";

    fetchProducts(url);

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



function fetchProducts(url) {
    let selord = document.getElementById("selsort").value;
    let fc = document.getElementById("fchoice");
    let direction = fc.elements.dir.value;

    //let querystring="?" + "&sortBy=" + selord + "&order=" + direction;
    let querystring = `?&sortBy=${selord}&order=${direction}`;

    url += querystring;
    fetch(url, {})
        .then((resp) => {
            return resp.json()
        }
        )
        .then((json) => {
            let objJson = json;
            let prodotti = objJson["products"];
            let ris = "";
            for (pr of prodotti) {
                let riga = creaTRSerivio(pr);
                ris += riga;
            }
            let outputtag = document.querySelector("#tservizi tbody");
            outputtag.innerHTML = ris;

        });
}

function creaDatiJsonByForm(mioform) { //passo il nome di un form id come testo "fdettaglio"
    const myform = document.getElementById(mioform); // mioform e' "fdettaglio" testo
    const fdata = new FormData(myform); // array entries di coppie key value
    //creo oggetto json javascript con input name del form
    const dati = Object.fromEntries(fdata.entries()); //creo oggetto json javascript con input name del form
    //creo tesrto string con oggetto json '{"title":"mio libro","price":"123","brad":"apple"}'
    const datijson = JSON.stringify(dati);
    return datijson;
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
    //window.history.back();  simula il pulsante indietro
}

function login() {
    const datijson = creaDatiJsonByForm("flogin");

    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: datijson
    })
        .then(res => res.json())
        .then(obj => {
            console.log(obj);
            sessionStorage.setItem("nome", obj.firstName);
            sessionStorage.setItem("cognome", obj.lastName);
            sessionStorage.setItem("token", obj.token);
            window.location.href = "gestioneprodotti.html";
        });
}

function setLoginForm() {
    if (sessionStorage.getItem("token")) {
        document.getElementById("lblmsglogin").innerHTML = "Benvenuto "
            + sessionStorage.getItem("nome")
            + " " + sessionStorage.getItem("cognome");
        document.getElementById("btnlogin").style.display = "none";
        document.getElementById("btnlogout").style.display = "block";
    }
    else {
        document.getElementById("lblmsglogin").innerHTML = "Effettua il Login"
        document.getElementById("btnlogin").style.display = "block";
        document.getElementById("btnlogout").style.display = "none";

    }


}


function visDettaglio(id) {
    let url = `https://dummyjson.com/products/${id}`;
    fetch(url, {})
        .then((resp) => {
            return resp.json()
        }
        )
        .then((json) => {
            let objJson = json;

            let ris = "";
            for (const key in objJson) {
                let riga = key + ": " + objJson[key];
                ris += riga + "<br>";
            }
            document.getElementById("title").value = objJson.title;
            document.getElementById("brand").value = objJson.brand;
            document.getElementById("category").value = objJson.category;
            document.getElementById("price").value = objJson.price;
            document.getElementById("description").innerHTML = objJson.description;

        });

}


function creaTRSerivio(prodotto) {
    /*  <tr>
            <td>title</td>
            <td>category</td>
            <td>description</td>
            <td>immagine</td>
        </tr>
                    */
    let htmltr = "<tr class='rigapr'>";
    //let anchor=`<a href="https://dummyjson.com/products/${prodotto.id}">${prodotto.title}</a>`;
    let anchor = `<a href="javascript:visDettaglio(${prodotto.id})">${prodotto.title}</a>`;

    htmltr += "<td>" + anchor + "</td>";
    htmltr += "<td>" + prodotto["category"] + "</td>";
    htmltr += "<td>" + prodotto["brand"] + "</td>";
    htmltr += "<td>" + prodotto["price"] + "</td>";

    htmltr += "<td width='40%'>" + prodotto["description"] + "</td>";

    htmltr += "<td><img class='thumb' src='" + prodotto["images"][0] + "'></td>";
    htmltr += "</tr>"
    return htmltr;

}