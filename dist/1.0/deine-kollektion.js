document.addEventListener("DOMContentLoaded",async()=>{var e=new URLSearchParams(window.location.search);const m=document.querySelector(".single-collection-wrapper");document.querySelector(".login-head").innerText=e.get("name"),e.get("name")&&fetch("https://bildzeitschrift.netlify.app/.netlify/functions/collection?name="+e.get("name"),{method:"GET",headers:{Authorization:sessionStorage.getItem("auth")}}).then(e=>e.json()).then(e=>{var t="https://res.cloudinary.com/wdy-bzs/image/upload/images/";const r=m.innerHTML="";for(const i=0;i<e.items.length;i++){var n=e.collection.items[i].replaceAll("-","_").replaceAll("(","").replaceAll(")","");r+=`<a href="https://www.bildzeitschrift.com/magazine?productId=${e.collection.items[i]}" class="item-link w-inline-block" randid=${i} sku="${e.collection.items[i]}" jahr="${e.resolved[i].Jahr}" name="${e.resolved[i].Name}" monat="${e.resolved[i].Monat}">
                <img src="${t+n}"  style="height: -webkit-fill-available; width: -webkit-fill-available;" loading="lazy" sizes="(max-width: 479px) 86vw, (max-width: 767px) 40vw, (max-width: 991px) 27vw, 21vw" alt="" srcset="${t+n} 500w, ${t+n} 800w,${t+n} 1080w, ${t+n} 1536w," class="single-collection-img"></a>`}document.querySelector(".produvt-img-wrapper.w-inline-block").remove(),m.insertAdjacentHTML("beforeend",r)});document.querySelector(".presentation-mode").addEventListener("click",function(e){e.preventDefault();const t="";for(i of document.querySelectorAll(".single-collection-img"))t+=`<section style="height: 100vh;background: black; width:100%" data-background-color="black">
                        <img style="margin-top:0;" src="${i.src}">
                   </section>`;e=`
                            <div class="reveal">
                                <div class="slides" style="background: black; width:100%">
                                    ${t}
                                </div>
                            </div>
                            `;document.body.insertAdjacentHTML("afterbegin",e);const r=new Reveal({touch:!0,embedded:!1,help:!0,width:"100%",keyboard:{27:()=>{r.destroy(),document.querySelector(".reveal").remove()}}});r.configure({touch:!0,help:!0,controls:!0}),r.initialize().then()});e=document.querySelector("#Filter-Kollektionen");e.value="",e.addEventListener("change",()=>{var e=Array.from(m.children);{var t=event.target.value,r=e,n=m;const a={"Jänner":1,Februar:2,"März":3,April:4,Mai:5,Juni:6,Juli:7,August:8,September:9,Oktober:10,November:11,Dezember:12};switch(t){case"":n.innerHTML="";for(const i of r)n.appendChild(i);break;case"First":r.sort((e,t)=>e.getAttribute("sku").localeCompare(t.getAttribute("sku"))),n.innerHTML="";for(const o of r)n.appendChild(o);break;case"Second":r.sort((e,t)=>t.getAttribute("sku").localeCompare(e.getAttribute("sku"))),n.innerHTML="";for(const l of r)n.appendChild(l);break;case"Third":r.sort((e,t)=>e.getAttribute("randid").localeCompare(t.getAttribute("randid"))),n.innerHTML="";for(const c of r)n.appendChild(c);break;case"Fourth":r.sort((e,t)=>t.getAttribute("randid").localeCompare(e.getAttribute("randid"))),n.innerHTML="";for(const s of r)n.appendChild(s);break;case"Fifth":r.sort((e,t)=>{var r=Number(e.getAttribute("jahr")),n=Number(t.getAttribute("jahr")),i=a[e.getAttribute("monat")],o=a[t.getAttribute("monat")],e=e.getAttribute("name"),t=t.getAttribute("name");return r==n?i==o?e.localeCompare(t):o<i:n<r}),n.innerHTML="";for(const d of r)n.appendChild(d);break;case"Sixth":r.sort((e,t)=>{var r=e.getAttribute("jahr"),n=t.getAttribute("jahr"),i=a[e.getAttribute("monat")],o=a[t.getAttribute("monat")],e=e.getAttribute("name"),t=t.getAttribute("name");return r==n?i==o?t.localeCompare(e):i<o:r<n}),n.innerHTML="";for(const u of r)n.appendChild(u)}}})});