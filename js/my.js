var items = document.querySelectorAll('[data-ppp]');
var tmdiv;
var tmfgr;
var opened;
var allElAttr;
var index;
var currentImgIndex;
var pppImg;
var ArrAllElAttr;
var lnghtofarr;
var hrefOfAjax; //href to the right html on the server
var idOfAjax; //to get element with right id
var trgtAjax;

// create an gallery if there is data-ppp-gal
function checkGallery(item){
  if (item.hasAttribute("data-ppp-gal")) {
    console.log(item.getAttribute('data-ppp-gal'));
    var trgtAttr = item.getAttribute('data-ppp-gal');
    var allElAttr = document.querySelectorAll('[data-ppp-gal="' + trgtAttr + '"]');
    console.log(allElAttr);
    ArrAllElAttr = Array.from(allElAttr); //create array of elements that are contains in our gallery
    lnghtofarr = ArrAllElAttr.length;
      var arrowhldr = document.createElement('div');
      arrowhldr.className = "ppp_cntrls";
      arrowhldr.innerHTML = '<div class="ppp_prev_btn" onclick="showimg(-1)">〈</div>     <div class="ppp_next_btn" onclick="showimg(1)">〉</div>';
      tmfgr.firstChild.appendChild(arrowhldr);
      ArrAllElAttr.forEach((item, index)  => {
        if(item.classList.contains('opened')){
          console.log('index = ' + index);
          currentImgIndex = index;
      }
      //controls for gallery ^
      })
  }
}

// create check if it is href to ajax
// data-ppp-ajax or data-ppp=ajax
//if data-ppp="ajax" then get href of this element and get data from. double check using &&

function GetSomeData(){
  console.log(idOfAjax);
  fetch(hrefOfAjax) //относительная ссылка,е сли на одном и том же уровне. поолная ссылка http://pop-up//data.html
  .then(response => response.text()
  ).then(text => {  
    console.log(text);
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(text, "text/html");
    console.log(htmlDocument);
    const section = htmlDocument.getElementById(idOfAjax);
    console.log(section);
    if( section.attributes.src !== undefined){ //is img
 
      checkTitle(section);

      checkGallery(section);

      ///////// if picture
    }else{ // not img. Create div with some content
      var tmdiv = document.createElement('div');
       tmdiv.className = "ppp";
       console.log(typeof section);
      //  const sectionHTML = JSON.stringify(section);
      tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
       document.body.appendChild(tmdiv);
       document.querySelector(".ppp_inner").appendChild(section);
      // console.log(sectionHTML);
    };
  })
}

function showimg(n){
  var fndpppinner = document.getElementsByClassName('ppp_inner'); //Looking for pop-up
  var pppImg = fndpppinner[0].getElementsByTagName('img'); //looking for image in pop-up
  var sumofIndex = (currentImgIndex + n);
  pppImg[0].classList.add('hddn_img');
  setTimeout(function(){pppImg[0].classList.remove('hddn_img')}, 20);
  currentImgIndex = sumofIndex;
  if(currentImgIndex == lnghtofarr){
    currentImgIndex = 0;
  }
  if(currentImgIndex == -1){
    currentImgIndex = lnghtofarr - 1;
  }
  var currrentImgSrc = ArrAllElAttr[currentImgIndex].getAttribute('src'); //Looking for src of next/previous image
  console.log(currrentImgSrc);
    
  

      pppImg[0].src = currrentImgSrc; // changing pop-up image

        var imgcaption = fndpppinner[0].getElementsByTagName('figcaption'); //looking for title/caption of pop-up
        if( ArrAllElAttr[currentImgIndex].hasAttribute("data-ppp-title")){
          var currentImgTtl = ArrAllElAttr[currentImgIndex].getAttribute('data-ppp-title'); //Getting value of title/caption(if present)
          imgcaption[0].innerHTML = currentImgTtl;//changing caption/title of image in pop-up
        }else{
          imgcaption[0].innerHTML = '';
        }
  console.log(pppImg[0].classList);

  

}



function checkTitle(item){
    var itemsrc = item.getAttribute('src');
    tmfgr = document.createElement('div');
    tmfgr.className = "ppp";
    var fgrttl = "";
if( item.hasAttribute("data-ppp-title")){
  var fgrttl = '<figcaption class="white">' + item.getAttribute('data-ppp-title') + '</figcaption>'; //create figcaption with title
  }else{
  var fgrttl = '<figcaption class="white"></figcaption>';//create figcaption without title
  }
  tmfgr.innerHTML = '<figure class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '">' + fgrttl +'</div><div class="ppp_close" onclick="removePPP">✕</div></figure>';
    document.body.appendChild(tmfgr);
}


function ppp (items){ // change name
  items.addEventListener('click', function(e){
     //onclick=console.log(e.getAttribute("src"));
     var itemsrc = e.target.getAttribute('src');
     //console.log(e.attributes.src.nodeValue);
     var itemcntnt = e.target.innerHTML;
     e.target.classList.add('opened');
     opened = e.target;
     console.log(e.target.attributes.src);
     if( e.target.attributes.src !== undefined){ //is img
 
       checkTitle(e.target);
 
       checkGallery(e.target);
 
       ///////// if picture
     }else{ // not img. Create div with some content
       var tmdiv = document.createElement('div');
       tmdiv.className = "ppp";
       tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
       document.body.appendChild(tmdiv);
     };
     if (e.target.hasAttribute("data-ppp-pos")){
       console.log("teeest");
       var pppclass = document.querySelector(".ppp");
       pppclass.style.justifyContent = e.target.getAttribute('data-ppp-pos'); // change position of pop-up
     }else{
       console.log("NO DATA-PPP-POS");
     };
 
     ///// find data id
     if (e.target.hasAttribute("data-ppp-id")){
       var trgtid = e.target.getAttribute('data-ppp-id')
       if(document.contains(document.getElementById(trgtid)) && document.getElementById(trgtid).hasAttribute("alt")){
         var itemsrc = document.getElementById(trgtid).getAttribute('src');
         var tmdiv = document.createElement('div');
         tmdiv.className = "ppp";
         tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
         document.body.appendChild(tmdiv);   // create pop-up(image) on click on the button or anything else with same id as data-ppp-id value
       }else{
       var itemcntnt = document.getElementById(trgtid).innerHTML;
       var tmdiv = document.createElement('div');
       tmdiv.className = "ppp";
       tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
       document.body.appendChild(tmdiv); // create pop-up(text) on click on the button or anything else with same id as data-ppp-id value
       };
     }else{
       console.log("NO DATA-PPP-ID");
     };
   });
 }




items.forEach(ppp);

document.addEventListener('click',function(e){  
  //-----close
  console.log("testing console")
  if(e.target && e.target.className == "ppp_close"){ 
    var ppprem = e.target.closest('.ppp');
    ppprem.remove();
    opened.classList.remove('opened');
  };
  hrefOfAjax = e.target.getAttribute("href");
  
  if(e.target.getAttribute("data-href") == "ajax" && hrefOfAjax != undefined){
    idOfAjax = e.target.getAttribute("data-ajax-id");
    trgtAjax = document.querySelector("[data-ajax-id]", idOfAjax)
    console.log(idOfAjax);
    GetSomeData(hrefOfAjax);
  };
});


function removePPP(e) {
  var ppprem = document.getElementByClassName('ppp');
  document.body.removeChild(ppprem);
  console.log(e + 'del');
};