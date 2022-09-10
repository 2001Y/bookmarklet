// ==UserScript==
// @name         Google Search Tool+
// @namespace    https://2001y.me
// @version      0.1
// @description  Google検索のツールをアップグレードするUserScript。言語指定に「英語のページを検索」などを追加。
// @author       2001Y
// @match        https://www.google.com/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// ==/UserScript==


(function() {
    'use strict';


    window.addEventListener('load', function() {

        const CONFIG = [
            {
                name: "ツールを自動的に表示",
                default: true
            },
            {
                name: "言語指定を追加",
                details: "言語名:言語コードのセットをカンマで区切って記述。https://developers.google.com/admin-sdk/directory/v1/languages",
                default: [
                    {lang_name:"日本語",lang_code:"lang_ja"},
                    {lang_name:"英語",lang_code:"lang_en"}
                ]
            }
        ];


        if(document.querySelector("#hdtb-tls").getAttribute('aria-expanded') == "false") {
            document.querySelector("#hdtb-tls").click();
        }

        // 変更を監視するノードを選択
        const targetNode = document.querySelector("#lb");
        const config = { attributes: true, childList: true, subtree: true };
        const callback = function(mutationsList, observer) {
            function urlPara(e1,e2){
                let url = new URL(window.location);
                url.searchParams.set(e1, e2);
                return url;
            }

            CONFIG[1].default.map((e)=>{
                if(targetNode.innerText.indexOf(`${e.lang_name}のページを検索`) < 0){
                    document.querySelector("#lb g-menu").insertAdjacentHTML('beforeend', `
                <g-menu-item jsname="NNJLud" jscontroller="CnSW2d" class="ErsxPb" role="none" data-short-label="" jsdata="zPXzie;_;A5lsYc" aria-checked="false">
                <div jsname="ibnC6b" class="znKVS OSrXXb tnhqA" role="none">
                <a href=${urlPara("lr",e.lang_code)} role="menuitem" tabindex="-1">${e.lang_name}のページを検索</a>
                </div></g-menu-item>
                `);
                }
            });


            observer.disconnect();
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        //window.setTimeout(function(){
            //document.querySelector("#hdtb-tls").click();
        //}, 0);

    });

})();
