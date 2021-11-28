var tmdiv; //div that we are gonna create( aka content of pop-up)
var tmfgr; //figure element(with fig caption) that you are gonna create
var opened; //the element of gallery that we clicked (used only in gallery)
var allGalAttr; // all objects that have attribute data-ppp-gal with the same value
var index; // the index
var currentImgIndex; // index of the current image
var pppImg; //the image in pop-up
var ArrAllGalAttr; //array of all objects that have attribute data-ppp-gal with the same value
var lnghtofarr; // the lenght of ArrAllGalAttr ^
var hrefOfAjax; //href to the right html on the server
var idOfAjax; //used to get element with right id
var trgtAjax;

// create an gallery if there is attribute data-ppp-gal
function checkGallery(item) {
    if (item.hasAttribute("data-ppp-gal")) {
        var trgtAttr = item.getAttribute('data-ppp-gal');
        var allGalAttr = document.querySelectorAll('[data-ppp-gal="' + trgtAttr + '"]'); //find all elements with same value of an attribute data-ppp-gal
        ArrAllGalAttr = Array.from(allGalAttr); //create array of elements that are contains in our gallery
        lnghtofarr = ArrAllGalAttr.length;
        var arrowhldr = document.createElement('div');
        arrowhldr.className = "ppp_cntrls";
        arrowhldr.innerHTML = '<div class="ppp_prev_btn" onclick="showimg(-1)">〈</div>     <div class="ppp_next_btn" onclick="showimg(1)">〉</div>'; //create elements that control our gallery
        document.getElementsByTagName("figure")[0].appendChild(arrowhldr);
        ArrAllGalAttr.forEach((item, index) => {
            if (item.classList.contains('opened')) {
                currentImgIndex = index; // index of the current image
            }
            //controls for gallery ^
        })
    }
}

function GetSomeData() {
    fetch(hrefOfAjax) //relative link, if at the same level as our. The full link http://pop-up//data.html
        .then(response => response.text()).then(text => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(text, "text/html");
            const section = htmlDocument.getElementById(idOfAjax); // element that we are going to append
            if (section.attributes.src !== undefined) { //is img

                checkTitle(section);

            } else { // not img. Create div with some content
                buildMdl(section)
            };
        })
        //return(section.attributes.src);
}

function checkImage(item) {
    //var out;
    var itemsrc = item.getAttribute('src');
    if (item.attributes.src !== undefined) {
        out = document.createElement('img');
        out.setAttribute("src", item.attributes.src.value)
    } else {
        var txtWrap = document.createElement('div');
        txtWrap.classList.add("ppp-txtwrap");
        txtWrap.insertAdjacentHTML('beforeend', item.innerHTML)
        out = txtWrap
        console.log(item.innerHTML + ' ' + typeof(out))
            //out = txtWrap.appendChild(item.innerHTML);
    }
    return out
};

function buildMdl(pppVal) {
    var tmdiv = document.createElement('div');
    tmdiv.className = "ppp";
    if (typeof(pppVal) === 'object') { pppVal = pppVal.outerHTML; }
    tmdiv.innerHTML = '<div class="ppp_hldr"><figure class="ppp_inner marginppp">' + pppVal + '</figure><div class="ppp_close">✕</div></div>';
    document.body.appendChild(tmdiv);
    document.querySelectorAll(".ppp")[0].classList.add('TESTtransition');
    setTimeout(function() { document.querySelectorAll(".ppp")[0].classList.remove('TESTtransition') }, 20);
};

