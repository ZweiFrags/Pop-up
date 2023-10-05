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
var maxw = window.innerWidth*.9
var maxh = window.innerHeight*.9
window.addEventListener("resize", ()=>{maxw = window.innerWidth*.9; maxh = window.innerHeight*.9;})
// create an gallery if there is attribute data-ppp-gal
function checkGallery(item) {
    if (item.hasAttribute("data-ppp-gal")) {
        var trgtAttr = item.getAttribute('data-ppp-gal');
        var allGalAttr = document.querySelectorAll('[data-ppp-gal="' + trgtAttr + '"]'); //find all elements with same value of an attribute data-ppp-gal
        ArrAllGalAttr = Array.from(allGalAttr); //create array of elements that are contains in our gallery
        lnghtofarr = ArrAllGalAttr.length;
        var arrowhldr = document.createElement('div');
        arrowhldr.className = "ppp_cntrls";
        arrowhldr.innerHTML = '<div class="ppp_prev" onclick="showimg(-1)">〈</div>     <div class="ppp_next" onclick="showimg(1)">〉</div>'; //create elements that control our gallery
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
        txtWrap.classList.add("ppp_txtwrap");
        txtWrap.insertAdjacentHTML('beforeend', item.innerHTML)
        out = txtWrap
    }
    return out
};

function buildMdl(pppVal) {
    var tmdiv = document.createElement('div');
    tmdiv.className = "ppp";
    if (typeof(pppVal) === 'object') { pppVal = pppVal.outerHTML; }
    tmdiv.innerHTML = '<div class="ppp_hldr"><figure id="ppp" class="marginppp">' + pppVal + '</figure><div class="ppp_close">×</div></div>';
    document.body.appendChild(tmdiv);
};

function showimg(n) {
    var fndpppinner = document.getElementById('ppp'); //Looking for pop-up
    var pppImg = fndpppinner.getElementsByTagName('img'); //looking for image in pop-up
    var sumofIndex = (currentImgIndex + n); // this thing will scroll your images(if it is gallery)
    currentImgIndex = sumofIndex;
    if (currentImgIndex == lnghtofarr) { //if we try to scroll more images than we have
        currentImgIndex = 0; //we will scroll to the first
    }
    if (currentImgIndex == -1) { //if we try to scroll less images than we have
        currentImgIndex = lnghtofarr - 1; //we will scroll to the last image
    }
	
    let itemsrc = ArrAllGalAttr[currentImgIndex].getAttribute('src');
    let itemDatasrc = ArrAllGalAttr[currentImgIndex].getAttribute('data-src');
    let currrentImgSrc = (itemsrc !== null) ? itemsrc : itemDatasrc; //Looking for src of next/previous image

	let pppImg2 = new Image()
	pppImg2.src = currrentImgSrc

    //pppImg[0].setAttribute('style', 'width:'+pppImg[0].pppImg2W +'px;height:'+pppImg[0].pppImg2H +'px')
    pppImg[0].setAttribute('style', 'width:'+pppImg[0].offsetWidth +'px;height:'+pppImg[0].offsetHeight +'px')
    fndpppinner.classList.add('ppp_loader');
    // pppImg[0].classList.add('-opaq');
	pppImg2.onload = function(){
    	fndpppinner.classList.add('ppp_fade');
    	fndpppinner.classList.remove('ppp_loader');

        let aRatio = pppImg2.width/pppImg2.height
        let pppImg2W = (maxw < pppImg2.width ) ? maxw : pppImg2.width
        let pppImg2H = (maxh < pppImg2.height ) ? maxh : pppImg2.height

        if(pppImg2H*aRatio > pppImg2W){ pppImg2H = pppImg2W/aRatio}else{pppImg2W = pppImg2H*aRatio}
    
		let srcIn
		let fadeOut
		clearTimeout(srcIn)
		clearTimeout(fadeOut)
		srcIn = setTimeout(function(){pppImg[0].src = currrentImgSrc
            pppImg[0].setAttribute('style', 'width:'+pppImg2W +'px;height:'+pppImg2H+'px')
        }, 200)
        
		fadeOut = setTimeout(()=>{fndpppinner.classList.remove('ppp_fade')}, 300)
		
		
	}
    var imgcaption = fndpppinner.getElementsByTagName('figcaption'); //looking for title/caption of pop-up
    if (ArrAllGalAttr[currentImgIndex].hasAttribute("data-ppp-title")) { //if there is present data-ppp-title
        var currentImgTtl = ArrAllGalAttr[currentImgIndex].getAttribute('data-ppp-title'); //Getting value of title/caption(if present)
        imgcaption[0].innerHTML = currentImgTtl; //changing caption/title of image in pop-up
    } else { //there is no data-ppp-title
        imgcaption[0].innerHTML = ''; //your caption will be empty
    }
}

function checkTitle(item) {
    fgrttl = document.createElement('div');
	let pppTitle = item.hasAttribute("data-ppp-title") ? item.getAttribute("data-ppp-title") : ''

	fgrttl.innerHTML = '<figcaption>' + pppTitle + '</figcaption>'; //create figcaption with title
    document.getElementById("ppp").appendChild(fgrttl); //append all your structure
}

function buildFrm(item) {
    var mark = document.createElement("div")
    mark.id = "mark"
    item.after(mark)
    item.removeAttribute("data-ppp")
    item.removeAttribute("data-ppp-form")
    let txtWrapClass = ''
    document.body.insertAdjacentHTML('beforeend', '<div class="ppp"><div class="ppp_hldr"><figure id="ppp" class="ppp_txtwrap marginppp '+ txtWrapClass +'"></figure><div class="ppp_close">×</div></div></div>');
    let pppId =  document.getElementById("ppp")
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
                    contents.setAttribute('data-ppp', "")
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