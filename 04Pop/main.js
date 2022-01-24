// import {PopUp} from './modules/popup.js'
const MyApp = (function () {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded");
  });

  function firstFunc(el) {
    console.log("1st func!");
    console.log("1st func some logic");

    layer_popup("#layer1");
  }

  function secondFunc(el) {
    console.log("2st func!");
    console.log("2st func some logic");
  }

  return {
    firstFunc,
    secondFunc
  };
  
}
)();
let addingTarget;
let layer_popup = (el) => {
  addingTarget = document.createElement('popup-info');
  
  addingTarget.setAttribute('msg','OO하시겠습니까?');
  console.log(  'after changed [msg]');
  console.log(  addingTarget.shadowRoot.querySelector('style'));

  addingTarget.setAttribute('status','active');
  console.log(  'after changed [status]');
  console.log(  addingTarget.shadowRoot.querySelector('style'));

  document.querySelector('#popup-wrapper').append(addingTarget);
  // console.dir(addingTarget.shadowRoot)
}

function layer_popup_(el){

    var $el = $(el);    //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg'); //dimmed 레이어를 감지하기 위한 boolean 변수

    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }

    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.layer .dimBg').click(function(){
        $('.dim-layer').fadeOut();
        return false;
    });

}


