function postMessage(e){socket.emit("post",e)}function sendMessage(e){e.preventDefault();var t=document.querySelector("#message"),n=new Date,r={user:"",message:t.value,time:pad(n.getHours())+":"+pad(n.getMinutes())+":"+pad(n.getSeconds())};t.value="";t.focus();appendMessage(r,!0);postMessage(r)}function appendMessage(e,t){var n=document.querySelector("#show-messages > ul"),r=document.createElement("li"),i=document.createTextNode(e.message),s=document.createElement("span"),o=document.createTextNode(e.time);t&&(r.className="me");r.appendChild(i);s.appendChild(o);r.appendChild(s);n.appendChild(r);n.scrollTop=n.offsetHeight}function pad(e){return e<10?"0"+e:e}var socket=io.connect();socket.on("clients",function(e){var t=document.querySelector("h1 > span"),n=" ("+e.connections+")";while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))});socket.on("message",function(e){appendMessage(e,!1)});window.onload=function(){var e=document.querySelector("form");e.addEventListener("submit",sendMessage,!1)};