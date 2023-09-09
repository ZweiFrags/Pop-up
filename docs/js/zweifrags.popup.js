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
        Array.from(document.querySelectorAll("figure")).pop().appendChild(arrowhldr);
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
            if (section.attributes.src !== undefined || section.attributes.data-src !== undefined) { //is img

                checkTitle(section);

            } else { // not img. Create div with some content
                buildMdl(section)
            };
        })
}

function checkImage(item) {
    let itemsrc = item.getAttribute('src');
    let itemDatasrc = item.getAttribute('data-src');
     
    if(itemsrc || itemDatasrc){
        out = document.createElement('img');
        let imgSrc = (itemsrc !== null) ? itemsrc : itemDatasrc;
        out.setAttribute("src", imgSrc)
    } else {
        var txtWrap = document.createElement('div');
        txtWrap.classList.add("ppp-txtwrap");
        txtWrap.insertAdjacentHTML('beforeend', item.innerHTML)
        out = txtWrap
    }
    return out
};

function buildMdl(pppVal) {
    var tmdiv = document.createElement('div');
    tmdiv.className = "ppp";
    if (typeof(pppVal) === 'object') { pppVal = pppVal.outerHTML; }
    tmdiv.innerHTML = '<div class="ppp_hldr"><figure class="ppp_inner marginppp">' + pppVal + '</figure><div class="ppp_close">×</div></div>';
    document.body.appendChild(tmdiv);
};

function showimg(n) {
    var fndpppinner = document.getElementsByClassName('ppp_inner'); //Looking for pop-up
    var pppImg = fndpppinner[0].getElementsByTagName('img'); //looking for image in pop-up
    var sumofIndex = (currentImgIndex + n); // this thing will scroll your images(if it is gallery)
    currentImgIndex = sumofIndex;
    if (currentImgIndex == lnghtofarr) { //if we try to scroll more images than we have
        currentImgIndex = 0; //we will scroll to the first
    }
    if (currentImgIndex == -1) { //if we try to scroll less images than we have
        currentImgIndex = lnghtofarr - 1; //we will scroll to the last image
    }

    pppImg[0].classList.add('-opaq');
    let itemsrc = ArrAllGalAttr[currentImgIndex].getAttribute('src');
    let itemDatasrc = ArrAllGalAttr[currentImgIndex].getAttribute('data-src');
    let currrentImgSrc = (itemsrc !== null) ? itemsrc : itemDatasrc; //Looking for src of next/previous image

    pppImg[0].src = currrentImgSrc; // changing pop-up image
    setTimeout(function() { pppImg[0].classList.remove('-opaq') }, 100);
    var imgcaption = fndpppinner[0].getElementsByTagName('figcaption'); //looking for title/caption of pop-up
    if (ArrAllGalAttr[currentImgIndex].hasAttribute("data-ppp-title")) { //if there is present data-ppp-title
        var currentImgTtl = ArrAllGalAttr[currentImgIndex].getAttribute('data-ppp-title'); //Getting value of title/caption(if present)
        imgcaption[0].innerHTML = currentImgTtl; //changing caption/title of image in pop-up
    } else { //there is no data-ppp-title
        imgcaption[0].innerHTML = ''; //your caption will be empty
    }
}

function checkTitle(item) {
    fgrttl = document.createElement('div');
    if (item.hasAttribute("data-ppp-title")) {
        fgrttl.innerHTML = '<figcaption class="white">' + item.getAttribute('data-ppp-title') + '</figcaption>'; //create figcaption with title
    } else {
        fgrttl.innerHTML = '<figcaption class="white"></figcaption>'; //create figcaption without title
    }
    document.body.getElementsByTagName("figure")[0].appendChild(fgrttl); //append all your structure
}

function buildFrm(item) {
    var mark = document.createElement("div")
    mark.id = "mark"
    item.after(mark)
    item.removeAttribute("data-ppp")
    item.removeAttribute("data-ppp-form")
    let txtWrapClass = ''
    document.body.insertAdjacentHTML('beforeend', '<div class="ppp"><div class="ppp_hldr"><figure class="ppp_inner marginppp '+ txtWrapClass +'" id="ppp"></figure><div class="ppp_close">×</div></div></div>');
    let pppId =  document.getElementById('ppp')
    pppId.insertAdjacentElement('afterbegin',item)
    
}



document.addEventListener('click', function(e) {
    ///// find data id
    if (e.target.hasAttribute("data-ppp-id")) {
        var trgtid = e.target.getAttribute('data-ppp-id') //get the value of attribute data-pp-id
        if (e.target.hasAttribute("data-ppp-form")){
            var target = document.getElementById(trgtid)
            buildFrm(target)
        } else {
            if (document.contains(document.getElementById(trgtid)) && document.getElementById(trgtid).getAttribute('src') != undefined) { //if image
                var itemid = document.getElementById(trgtid);
                buildMdl(itemid)
            } else { //if not image(text)
                var itemcntnt = document.getElementById(trgtid).innerHTML; //get the content of element
                buildMdl(itemcntnt)
            };
        }
    }
    //-----close
        if (e.target && ['ppp_close', 'ppp'].includes(e.target.className)) {
            var ppprem = e.target.closest('.ppp');
                if(document.getElementById("mark")){
                    var marked = document.getElementById("mark")
                    var contents = this.getElementById("ppp").children[0]
                    contents.setAttribute("data-ppp", "")
                    contents.setAttribute("data-ppp-form", "")
                    marked.insertAdjacentElement("afterend", contents)
                    var parentElement = marked.parentNode
                    insertedElement = parentElement.insertBefore(contents, marked);
                    marked.remove()
                }
                ppprem.classList.add('ppp_out');
                setTimeout(function() { ppprem.remove() }, 400);
                if (opened != undefined) {
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
            if (e.target.hasAttribute("data-ppp-form")){
                buildFrm(e.target)
            } else {
                itemcntnt = checkImage(e.target)
                e.target.classList.add('opened');
                opened = e.target;
                buildMdl(itemcntnt)
                checkTitle(e.target)
                checkGallery(e.target)
            if (e.target.hasAttribute("data-ppp-pos")) {
                document.getElementsByClassName("ppp_hldr")[0].classList.add(e.target.getAttribute("data-ppp-pos")) // change position of pop-up(by value of data-ppp-pos)
                
            }
        }
        }
});