function showimg(n) {
    var fndpppinner = document.getElementsByClassName('ppp_inner'); //Looking for pop-up
    var pppImg = fndpppinner[0].getElementsByTagName('img'); //looking for image in pop-up
    var sumofIndex = (currentImgIndex + n); // this thing will scroll your images(if it is gallery)
    pppImg[0].classList.add('hddn_img');
    setTimeout(function() { pppImg[0].classList.remove('hddn_img') }, 20);
    currentImgIndex = sumofIndex;
    if (currentImgIndex == lnghtofarr) { //if we try to scroll more images than we have
        currentImgIndex = 0; //we will scroll to the first
    }
    if (currentImgIndex == -1) { //if we try to scroll less images than we have
        currentImgIndex = lnghtofarr - 1; //we will scroll to the last image
    }
    var currrentImgSrc = ArrAllGalAttr[currentImgIndex].getAttribute('src'); //Looking for src of next/previous image

    pppImg[0].src = currrentImgSrc; // changing pop-up image
    var imgcaption = fndpppinner[0].getElementsByTagName('figcaption'); //looking for title/caption of pop-up
    if (ArrAllGalAttr[currentImgIndex].hasAttribute("data-ppp-title")) { //if there is present data-ppp-title
        var currentImgTtl = ArrAllGalAttr[currentImgIndex].getAttribute('data-ppp-title'); //Getting value of title/caption(if present)
        imgcaption[0].innerHTML = currentImgTtl; //changing caption/title of image in pop-up
    } else { //there is no data-ppp-title
        imgcaption[0].innerHTML = ''; //your caption will be empty
    }
}

function checkTitle(item) {
    // var itemsrc = item.getAttribute('src');
    fgrttl = document.createElement('div');
    // tmfgr.className = "ppp TESTtransition";
    console.log(item.getAttribute("data-ppp-title"))
    if (item.hasAttribute("data-ppp-title")) {
        fgrttl.innerHTML = '<figcaption class="white">' + item.getAttribute('data-ppp-title') + '</figcaption>'; //create figcaption with title
    } else {
        fgrttl.innerHTML = '<figcaption class="white"></figcaption>'; //create figcaption without title
    }
    //tmfgr.innerHTML = '<figure class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '">' + fgrttl +'</div><div class="ppp_close">✕</div></figure>'; //create html with caption
    document.body.getElementsByTagName("figure")[0].appendChild(fgrttl); //append all your structure
    //setTimeout(function(){document.querySelectorAll(".ppp")[0].classList.remove('TESTtransition')}, 20);
}

document.addEventListener('click', function(e) {
    ///// find data id
    if (e.target.hasAttribute("data-ppp-id")) {
        var trgtid = e.target.getAttribute('data-ppp-id') //get the value of attribute data-pp-id
        if (document.contains(document.getElementById(trgtid)) && document.getElementById(trgtid).getAttribute('src') != undefined) { //if image
            var itemid = document.getElementById(trgtid);
            buildMdl(itemid)
        } else { //if not image(text)
            var itemcntnt = document.getElementById(trgtid).innerHTML; //get the content of element
            buildMdl(itemcntnt)
        };
    }

    //-----close
    if (e.target && e.target.className == "ppp_close") {
        var ppprem = e.target.closest('.ppp');
        ppprem.classList.add('TESTtransition');
        setTimeout(function() { ppprem.remove() }, 500);
        if (opened.classList.contains('opened')) {
            opened.classList.remove('opened');
        }
    }; //close gallery

    hrefOfAjax = e.target.getAttribute("href"); //href to html
    if (e.target.getAttribute("data-href") == "ajax" && hrefOfAjax != undefined) {
        idOfAjax = e.target.getAttribute("data-ajax-id");
        trgtAjax = document.querySelector("[data-ajax-id]", idOfAjax)
        GetSomeData(hrefOfAjax);
    };
    if (e.target.hasAttribute("data-ppp")) {
        itemcntnt = checkImage(e.target)
        e.target.classList.add('opened');
        opened = e.target;
        buildMdl(itemcntnt)
        checkTitle(e.target)
        checkGallery(e.target)
        if (e.target.hasAttribute("data-ppp-pos")) {
            var pppclass = document.querySelector(".ppp"); //get the element with ppp class
            pppclass.style.justifyContent = e.target.getAttribute('data-ppp-pos'); // change position of pop-up(by value of data-ppp-pos)
        }


    }
});