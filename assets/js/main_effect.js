var slider=dq(".highlight-container"),touchCol=dq(".highlight-col"),plane=dq(".highlight-plane");function injectHighlight(){initSlider(),alinkOnClick(),alinkOnClickDelay()}function initSlider(){var block=dqa(".highlight-block"),planeW=plane.clientWidth,maxBlockW=block[0].offsetWidth*block.length-planeW,isDown=!1,isRunning=!1,extraP=!1,isDragged=!1,startX=0,moveX=0,distX=0,easeX=0,lastX=0,easeFactor=.15,momentum=0,t,tDelta=0,ct=Date.now(),rt=ct;function sliding(){var nt=Date.now();tDelta=nt-t,t=nt;var dist=distX-easeX;extraP&&(dist>0?dist-=planeW*momentum:dist+=planeW*momentum),easeX+=dist*easeFactor,momentum=Math.abs(dist)/tDelta/(window.w/tDelta);var offset=easeX+lastX;offset>0?(startX=scroller.amx,moveX=startX,easeX=0,distX=0,offset=0,lastX=0):offset<-maxBlockW&&(startX=scroller.amx,moveX=startX,easeX=0,distX=0,offset=-maxBlockW,lastX=-maxBlockW),TweenLite.set(plane,{x:offset,force3D:!0}),isDown||(Math.abs(dist)<.1?(extraP=!1,easeFactor=.15,lastX=offset,easeX=0,distX=0,t=Date.now(),TweenLite.ticker.removeEventListener("tick",sliding),isRunning=!1):extraP=!0)}if(isTouch()){addClass(slider,["touch"]);var offsetLeft=parseFloat(getComputedStyle(slider).marginLeft),blockH=parseFloat(getComputedStyle(block[0]).height),resizedEv;function slideResized(){var offsetLeft=parseFloat(getComputedStyle(slider).marginLeft),blockH=parseFloat(getComputedStyle(block[0]).height);touchCol.style.width=window.w-offsetLeft+"px",dq("#offset-block").style.width=offsetLeft+"px",dq("#offset-block").style.height=blockH+"px"}touchCol.style.width=window.w-offsetLeft+"px",plane.innerHTML+='<div id="offset-block" style="width:'+offsetLeft+"px;height:"+blockH+'px;flex: 10 0 auto"></div>',window.addEventListener("resize",(function(e){clearTimeout(resizedId),resizedEv=setTimeout(slideResized,200)}))}else{slider.addEventListener("mousedown",(function(e){isDown=!0,ct=Date.now(),addClass(touchCol,["drag"]),isRunning?(startX=e.clientX,moveX=startX,lastX+=easeX,distX=0,easeX=0):(startX=e.clientX,moveX=startX,isRunning=!0,TweenLite.ticker.addEventListener("tick",sliding,this,!1,1))})),eachNode(block,(function(el){el.onclick=function(ev){ev.preventDefault(),ev.stopImmediatePropagation()},el.ondragstart=function(ev){ev.preventDefault()},el.ondragend=function(ev){ev.preventDefault()}})),window.addEventListener("mouseup",(function(e){rt=Date.now(),isDragged||rt-ct>100?eachNode(block,(function(el){el.onclick=function(ev){ev.preventDefault(),ev.stopImmediatePropagation()}})):eachNode(block,(function(el){el.onclick=function(ev){el.click()}})),isDown=!1,cutClass(touchCol,["drag"]),isDragged=!1})),window.addEventListener("mousemove",(function(e){isDown&&(e.preventDefault(),isDragged=!0,moveX=e.clientX,distX=moveX-startX)}));var hsTime=0,hsLastTime=hsTime,hsSpeed=100,hsStep=1,rInterval=200,isRight=!0,resizedEv;function slideResized(){planeW=plane.clientWidth,maxBlockW=block[0].offsetWidth*block.length-planeW,easeX=0,distX=0,offset=0,lastX=0,TweenLite.set(plane,{x:offset,force3D:!0})}dq(".highlight-container").addEventListener("wheel",(function(e){if(e.deltaX<0){var delta;if(0==hsTime)isRight=!1,hsTime=Date.now(),hsLastTime=hsTime,hsSpeed=100,hsStep=1;else isRight&&(hsSpeed=100,hsStep=1,lastX+=easeX,distX=0,easeX=0),isRight=!1,(delta=(hsTime=Date.now())-hsLastTime)<200?((distX+=window.w/hsSpeed*delta/20)<-maxBlockW&&(distX=maxBlockW),hsSpeed-hsStep>=1&&(hsSpeed-=hsStep,hsStep++)):(hsSpeed=100,hsStep=1,lastX+=easeX,distX=0,easeX=0),hsLastTime=hsTime;addClass(touchCol,["drag"]),isRunning||(isRunning=!0,TweenLite.ticker.addEventListener("tick",sliding,this,!1,1))}else if(e.deltaX>0){var delta;if(0==hsTime)isRight=!0,hsTime=Date.now(),hsLastTime=hsTime,hsSpeed=100,hsStep=1;else isRight||(hsSpeed=100,hsStep=1,lastX+=easeX,distX=0,easeX=0),isRight=!0,(delta=(hsTime=Date.now())-hsLastTime)<200?((distX-=window.w/hsSpeed*delta/20)>0&&(distX=0),hsSpeed-hsStep>=1&&(hsSpeed-=hsStep,hsStep++)):(hsSpeed=100,hsStep=1,lastX+=easeX,distX=0,easeX=0),hsLastTime=hsTime;addClass(touchCol,["drag"]),isRunning||(isRunning=!0,TweenLite.ticker.addEventListener("tick",sliding,this,!1,1))}}),window.passiveIfSupported),window.addEventListener("resize",(function(e){clearTimeout(resizedEv),resizedEv=setTimeout(slideResized,200)}))}}window.addEventListener("load",(function(){injectHighlight()}));
//# sourceMappingURL=index.min.js.map