//var imgs = [document.getElementsByTagName('img')];
// var imgs = [document.querySelectorAll('img')];
var items = document.querySelectorAll('[data-ppp]');
// for(var i = 0; i < inputs.length; i++) {
//   if(inputs[i].type.toLowerCase() == 'text') {
//       alert(inputs[i].value);
//   }
// }
var tmdiv ="";
//testing change

items.forEach(function(item1){
 item1.addEventListener('click', function(e){
    //onclick=console.log(e.getAttribute("src"));
    var itemsrc = e.target.attributes.src;
    //console.log(e.attributes.src.nodeValue);
    var itemcntnt = e.target.innerHTML;
    console.log(e.target.attributes.src);
    if( e.target.attributes.src !== undefined){
      if( e.target.hasAttribute("data-ppp-title")){
        var itemsrc = e.target.attributes.src.nodeValue;
        var tmfgr = document.createElement('div');
        var fgrttl = e.target.getAttribute('data-ppp-title');
        tmfgr.className = "ppp";
        tmfgr.innerHTML = '<figure class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"><figcaption class="white">' + fgrttl +'</figcaption></div><div class="ppp_close" onclick="removePPP">✕</div></figure>';
        document.body.appendChild(tmfgr);
      }else{
        var itemsrc = e.target.attributes.src.nodeValue;
        var tmfgr = document.createElement('div');
        tmfgr.className = "ppp";
        tmfgr.innerHTML = '<figure class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></figure>';
        document.body.appendChild(tmfgr);
      }

      
      // var itemsrc = e.target.attributes.src.nodeValue;
      // var tmdiv = document.createElement('div');
      // tmdiv.className = "ppp";
      // tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
      // document.body.appendChild(tmdiv);
      ///////// if picture
    }else{
      var tmdiv = document.createElement('div');
      tmdiv.className = "ppp";
      tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
      document.body.appendChild(tmdiv);
    };

      ///////////////// data-gal
    if (e.target.hasAttribute("data-ppp-gal")) {
      console.log(e.target.getAttribute('data-ppp-gal'));
      var trgtAttr = e.target.getAttribute('data-ppp-gal');
      var allAttr = document.querySelectorAll('[data-ppp-gal="' + trgtAttr + '"]');
      var pppGalwrap = document.querySelector('.ppp_inner');
      console.log(allAttr);
      pppGalwrap.addEventListener('click', function(){
        console.log("TEST");
      })
    }else{
      console.log("We fucked up")
    };
    // document.getElementsByTagName('body')[0].removeChild(tmdiv);
    if (e.target.hasAttribute("data-ppp-pos")){
      console.log("teeest");
      var pppclass = document.querySelector(".ppp");
      pppclass.style.justifyContent = e.target.getAttribute('data-ppp-pos');
    }else{
      console.log("NO DATA-PPP-POS");
    };

    
    if (e.target.hasAttribute("data-ppp-id")){
      console.log("teeest");
      var trgtid = e.target.getAttribute('data-ppp-id');
      console.log(trgtid)
      if(document.contains(document.getElementById(trgtid)) && document.getElementById(trgtid).hasAttribute("alt")){
        console.log("Photo with id");
        var itemsrc = document.getElementById(trgtid).attributes.src.nodeValue;
        var tmdiv = document.createElement('div');
        tmdiv.className = "ppp";
        tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
        document.body.appendChild(tmdiv);
      }else{
        console.log("No photo with this id");
      var itemcntnt = document.getElementById(trgtid).innerHTML;
      var tmdiv = document.createElement('div');
      tmdiv.className = "ppp";
      tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
      document.body.appendChild(tmdiv);
      };
    }else{
      console.log("NO DATA-PPP-ID");
    };
    //get element with id(e.target.getData-ppp)
    // if (e.target.hasAttribute("data-ppp-id")){
    //   console.log("teeest");
    //   var trgtid = e.target.getAttribute('data-ppp-id')
    //   if(document.containt(document.getElementById(trgtid)) && e.target.hasAttribute("human-photo")){
    //     console.log("Photo with id");
    //     var itemsrc = e.target.attributes.src.nodeValue;
    //     var tmdiv = document.createElement('div');
    //     tmdiv.className = "ppp";
    //     tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
    //     document.body.appendChild(tmdiv);
    //   }else{
    //     console.log("No photo with this id");
    //   var tmdiv = document.createElement('div');
    //   tmdiv.className = "ppp";
    //   tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
    //   document.body.appendChild(tmdiv);
    //   };
    // }else{
    //   console.log("NO DATA-PPP-ID");
    // };

  });
});
document.addEventListener('click',function(e){  
    //-----CLOSE
    if(e.target && e.target.className == "ppp_close"){
      console.log(e.target.className + '!!!' )
      //do something  
      //var ppprem = document.getElementByClassName('ppp');
      var ppprem = e.target.closest('.ppp');
      //console.log(e.target.className + '!!!' + ppprem.className)
      //var parentDiv = ppprem.parentNode;
      //document.body.removeChild(ppprem);
      ppprem.remove();
    };
});
// document.addEventListener('click', function(e){
//   if (e.target.hasAttribute("data-ppp-id")){
//     console.log("teeest");
//     var trgtid = e.target.getAttribute('data-ppp-id');
//     console.log(trgtid)
//     if(document.contains(document.getElementById(trgtid)) && e.target.hasAttribute("human-photo")){
//       console.log("Photo with id");
//       var itemsrc = document.getElementById(trgtid).attributes.src.nodeValue;
//       var tmdiv = document.createElement('div');
//       tmdiv.className = "ppp";
//       tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner"><img class="marginppp" src="' + itemsrc + '"></div><div class="ppp_close" onclick="removePPP">✕</div></div>';
//       document.body.appendChild(tmdiv);
//     }else{
//       console.log("No photo with this id");
//     var itemcntnt = document.getElementById(trgtid).innerHTML;
//     var tmdiv = document.createElement('div');
//     tmdiv.className = "ppp";
//     tmdiv.innerHTML = '<div class="ppp_hldr"><div class="ppp_inner">' + itemcntnt + '</div><div class="ppp_close" onclick="removePPP">✕</div></div>';
//     document.body.appendChild(tmdiv);
//     };
//   }else{
//     console.log("NO DATA-PPP-ID");
//   };
// })
/// data-ppp-gal


function removePPP(e) {
  var ppprem = document.getElementByClassName('ppp');
  document.body.removeChild(ppprem);
  console.log(e + 'del');
};