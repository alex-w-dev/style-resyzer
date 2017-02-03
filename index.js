function changeSizedStyle(styleProp, ratio){
    function getStyleOfElement(el,styleProp)
    {
        var x = el;
        if (x.currentStyle)
            var y = x.currentStyle[styleProp];
        else if (window.getComputedStyle)
            var y = document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
        return y;
    }

    function updateSize(el, styleProp, ratio){
        var style = getStyleOfElement(el,styleProp);
        if(style){
            var valText = '';
            for (var i in  style){
                if( style.hasOwnProperty(i) && !(
                        style[i] == '0' ||
                        style[i] == '1' ||
                        style[i] == '2' ||
                        style[i] == '3' ||
                        style[i] == '4' ||
                        style[i] == '5' ||
                        style[i] == '6' ||
                        style[i] == '7' ||
                        style[i] == '8' ||
                        style[i] == '9' ||
                        style[i] == '.'
                    )) valText = valText + style[i];
            }

            var val = parseFloat(style) * ratio;
            if(val)el.style.cssText = styleProp + ':' + val + valText;
        }
    }


    function addSheetsOfTree(el){
        var children = el.children;
        if(children.length){
            for(var i = 0; i < children.length; i++){
                addSheetsOfTree(children[i]);
            }
            /* for invalid html code like this <div>text</i>text</i></div> */
            if(el.innerHTML && el.innerText){
                var html = el.innerHTML.trim();
                var text = el.innerText.trim();
                if(html[0] == text[0]){
                    window.styleSizerGlobalUglyChildren.push(el);
                }
            }
        }else{
            window.styleSizerGlobalChildren.push(el);
        }
    }
    if(!window.styleSizerGlobalChildren){
        window.styleSizerGlobalChildren = [];
        window.styleSizerGlobalUglyChildren = [];
        addSheetsOfTree(document.body)
    }

    for(var i = 0; i < window.styleSizerGlobalChildren.length; i++){
        updateSize(window.styleSizerGlobalChildren[i], styleProp, ratio);
    }
    for(var i = 0; i < window.styleSizerGlobalUglyChildren.length; i++){
        updateSize(window.styleSizerGlobalUglyChildren[i], styleProp, ratio);
    }

    return this;
}

changeSizedStyle('font-size', 1.5);
