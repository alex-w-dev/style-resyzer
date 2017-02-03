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
            if(val){
                el.style.cssText = styleProp + ':' + val + valText;
                console.log(ratio);
            }
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
        window.styleSizerPrevRatio = 1;
        window.styleSizerGlobalChildren = [];
        window.styleSizerGlobalUglyChildren = [];
        addSheetsOfTree(document.body)
    }

    /* to default */
    for(var i = 0; i < window.styleSizerGlobalChildren.length; i++){
        updateSize(window.styleSizerGlobalChildren[i], styleProp, window.styleSizerPrevRatio);
    }
    for(var i = 0; i < window.styleSizerGlobalUglyChildren.length; i++){
        updateSize(window.styleSizerGlobalUglyChildren[i], styleProp, window.styleSizerPrevRatio);
    }

    window.styleSizerPrevRatio = 1 / ratio;

    setTimeout(function(){
        /* to new ratio */
        for(var i = 0; i < window.styleSizerGlobalChildren.length; i++){
            updateSize(window.styleSizerGlobalChildren[i], styleProp, ratio);
        }
        for(var i = 0; i < window.styleSizerGlobalUglyChildren.length; i++){
            updateSize(window.styleSizerGlobalUglyChildren[i], styleProp, ratio);
        }
    }, 1100)

    return this;
}

changeSizedStyle('font-size', 1);
var block = document.createElement('div');
var span = document.createElement('span');
span.innerHTML = 'Property:';
var input = document.createElement('input');
var span2 = document.createElement('span');
span2.innerHTML = '| Ratio:';
var input2 = document.createElement('input');
var submit = document.createElement('button');
submit.innerHTML = 'apply';


window.document.body.appendChild(block)
block.appendChild(span);
block.appendChild(input);
block.appendChild(span2);
block.appendChild(input2);
block.appendChild(submit);

block.style.position = 'fixed';
block.style.zIndex = '9999';
block.style.padding = '0px 10px';
block.style.left = '0';
block.style.top = '0';
block.style.display = 'flex';
block.style.alignItems = 'center';
block.style.width = '300px';
block.style.backgroundColor = 'white';
span2.style.whiteSpace = 'nowrap';
input.setAttribute('type', 'text');
input.style.margin = '0';
input.style.height = '20px';
input.value = 'font-size';
input2.setAttribute('type', 'text');
input2.style.margin = '0';
input2.style.height = '20px';
input2.value = 1;

submit.onclick = function () {
    changeSizedStyle(input.value, input2.value);
};
