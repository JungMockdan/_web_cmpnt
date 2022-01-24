
class PopUp extends HTMLElement{

    constructor(){

    }
    // connectedCallback 은 커스텀 엘리먼트가 document의 DOM에 연결될 때마다 호출
    // disconnectedCallback  Invoked when the custom element is disconnected from the document's DOM.
    // attributeChangedCallback은 커스텀 엘리먼트의 애트리뷰트가 추가, 제거 또는 변경될때 호출
    // adoptedCallback Invoked when the custom element is moved to a new document.
}

customElements.define('word-count', PopUp, { extends: 'p' });// p태그 상속한 커스텀 엘리먼트