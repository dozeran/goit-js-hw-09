const t={startbtn:document.querySelector("[data-start]"),stopbtn:document.querySelector("[data-stop]")};let e=null;t.startbtn.addEventListener("click",(function(t){e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.target.disabled=!0})),t.stopbtn.addEventListener("click",(function(){clearInterval(e),t.startbtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.6b351695.js.map
