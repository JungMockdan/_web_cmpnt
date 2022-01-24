let defaultStyle = ` * {
  margin: 0;
  padding: 0;
}

body {
  margin: 100px;
}

.pop-layer .pop-container {
  padding: 20px 25px;
}

.pop-layer p.ctxt {
  color: #666;
  line-height: 25px;
}

.pop-layer .btn-r {
  width: 100%;
  margin: 10px 0 20px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  text-align: right;
}

.pop-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 410px;
  height: auto;
  background-color: #fff;
  border: 5px solid #3571b5;
  z-index: 10;
}

.dim-layer {
  display: none;
  position: fixed;
  _position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.dim-layer .dimBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  filter: alpha(opacity=50);
}

.dim-layer .pop-layer {
  display: block;
}

a.btn-layerClose {
  display: inline-block;
  height: 25px;
  padding: 0 14px 0;
  border: 1px solid #304a8a;
  background-color: #3f5a9d;
  font-size: 13px;
  color: #fff;
  line-height: 25px;
}

a.btn-layerClose:hover {
  border: 1px solid #091940;
  background-color: #1f326a;
  color: #fff;
}`;

class PopUp extends HTMLElement {


  // 변경 감지할 어트리뷰트 열거하기 : attributeChangedCallback
  //   static get observedAttributes() {
  //     return ["c", "l"];
  //   }
  static get observedAttributes() {
    return ['status', 'msg'];
  }
  constructor(type) {
    super();
    const shadow = this.attachShadow({ mode: "open" });
   
    let style = document.createElement("style");
    let div = document.createElement("div");
    div.setAttribute('id','layer1');
    div.setAttribute('class','pop-layer');
    let divChild = `
    <div class="pop-container">
        <div class="pop-conts">
            <!--content //-->
            <p class="ctxt mb20">
            Thank you.<br />
            Your registration was submitted successfully.<br />
            Selected invitees will be notified by e-mail on JANUARY 24th.<br /><br />
            Hope to see you soon!
            </p>

            <div class="btn-r">
            <a href="#" class="btn-layerClose" onclick="cancleFunc()">Close</a>
            </div>
            <!--// content-->
        </div>
    </div>
    `;
    
    switch (type) {
      case "alert":
        // styleChild = ``;
        // divChild = ``;
        break;

      case "confirm":
        // styleChild = ``;
        // divChild = ``;
        break;

      default:
        break;
    }

    div.innerHTML = divChild;
    console.log(style.isConnected);
    shadow.appendChild(style);
    shadow.appendChild(div);
  }
  connectedCallback() {
    console.log('Custom element added to page. @ '+getCurrentDate());
    updateElement(this);
  }

  disconnectedCallback() {
    console.log('Custom element removed from page. @ '+getCurrentDate());
  }

  adoptedCallback() {
    console.log('Custom element moved to new page. @ '+getCurrentDate());
  }

  attributeChangedCallback(key, oldValue, newValue) {
    console.log('Custom element attributes changed. @ '+getCurrentDate());
    console.dir({key, oldValue, newValue});
    var x = new Map([['key',key],['oldValue',oldValue],['newValue',newValue]]);
    var y = Object.fromEntries(x);
    if(y.key=='status'){
      if(!y.newValue){
        console.log('nothing to change');
      }else{
        let opt ={"key":key, "newValue": newValue};
        if(opt&&opt.key=='status'){
          updateElement(this,opt);
        }
      }
    }else{
      console.log('nothing to change');
    }
    
    
  }
}
customElements.define('popup-info', PopUp);
let popUpEl;
/* 엘리먼트 변경시 - 스타일을 바꿀 때 , 이벤트 매핑등*/
let updateElement = (el, opt) => {
  const shadow = el.shadowRoot;
  //shadow.querySelector('style').textContent = ``;
  let styleContents =   defaultStyle;
  let displayNone = `
  .pop-layer { display: none; }`;
  let displayShow = `
  .pop-layer { display: block; }`
  if(!opt){
    let hasDisplay;
    if(shadow.querySelector('style')){
      //shadow.querySelector('style').textContent.length>0
      hasDisplay = shadow.querySelector('style').textContent.indexOf('.pop-layer { display:')>-1;
    }
    if(!hasDisplay){
      styleContents +=  displayNone;
    }
  }else{
    
    let status =  opt.key=='status'?opt.key:null;
    if(status){
      switch (opt.newValue) {
        case "active":
          styleContents +=  displayShow;
          break;
    
        case "inactive":
          styleContents +=  displayNone;
          break;
    
        default:
          break;
      }
    }
  }
  shadow.querySelector('style').textContent = styleContents;
  //shadow.querySelector('a.btn-layerClose').addEventListener('click', cancleFunc(shadow));

}

/* 취소 버튼 클릭 시*/
let cancleFunc = (el) => {

  document.body.querySelector('popup-info').parentElement.innerHTML='';
}


function getCurrentDate()
    {
        var date = new Date();
        var year = date.getFullYear().toString();

        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();

        var day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour.toString() : hour.toString();

        var minites = date.getMinutes();
        minites = minites < 10 ? '0' + minites.toString() : minites.toString();

        var seconds = date.getSeconds();
        seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

        return year +"."+ month +"."+ day+" " + hour+":" + minites+":" + seconds;
    }


