var freeaps_determineBasal;(()=>{var e={5546:(e,a,r)=>{var t=r(6880);function o(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function n(e,a){return"mmol/L"===a.out_units?o(.0555*e,1):Math.round(e)}var i="",s="",l="",d="",u="",m="",c="",p="",g="",b="",f=1,h=1,v=1,B=1,_=1;function M(e,a,r){"bg"==r?(polyX=[50,60,80,90,100,110,150,180,200],polyY=[-.5,-.5,-.3,-.2,0,0,.5,.7,.7]):"delta"==r&&(polyX=[2,7,12,16,20],polyY=[0,0,.4,.7,.7]);var t=polyX.length-1,o=polyX[0],n=polyY[0],i=polyX[t],s=polyY[t],l=1,d=1,u=1,m=o;if(o>e)i=polyX[1],l=(d=n)+((s=polyY[1])-d)/(i-(u=o))*(e-u);else if(i<e)o=polyX[t-1],l=(d=n=polyY[t-1])+(s-d)/(i-(u=o))*(e-u);else for(var c=0;c<=t;c++){if(o=polyX[c],n=polyY[c],o==e){l=n;break}if(o>e){l=d+(n-d)/(o-(u=m))*(e-u);break}d=n,m=o}return l*="delta"==r?a.delta_ISFrange_weight:e>100?a.higher_ISFrange_weight:a.lower_ISFrange_weight}function S(e,a,r,t,n,i,s,l,d){console.error("check ratio "+o(e,2)+" against autoISF min: "+a+" and autoISF max: "+r),e<a?(b=" (lmtd.)",p="weakest autoISF factor "+o(e,2)+" limited by autoISF_min "+a,console.error(p),e=a):e>r&&(b=" (lmtd.)",p="strongest autoISF factor "+o(e,2)+" limited by autoISF_max "+r,console.error(p),e=r);var u=1;return s&&i.temptargetSet&&l>d?(u=e*t,n="includes exercise mode impact",console.error("autoISF adjusts sens "+t+", instead of profile.sens "+i.sens)):e>=1?(u=Math.max(e,t),e>=t&&(n="")):(u=Math.min(e,t),e<=t&&(n="")),p="final ISF factor "+o(u,2)+n,console.error(p),u}e.exports=function(e,a,r,y,x,F,I,w,T,C,G,D,O,R){var U=0,A="",P="",k="",j="",E="",W=0,q=0,z=0,L=0,N=0,X=0;const Y=R.tddYtd,H=R.tdd7d;function Z(e,a){var r=e.getTime();return new Date(r+36e5*a)}function $(e){var a=y.bolus_increment;.05!=a&&(a=.1);var r=e/a;return r>=1?o(Math.floor(r)*a,5):0}function J(e){function a(e){return e<10&&(e="0"+e),e}return a(e.getHours())+":"+a(e.getMinutes())+":00"}function K(e,a){var r=new Date("1/1/1999 "+e),t=new Date("1/1/1999 "+a);return(r.getTime()-t.getTime())/36e5}function Q(e,a){var r=0,t=a,o=(e-a)/36e5,n=0,i=o,s=0;do{if(o>0){var l=J(t);O[0].rate;for(let e=0;e<O.length;e++){var d=O[e].start;if(l==d){if(e+1<O.length){o>=(s=K(O[e+1].start,O[e].start))?n=s:o<s&&(n=o)}else if(e+1==O.length){let a=O[0].start;o>=(s=24-K(O[e].start,a))?n=s:o<s&&(n=o)}r+=$(O[e].rate*n),o-=n,t=Z(t,n)}else if(l>d)if(e+1<O.length){var u=O[e+1].start;l<u&&(o>=(s=K(u,l))?n=s:o<s&&(n=o),r+=$(O[e].rate*n),o-=n,t=Z(t,n))}else if(e==O.length-1){o>=(s=K("23:59:59",l))?n=s:o<s&&(n=o),r+=$(O[e].rate*n),o-=n,t=Z(t,n)}}}}while(o>0&&o<i);return r}if(G.length){let e=G.length-1;var V=new Date(G[e].timestamp),ee=new Date(G[0].timestamp);if("TempBasalDuration"==G[0]._type&&(ee=new Date),(U=(ee-V)/36e5)<23.9&&U>21)N=Q(V,(ae=24-U,re=V.getTime(),new Date(re-36e5*ae))),j="24 hours of data is required for an accurate tdd calculation. Currently only "+U.toPrecision(3)+" hours of pump history data are available. Using your pump scheduled basals to fill in the missing hours. Scheduled basals added: "+N.toPrecision(5)+" U. ";else U<21?(dynISFenabled=!1,enableDynamicCR=!1):j=""}else console.log("Pumphistory is empty!"),dynISFenabled=!1,enableDynamicCR=!1;var ae,re;for(let e=0;e<G.length;e++)"Bolus"==G[e]._type&&(L+=G[e].amount);for(let e=1;e<G.length;e++)if("TempBasal"==G[e]._type&&G[e].rate>0){W=e,X=G[e].rate;var te=G[e-1]["duration (min)"]/60,oe=te,ne=new Date(G[e-1].timestamp),ie=ne;do{if(e--,0==e){ie=new Date;break}if("TempBasal"==G[e]._type||"PumpSuspend"==G[e]._type){ie=new Date(G[e].timestamp);break}}while(e>0);var se=(ie-ne)/36e5;se<oe&&(te=se),z+=$(X*te),e=W}for(let e=0;e<G.length;e++)if(0,0==G[e]["duration (min)"]||"PumpResume"==G[e]._type){let a=new Date(G[e].timestamp),r=a,t=e;do{if(t>0&&(--t,"TempBasal"==G[t]._type)){r=new Date(G[t].timestamp);break}}while(t>0);(r-a)/36e5>0&&(N+=Q(r,a))}for(let e=G.length-1;e>0;e--)if("TempBasalDuration"==G[e]._type){let a=G[e]["duration (min)"]/60,r=new Date(G[e].timestamp);var le=r;let t=e;do{if(--t,t>=0&&("TempBasal"==G[t]._type||"PumpSuspend"==G[t]._type)){le=new Date(G[t].timestamp);break}}while(t>0);if(0==e&&"TempBasalDuration"==G[0]._type&&(le=new Date,a=G[e]["duration (min)"]/60),(le-r)/36e5-a>0){N+=Q(le,Z(r,a))}}var de={TDD:o(q=L+z+N,5),bolus:o(L,5),temp_basal:o(z,5),scheduled_basal:o(N,5)},ue=q;U>21?(P=". Bolus insulin: "+L.toPrecision(5)+" U",k=". Temporary basal insulin: "+z.toPrecision(5)+" U",A=". Insulin with scheduled basal rate: "+N.toPrecision(5)+" U",E=j+(" TDD past 24h is: "+q.toPrecision(5)+" U")+P+k+A,tddReason=", TDD, 24h: "+o(q,1)+", ytd: "+o(Y,1)+", 7dØ: "+o(H,1),console.error(E)):tddReason=", TDD: Not enough pumpData (< 21h)";var me={},ce=new Date;if(C&&(ce=C),void 0===y||void 0===y.current_basal)return me.error="Error: could not get current basal rate",me;var pe=t(y.current_basal,y),ge=pe,be=new Date;C&&(be=C);var fe,he=new Date(e.date),ve=o((be-he)/60/1e3,1),Be=e.glucose,_e=e.noise;fe=n(e.delta,y);var Me=Math.min(e.delta,e.short_avgdelta),Se=Math.min(e.short_avgdelta,e.long_avgdelta),ye=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(Be<=10||38===Be||_e>=3)&&(me.reason="CGM is calibrating, in ??? state, or noise is high");if(ve>12||ve<-5?me.reason="If current system time "+be+" is correct, then BG data is too old. The last BG data was read "+ve+"m ago at "+he:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?me.reason="CGM was just calibrated":me.reason="CGM data is unchanged ("+n(Be,y)+"+"+n(e.delta,y)+") for 5m w/ "+n(e.short_avgdelta,y)+" mg/dL ~15m change & "+n(e.long_avgdelta,y)+" mg/dL ~45m change"),Be<=10||38===Be||_e>=3||ve>12||ve<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return a.rate>=ge?(me.reason+=". Canceling high temp basal of "+a.rate,me.deliverAt=ce,me.temp="absolute",me.duration=0,me.rate=0,me):0===a.rate&&a.duration>30?(me.reason+=". Shortening "+a.duration+"m long zero temp to 30m. ",me.deliverAt=ce,me.temp="absolute",me.duration=30,me.rate=0,me):(me.reason+=". Temp "+a.rate+" <= current basal "+ge+"U/hr; doing nothing. ",me);var xe,Fe,Ie,we,Te=y.max_iob;if(void 0!==y.min_bg&&(Fe=y.min_bg),void 0!==y.max_bg&&(Ie=y.max_bg),void 0!==y.enableSMB_high_bg_target&&(we=y.enableSMB_high_bg_target),void 0===y.min_bg||void 0===y.max_bg)return me.error="Error: could not determine target_bg. ",me;xe=(y.min_bg+y.max_bg)/2;var Ce="",Ge=y.exercise_mode||y.high_temptarget_raises_sensitivity,De=100,Oe=160;if(y.half_basal_exercise_target&&(Oe=y.half_basal_exercise_target),Ge&&y.temptargetSet&&xe>De||y.low_temptarget_lowers_sensitivity&&y.temptargetSet&&xe<De){var Re=Oe-De;sensitivityRatio=Re*(Re+xe-De)<=0?y.autosens_max:Re/(Re+xe-De),sensitivityRatio=Math.min(sensitivityRatio,y.autosens_max),sensitivityRatio=o(sensitivityRatio,2),Ce="from TT modifier",process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+xe+"; ")}else void 0!==x&&x&&(sensitivityRatio=x.ratio,Ce="from Autosens",process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(ge=y.current_basal*sensitivityRatio,(ge=t(ge,y))!==pe?process.stderr.write("Adjusting basal from "+pe+" to "+ge+"; "):process.stderr.write("Basal unchanged: "+ge+"; ")),y.temptargetSet);else if(void 0!==x&&x&&(y.sensitivity_raises_target&&x.ratio<1||y.resistance_lowers_target&&x.ratio>1)){Fe=o((Fe-60)/x.ratio)+60,Ie=o((Ie-60)/x.ratio)+60;var Ue=o((xe-60)/x.ratio)+60;xe===(Ue=Math.max(80,Ue))?process.stderr.write("target_bg unchanged: "+Ue+"; "):process.stderr.write("target_bg from "+xe+" to "+Ue+"; "),xe=Ue}var Ae=200,Pe=200,ke=200;if(e.noise>=2){var je=Math.max(1.1,y.noisyCGMTargetMultiplier);Math.min(250,y.maxRaw);Ae=o(Math.min(200,Fe*je)),Pe=o(Math.min(200,xe*je)),ke=o(Math.min(200,Ie*je)),process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+xe+" to "+Pe+"; "),Fe=Ae,xe=Pe,Ie=ke}var Ee=Fe-.5*(Fe-40),We=o(y.sens,1),qe=y.sens;void 0!==x&&x&&((qe=o(qe=y.sens/sensitivityRatio,1))!==We?process.stderr.write("ISF from "+n(We,y)+" to "+n(qe,y)):process.stderr.write("ISF unchanged: "+n(qe,y))),console.error("CR:"+y.carb_ratio),console.error("----------------------------------"),console.error(" start autoISF"),console.error("----------------------------------");var ze=function(e,a){if(e.use_autoisf&&e.iob_threshold>0&&e.iob_threshold<a[0].iob)return s=", autoISF-SMB disabled:, IOB: "+o(a[0].iob,2)+", > threshold: "+e.iob_threshold+", maxIOB: "+e.max_iob,console.error(s),"iobTH";var r=n(e.min_bg,e);return e.use_autoisf&&e.temptargetSet&&e.enableSMB_EvenOn_OddOff||e.use_autoisf&&e.min_bg==e.max_bg&&e.enableSMB_EvenOn_OddOff_always?(e.temptargetSet?msgType="TempTarget ":msgType="profile target ","mmol/L"==e.out_units?(evenTarget=o(10*r,0)%2==0,msgUnits=" has ",msgTail=" decimal"):(evenTarget=r%2==0,msgUnits=" is ",msgTail=" number"),evenTarget?msgEven="even":msgEven="odd",evenTarget?(console.error("SMB enabled - "+msgType+r+msgUnits+msgEven+msgTail),e.temptargetSet&&r<100?(console.error("Full Loop enabled, SMB enforced"),s=", autoISF-SMB enabled:, even TT","enforced"):(s=", autoISF-SMB enabled:, even Target","enabled")):(console.error("SMB disabled - "+msgType+r+msgUnits+msgEven+msgTail),s=", autoISF-SMB disabled:, odd Target","blocked")):"oref"}(y,r),Le=!0;if(w&&"oref"!=ze?("blocked"==ze&&(Le=!1),console.error("loopSMB function overriden with autoISF target toggle, enableSMB = "+Le)):(Le=function(e,a,r,t,o,i){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&o>100?(console.error("SMB disabled due to high temptarget of "+o),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&o<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",n(o,e)),console.error("SMB enabled for temptargets with "+n(o,e)),!0):!0===e.enableSMB_high_bg&&null!==i&&t>=i?(console.error("Checking BG to see if High for SMB enablement."),console.error("Current BG",t," | High BG ",i),r.bwFound?console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("High BG detected. Enabling SMB."),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(y,w,F,Be,xe,we),console.error("loopSMB function returns enableSMB = "+Le)),qe=function(e,a,r,t,y,x,F,I,w,T,C,G){if(!t.use_autoisf)return console.error("autoISF disabled in Preferences"),i+=", autoISF, disabled",e;if(t.autoISF_off_Sport&&(t.high_temptarget_raises_sensitivity||t.exercise_mode)&&t.temptargetSet&&r>G)return console.error("autoISF disabled due to exercise"),i+=", autoISF, disabled (exercise)",e;const D=y.dura_p,O=y.delta_pl,R=y.delta_pn,U=y.r_squ,A=y.bg_acceleration,P=y.a_0,k=y.a_1,j=y.a_2,E=y.dura_ISF_minutes,W=y.dura_ISF_average;var q=t.autoISF_min,z=t.autoISF_max,L=!1,N=e,X=r+10-W;if(x.mealCOB>0&&!t.enableautoisf_with_COB)return console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(x.mealCOB,1)),i+=", autoISF, disabled with COB",e;var Y=y.pp_debug;if(m+="BG-accel: "+o(A,3)+", PF-minutes: "+D+", PF-corr: "+o(U,4)+", PF-nextDelta: "+n(R,t)+", PF-lastDelta: "+n(O,t)+", regular Delta: "+n(y.delta,t),console.error(Y+m+" , Weights Accel/Brake: "+t.bgAccel_ISF_weight+" / "+t.bgBrake_ISF_weight),t.enable_BG_acceleration){var H=U,Z=A;if(0!=y.parabola_fit_a2&&H>=.9){var $=-k/2/j*5,J=o(P-$*$/25*j,1);($=o($,1))>0&&Z<0?(g="predicts a Max of "+n(J,t)+", in about "+Math.abs($)+"min",console.error("Parabolic fit "+g)):$>0&&Z>0?(g="predicts a Min of "+n(J,t)+", in about "+Math.abs($)+"min",console.error("Parabolic fit "+g)):$<0&&Z<0?(g="saw Max of "+n(J,t)+", about "+Math.abs($)+"min ago",console.error("Parabolic fit "+g)):$<0&&Z>0&&(g="saw Min of "+n(J,t)+", about "+Math.abs($)+"min ago",console.error("Parabolic fit "+g))}if(H<.9)g="acce_ISF by-passed, as correlation, "+o(H,2)+", is too low",console.error("Parabolic fit "+g),c+=", Parabolic Fit, "+g;else{var K=10*(H-.9),Q=1,V=1;y.glucose<t.target_bg?Z>0?(Z>1&&(Q=.5),V=t.bgBrake_ISF_weight):Z<0&&(V=t.bgAccel_ISF_weight):Z<0?V=t.bgBrake_ISF_weight:Z>0&&(V=t.bgAccel_ISF_weight),(f=1+Z*Q*V*K)<0&&(f=.1),console.error(c+"acce_ISF adaptation is "+o(f,2)),1!=f&&(L=!0,c+=", Parabolic Fit, "+g+", acce-ISF Ratio: "+o(f,2))}}else console.error("autoISF BG accelertion adaption disabled in Preferences");i+=s+c+", autoISF",h=1+M(100-X,t,"bg"),console.error("bg_ISF adaptation is "+o(h,2));var ee=1,ae=1;if(h<1)return ee=Math.min(h,f),f>1&&(p="bg-ISF adaptation lifted to "+o(ee=h*f,2)+", as BG accelerates already",console.error(p),i+=", bg-ISF Ratio: "+o(ee,2)+"(accel.)"),ae=S(ee,q,z,w,a,t,C,r,G),N=Math.min(720,o(t.sens/ae,1)),i+=", bg-ISF Ratio: "+o(ae,2),N;h>1&&(L=!0,i+=", bg-ISF Ratio: "+o(h,2));var re=y.delta;t.enablepp_ISF_always||t.pp_ISF_hours>=(F-x.lastCarbTime)/1e3/3600?deltaType="pp":deltaType="delta",X>0?console.error(deltaType+"_ISF adaptation by-passed as average glucose < "+r+"+10"):y.short_avgdelta<0?console.error(deltaType+"_ISF adaptation by-passed as no rise or too short lived"):"pp"==deltaType?(B=1+Math.max(0,re*t.pp_ISF_weight),console.error("pp_ISF adaptation is "+o(B,2)),d=", pp-ISF Ratio: "+o(B,2),1!=B&&(L=!0)):(v=M(re,t,"delta"),X>-20&&(v*=.5),v=1+v,console.error("delta_ISF adaptation is "+o(v,2)),u=", Δ-ISF Ratio: "+o(v,2),1!=v&&(L=!0));var te=t.dura_ISF_weight;x.mealCOB>0&&!t.enableautoisf_with_COB?console.error("dura_ISF by-passed; preferences disabled mealCOB of "+o(x.mealCOB,1)):E<10?console.error("dura_ISF by-passed; BG is only "+E+"m at level "+W):W<=r?console.error("dura_ISF by-passed; avg. glucose "+W+" below target "+n(r,t)):(_+=E/60*(te/r)*(W-r),L=!0,l=", Duration: "+E+", Avg: "+n(W,t)+", dura-ISF Ratio: "+o(_,2),console.error("dura_ISF adaptation is "+o(_,2)+" because ISF "+e+" did not do it for "+o(E,1)+"m"));return L?(ee=Math.max(_,h,v,f,B),console.error("autoISF adaption ratios:"),console.error("  dura "+o(_,2)),console.error("  bg "+o(h,2)),console.error("  delta "+o(v,2)),console.error("  pp "+o(B,2)),console.error("  accel "+o(f,2)),f<1&&(p="strongest ISF factor "+o(ee,2)+" weakened to "+o(ee*f,2)+" as bg decelerates already",console.error(p),ee*=f),ae=S(ee,q,z,w,a,t,C,r,G),N=o(t.sens/ae,1),i+=d+u+l+", final Ratio: "+o(ae,2)+b+", final ISF: "+n(t.sens,t)+"→"+n(N,t),N):(i+=", not modified",console.error("autoISF does not modify"),N)}(qe,Ce,xe,y,e,F,C,0,sensitivityRatio,0,Ge,De),console.error("----------------------------------"),console.error(" end autoISF"),console.error("----------------------------------"),void 0===r)return me.error="Error: iob_data undefined. ",me;var Ne,Xe=r;if(r.length,r.length>1&&(r=Xe[0]),void 0===r.activity||void 0===r.iob)return me.error="Error: iob_data missing some property. ",me;var Ye=((Ne=void 0!==r.lastTemp?o((new Date(be).getTime()-r.lastTemp.date)/6e4):0)+a.duration)%30;if(console.error("currenttemp:"+a.rate+" lastTempAge:"+Ne+"m, tempModulus:"+Ye+"m"),me.temp="absolute",me.deliverAt=ce,w&&a&&r.lastTemp&&a.rate!==r.lastTemp.rate&&Ne>10&&a.duration)return me.reason="Warning: currenttemp rate "+a.rate+" != lastTemp rate "+r.lastTemp.rate+" from pumphistory; canceling temp",I.setTempBasal(0,0,y,me,a);if(a&&r.lastTemp&&a.duration>0){var He=Ne-r.lastTemp.duration;if(He>5&&Ne>10)return me.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+He+"m ago; canceling temp",I.setTempBasal(0,0,y,me,a)}var Ze=o(-r.activity*qe*5,2),$e=o(6*(Me-Ze));$e<0&&($e=o(6*(Se-Ze)))<0&&($e=o(6*(e.long_avgdelta-Ze)));var Je=Be,Ke=(Je=r.iob>0?o(Be-r.iob*qe):o(Be-r.iob*Math.min(qe,y.sens)))+$e;if(void 0===Ke||isNaN(Ke))return me.error="Error: could not calculate eventualBG. Sensitivity: "+qe+" Deviation: "+$e,me;var Qe=function(e,a,r){return o(r+(e-a)/24,1)}(xe,Ke,Ze);me={temp:"absolute",bg:n(Be,y),tick:fe,eventualBG:Ke,insulinReq:0,reservoir:T,deliverAt:ce,sensitivityRatio,TDD:ue,insulin:de};var Ve=[],ea=[],aa=[],ra=[];Ve.push(Be),ea.push(Be),ra.push(Be),aa.push(Be);var ta=y.enableUAM,oa=0,na=0;oa=o(Me-Ze,1);var ia=o(Me-Ze,1);csf=qe/y.carb_ratio,console.error("profile.sens:"+n(y.sens,y)+", sens:"+n(qe,y)+", CSF:"+o(csf,1));var sa=o(30*csf*5/60,1);oa>sa&&(console.error("Limiting carb impact from "+oa+" to "+sa+"mg/dL/5m (30g/h)"),oa=sa);var la=3;sensitivityRatio&&(la/=sensitivityRatio);var da=la;if(F.carbs){la=Math.max(la,F.mealCOB/20);var ua=o((new Date(be).getTime()-F.lastCarbTime)/6e4),ma=(F.carbs-F.mealCOB)/F.carbs;da=o(da=la+1.5*ua/60,1),console.error("Last carbs "+ua+" minutes ago; remainingCATime:"+da+"hours; "+o(100*ma)+"% carbs absorbed")}var ca=Math.max(0,oa/5*60*da/2)/csf,pa=90,ga=1;y.remainingCarbsCap&&(pa=Math.min(90,y.remainingCarbsCap)),y.remainingCarbsFraction&&(ga=Math.min(1,y.remainingCarbsFraction));var ba=1-ga,fa=Math.max(0,F.mealCOB-ca-F.carbs*ba),ha=(fa=Math.min(pa,fa))*csf*5/60/(da/2),va=o(F.slopeFromMaxDeviation,2),Ba=o(F.slopeFromMinDeviation,2),_a=Math.min(va,-Ba/3),Ma=0;0===oa?na=0:!0===y.floating_carbs?(na=Math.min(60*da/5/2,Math.max(0,F.carbs*csf/oa)),Ma=Math.min(60*da/5/2,Math.max(0,F.mealCOB*csf/oa)),F.carbs>0&&(i+=", Floating Carbs:, CID: "+o(na,1)+", MealCarbs: "+o(F.carbs,1)+", Not Floating:, CID: "+o(Ma,1)+", MealCOB: "+o(F.mealCOB,1),console.error("Floating Carbs CID: "+o(na,1)+" / MealCarbs: "+o(F.carbs,1)+" vs. Not Floating:"+o(Ma,1)+" / MealCOB:"+o(F.mealCOB,1)))):na=Math.min(60*da/5/2,Math.max(0,F.mealCOB*csf/oa)),console.error("Carb Impact:"+oa+"mg/dL per 5m; CI Duration:"+o(5*na/60*2,1)+"hours; remaining CI ("+o(da/2,2)+"h peak):",o(ha,1)+"mg/dL per 5m");var Sa,ya,xa,Fa,Ia,wa=999,Ta=999,Ca=999,Ga=Be,Da=999,Oa=999,Ra=999,Ua=999,Aa=Ke,Pa=Be,ka=Be,ja=0,Ea=[],Wa=[];try{Xe.forEach((function(e){var a=o(-e.activity*qe*5,2),r=o(-e.iobWithZeroTemp.activity*qe*5,2),t=oa*(1-Math.min(1,ea.length/12));Aa=ea[ea.length-1]+a+t;var n=ra[ra.length-1]+r,i=Math.max(0,Math.max(0,oa)*(1-Ve.length/Math.max(2*na,1))),s=Math.min(Ve.length,12*da-Ve.length),l=Math.max(0,s/(da/2*12)*ha);i+l,Ea.push(o(l,0)),Wa.push(o(i,0)),COBpredBG=Ve[Ve.length-1]+a+Math.min(0,t)+i+l;var d=Math.max(0,ia+aa.length*_a),u=Math.max(0,ia*(1-aa.length/Math.max(36,1))),m=Math.min(d,u);m>0&&(ja=o(5*(aa.length+1)/60,1)),UAMpredBG=aa[aa.length-1]+a+Math.min(0,t)+m,ea.length<48&&ea.push(Aa),Ve.length<48&&Ve.push(COBpredBG),aa.length<48&&aa.push(UAMpredBG),ra.length<48&&ra.push(n),COBpredBG<Da&&(Da=o(COBpredBG)),UAMpredBG<Oa&&(Oa=o(UAMpredBG)),Aa<Ra&&(Ra=o(Aa)),n<Ua&&(Ua=o(n));ea.length>18&&Aa<wa&&(wa=o(Aa)),Aa>Pa&&(Pa=Aa),(na||ha>0)&&Ve.length>18&&COBpredBG<Ta&&(Ta=o(COBpredBG)),(na||ha>0)&&COBpredBG>Pa&&(ka=COBpredBG),ta&&aa.length>12&&UAMpredBG<Ca&&(Ca=o(UAMpredBG)),ta&&UAMpredBG>Pa&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}me.predBGs={},ea.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))}));for(var qa=ea.length-1;qa>12&&ea[qa-1]===ea[qa];qa--)ea.pop();for(me.predBGs.IOB=ea,xa=o(ea[ea.length-1]),ra.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),qa=ra.length-1;qa>6&&!(ra[qa-1]>=ra[qa]||ra[qa]<=xe);qa--)ra.pop();if(me.predBGs.ZT=ra,o(ra[ra.length-1]),F.mealCOB>0&&(oa>0||ha>0)){for(Ve.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),qa=Ve.length-1;qa>12&&Ve[qa-1]===Ve[qa];qa--)Ve.pop();me.predBGs.COB=Ve,Fa=o(Ve[Ve.length-1]),Ke=Math.max(Ke,o(Ve[Ve.length-1]))}if(oa>0||ha>0){if(ta){for(aa.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),qa=aa.length-1;qa>12&&aa[qa-1]===aa[qa];qa--)aa.pop();me.predBGs.UAM=aa,Ia=o(aa[aa.length-1]),aa[aa.length-1]&&(Ke=Math.max(Ke,o(aa[aa.length-1])))}me.eventualBG=Ke}console.error("UAM Impact:"+ia+"mg/dL per 5m; UAM Duration:"+ja+"hours"),wa=Math.max(39,wa),Ta=Math.max(39,Ta),Ca=Math.max(39,Ca),Sa=o(wa);var za=F.mealCOB/F.carbs;ya=o(Ca<999&&Ta<999?(1-za)*UAMpredBG+za*COBpredBG:Ta<999?(Aa+COBpredBG)/2:Ca<999?(Aa+UAMpredBG)/2:Aa),Ua>ya&&(ya=Ua),Ga=o(Ga=na||ha>0?ta?za*Da+(1-za)*Oa:Da:ta?Oa:Ra);var La=Ca;if(Ua<Ee)La=(Ca+Ua)/2;else if(Ua<xe){var Na=(Ua-Ee)/(xe-Ee);La=(Ca+(Ca*Na+Ua*(1-Na)))/2}else Ua>Ca&&(La=(Ca+Ua)/2);if(La=o(La),F.carbs)if(!ta&&Ta<999)Sa=o(Math.max(wa,Ta));else if(Ta<999){var Xa=za*Ta+(1-za)*La;Sa=o(Math.max(wa,Ta,Xa))}else Sa=ta?La:Ga;else ta&&(Sa=o(Math.max(wa,La)));Sa=Math.min(Sa,ya),process.stderr.write("minPredBG: "+n(Sa,y)+" minIOBPredBG: "+n(wa,y)+" minZTGuardBG: "+n(Ua,y)),Ta<999&&process.stderr.write(" minCOBPredBG: "+n(Ta,y)),Ca<999&&process.stderr.write(" minUAMPredBG: "+n(Ca,y)),console.error(" avgPredBG:"+n(ya,y)+" COB/Carbs:"+F.mealCOB+"/"+F.carbs),ka>Be&&(Sa=Math.min(Sa,ka)),me.COB=F.mealCOB,me.IOB=r.iob,me.BGI=n(Ze,y),me.deviation=n($e,y),me.dura_ISFratio=o(_,2),me.bg_ISFratio=o(h,2),me.delta_ISFratio=o(v,2),me.pp_ISFratio=o(B,2),me.acce_ISFratio=o(f,2),me.auto_ISFratio=o(y.sens/qe,2),me.ISF=n(qe,y),me.CR=o(y.carb_ratio,2),me.TDD=o(ue,1),me.TDDytd=o(Y,1),me.TDD7d=o(H,1),me.target_bg=n(xe,y);var Ya=function(e,a,r,t){if(!e.use_autoisf)return console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),.5;var n=e.smb_delivery_ratio_bg_range,i=e.smb_delivery_ratio,s=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max),l=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max),d=r+e.smb_delivery_ratio_bg_range,u=i;return n>0&&(u=s+(l-s)*(a-r)/n,u=Math.max(s,Math.min(l,u))),"enforced"==t?(console.error("SMB delivery ratio set to "+o(Math.max(i,u),2)+" as max of fixed and interpolated values"),Math.max(i,u)):0==n?(console.error("SMB delivery ratio set to fixed value "+o(i,2)),i):a<=r?(console.error("SMB delivery ratio limited by minimum value "+o(s,2)),s):a>=d?(console.error("SMB delivery ratio limited by maximum value "+o(l,2)),l):(console.error("SMB delivery ratio set to interpolated value "+o(u,2)),u)}(y,Be,xe,ze);me.SMBratio=o(Ya,2);var Ha="SMB Ratio:, "+o(Ya,2);me.reason=Ha+i+", Standard, COB: "+me.COB+", Dev: "+me.deviation+", BGI: "+me.BGI+", ISF: "+me.ISF+", CR: "+me.CR+", Target: "+me.target_bg+", minPredBG "+n(Sa,y)+", minGuardBG "+n(Ga,y)+", IOBpredBG "+n(xa,y),Fa>0&&(me.reason+=", COBpredBG "+n(Fa,y)),Ia>0&&(me.reason+=", UAMpredBG "+n(Ia,y)),me.reason+=tddReason,me.reason+="; ";var Za=Je;Za<40&&(Za=Math.min(Ga,Za));var $a=Ee-Za,Ja=240,Ka=240;if(F.mealCOB>0&&(oa>0||ha>0)){for(qa=0;qa<Ve.length;qa++)if(Ve[qa]<Fe){Ja=5*qa;break}for(qa=0;qa<Ve.length;qa++)if(Ve[qa]<Ee){Ka=5*qa;break}}else{for(qa=0;qa<ea.length;qa++)if(ea[qa]<Fe){Ja=5*qa;break}for(qa=0;qa<ea.length;qa++)if(ea[qa]<Ee){Ka=5*qa;break}}Le&&Ga<Ee&&(console.error("minGuardBG "+n(Ga,y)+" projected below "+n(Ee,y)+" - disabling SMB"),Le=!1);var Qa=.2;void 0!==y.maxDelta_bg_threshold&&"fullLoop"==ze&&(Qa=Math.min(y.maxDelta_bg_threshold,.4)),ye>Qa*Be&&(console.error("maxDelta "+n(ye,y)+" > "+100*Qa+"% of BG "+n(Be,y)+" - disabling SMB"),me.reason+="maxDelta "+n(ye,y)+" > "+100*Qa+"% of BG "+n(Be,y)+" - SMB disabled!, ",Le=!1),console.error("BG projected to remain above "+n(Fe,y)+" for "+Ja+"minutes"),(Ka<240||Ja<60)&&console.error("BG projected to remain above "+n(Ee,y)+" for "+Ka+"minutes");var Va=Ka,er=y.current_basal*qe*Va/60,ar=Math.max(0,F.mealCOB-.25*F.carbs),rr=($a-er)/csf-ar;er=o(er),rr=o(rr),console.error("naive_eventualBG: "+n(Je,y)+", bgUndershoot: "+n($a,y)+", zeroTempDuration: "+Va+", zeroTempEffect: "+er+", carbsReq: "+rr),"Could not parse clock data"==F.reason?console.error("carbsReq unknown: Could not parse clock data"):rr>=y.carbsReqThreshold&&Ka<=45&&(me.carbsReq=rr,me.reason+=rr+" add'l carbs req w/in "+Ka+"m; ");var tr=0;if(Be<Ee&&r.iob<20*-y.current_basal/60&&Me>0&&Me>Qe)me.reason+="IOB "+r.iob+" < "+o(20*-y.current_basal/60,2),me.reason+=" and minDelta "+n(Me,y)+" > expectedDelta "+n(Qe,y)+"; ";else if(Be<Ee||Ga<Ee)return me.reason+="minGuardBG "+n(Ga,y)+"<"+n(Ee,y),tr=o(60*(($a=xe-Ga)/qe)/y.current_basal),tr=30*o(tr/30),tr=Math.min(120,Math.max(30,tr)),I.setTempBasal(0,tr,y,me,a);if(y.skip_neutral_temps&&me.deliverAt.getMinutes()>=55)return me.reason+="; Canceling temp at "+me.deliverAt.getMinutes()+"m past the hour. ",I.setTempBasal(0,0,y,me,a);var or=0,nr=ge;if(Ke<Fe){if(me.reason+="Eventual BG "+n(Ke,y)+" < "+n(Fe,y),Me>Qe&&Me>0&&!rr)return Je<40?(me.reason+=", naive_eventualBG < 40. ",I.setTempBasal(0,30,y,me,a)):(e.delta>Me?me.reason+=", but Delta "+n(fe,y)+" > expectedDelta "+n(Qe,y):me.reason+=", but Min. Delta "+Me.toFixed(2)+" > Exp. Delta "+n(Qe,y),a.duration>15&&t(ge,y)===t(a.rate,y)?(me.reason+=", temp "+a.rate+" ~ req "+ge+"U/hr. ",me):(me.reason+="; setting current basal of "+ge+" as temp. ",I.setTempBasal(ge,30,y,me,a)));or=o(or=2*Math.min(0,(Ke-xe)/qe),2);var ir=Math.min(0,(Je-xe)/qe);if(ir=o(ir,2),Me<0&&Me>Qe)or=o(or*(Me/Qe),2);if(nr=t(nr=ge+2*or,y),a.duration*(a.rate-ge)/60<Math.min(or,ir)-.3*ge)return me.reason+=", "+a.duration+"m@"+a.rate.toFixed(2)+" is a lot less than needed. ",I.setTempBasal(nr,30,y,me,a);if(void 0!==a.rate&&a.duration>5&&nr>=.8*a.rate)return me.reason+=", temp "+a.rate+" ~< req "+nr+"U/hr. ",me;if(nr<=0){if((tr=o(60*(($a=xe-Je)/qe)/y.current_basal))<0?tr=0:(tr=30*o(tr/30),tr=Math.min(120,Math.max(0,tr))),tr>0)return me.reason+=", setting "+tr+"m zero temp. ",I.setTempBasal(nr,tr,y,me,a)}else me.reason+=", setting "+nr+"U/hr. ";return I.setTempBasal(nr,30,y,me,a)}if(Me<Qe&&(!w||!Le))return e.delta<Me?me.reason+="Eventual BG "+n(Ke,y)+" > "+n(Fe,y)+" but Delta "+n(fe,y)+" < Exp. Delta "+n(Qe,y):me.reason+="Eventual BG "+n(Ke,y)+" > "+n(Fe,y)+" but Min. Delta "+Me.toFixed(2)+" < Exp. Delta "+n(Qe,y),a.duration>15&&t(ge,y)===t(a.rate,y)?(me.reason+=", temp "+a.rate+" ~ req "+ge+"U/hr. ",me):(me.reason+="; setting current basal of "+ge+" as temp. ",I.setTempBasal(ge,30,y,me,a));if(Math.min(Ke,Sa)<Ie&&(!w||!Le))return me.reason+=n(Ke,y)+"-"+n(Sa,y)+" in range: no temp required",a.duration>15&&t(ge,y)===t(a.rate,y)?(me.reason+=", temp "+a.rate+" ~ req "+ge+"U/hr. ",me):(me.reason+="; setting current basal of "+ge+" as temp. ",I.setTempBasal(ge,30,y,me,a));if(Ke>=Ie&&(me.reason+="Eventual BG "+n(Ke,y)+" >= "+n(Ie,y)+", "),r.iob>Te)return me.reason+="IOB "+o(r.iob,2)+" > max_iob "+Te,a.duration>15&&t(ge,y)===t(a.rate,y)?(me.reason+=", temp "+a.rate+" ~ req "+ge+"U/hr. ",me):(me.reason+="; setting current basal of "+ge+" as temp. ",I.setTempBasal(ge,30,y,me,a));(or=o((Math.min(Sa,Ke)-xe)/qe,2))>Te-r.iob&&(me.reason+="max_iob "+Te+", ",or=Te-r.iob),nr=t(nr=ge+2*or,y),or=o(or,3),me.insulinReq=or;var sr=o((new Date(be).getTime()-r.lastBolusTime)/6e4,1);if(w&&Le&&Be>Ee){var lr=o(F.mealCOB/y.carb_ratio,3);if(y.use_autoisf)dr=y.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var dr=1}dr>1&&console.error("SMB max range extended from default by factor "+dr);var ur=0;void 0===y.maxSMBBasalMinutes?(ur=o(dr*y.current_basal*30/60,1),console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")):r.iob>lr&&r.iob>0?(console.error("IOB",r.iob,"> COB",F.mealCOB+"; mealInsulinReq =",lr),y.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",y.maxUAMSMBBasalMinutes,"profile.current_basal:",y.current_basal),ur=o(dr*y.current_basal*y.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),ur=o(30*y.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",y.maxSMBBasalMinutes,"profile.current_basal:",y.current_basal),ur=o(dr*y.current_basal*y.maxSMBBasalMinutes/60,1));var mr=y.bolus_increment,cr=1/mr;y.use_autoisf||(console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),Ya=.5),Ya>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(Ya,2));var pr=Math.min(or*Ya,ur);pr=Math.floor(pr*cr)/cr,tr=o(60*((xe-(Je+wa)/2)/qe)/y.current_basal),or>0&&pr<mr&&(tr=0);var gr=0;tr<=0?tr=0:tr>=30?(tr=30*o(tr/30),tr=Math.min(60,Math.max(0,tr))):(gr=o(ge*tr/30,2),tr=30),me.reason+=" insulinReq "+or,pr>=ur&&(me.reason+="; maxBolus "+ur),tr>0&&(me.reason+="; setting "+tr+"m low temp of "+gr+"U/h"),me.reason+=". ";var br=3;y.SMBInterval&&(br=Math.min(10,Math.max(1,y.SMBInterval)));var fr=o(br-sr,0),hr=o(60*(br-sr),0)%60;if(console.error("naive_eventualBG "+n(Je,y)+", "+tr+"m "+gr+"U/h temp needed; last bolus "+sr+"m ago; maxBolus: "+ur),sr>br?pr>0&&(me.units=pr,me.reason+="Microbolusing "+pr+"U. "):me.reason+="Waiting "+fr+"m "+hr+"s to microbolus again. ",tr>0)return me.rate=gr,me.duration=tr,me}var vr=I.getMaxSafeBasal(y);return nr>vr&&(me.reason+="adj. req. rate: "+o(nr,2)+" to maxSafeBasal: "+o(vr,2)+", ",nr=t(vr,y)),a.duration*(a.rate-ge)/60>=2*or?(me.reason+=a.duration+"m@"+a.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+nr+"U/hr. ",I.setTempBasal(nr,30,y,me,a)):void 0===a.duration||0===a.duration?(me.reason+="no temp, setting "+nr+"U/hr. ",I.setTempBasal(nr,30,y,me,a)):a.duration>5&&t(nr,y)<=t(a.rate,y)?(me.reason+="temp "+a.rate+" >~ req "+nr+"U/hr. ",me):(me.reason+="temp "+a.rate+"<"+nr+"U/hr. ",I.setTempBasal(nr,30,y,me,a))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),n=r(2333),i=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):n(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),n=r(1469),i=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(n(a))return o(a,e)+"";if(i(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,n=o.hasOwnProperty,i=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=n.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=i.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,n=t||o||Function("return this")();e.exports=n},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),n=r(554),i=r(9833);e.exports=function(e,a,r){e=i(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(n(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),n=r(3448),i=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,d=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(n(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?d(e.slice(2),r?2:8):i.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},a={};function r(t){var o=a[t];if(void 0!==o)return o.exports;var n=a[t]={exports:{}};return e[t](n,n.exports,r),n.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=r(5546);freeaps_determineBasal=t})();