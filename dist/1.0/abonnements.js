function renderPlans(n,t,i){var s,e=document.querySelectorAll(".subs-wrap"),a=e[0],r=e[1];a.innerHTML="<h2 class='subs-head'>Dein aktuelles Abo</h2>",r.innerHTML="<h2 class='subs-head'>Weitere Abonnements</h2>";for(let e=0;e<n.length;e++)n[e].active?(s=`
            <div class="subs-wrapper">
                <div class="subs-wrap-inner">
                    <h3 class="subs-head">${n[e].name}</h3>
                    <div>
                        <span class="price-span">€ ${n[e].price},00</span> / Monat
                    </div>
                    <a onclick=cancelPlan('${i}') class="button subs-cancel w-inline-block" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;">
                        <div class="button-text subs">Kündigen</div>
                    </a>
                </div>
                <div class="subs-wrap-inner">
                    <p class="subs-p">${n[e].description}</p>
                    <span>${n[e].cancel_at_end?"Gekündigt":"Verlängert sich am : "+n[e].end_date}</span>
                </div>
            </div>`,a.insertAdjacentHTML("beforeend",s)):(s=`
            <div class="subs-wrapper">
                <div class="subs-wrap-inner">
                    <h3 class="subs-head">${n[e].name}</h3>
                    <div>
                        <span class="price-span" data-moz-translations-id="0">€ ${n[e].price},00</span> / Monat
                    </div>
                    <a  onclick=${t?`downgradeOrUpgrade('${i}')`:`createCheckout('${n[e].price_id}')`} class="button subs-change w-inline-block" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;">
                        <div class="button-text subs">${t?"Abo wechseln ":"Choose this plan"}</div>
                    </a>
                </div>
                <div class="subs-wrap-inner">
                    <p class="subs-p">${n[e].description}</p>
                </div>
            </div>`,r.insertAdjacentHTML("beforeend",s))}window.downgradeOrUpgrade=async n=>{Swal.fire({title:"Möchtest du dein Abonnement wirklich wechseln?",showCancelButton:!0,confirmButtonText:"Abbrechen",cancelButtonText:"Ja, wechseln"}).then(e=>{e.isDismissed&&e.hasOwnProperty("dismiss")&&"cancel"==e.dismiss&&fetch("https://bildzeitschrift.netlify.app/.netlify/functions/subscription?upgrade=true&sub="+n,{method:"PUT",headers:{Authorization:sessionStorage.getItem("auth")}}).then(e=>{e.ok&&fetch("https://bildzeitschrift.netlify.app/.netlify/functions/subscription",{method:"GET",headers:{Authorization:sessionStorage.getItem("auth")}}).then(async e=>{var n=[{name:"Starter",price:5,active:!1,description:"Das Starter Abo erlaubt es dir, den Filter zur Gänze zu nutzen und somit das Archiv bis ins letzte Details filtern zu können.",price_id:"price_1OsJmuSA2e71Dz91jqdMYH0V"},{name:"Inspiration",price:8,active:!1,description:"In diesem Abo hast du einerseits die Möglichkeit, den Filter zur Gänze zu nutzen und andererseits deine eigenen Kollektionen von Magazinen zu speichern. Deine Kollektionen kannst du dann auch in einem Präsentationsmodus abspielen.",price_id:"price_1OqG9PSA2e71Dz91HaJFV0xb"}],e=await e.json();if(e.plan){const i=e.plan;var e=n.find(e=>e.name==i.plan),t=(e.active=!0,new Date(1e3*i.end_date));e.end_date=String(t.getDate()).padStart(2,"0")+"/"+String(t.getMonth()+1).padStart(2,"0")+"/"+String(t.getFullYear()).slice(-2),e.sub_id=i.subscription,i.hasOwnProperty("downgrade")&&(e.downgraded=!0),i.hasOwnProperty("cancel_at_end")&&(e.cancel_at_end=!0),renderPlans(n,!0,i.subscription)}})})})},window.createCheckout=async e=>{(await Swal.fire({title:"Möchtest du dieses Abonnement bestellen?",showCancelButton:!0,confirmButtonText:"Ja, weiter zur Bestellung",cancelButtonText:"Abbrechen"})).isConfirmed&&(e=await(await fetch("https://bildzeitschrift.netlify.app/.netlify/functions/create_checkout?price_id="+e,{method:"GET",headers:{Authorization:sessionStorage.getItem("auth")}})).json(),location.assign(e.checkout_link))},window.cancelPlan=async e=>{(await Swal.fire({title:"Bist du sicher, dass du dieses Abonnement kündigen möchtest?",showCancelButton:!0,cancelButtonText:"Nein",confirmButtonText:"Ja, sofort kündigen"})).isConfirmed&&200==(await fetch("https://bildzeitschrift.netlify.app/.netlify/functions/subscription?sub_id="+e,{method:"DELETE",headers:{Authorization:sessionStorage.getItem("auth")}})).status&&fetch("https://bildzeitschrift.netlify.app/.netlify/functions/subscription",{method:"GET",headers:{Authorization:sessionStorage.getItem("auth")}}).then(async e=>{var n=[{name:"Starter",price:5,active:!1,description:"Das Starter Abo erlaubt es dir, den Filter zur Gänze zu nutzen und somit das Archiv bis ins letzte Details filtern zu können.",price_id:"price_1OsJmuSA2e71Dz91jqdMYH0V"},{name:"Inspiration",price:8,active:!1,description:"In diesem Abo hast du einerseits die Möglichkeit, den Filter zur Gänze zu nutzen und andererseits deine eigenen Kollektionen von Magazinen zu speichern. Deine Kollektionen kannst du dann auch in einem Präsentationsmodus abspielen.",price_id:"price_1OqG9PSA2e71Dz91HaJFV0xb"}],e=await e.json();if(e.plan){const i=e.plan;var e=n.find(e=>e.name==i.plan),t=(e.active=!0,new Date(1e3*i.end_date));e.end_date=String(t.getDate()).padStart(2,"0")+"/"+String(t.getMonth()+1).padStart(2,"0")+"/"+String(t.getFullYear()).slice(-2),e.sub_id=i.subscription,i.hasOwnProperty("downgrade")&&(e.downgraded=!0),i.hasOwnProperty("cancel_at_end")&&(e.cancel_at_end=!0),renderPlans(n,!0,i.subscription)}})},(async()=>{let i=[{name:"Starter",price:5,active:!1,description:"Das Starter Abo erlaubt es dir, den Filter zur Gänze zu nutzen und somit das Archiv bis ins letzte Details filtern zu können.",price_id:"price_1OsJmuSA2e71Dz91jqdMYH0V"},{name:"Inspiration",price:8,active:!1,description:"In diesem Abo hast du einerseits die Möglichkeit, den Filter zur Gänze zu nutzen und andererseits deine eigenen Kollektionen von Magazinen zu speichern. Deine Kollektionen kannst du dann auch in einem Präsentationsmodus abspielen.",price_id:"price_1OqG9PSA2e71Dz91HaJFV0xb"}];document.addEventListener("DOMContentLoaded",async()=>{var e=await fetch("https://bildzeitschrift.netlify.app/.netlify/functions/subscription",{method:"GET",headers:{Authorization:sessionStorage.getItem("auth")}});if(e.ok){e=await e.json();if(e.plan){const t=e.plan;var e=i.find(e=>e.name==t.plan),n=(e.active=!0,new Date(1e3*t.end_date));e.end_date=String(n.getDate()).padStart(2,"0")+"/"+String(n.getMonth()+1).padStart(2,"0")+"/"+String(n.getFullYear()).slice(-2),e.sub_id=t.subscription,t.hasOwnProperty("downgrade")&&(e.downgraded=t.downgraded),t.hasOwnProperty("cancel_at_end")&&(e.cancel_at_end=t.cancel_at_end),renderPlans(i,!0,t.subscription)}else renderPlans(i,!1)}})})().then();