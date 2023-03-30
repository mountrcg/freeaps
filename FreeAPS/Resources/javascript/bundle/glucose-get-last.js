var freeaps_glucoseGetLast;(()=>{var e={6237:e=>{function a(e){return e.date||Date.parse(e.display_time)||Date.parse(e.dateString)}function o(e,a){a||(a=0);var o=Math.pow(10,a);return Math.round(e*o)/o}e.exports=function(e){var r=(e=e.filter((function(e){return e.glucose||e.sgv})).map((function(e){if(e.glucose=e.glucose||e.sgv,null!==e.glucose)return e}))).length;const t=e[0],u=a(t),l=a(t);var n,s=[],c=[],d=[];if(1==r)return{glucose:t.value,noise:0,delta:0,shortAvgDelta:0,longAvgDelta:0,date:l,dura_ISF_minutes:0,dura_ISF_average:t.value,slope05:0,slope15:0,slope40:0,dura_p:0,delta_pl:0,delta_pn:0,bg_acceleration:0,a_0:0,a_1:0,a_2:0,r_squ:0};for(var g=0,i=1;i<r;i++){if(void 0!==e[i]&&"cal"===e[i].type){g=i;break}if(void 0!==e[i]&&e[i].glucose>38&&e[i].device===t.device){const o=e[i],r=a(o);var _,p=0;if(void 0!==r&&void 0!==u?(_=Math.round((u-r)/6e4),n=t.glucose-o.glucose,p=n/_*5):console.error("Error: date field not found: cannot calculate avgDel"),0<_&&_<2.5)t.glucose=(t.glucose+o.glucose)/2,u=(u+r)/2;else if(2.5<_&&_<17.5)c.push(p),2.5<_&&_<7.5&&s.push(p);else{if(!(17.5<_&&_<42.5))break;d.push(p)}}}var v=0,h=0,f=0;c.length>0&&(h=c.reduce((function(e,a){return e+a}))/c.length),v=s.length>0?s.reduce((function(e,a){return e+a}))/s.length:h,d.length>0&&(f=d.reduce((function(e,a){return e+a}))/d.length);var M=t.glucose,b=M,m=0,w=a(t);for(i=1;i<r;i++){const o=e[i],r=a(o);if(M=Math.min(M,o.glucose),b=Math.max(b,o.glucose),b-M>2||w-r>66e4||l-r>36e5)break;m=(l-(w=r))/6e4}t.glucose;var k=0,F=0,x=0,S=0,I=0,D=0;var q=t.glucose,y=t.glucose,A=0;for(i=1;i<r;i++){const o=e[i],r=a(o);if(Math.round((u-r)/6e4)-A>13)break;if(!(o.glucose>.95*y&&o.glucose<1.05*y))break;q+=o.glucose,y=q/(i+1),A=Math.round((u-r)/6e4)}k=1.05,F=1.15,x=1.4,q=0;var G,L,E=0,j=0,z=0,B=7.5;for(i=0;i<r;i++){if(G=i*j==E*E?0:(i*z-E*q)/(i*j-E*E),(L=(u-a(ee=e[i]))/6e4)>B&&7.5==B&&(k=5*-G,B=17.5),L>B&&17.5==B&&(F=5*-G,B=42.5),L>B&&42.5==B){x=5*-G;break}E+=L,j+=L*L,q+=ee.glucose,ee.glucose*ee.glucose,z+=ee.glucose*L}S=0,I=0,D=0;var C,H=0,J=0,K=0,N=0,O=0;if(r>3){var P=0,Q=0,R=0,T=0,U=0,V=0,W=0,X=a(e[0]),Y=0,Z=300,$=50;for(i=0;i<r;i++){var ee,ae=(a(ee=e[i])-X)/1e3/Z;if(-ae*Z>2820)break;if(ae<Y-1.5){i<3&&(S=-Y/60,I=0,D=0,H=0,J=0,K=0,N=0,O=0);break}Y=ae;var oe=ee.glucose/$;Q+=ae,R+=Math.pow(ae,2),T+=Math.pow(ae,3),U+=Math.pow(ae,4),P+=oe,V+=ae*oe,W+=Math.pow(ae,2)*oe;var re=i+1,te=0,ue=0,le=0,ne=0;if(re>3&&(te=U*(R*re-Q*Q)-T*(T*re-Q*R)+R*(T*Q-R*R),ue=W*(R*re-Q*Q)-V*(T*re-Q*R)+P*(T*Q-R*R),le=U*(V*re-P*Q)-T*(W*re-P*R)+R*(W*Q-V*R),ne=U*(R*P-Q*V)-T*(T*P-Q*W)+R*(T*V-R*W)),0!=te){var se=ue/te;G=le/te;for(var ce=ne/te,de=P/re,ge=0,ie=0,_e=0;_e<=i;_e++){var pe=e[_e],ve=a(pe);ge+=Math.pow(pe.glucose/$-de,2);var he=(ve-X)/1e3/Z,fe=se*Math.pow(he,2)+G*he+ce;ie+=Math.pow(pe.glucose/$-fe,2)}var Me=.64;if(0!=ge&&(Me=1-ie/ge),re>3&&Me>=J){J=Me,S=-ae*Z/60;I=-50*(se*Math.pow(-1,2)-1*G),D=$*(se*Math.pow(1,2)+1*G),H=2*se*$,K=ce*$,N=G*$,O=se*$,se*$,G*$,ce*$}}}}return C="glucose: "+o(t.glucose,0)+", noise: 0 , delta: "+o(v,0)+", short_avgdelta:  "+o(h,2)+", long_avgdelta: "+o(f,2)+", cgmFlatMinutes: "+o(m,0)+", date: "+t.date+", dura_ISF_minutes: "+o(A,0)+", dura_ISF_average: "+o(y,2)+", slope05 : "+o(k,2)+", slope15: "+o(F,2)+", slope40: "+o(x,2)+", parabola_fit_correlation: "+o(J,4)+", parabola_fit_minutes: "+o(S,2)+", parabola_fit_last_delta: "+o(I,2)+", parabola_fit_next_delta: "+o(D,2)+", parabola_fit_a0: "+o(K,2)+", parabola_fit_a1: "+o(N,2)+", parabola_fit_a2: "+o(O,2)+", bg_acceleration: "+o(H,2),{glucose:Math.round(1e4*t.glucose)/1e4,noise:0,delta:Math.round(1e4*v)/1e4,short_avgdelta:Math.round(1e4*h)/1e4,long_avgdelta:Math.round(1e4*f)/1e4,cgmFlatMinutes:Math.round(1e4*m)/1e4,dura_ISF_minutes:Math.round(1e4*A)/1e4,dura_ISF_average:Math.round(1e4*y)/1e4,slope05:Math.round(1e4*k)/1e4,slope15:Math.round(1e4*F)/1e4,slope40:Math.round(1e4*x)/1e4,dura_p:Math.round(1e4*S)/1e4,delta_pl:Math.round(1e4*I)/1e4,delta_pn:Math.round(1e4*D)/1e4,bg_acceleration:H,r_squ:Math.round(1e4*J)/1e4,a_0:Math.round(1e4*K)/1e4,a_1:Math.round(1e4*N)/1e4,a_2:Math.round(1e4*O)/1e4,pp_debug:C,date:u,last_cal:g,device:t.device}}}},a={};var o=function o(r){var t=a[r];if(void 0!==t)return t.exports;var u=a[r]={exports:{}};return e[r](u,u.exports,o),u.exports}(6237);freeaps_glucoseGetLast=o})();