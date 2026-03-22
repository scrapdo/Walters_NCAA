import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import storage from './storage.js';

/*──── KENPOM 2026 ────*/
const K=[{name:"Duke",rank:1,off:4,def:2},{name:"Michigan",rank:2,off:8,def:1},{name:"Arizona",rank:3,off:5,def:3},{name:"Florida",rank:4,off:9,def:6},{name:"Houston",rank:5,off:14,def:5},{name:"Iowa St.",rank:6,off:21,def:4},{name:"Illinois",rank:7,off:1,def:28},{name:"Purdue",rank:8,off:2,def:36},{name:"Michigan St.",rank:9,off:24,def:13},{name:"Gonzaga",rank:10,off:29,def:9},{name:"Vanderbilt",rank:11,off:7,def:29},{name:"Connecticut",rank:12,off:30,def:11},{name:"Virginia",rank:13,off:27,def:16},{name:"Nebraska",rank:14,off:55,def:7},{name:"Tennessee",rank:15,off:37,def:15},{name:"St. John's",rank:16,off:44,def:12},{name:"Alabama",rank:17,off:3,def:67},{name:"Arkansas",rank:18,off:6,def:52},{name:"Louisville",rank:19,off:20,def:25},{name:"Texas Tech",rank:20,off:12,def:33},{name:"Kansas",rank:21,off:57,def:10},{name:"Wisconsin",rank:22,off:11,def:51},{name:"BYU",rank:23,off:10,def:57},{name:"Saint Mary's",rank:24,off:43,def:19},{name:"Iowa",rank:25,off:31,def:31},{name:"Ohio St.",rank:26,off:17,def:53},{name:"UCLA",rank:27,off:22,def:54},{name:"Kentucky",rank:28,off:39,def:27},{name:"North Carolina",rank:29,off:32,def:37},{name:"Utah St.",rank:30,off:28,def:44},{name:"Miami FL",rank:31,off:33,def:38},{name:"Georgia",rank:32,off:16,def:80},{name:"Villanova",rank:33,off:41,def:35},{name:"N.C. State",rank:34,off:19,def:86},{name:"Santa Clara",rank:35,off:23,def:82},{name:"Clemson",rank:36,off:71,def:20},{name:"Texas",rank:37,off:13,def:111},{name:"Auburn",rank:38,off:15,def:107},{name:"Texas A&M",rank:39,off:49,def:40},{name:"Oklahoma",rank:40,off:18,def:109},{name:"Saint Louis",rank:41,off:51,def:41},{name:"SMU",rank:42,off:26,def:91},{name:"TCU",rank:43,off:81,def:22},{name:"Cincinnati",rank:44,off:131,def:8},{name:"Indiana",rank:45,off:42,def:65},{name:"VCU",rank:46,off:46,def:63},{name:"San Diego St.",rank:47,off:104,def:18},{name:"Baylor",rank:48,off:25,def:128},{name:"South Florida",rank:49,off:58,def:48},{name:"New Mexico",rank:50,off:64,def:43},{name:"Seton Hall",rank:51,off:147,def:14},{name:"Missouri",rank:52,off:50,def:77},{name:"Washington",rank:53,off:63,def:55},{name:"UCF",rank:54,off:40,def:101},{name:"Virginia Tech",rank:55,off:62,def:70},{name:"Florida St.",rank:56,off:56,def:93},{name:"Stanford",rank:57,off:65,def:71},{name:"Northwestern",rank:58,off:61,def:78},{name:"West Virginia",rank:59,off:154,def:17},{name:"LSU",rank:60,off:48,def:122},{name:"Boise St.",rank:61,off:68,def:74},{name:"Grand Canyon",rank:62,off:134,def:23},{name:"Tulsa",rank:63,off:34,def:146},{name:"Akron",rank:64,off:54,def:113},{name:"Mississippi",rank:65,off:94,def:45},{name:"Oklahoma St.",rank:66,off:45,def:138},{name:"Arizona St.",rank:67,off:78,def:66},{name:"McNeese",rank:68,off:91,def:47},{name:"Belmont",rank:69,off:38,def:152},{name:"Colorado",rank:70,off:52,def:126},{name:"Northern Iowa",rank:71,off:153,def:24},{name:"Providence",rank:72,off:36,def:176},{name:"Wake Forest",rank:73,off:67,def:103},{name:"California",rank:74,off:92,def:58},{name:"Nevada",rank:75,off:79,def:85},{name:"Yale",rank:76,off:35,def:191},{name:"Dayton",rank:77,off:139,def:32},{name:"Creighton",rank:78,off:74,def:97},{name:"Minnesota",rank:79,off:88,def:72},{name:"Georgetown",rank:80,off:87,def:73},{name:"USC",rank:81,off:101,def:61},{name:"Wichita St.",rank:82,off:102,def:64},{name:"Syracuse",rank:83,off:86,def:92},{name:"Marquette",rank:84,off:120,def:56},{name:"George Washington",rank:85,off:60,def:143},{name:"Colorado St.",rank:86,off:53,def:179},{name:"Butler",rank:87,off:75,def:124},{name:"Hofstra",rank:88,off:89,def:96},{name:"Notre Dame",rank:89,off:80,def:125},{name:"Utah Valley",rank:90,off:109,def:76},{name:"Stephen F. Austin",rank:91,off:111,def:81},{name:"High Point",rank:92,off:66,def:161},{name:"Miami OH",rank:93,off:70,def:156},{name:"Pittsburgh",rank:94,off:98,def:115},{name:"South Carolina",rank:95,off:113,def:94},{name:"George Mason",rank:96,off:107,def:104},{name:"Xavier",rank:97,off:69,def:183},{name:"Wyoming",rank:98,off:83,def:140},{name:"Oregon",rank:99,off:128,def:88},{name:"Mississippi St.",rank:100,off:110,def:105},{name:"Kansas St.",rank:101,off:105,def:116},{name:"DePaul",rank:102,off:209,def:34},{name:"Illinois St.",rank:103,off:146,def:75},{name:"UC Irvine",rank:104,off:255,def:26},{name:"Illinois Chicago",rank:105,off:149,def:83},{name:"Cal Baptist",rank:106,off:191,def:49},{name:"Hawaii",rank:107,off:207,def:42},{name:"UNLV",rank:108,off:84,def:172},{name:"St. Thomas",rank:109,off:95,def:147},{name:"UNC Wilmington",rank:110,off:119,def:114},{name:"Sam Houston St.",rank:111,off:103,def:142},{name:"Pacific",rank:112,off:142,def:99},{name:"North Dakota St.",rank:113,off:124,def:123},{name:"Davidson",rank:114,off:161,def:89},{name:"UT Rio Grande Valley",rank:115,off:136,def:120},{name:"Southern Illinois",rank:116,off:273,def:30},{name:"UC San Diego",rank:117,off:193,def:68},{name:"Saint Joseph's",rank:118,off:204,def:62},{name:"Seattle U.",rank:119,off:298,def:21},{name:"Maryland",rank:120,off:133,def:127},{name:"San Francisco",rank:121,off:100,def:181},{name:"Murray St.",rank:122,off:73,def:239},{name:"Bradley",rank:123,off:125,def:141},{name:"Rutgers",rank:124,off:148,def:121},{name:"Liberty",rank:125,off:59,def:268},{name:"Utah",rank:126,off:85,def:214},{name:"Duquesne",rank:127,off:143,def:135},{name:"UAB",rank:128,off:156,def:119},{name:"Florida Atlantic",rank:129,off:160,def:117},{name:"UC Santa Barbara",rank:130,off:97,def:208},{name:"Toledo",rank:131,off:90,def:218},{name:"Fresno St.",rank:132,off:202,def:84},{name:"Montana St.",rank:133,off:135,def:144},{name:"Memphis",rank:134,off:210,def:87},{name:"Rhode Island",rank:135,off:232,def:69},{name:"North Texas",rank:136,off:279,def:39},{name:"Washington St.",rank:137,off:96,def:225},{name:"Penn St.",rank:138,off:93,def:230},{name:"St. Bonaventure",rank:139,off:99,def:223},{name:"Wright St.",rank:140,off:117,def:194},{name:"Northern Colorado",rank:141,off:115,def:202},{name:"Navy",rank:142,off:203,def:102},{name:"Troy",rank:143,off:141,def:166},{name:"Robert Morris",rank:144,off:140,def:170},{name:"Idaho",rank:145,off:176,def:136},{name:"Portland St.",rank:146,off:277,def:50},{name:"Bowling Green",rank:147,off:205,def:106},{name:"Kent St.",rank:148,off:121,def:200},{name:"William & Mary",rank:149,off:137,def:185},{name:"Arkansas St.",rank:150,off:145,def:174},{name:"Central Arkansas",rank:151,off:151,def:163},{name:"Harvard",rank:152,off:218,def:100},{name:"UT Arlington",rank:153,off:292,def:46},{name:"Winthrop",rank:154,off:127,def:207},{name:"Boston College",rank:155,off:274,def:60},{name:"Towson",rank:156,off:237,def:90},{name:"Valparaiso",rank:157,off:185,def:134},{name:"UC Davis",rank:158,off:188,def:132},{name:"Penn",rank:159,off:215,def:112},{name:"Richmond",rank:160,off:130,def:205},{name:"Loyola Marymount",rank:161,off:221,def:108},{name:"Georgia Tech",rank:162,off:197,def:131},{name:"Kennesaw St.",rank:163,off:144,def:195},{name:"Cornell",rank:164,off:47,def:343},{name:"Temple",rank:165,off:126,def:215},{name:"Fordham",rank:166,off:261,def:79},{name:"East Tennessee St.",rank:167,off:158,def:173},{name:"Cal St. Fullerton",rank:168,off:166,def:167},{name:"Oakland",rank:169,off:82,def:295},{name:"Western Kentucky",rank:170,off:182,def:154},{name:"Eastern Washington",rank:171,off:106,def:256},{name:"Charleston",rank:172,off:187,def:149},{name:"Austin Peay",rank:173,off:186,def:151},{name:"CSUN",rank:175,off:175,def:177},{name:"Northern Kentucky",rank:176,off:162,def:196},{name:"Oregon St.",rank:177,off:167,def:190},{name:"Middle Tennessee",rank:178,off:169,def:189},{name:"Campbell",rank:182,off:132,def:251},{name:"Charlotte",rank:183,off:108,def:284},{name:"New Mexico St.",rank:184,off:179,def:201},{name:"UMBC",rank:185,off:184,def:193},{name:"Montana",rank:186,off:217,def:155},{name:"Furman",rank:190,off:200,def:182},{name:"Colgate",rank:249,off:195,def:289},{name:"Princeton",rank:252,off:244,def:250}];

/*──── NAME MAP ────*/
const NM={"Duke Blue Devils":"Duke","Michigan Wolverines":"Michigan","Arizona Wildcats":"Arizona","Florida Gators":"Florida","Houston Cougars":"Houston","Iowa State Cyclones":"Iowa St.","Illinois Fighting Illini":"Illinois","Purdue Boilermakers":"Purdue","Michigan State Spartans":"Michigan St.","Gonzaga Bulldogs":"Gonzaga","Vanderbilt Commodores":"Vanderbilt","Connecticut Huskies":"Connecticut","UConn Huskies":"Connecticut","Virginia Cavaliers":"Virginia","Nebraska Cornhuskers":"Nebraska","Tennessee Volunteers":"Tennessee","St. John's Red Storm":"St. John's","Alabama Crimson Tide":"Alabama","Arkansas Razorbacks":"Arkansas","Louisville Cardinals":"Louisville","Texas Tech Red Raiders":"Texas Tech","Kansas Jayhawks":"Kansas","Wisconsin Badgers":"Wisconsin","BYU Cougars":"BYU","Saint Mary's Gaels":"Saint Mary's","Iowa Hawkeyes":"Iowa","Ohio State Buckeyes":"Ohio St.","UCLA Bruins":"UCLA","Kentucky Wildcats":"Kentucky","North Carolina Tar Heels":"North Carolina","Utah State Aggies":"Utah St.","Miami Hurricanes":"Miami FL","Georgia Bulldogs":"Georgia","Villanova Wildcats":"Villanova","NC State Wolfpack":"N.C. State","Clemson Tigers":"Clemson","Texas Longhorns":"Texas","Auburn Tigers":"Auburn","Texas A&M Aggies":"Texas A&M","Oklahoma Sooners":"Oklahoma","Saint Louis Billikens":"Saint Louis","SMU Mustangs":"SMU","TCU Horned Frogs":"TCU","Cincinnati Bearcats":"Cincinnati","Indiana Hoosiers":"Indiana","VCU Rams":"VCU","San Diego State Aztecs":"San Diego St.","Baylor Bears":"Baylor","South Florida Bulls":"South Florida","New Mexico Lobos":"New Mexico","Seton Hall Pirates":"Seton Hall","Missouri Tigers":"Missouri","Washington Huskies":"Washington","UCF Knights":"UCF","Virginia Tech Hokies":"Virginia Tech","Florida State Seminoles":"Florida St.","Stanford Cardinal":"Stanford","Northwestern Wildcats":"Northwestern","West Virginia Mountaineers":"West Virginia","LSU Tigers":"LSU","Boise State Broncos":"Boise St.","Grand Canyon Antelopes":"Grand Canyon","Tulsa Golden Hurricane":"Tulsa","Akron Zips":"Akron","Ole Miss Rebels":"Mississippi","Oklahoma State Cowboys":"Oklahoma St.","Arizona State Sun Devils":"Arizona St.","McNeese Cowboys":"McNeese","Belmont Bruins":"Belmont","Colorado Buffaloes":"Colorado","Northern Iowa Panthers":"Northern Iowa","Providence Friars":"Providence","Wake Forest Demon Deacons":"Wake Forest","California Golden Bears":"California","Nevada Wolf Pack":"Nevada","Yale Bulldogs":"Yale","Dayton Flyers":"Dayton","Creighton Bluejays":"Creighton","Minnesota Golden Gophers":"Minnesota","Georgetown Hoyas":"Georgetown","USC Trojans":"USC","Wichita State Shockers":"Wichita St.","Syracuse Orange":"Syracuse","Marquette Golden Eagles":"Marquette","Colorado State Rams":"Colorado St.","Butler Bulldogs":"Butler","Notre Dame Fighting Irish":"Notre Dame","Pittsburgh Panthers":"Pittsburgh","South Carolina Gamecocks":"South Carolina","Xavier Musketeers":"Xavier","Oregon Ducks":"Oregon","Mississippi State Bulldogs":"Mississippi St.","Kansas State Wildcats":"Kansas St.","DePaul Blue Demons":"DePaul","UNLV Rebels":"UNLV","Maryland Terrapins":"Maryland","San Francisco Dons":"San Francisco","Murray State Racers":"Murray St.","Rutgers Scarlet Knights":"Rutgers","Liberty Flames":"Liberty","Utah Utes":"Utah","Memphis Tigers":"Memphis","Penn State Nittany Lions":"Penn St.","North Texas Mean Green":"North Texas","Washington State Cougars":"Washington St.","Oregon State Beavers":"Oregon St.","Boston College Eagles":"Boston College","Georgia Tech Yellow Jackets":"Georgia Tech","Temple Owls":"Temple","Richmond Spiders":"Richmond","Fordham Rams":"Fordham","Davidson Wildcats":"Davidson","Colgate Raiders":"Colgate","Princeton Tigers":"Princeton","Harvard Crimson":"Harvard","Cornell Big Red":"Cornell","Penn Quakers":"Penn","Navy Midshipmen":"Navy","Fresno State Bulldogs":"Fresno St.","Hawaii Rainbow Warriors":"Hawaii","Towson Tigers":"Towson","Furman Paladins":"Furman","Toledo Rockets":"Toledo","Bowling Green Falcons":"Bowling Green","Kent State Golden Flashes":"Kent St.","Miami (OH) RedHawks":"Miami OH","Montana Grizzlies":"Montana","Montana State Bobcats":"Montana St.","Idaho Vandals":"Idaho","Northern Colorado Bears":"Northern Colorado","North Dakota State Bison":"North Dakota St.","Eastern Washington Eagles":"Eastern Washington","Portland State Vikings":"Portland St.","Western Kentucky Hilltoppers":"Western Kentucky","Middle Tennessee Blue Raiders":"Middle Tennessee","Florida Atlantic Owls":"Florida Atlantic","Charlotte 49ers":"Charlotte","UAB Blazers":"UAB","Troy Trojans":"Troy","Arkansas State Red Wolves":"Arkansas St.","Sam Houston Bearkats":"Sam Houston St.","Stephen F. Austin Lumberjacks":"Stephen F. Austin","Loyola Marymount Lions":"Loyola Marymount","Pacific Tigers":"Pacific","Valparaiso Beacons":"Valparaiso","Robert Morris Colonials":"Robert Morris","Northern Kentucky Norse":"Northern Kentucky","Wright State Raiders":"Wright St.","UNC Wilmington Seahawks":"UNC Wilmington","Campbell Fighting Camels":"Campbell","High Point Panthers":"High Point","Austin Peay Governors":"Austin Peay","Winthrop Eagles":"Winthrop","Charleston Cougars":"Charleston","UMBC Retrievers":"UMBC","Southern Illinois Salukis":"Southern Illinois","Bradley Braves":"Bradley","Duquesne Dukes":"Duquesne","St. Bonaventure Bonnies":"St. Bonaventure","Rhode Island Rams":"Rhode Island","Kennesaw State Owls":"Kennesaw St.","Seattle Redhawks":"Seattle U.","New Mexico State Aggies":"New Mexico St.","Cal Baptist Lancers":"Cal Baptist","Utah Valley Wolverines":"Utah Valley","Santa Clara Broncos":"Santa Clara","George Washington Colonials":"George Washington","George Mason Patriots":"George Mason","UC Irvine Anteaters":"UC Irvine","UC Santa Barbara Gauchos":"UC Santa Barbara","UC Davis Aggies":"UC Davis","UC San Diego Tritons":"UC San Diego","Cal State Fullerton Titans":"Cal St. Fullerton","Illinois State Redbirds":"Illinois St."};
const NM2={"Michigan State":"Michigan St.","Michigan St":"Michigan St.","Ohio State":"Ohio St.","Ohio St":"Ohio St.","Penn State":"Penn St.","Penn St":"Penn St.","Iowa State":"Iowa St.","Iowa St":"Iowa St.","Utah State":"Utah St.","Utah St":"Utah St.","Kansas State":"Kansas St.","Kansas St":"Kansas St.","Oklahoma State":"Oklahoma St.","Oklahoma St":"Oklahoma St.","Arizona State":"Arizona St.","Arizona St":"Arizona St.","Boise State":"Boise St.","Boise St":"Boise St.","Florida State":"Florida St.","Florida St":"Florida St.","Oregon State":"Oregon St.","Oregon St":"Oregon St.","Colorado State":"Colorado St.","Colorado St":"Colorado St.","Washington State":"Washington St.","Washington St":"Washington St.","Mississippi State":"Mississippi St.","Mississippi St":"Mississippi St.","Wichita State":"Wichita St.","Wichita St":"Wichita St.","San Diego State":"San Diego St.","San Diego St":"San Diego St.","Fresno State":"Fresno St.","Fresno St":"Fresno St.","Murray State":"Murray St.","Murray St":"Murray St.","Montana State":"Montana St.","Montana St":"Montana St.","Portland State":"Portland St.","Portland St":"Portland St.","Kent State":"Kent St.","Kent St":"Kent St.","North Dakota State":"North Dakota St.","North Dakota St":"North Dakota St.","Wright State":"Wright St.","Wright St":"Wright St.","Illinois State":"Illinois St.","Illinois St":"Illinois St.","Kennesaw State":"Kennesaw St.","Kennesaw St":"Kennesaw St.","Sam Houston State":"Sam Houston St.","Sam Houston St":"Sam Houston St.","Sam Houston":"Sam Houston St.","New Mexico State":"New Mexico St.","New Mexico St":"New Mexico St.","Arkansas State":"Arkansas St.","Arkansas St":"Arkansas St.","NC State":"N.C. State","N.C. State":"N.C. State","UConn":"Connecticut","Ole Miss":"Mississippi","Miami (FL)":"Miami FL","Miami FL":"Miami FL","Miami (OH)":"Miami OH","St Johns":"St. John's","Saint Johns":"St. John's","Cal St Fullerton":"Cal St. Fullerton","Seattle":"Seattle U.","Seattle U":"Seattle U."};

function matchName(n){
  if(!n)return null;const s=n.trim();
  if(NM[s])return NM[s];if(NM2[s])return NM2[s];
  const stDot=s.replace(/\bState\b/g,"St.").replace(/\bSt\b(?!\.)/g,"St.");
  if(NM2[stDot])return NM2[stDot];
  const direct=K.find(t=>t.name.toLowerCase()===stDot.toLowerCase());
  if(direct)return direct.name;
  const w=s.split(" ");
  for(let i=w.length-1;i>=1;i--){const p=w.slice(0,i).join(" ");let f=K.find(t=>t.name.toLowerCase()===p.toLowerCase());if(f)return f.name;const pSt=p.replace(/\bState\b/g,"St.").replace(/\bSt\b(?!\.)/g,"St.");f=K.find(t=>t.name.toLowerCase()===pSt.toLowerCase());if(f)return f.name;}
  const l=s.toLowerCase();let best=null;for(const t of K){const tn=t.name.toLowerCase().replace(/\./g,"");if(l.includes(tn)&&(!best||t.name.length>best.name.length))best=t;}
  return best?best.name:null;
}
function findTeam(n){return K.find(t=>t.name===n)||null;}

/*──── TIME UTILS ────*/
// Returns true if the game's start time has already passed (ET-aware)
function isStarted(timeStr){
  if(!timeStr)return false;
  // Parse strings like "7:10 PM ET", "12:00 PM ET", "6:30 PM"
  const m=timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if(!m)return false;
  let h=parseInt(m[1]),min=parseInt(m[2]),ampm=m[3].toUpperCase();
  if(ampm==="PM"&&h!==12)h+=12;
  if(ampm==="AM"&&h===12)h=0;
  // Get current time in ET (UTC-5 standard / UTC-4 daylight)
  const now=new Date();
  const etOffset=isDST(now)?-4:-5;
  const etNow=new Date(now.getTime()+(now.getTimezoneOffset()+etOffset*60)*60000);
  const gameMinutes=h*60+min;
  const nowMinutes=etNow.getHours()*60+etNow.getMinutes();
  return nowMinutes>=gameMinutes;
}
function isDST(d){
  // DST in US: second Sunday in March through first Sunday in November
  const jan=new Date(d.getFullYear(),0,1).getTimezoneOffset();
  const jul=new Date(d.getFullYear(),6,1).getTimezoneOffset();
  return d.getTimezoneOffset()<Math.max(jan,jul);
}

/*──── MATH ────*/
const EC=[[1,36],[5,27],[10,22],[15,18.5],[20,16],[25,13.5],[30,11.5],[40,9],[50,7.5],[60,6],[75,4.5],[100,3],[125,1.5],[150,0],[175,-1.5],[200,-3],[225,-4.5],[250,-6],[275,-8],[300,-9.5],[325,-11],[350,-13],[365,-14.5]];
function em(r){for(let i=0;i<EC.length-1;i++){const[r1,e1]=EC[i],[r2,e2]=EC[i+1];if(r>=r1&&r<=r2)return parseFloat((e1+((r-r1)/(r2-r1))*(e2-e1)).toFixed(1));}return-14.5;}
function pct(r){return Math.max(0,Math.min(100,((365-r)/365)*100));}
function pwrLine(h,a,hca,sit){return parseFloat(((em(h.rank)-em(a.rank))*0.7+hca+sit).toFixed(1));}
function stars(e){const a=Math.abs(e);return a>=7?3:a>=5?2:a>=3?1:0;}
function fmtS(v){return v===0?"PK":v>0?"+"+v:""+v;}

// KenPom total projection: uses live AdjO/AdjD/Tempo if available, falls back to rank-interpolated values
const D1_AVG_TEMPO=67.5;
const ADJ_O_TABLE=[[1,125],[10,120],[25,116],[50,112],[75,109],[100,107],[150,104],[200,101],[250,98],[300,95],[365,90]];
// Steepened at top end — elite defenses (rank 1-25) suppress scoring more than original table implied
const ADJ_D_TABLE=[[1,87],[10,89],[25,92],[50,96],[75,99],[100,101],[150,104],[200,107],[250,110],[300,113],[365,118]];
const TEMPO_TABLE=[[1,74],[25,72],[75,70],[150,68],[250,66],[365,63]];
// Calibration scalar derived from 2026 NCAA Tournament R2 games (Duke/TCU, Houston/TexAM, Gonzaga/Texas)
const TOTAL_SCALAR=0.887;
function interpTable(tbl,rank){
  for(let i=0;i<tbl.length-1;i++){const[r1,v1]=tbl[i],[r2,v2]=tbl[i+1];if(rank>=r1&&rank<=r2)return parseFloat((v1+((rank-r1)/(r2-r1))*(v2-v1)).toFixed(1));}
  return tbl[tbl.length-1][1];
}
function calcTotal(h,a,liveData){
  // Use live fetched values if available, otherwise interpolate from rank
  const ld=liveData||{};
  const hAdjO=ld[h.name]?.adjO??interpTable(ADJ_O_TABLE,h.off);
  const hAdjD=ld[h.name]?.adjD??interpTable(ADJ_D_TABLE,h.def);
  const hTempo=ld[h.name]?.tempo??interpTable(TEMPO_TABLE,h.rank);
  const aAdjO=ld[a.name]?.adjO??interpTable(ADJ_O_TABLE,a.off);
  const aAdjD=ld[a.name]?.adjD??interpTable(ADJ_D_TABLE,a.def);
  const aTempo=ld[a.name]?.tempo??interpTable(TEMPO_TABLE,a.rank);
  const poss=(hTempo*aTempo)/D1_AVG_TEMPO;
  const homePts=((hAdjO+aAdjD)/2)*(poss/100);
  const awayPts=((aAdjO+hAdjD)/2)*(poss/100);
  return parseFloat(((homePts+awayPts)*TOTAL_SCALAR).toFixed(1));
}

const SF=[{id:"hb",label:"Home back-to-back",val:-1.5},{id:"ab",label:"Away back-to-back",val:1.5},{id:"h3",label:"Home 3-in-4 days",val:-2.5},{id:"a3",label:"Away 3-in-4 days",val:2.5},{id:"hr",label:"Home 5+ days rest",val:1.0},{id:"ar",label:"Away 5+ days rest",val:-1.0},{id:"sn",label:"Senior Night",val:2.0},{id:"tr",label:"Away cross-country",val:1.5},{id:"rv",label:"Away revenge game",val:-1.5},{id:"ri",label:"Rivalry game",val:0}];

async function sGet(k){try{const r=await storage.get(k);return r?JSON.parse(r.value):null;}catch{return null;}}
async function sSet(k,v){try{await storage.set(k,JSON.stringify(v));}catch{}}

/*──── STYLES ────*/
function injectCSS(){
  if(document.getElementById("ms"))return;
  const s=document.createElement("style");s.id="ms";
  s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
    :root {
      --bg:#F5F3ED;--surface:#FFFFFF;--border:#E0DCD3;
      --navy:#00274C;--navyLight:#0A3A6B;--navySoft:#E8EDF3;
      --maize:#FFCB05;--maizeDim:#D4A804;--maizeSoft:#FFF8E0;--maizeGlow:#FFCB0533;
      --ink:#1A1A18;--ink2:#4A483F;--ink3:#8A877D;--ink4:#BAB7AE;
      --green:#27804A;--red:#C0392B;--greenBg:#F0F9F3;--redBg:#FDF0EE;
      --shadow:0 1px 3px rgba(0,39,76,.04),0 4px 16px rgba(0,39,76,.05);
      --shadowLg:0 2px 8px rgba(0,39,76,.06),0 12px 40px rgba(0,39,76,.08);
      --r:14px;--rs:10px;
      --fd:'Cormorant Garamond',Georgia,serif;
      --fb:'DM Sans',system-ui,sans-serif;
      --fm:'IBM Plex Mono',monospace;
    }
    .up{animation:aUp .5s cubic-bezier(.16,1,.3,1) both}
    .u1{animation-delay:.05s}.u2{animation-delay:.1s}.u3{animation-delay:.15s}
    @keyframes aUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .fade{animation:aFade .3s ease both}@keyframes aFade{from{opacity:0}to{opacity:1}}
    .pulse{animation:aPulse 2s ease-in-out infinite}@keyframes aPulse{0%,100%{opacity:.35}50%{opacity:1}}
    .fill{transition:width .8s cubic-bezier(.16,1,.3,1)}

    .scr::-webkit-scrollbar{width:3px}.scr::-webkit-scrollbar-track{background:transparent}.scr::-webkit-scrollbar-thumb{background:var(--ink4);border-radius:3px}

    .card{background:var(--surface);border-radius:var(--r);box-shadow:var(--shadow);transition:box-shadow .2s}

    .inp{background:var(--bg);border:1.5px solid var(--border);border-radius:var(--rs);padding:12px 14px;color:var(--ink);font-size:14px;font-family:var(--fb);outline:none;width:100%;box-sizing:border-box;transition:border-color .2s}
    .inp:focus{border-color:var(--navy)}
    .inp::placeholder{color:var(--ink4)}

    .chk{-webkit-appearance:none;appearance:none;width:18px;height:18px;border:1.5px solid var(--border);border-radius:5px;background:var(--bg);cursor:pointer;position:relative;flex-shrink:0;transition:all .15s}
    .chk:checked{background:var(--navy);border-color:var(--navy)}
    .chk:checked::after{content:'';position:absolute;left:5px;top:2px;width:5px;height:9px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}

    .rng{-webkit-appearance:none;width:100%;height:4px;background:var(--border);border-radius:2px;outline:none}
    .rng::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--navy);cursor:pointer;border:3px solid white;box-shadow:0 1px 4px rgba(0,39,76,.2)}

    .btn{border:none;border-radius:var(--rs);cursor:pointer;font-family:var(--fb);font-weight:600;transition:all .15s}
    .btn:active{transform:scale(.97)}
    .bp{background:var(--navy);color:white;padding:14px 24px;font-size:14px;letter-spacing:.3px}
    .bp:hover{background:var(--navyLight)}.bp:disabled{background:var(--ink4);cursor:not-allowed}
    .bg{background:transparent;color:var(--ink3);padding:8px 14px;font-size:13px;border:1.5px solid var(--border)}
    .bg:hover{border-color:var(--ink3);color:var(--ink2)}

    .tab{font-family:var(--fb);font-size:13px;font-weight:500;padding:8px 16px;border:none;background:none;cursor:pointer;color:var(--ink3);border-radius:20px;transition:all .2s}
    .tab-a{color:var(--navy);background:var(--navySoft)}

    .game{padding:14px 18px;cursor:pointer;transition:background .15s;border-radius:var(--rs)}.game:hover{background:var(--navySoft)}

    /* Maize stripe accent */
    .maize-bar{height:3px;background:linear-gradient(90deg,var(--maize),var(--maizeDim));border-radius:2px}

    /* Adjustments toggle button */
    .adj-toggle{display:flex;align-items:center;justify-content:space-between;margin:12px 16px;border-radius:var(--rs);cursor:pointer;padding:12px 16px;transition:all .2s;user-select:none;border:1.5px dashed var(--border);background:var(--bg)}
    .adj-toggle:hover{border-color:var(--navy);border-style:solid;background:var(--navySoft)}
    .adj-toggle.adj-active{border-style:solid;border-color:var(--navy);background:var(--navySoft);box-shadow:0 0 0 3px var(--maizeGlow)}
    .adj-toggle.adj-open{border-style:solid;border-color:var(--navy);background:var(--navySoft)}
  `;
  document.head.appendChild(s);
}

/*──── GAME PICKER ────*/
function GamePicker({onSelect}){
  const[day,setDay]=useState("today");
  const[cache,setCache]=useState({today:null,tomorrow:null});
  const[liveData,setLiveData]=useState({});
  const[busy,setBusy]=useState(false);const[err,setErr]=useState("");
  const[now,setNow]=useState(()=>new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),3600000);return()=>clearInterval(t);},[]);

  const games=cache[day]||[];

  const doFetch=useCallback(async(which)=>{
    setBusy(true);setErr("");
    const d=new Date();
    if(which==="tomorrow")d.setDate(d.getDate()+1);
    const dateStr=d.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});
    const label=which==="tomorrow"?"tomorrow":"today";
    try{
      const[gamesRes,kpRes]=await Promise.all([
        fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:8000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search for ALL NCAAB NCAA men's college basketball games with point spreads AND over/under totals for ${dateStr} (${label}). Search ESPN, OddsShark, Covers, Action Network, or any sportsbook. I need EVERY Division 1 game — not just featured games.\n\nReturn ONLY a JSON array. Each object: {"away":"School Name","home":"School Name","spread":number,"ou":number,"time":"7:10 PM ET","note":"NCAA Tournament Round of 32"}\n- spread = home team perspective (negative = home favored)\n- ou = over/under total (e.g. 143.5) — include for every game\n- Use short KenPom names (e.g. "Michigan St." not "Michigan State Spartans")\n- note: always include context e.g. "NCAA Tournament Round of 64", "Regular Season"\nIf no games, return [].`}]})}),
        fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:6000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Search cleatz.com/latest-kenpom-rankings or barttorvik.com for current 2026 KenPom efficiency data. I need AdjO (adjusted offensive efficiency), AdjD (adjusted defensive efficiency), and Tempo (adjusted tempo) for as many D1 teams as possible.\n\nReturn ONLY a JSON array. Each object: {"team":"Short KenPom name","adjO":number,"adjD":number,"tempo":number}\nUse short names (e.g. "Duke", "Michigan St.", "N.C. State"). Aim for top 150+ teams.`}]})})
      ]);
      // parse games
      const gData=await gamesRes.json();
      if(gData.error){setErr("API: "+JSON.stringify(gData.error));setBusy(false);return;}
      const gTxt=(gData.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
      const gM=gTxt.match(/\[[\s\S]*?\]/);
      if(!gM){setErr("No games found.");setBusy(false);return;}
      const parsed=JSON.parse(gM[0]).map((g,i)=>{
        const hk=matchName(g.home)||g.home,ak=matchName(g.away)||g.away;
        return{id:i,hk,ak,ht:findTeam(hk),at:findTeam(ak),spread:parseFloat(g.spread),ou:g.ou?parseFloat(g.ou):null,time:g.time||"",note:g.note||"",ok:!!findTeam(hk)&&!!findTeam(ak)&&!isNaN(parseFloat(g.spread))};
      }).filter(g=>!isNaN(g.spread)).sort((a,b)=>b.ok-a.ok);
      setCache(p=>({...p,[which]:parsed}));
      // parse kenpom live
      const kpData=await kpRes.json();
      const kpTxt=(kpData.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
      const kpM=kpTxt.match(/\[[\s\S]*?\]/);
      if(kpM){try{const arr=JSON.parse(kpM[0]);const map={};arr.forEach(t=>{const n=matchName(t.team)||t.team;if(n&&t.adjO&&t.adjD&&t.tempo)map[n]={adjO:+t.adjO,adjD:+t.adjD,tempo:+t.tempo};});setLiveData(p=>({...p,...map}));}catch{}}
    }catch(e){setErr("Search failed: "+e.message);}finally{setBusy(false);}
  },[]);

  const switchDay=useCallback((which)=>{
    setDay(which);setErr("");
    if(!cache[which])doFetch(which);
  },[cache,doFetch]);

  const isTomorrow=day==="tomorrow";
  const liveCount=Object.keys(liveData).length;

  if(!games.length&&!busy&&!err)return(
    <div className="card up u1" style={{margin:"0 20px",padding:"24px",textAlign:"center"}}>
      <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:16}}>
        {[["today","Today"],["tomorrow","Tomorrow"]].map(([v,l])=>(
          <button key={v} className="btn" style={{padding:"7px 18px",fontSize:12,fontWeight:600,borderRadius:20,background:day===v?"var(--navy)":"var(--bg)",color:day===v?"white":"var(--ink3)",border:"1.5px solid "+(day===v?"var(--navy)":"var(--border)")}} onClick={()=>switchDay(v)}>{l}</button>
        ))}
      </div>
      <div style={{fontSize:13,color:"var(--ink3)",fontFamily:"var(--fb)",marginBottom:4}}>Load D1 spreads + totals for {day}</div>
      <div style={{fontSize:11,color:"var(--ink4)",fontFamily:"var(--fm)",marginBottom:16}}>Also fetches live KenPom AdjO/AdjD/Tempo</div>
      <button className="btn bp" onClick={()=>doFetch(day)} style={{padding:"12px 32px"}}>Fetch Games</button>
    </div>
  );

  return(
    <div className="card up u1" style={{margin:"0 20px",overflow:"hidden"}}>
      <div style={{padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"flex",gap:3}}>
          {[["today","Today"],["tomorrow","Tomorrow"]].map(([v,l])=>(
            <button key={v} className="btn" style={{padding:"5px 12px",fontSize:11,fontWeight:600,borderRadius:16,background:day===v?"var(--navy)":"transparent",color:day===v?"white":"var(--ink3)",border:"1.5px solid "+(day===v?"var(--navy)":"var(--border)")}} onClick={()=>switchDay(v)}>{l}</button>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {liveCount>0&&<span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--green)"}}>KP {liveCount}</span>}
          {games.length>0&&<span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)"}}>{games.length} games</span>}
          <button className="btn bg" onClick={()=>doFetch(day)} disabled={busy} style={{padding:"4px 12px",fontSize:11}}>{busy?"...":"Refresh"}</button>
        </div>
      </div>
      {err&&<div style={{padding:"10px 20px",fontSize:12,color:"var(--red)"}}>{err}</div>}
      {busy?<div style={{padding:"32px",textAlign:"center"}}><span className="pulse" style={{fontSize:12,fontFamily:"var(--fm)",color:"var(--navy)"}}>Fetching games + KenPom data...</span><div style={{fontSize:11,fontFamily:"var(--fb)",color:"var(--ink4)",marginTop:6}}>Two searches running in parallel</div></div>:
      <div style={{maxHeight:480,overflowY:"auto"}} className="scr">
        {games.map(g=>{
          const nl=(g.note||"").toLowerCase();
          const isNeutral=nl.includes("ncaa")||nl.includes("march madness")||(nl.includes("tournament")&&!nl.includes("conf"))||nl.includes("nit")||nl.includes("cbi")||nl.includes("crown");
          const isConf=nl.includes("conf")||nl.includes("conference");
          const vLabel=isNeutral?"Neutral":isConf?"Tourney":"Home";
          const started=!isTomorrow&&isStarted(g.time);
          const clickable=g.ok&&!started;
          return(
          <div key={g.id} className="game" style={{opacity:!g.ok?0.35:started?0.55:1,cursor:clickable?"pointer":"default",pointerEvents:clickable?"auto":"none",background:started?"var(--bg)":"transparent"}} onClick={()=>{if(clickable)onSelect({homeTeam:g.ht,awayTeam:g.at,spread:g.spread,ou:g.ou,note:g.note,liveData});}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontFamily:"var(--fb)",fontWeight:500,color:started?"var(--ink3)":"var(--ink)",textDecoration:started?"line-through":"none",textDecorationColor:"var(--ink3)"}}>{g.ak} <span style={{fontSize:12,fontWeight:400}}>at</span> {g.hk}</div>
                <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",marginTop:3,display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                  {started?<span style={{fontSize:9,padding:"2px 7px",borderRadius:4,background:"var(--border)",color:"var(--ink3)",fontWeight:600,letterSpacing:.5}}>STARTED</span>:g.time&&<span>{g.time}</span>}
                  {g.note&&<span style={{color:"var(--ink4)"}}>{g.note}</span>}
                  {!started&&<span style={{fontSize:9,padding:"1px 6px",borderRadius:4,background:isNeutral?"var(--navySoft)":isConf?"var(--maizeSoft)":"var(--bg)",color:isNeutral?"var(--navy)":isConf?"var(--maizeDim)":"var(--ink4)",fontWeight:500}}>{vLabel}</span>}
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0,marginLeft:12}}>
                <div style={{fontSize:20,fontFamily:"var(--fd)",fontWeight:600,color:started?"var(--ink4)":g.ok?"var(--navy)":"var(--ink4)"}}>{g.spread>0?"+":""}{g.spread}</div>
                {g.ou&&<div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",marginTop:1}}>o/u {g.ou}</div>}
              </div>
            </div>
          </div>
          );})}
      </div>}
    </div>
  );
}

/*──── TEAM SELECTOR ────*/
function TeamPick({label,value,onChange,other}){
  const[q,setQ]=useState("");const[open,setOpen]=useState(false);const ref=useRef(null);const iRef=useRef(null);
  const list=useMemo(()=>K.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())&&t.name!==other?.name).slice(0,50),[q,other]);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  useEffect(()=>{if(open&&iRef.current)iRef.current.focus();},[open]);
  return(
    <div ref={ref} style={{position:"relative"}}>
      <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:1,marginBottom:6,fontWeight:500}}>{label}</div>
      <div onClick={()=>setOpen(o=>!o)} style={{background:"var(--surface)",border:"1.5px solid "+(open?"var(--navy)":"var(--border)"),borderRadius:"var(--rs)",padding:"12px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"border-color .2s",boxShadow:open?"0 0 0 3px var(--navySoft)":"none"}}>
        <span style={{fontSize:15,fontFamily:"var(--fb)",fontWeight:value?500:400,color:value?"var(--ink)":"var(--ink4)"}}>{value?value.name:"Select"}</span>
        {value&&<span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--navy)"}}>#{value.rank}</span>}
      </div>
      {open&&(
        <div className="fade scr" style={{position:"absolute",zIndex:200,top:"100%",left:0,right:0,marginTop:4,background:"var(--surface)",borderRadius:"var(--r)",maxHeight:260,overflowY:"auto",boxShadow:"var(--shadowLg)",border:"1px solid var(--border)"}}>
          <div style={{position:"sticky",top:0,background:"var(--surface)",zIndex:1,padding:2}}>
            <input ref={iRef} className="inp" style={{border:"none",background:"transparent",borderBottom:"1px solid var(--border)",borderRadius:0,fontSize:13}} placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>{if(e.key==="Escape")setOpen(false);}} />
          </div>
          {list.map(t=>{const e=em(t.rank);return(
            <div key={t.name} style={{padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:value?.name===t.name?"var(--navySoft)":"transparent"}} onClick={()=>{onChange(t);setOpen(false);setQ("");}} onMouseEnter={e2=>e2.currentTarget.style.background="var(--bg)"} onMouseLeave={e2=>e2.currentTarget.style.background=value?.name===t.name?"var(--navySoft)":"transparent"}>
              <span style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink)"}}>{t.name}</span>
              <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink3)"}}>#{t.rank} {e>0?"+":""}{e}</span>
            </div>);})}
        </div>
      )}
    </div>
  );
}

/*──── MATCHUP ────*/
function Matchup({home,away}){
  if(!home||!away)return null;
  const rows=[{l:"Overall",h:home.rank,a:away.rank},{l:"Offense",h:home.off,a:away.off},{l:"Defense",h:home.def,a:away.def}];
  return(
    <div className="card up u2" style={{margin:"0 20px",padding:"20px 22px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
        <span style={{fontSize:14,fontFamily:"var(--fb)",fontWeight:600,color:"var(--ink)"}}>{home.name}</span>
        <span style={{fontSize:14,fontFamily:"var(--fb)",fontWeight:600,color:"var(--ink)"}}>{away.name}</span>
      </div>
      {rows.map(r=>(
        <div key={r.l} style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
            <span style={{fontSize:12,fontFamily:"var(--fm)",fontWeight:500,color:r.h<r.a?"var(--navy)":"var(--ink3)"}}>#{r.h}</span>
            <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:2}}>{r.l.toUpperCase()}</span>
            <span style={{fontSize:12,fontFamily:"var(--fm)",fontWeight:500,color:r.a<r.h?"var(--navy)":"var(--ink3)"}}>#{r.a}</span>
          </div>
          <div style={{display:"flex",gap:4,height:5}}>
            <div style={{flex:1,background:"var(--bg)",borderRadius:3,overflow:"hidden",display:"flex",justifyContent:"flex-end"}}>
              <div className="fill" style={{width:pct(r.h)+"%",background:r.h<r.a?"var(--navy)":"var(--ink4)",borderRadius:3,opacity:.6}} />
            </div>
            <div style={{flex:1,background:"var(--bg)",borderRadius:3,overflow:"hidden"}}>
              <div className="fill" style={{width:pct(r.a)+"%",background:r.a<r.h?"var(--navy)":"var(--ink4)",borderRadius:3,opacity:.6}} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/*──── RESULT ────*/
function Result({result}){
  if(!result)return null;
  const{recommendation:rec,stars:st,reasoning,unit_size,key_factors,ou_recommendation:ouRec,ou_stars:ouSt,ou_reasoning:ouReasoning}=result;
  const pass=!rec||rec.includes("NO BET")||rec.includes("PASS");
  const ouPass=!ouRec||ouRec.includes("NO BET")||ouRec.includes("PASS");
  return(
    <div className="card up" style={{margin:"0 20px",overflow:"hidden",border:pass&&ouPass?"none":"2px solid var(--navy)"}}>
      <div style={{padding:"16px 22px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:11,fontFamily:"var(--fm)",fontWeight:500,color:"var(--navy)",letterSpacing:1.5}}>ANALYSIS</span>
        <span style={{fontSize:16,letterSpacing:3,color:st>=2?"var(--maize)":"var(--ink4)"}}>{"\u2605".repeat(st||0)}{"\u2606".repeat(3-(st||0))}</span>
      </div>
      <div style={{padding:"18px 22px 22px"}}>
        {/* Spread rec */}
        <div style={{marginBottom:ouRec?16:0}}>
          <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:1.5,marginBottom:6}}>SPREAD</div>
          <div style={{display:"inline-block",background:pass?"var(--bg)":rec?.includes("HOME")?"var(--greenBg)":"var(--navySoft)",color:pass?"var(--ink3)":rec?.includes("HOME")?"var(--green)":"var(--navy)",borderRadius:8,padding:"6px 14px",fontSize:12,fontFamily:"var(--fb)",fontWeight:600,marginBottom:10}}>{rec||"\u2014"}</div>
          {key_factors?.length>0&&<div style={{marginBottom:10}}>{key_factors.map((f,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:5}}><span style={{color:"var(--maize)",fontSize:8,marginTop:5,flexShrink:0}}>{"\u25CF"}</span><span style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink2)",lineHeight:1.5}}>{f}</span></div>)}</div>}
          <div style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink2)",lineHeight:1.75}}>{reasoning}</div>
          {unit_size&&unit_size!=="No bet"&&<div style={{marginTop:8,fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)"}}>{unit_size}</div>}
        </div>
        {/* O/U rec */}
        {ouRec&&(
          <div style={{borderTop:"1px solid var(--border)",marginTop:16,paddingTop:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:1.5}}>TOTAL</div>
              <span style={{fontSize:14,letterSpacing:2,color:(ouSt||0)>=2?"var(--maize)":"var(--ink4)"}}>{"\u2605".repeat(ouSt||0)}{"\u2606".repeat(3-(ouSt||0))}</span>
            </div>
            <div style={{display:"inline-block",background:ouPass?"var(--bg)":ouRec.includes("OVER")?"var(--redBg)":"var(--navySoft)",color:ouPass?"var(--ink3)":ouRec.includes("OVER")?"var(--red)":"var(--navy)",borderRadius:8,padding:"6px 14px",fontSize:12,fontFamily:"var(--fb)",fontWeight:600,marginBottom:10}}>{ouRec}</div>
            {ouReasoning&&<div style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink2)",lineHeight:1.75}}>{ouReasoning}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/*──── BET LOG ────*/
function Log({log,onUpdate,onClear}){
  if(!log.length)return(<div style={{textAlign:"center",padding:"60px 24px"}}><div style={{fontSize:40,marginBottom:8,opacity:.12,color:"var(--navy)"}}>{"\u2660"}</div><div style={{fontSize:14,fontFamily:"var(--fb)",color:"var(--ink3)"}}>No bets logged yet</div></div>);
  const w=log.filter(b=>b.outcome==="W").length,l=log.filter(b=>b.outcome==="L").length,p=log.filter(b=>b.outcome==="P").length,d=w+l,wr=d>0?((w/d)*100).toFixed(0):"\u2014";
  return(
    <>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,padding:"16px 20px 0"}}>
        {[{n:w,l:"Wins",c:"var(--green)"},{n:l,l:"Losses",c:"var(--red)"},{n:p,l:"Push",c:"var(--ink3)"},{n:wr+(d>0?"%":""),l:"Rate",c:d>0&&w/d>=.525?"var(--navy)":"var(--ink)"}].map(s=>(
          <div key={s.l} className="card" style={{padding:"14px 8px",textAlign:"center"}}><div style={{fontSize:22,fontFamily:"var(--fd)",fontWeight:600,color:s.c}}>{s.n}</div><div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",marginTop:2}}>{s.l}</div></div>
        ))}
      </div>
      {log.map((b,i)=>(
        <div key={b.ts||i} className="card up" style={{margin:"10px 20px 0",padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <div><div style={{fontSize:14,fontFamily:"var(--fb)",fontWeight:500,color:"var(--ink)"}}>{b.away} at {b.home}</div><div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--navy)",marginTop:3}}>{b.recommendation}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:11,fontFamily:"var(--fm)",color:Math.abs(b.edge)>=5?"var(--navy)":"var(--ink3)"}}>Edge {b.edge>0?"+":""}{b.edge}</div><div style={{fontSize:13,letterSpacing:2,color:b.stars>=2?"var(--maize)":"var(--ink4)",marginTop:2}}>{"\u2605".repeat(b.stars)}{"\u2606".repeat(3-b.stars)}</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink4)"}}>{fmtS(b.posted)} / {fmtS(b.powerLine)}{b.postedOu?` · o/u ${b.postedOu}`:""}</span>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <div style={{display:"flex",gap:3}}>
                <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",alignSelf:"center",marginRight:2}}>ATS</span>
                {["W","L","P"].map(o=>{const a=b.outcome===o;return <button key={o} className="btn" style={{padding:"4px 10px",fontSize:10,fontFamily:"var(--fm)",fontWeight:500,borderRadius:6,background:a?(o==="W"?"var(--greenBg)":o==="L"?"var(--redBg)":"var(--bg)"):"transparent",color:a?(o==="W"?"var(--green)":o==="L"?"var(--red)":"var(--ink2)"):"var(--ink4)",border:"1.5px solid "+(a?(o==="W"?"var(--green)":o==="L"?"var(--red)":"var(--ink3)"):"var(--border)")}} onClick={()=>onUpdate(i,o,"outcome")}>{o}</button>;})}
              </div>
              {b.ouRec&&b.ouRec!=="NO BET"&&b.ouRec!=="PASS"&&b.ouRec!=="N/A"&&(
                <div style={{display:"flex",gap:3}}>
                  <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",alignSelf:"center",marginRight:2}}>O/U</span>
                  {["W","L","P"].map(o=>{const a=b.ouOutcome===o;return <button key={o} className="btn" style={{padding:"4px 10px",fontSize:10,fontFamily:"var(--fm)",fontWeight:500,borderRadius:6,background:a?(o==="W"?"var(--greenBg)":o==="L"?"var(--redBg)":"var(--bg)"):"transparent",color:a?(o==="W"?"var(--green)":o==="L"?"var(--red)":"var(--ink2)"):"var(--ink4)",border:"1.5px solid "+(a?(o==="W"?"var(--green)":o==="L"?"var(--red)":"var(--ink3)"):"var(--border)")}} onClick={()=>onUpdate(i,o,"ouOutcome")}>{o}</button>;})}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div style={{padding:"20px",textAlign:"center"}}><button className="btn bg" onClick={onClear} style={{fontSize:11}}>Clear All</button></div>
    </>
  );
}

/*──── RATINGS ────*/
function Ratings(){
  const[q,setQ]=useState("");const list=useMemo(()=>K.filter(t=>t.name.toLowerCase().includes(q.toLowerCase())).slice(0,80),[q]);
  return(
    <>
      <div style={{padding:"12px 20px 0"}}><input className="inp" placeholder="Search teams..." value={q} onChange={e=>setQ(e.target.value)} style={{fontSize:13}} /></div>
      <div style={{padding:"12px 20px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"36px 1fr 52px 80px",padding:"8px 12px",fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",fontWeight:500}}>
          <span style={{textAlign:"right"}}>#</span><span style={{paddingLeft:12}}>Team</span><span style={{textAlign:"right"}}>EM</span><span style={{textAlign:"right"}}>O / D</span>
        </div>
        {list.map(t=>{const e=em(t.rank);return(
          <div key={t.name} style={{display:"grid",gridTemplateColumns:"36px 1fr 52px 80px",padding:"9px 12px",borderBottom:"1px solid var(--bg)",alignItems:"center"}}>
            <span style={{fontSize:11,fontFamily:"var(--fm)",color:t.rank<=10?"var(--navy)":t.rank<=25?"var(--maizeDim)":"var(--ink4)",textAlign:"right",fontWeight:500}}>{t.rank}</span>
            <span style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink)",paddingLeft:12,fontWeight:500}}>{t.name}</span>
            <span style={{fontSize:11,fontFamily:"var(--fm)",color:e>15?"var(--navy)":e>0?"var(--ink2)":"var(--red)",textAlign:"right"}}>{e>0?"+":""}{e}</span>
            <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",textAlign:"right"}}>{t.off} / {t.def}</span>
          </div>);})}
      </div>
    </>
  );
}

/*──── SYSTEM ────*/
function System(){
  const items=[{t:"Power Line",d:"(Home AdjEM \u2212 Away AdjEM) \u00D7 0.70 + HCA. Default HCA: 3.5 points."},{t:"Edge Threshold",d:"Only bet edge \u2265 3. Stars: \u2605 3\u20134, \u2605\u2605 5\u20136, \u2605\u2605\u2605 7+."},{t:"Efficiency",d:"AdjEM = AdjO \u2212 AdjD per 100 possessions vs average D1. Duke +36 \u2248 25 pts/game."},{t:"Fatigue",d:"B2B (\u22121.5), 3-in-4 (\u22122.5), rest (+1.0), travel (\u22121.5), Senior Night (+2.0)."},{t:"Bankroll",d:"2\u20134% per unit. \u2605=1u, \u2605\u2605=2u, \u2605\u2605\u2605=3u. Never chase."}];
  return(
    <div style={{padding:"8px 20px 24px"}}>
      {items.map(({t,d})=><div key={t} className="card" style={{padding:"18px 22px",marginTop:10}}><div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--navy)",fontWeight:500,letterSpacing:1,marginBottom:8}}>{t.toUpperCase()}</div><div style={{fontSize:13,fontFamily:"var(--fb)",color:"var(--ink2)",lineHeight:1.8}}>{d}</div></div>)}
      <div style={{textAlign:"center",padding:"24px 0 0",fontSize:11,fontFamily:"var(--fb)",color:"var(--ink4)",lineHeight:2}}>Walters {"\u2014"} Gambler {"\u00b7"} KenPom 2026</div>
    </div>
  );
}


/*──── MAIN ────*/
export default function App(){
  useEffect(()=>{injectCSS();},[]);
  const[tab,setTab]=useState("analyze");
  const[ht,setHt]=useState(null);const[at,setAt]=useState(null);
  const[venue,setVenue]=useState("home");const[spread,setSpread]=useState("");
  const[ou,setOu]=useState("");const[liveData,setLiveData]=useState({});
  const[hca,setHca]=useState(3.5);const[sit,setSit]=useState({});
  const[notes,setNotes]=useState("");const[busy,setBusy]=useState(false);
  const[result,setResult]=useState(null);const[log,setLog]=useState([]);
  const[err,setErr]=useState("");const[logOk,setLogOk]=useState(false);
  const[sitOpen,setSitOpen]=useState(false);

  useEffect(()=>{sGet("w-log").then(d=>{if(d)setLog(d);setLogOk(true);});},[]);
  useEffect(()=>{if(logOk)sSet("w-log",log);},[log,logOk]);

  const sadj=useMemo(()=>SF.reduce((s,f)=>(!sit[f.id]||!f.val)?s:s+f.val,0),[sit]);
  const hcaVal=venue==="home"?hca:0;
  const pl=ht&&at?pwrLine(ht,at,hcaVal,sadj):null;
  const ps=parseFloat(spread);
  const edge=pl!==null&&!isNaN(ps)?parseFloat((pl+ps).toFixed(1)):null;
  const myTotal=ht&&at?calcTotal(ht,at,liveData):null;
  const postedOu=parseFloat(ou);
  const ouEdge=myTotal!==null&&!isNaN(postedOu)?parseFloat((myTotal-postedOu).toFixed(1)):null;
  const canRun=ht&&at&&!isNaN(ps)&&edge!==null&&Math.abs(edge)>=1;

  const selectGame=useCallback(g=>{
    setHt(g.homeTeam);setAt(g.awayTeam);setSpread(String(g.spread));
    setOu(g.ou?String(g.ou):"");
    if(g.liveData)setLiveData(g.liveData);
    setResult(null);setErr("");
    const n=(g.note||"").toLowerCase();
    if(n.includes("ncaa")||n.includes("march madness")||n.includes("tournament")&&!n.includes("conf"))setVenue("neutral");
    else if(n.includes("nit")||n.includes("cbi")||n.includes("crown"))setVenue("neutral");
    else if(n.includes("conf")||n.includes("conference"))setVenue("conf");
    else setVenue("home");
  },[]);
  const swap=useCallback(()=>{setHt(at);setAt(ht);setResult(null);},[ht,at]);
  const reset=useCallback(()=>{setHt(null);setAt(null);setSpread("");setOu("");setSit({});setNotes("");setResult(null);setErr("");setVenue("home");setHca(3.5);},[]);

  const activeSitCount=useMemo(()=>Object.values(sit).filter(Boolean).length,[sit]);

  const run=useCallback(async()=>{
    if(!canRun)return;setBusy(true);setErr("");setResult(null);
    const he=em(ht.rank),ae=em(at.rank),st=stars(edge);
    const ld=liveData||{};
    const hLive=ld[ht.name],aLive=ld[at.name];
    const hAdjO=hLive?.adjO??interpTable(ADJ_O_TABLE,ht.off);
    const hAdjD=hLive?.adjD??interpTable(ADJ_D_TABLE,ht.def);
    const hTempo=hLive?.tempo??interpTable(TEMPO_TABLE,ht.rank);
    const aAdjO=aLive?.adjO??interpTable(ADJ_O_TABLE,at.off);
    const aAdjD=aLive?.adjD??interpTable(ADJ_D_TABLE,at.def);
    const aTempo=aLive?.tempo??interpTable(TEMPO_TABLE,at.rank);
    const ouSection=myTotal!==null?`
MY TOTAL: ${myTotal} (${hLive&&aLive?"live KenPom":"rank-interpolated"})
  ${ht.name}: AdjO ${hAdjO} / AdjD ${hAdjD} / Tempo ${hTempo}
  ${at.name}: AdjO ${aAdjO} / AdjD ${aAdjD} / Tempo ${aTempo}
POSTED O/U: ${!isNaN(postedOu)?postedOu:"not provided"}
TOTAL EDGE: ${ouEdge!==null?ouEdge+"("+( ouEdge>0?"OVER":"UNDER")+")":"n/a"}`:"TOTAL: No O/U posted";
    const prompt=`You are a sharp NCAA basketball handicapper applying Billy Walters' system.

GAME: ${at.name} (#${at.rank}, EM ${ae>0?"+":""}${ae}, O:#${at.off} D:#${at.def}) @ ${ht.name} (#${ht.rank}, EM ${he>0?"+":""}${he}, O:#${ht.off} D:#${ht.def})
VENUE: ${venue!=="home"?"Neutral":ht.name+" home (HCA "+hcaVal+")"}
SITU: ${sadj>0?"+":""}${sadj} (${Object.entries(sit).filter(([,v])=>v).map(([k])=>SF.find(f=>f.id===k)?.label).join("; ")||"none"})
MY SPREAD LINE: ${ht.name} ${fmtS(-pl)}
POSTED SPREAD: ${ht.name} ${fmtS(ps)}
SPREAD EDGE: ${edge>0?"+":""}${edge} (${edge>0?"value on "+ht.name:"value on "+at.name})
SPREAD STARS: ${st}/3
${ouSection}
NOTES: ${notes||"None"}

RULES: Only bet spread edge>=3. Only bet total edge>=3. Situational factors (fatigue, rest, travel) affect spread only — not the total. Neutral=no HCA. Style clashes matter.

Return JSON only — no markdown:
{
  "recommendation":"BET HOME [TEAM]"|"BET AWAY [TEAM]"|"NO BET"|"PASS",
  "stars":0-3,
  "bet_side":"home"|"away"|"none",
  "edge":${edge},
  "unit_size":"1 unit"|"2 units"|"3 units"|"No bet",
  "key_factors":["...","...","..."],
  "reasoning":"2-3 sentences on the spread",
  "ou_recommendation":"BET OVER"|"BET UNDER"|"NO BET"|"PASS"|"N/A",
  "ou_stars":0-3,
  "ou_reasoning":"1-2 sentences on the total — note if live KenPom data was used vs rank-estimated"
}`;
    try{
      const res=await fetch("/api/anthropic",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})});
      const rawText=await res.text();
      let data;
      try{data=JSON.parse(rawText);}catch{throw new Error("HTTP "+res.status+": "+rawText.slice(0,200));}
      if(data.error){throw new Error(JSON.stringify(data.error));}
      const txt=data.content?.find(c=>c.type==="text")?.text||"";
      const parsed=JSON.parse(txt.replace(/```json|```/g,"").trim());
      setResult(parsed);
      if(parsed.bet_side!=="none"&&(parsed.stars||st)>=1)setLog(p=>[{home:ht.name,away:at.name,recommendation:parsed.recommendation,edge,powerLine:pl,posted:ps,myTotal,postedOu:isNaN(postedOu)?null:postedOu,ouEdge,ouRec:parsed.ou_recommendation,stars:parsed.stars||st,ouStars:parsed.ou_stars||0,outcome:null,ouOutcome:null,ts:Date.now()},...p]);
    }catch(e){setErr("Analysis failed: "+e.message);}finally{setBusy(false);}
  },[canRun,ht,at,venue,hcaVal,sadj,sit,pl,ps,edge,myTotal,postedOu,ouEdge,liveData,notes]);

  const upO=useCallback((i,o,field="outcome")=>{setLog(p=>p.map((b,x)=>x===i?{...b,[field]:b[field]===o?null:o}:b));},[]);
  const clearLog=useCallback(()=>{if(log.length)setLog([]);},[log]);

  const tabs=[{id:"analyze",l:"Analyze"},{id:"log",l:"Log"+(log.length?" ("+log.length+")":"")},{id:"ratings",l:"Ratings"},{id:"system",l:"System"}];

  return(
    <div style={{background:"var(--bg)",minHeight:"100vh",maxWidth:520,margin:"0 auto",paddingBottom:40,fontFamily:"var(--fb)"}}>

      {/* Maize top accent */}
      <div className="maize-bar" />

      {/* Header */}
      <div className="up" style={{padding:"24px 20px 18px"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:10}}>
          <div style={{fontSize:28,fontFamily:"var(--fd)",fontWeight:300,color:"var(--navy)",letterSpacing:.5,lineHeight:1.2}}>Walters</div>
          <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:1}}>KenPom 2026</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:4,padding:"0 20px 14px"}}>
        {tabs.map(t=><button key={t.id} className={"tab"+(tab===t.id?" tab-a":"")} onClick={()=>setTab(t.id)}>{t.l}</button>)}
      </div>

      {/* ══ ANALYZE ══ */}
      {tab==="analyze"&&(
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          <GamePicker onSelect={selectGame} />

          <div style={{display:"flex",alignItems:"center",padding:"2px 20px",gap:12}}>
            <div style={{flex:1,height:1,background:"var(--border)"}} />
            <span style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)"}}>or manually</span>
            <div style={{flex:1,height:1,background:"var(--border)"}} />
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:8,padding:"0 20px",alignItems:"end"}}>
            <TeamPick label="HOME" value={ht} onChange={t=>{setHt(t);setResult(null);}} other={at} />
            <button className="btn bg" onClick={swap} style={{padding:"10px",fontSize:16,marginBottom:1,lineHeight:1,borderRadius:8}}>{"\u21C4"}</button>
            <TeamPick label="AWAY" value={at} onChange={t=>{setAt(t);setResult(null);}} other={ht} />
          </div>

          <Matchup home={ht} away={at} />

          {/* ── GAME CONTEXT: inline collapsible ── */}
          <div className="card up u2" style={{margin:"0 20px",overflow:"hidden"}}>
            {/* Venue — always visible */}
            <div style={{padding:"16px 20px 14px"}}>
              <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:1,marginBottom:8,fontWeight:500}}>VENUE</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                {[["home","Home"],["neutral","Neutral"],["conf","Tournament"]].map(([v,l])=>(
                  <button key={v} className="btn" style={{padding:"9px 4px",fontSize:12,fontWeight:500,borderRadius:"var(--rs)",background:venue===v?"var(--navySoft)":"var(--bg)",color:venue===v?"var(--navy)":"var(--ink3)",border:"1.5px solid "+(venue===v?"var(--navy)":"var(--border)")}} onClick={()=>setVenue(v)}>{l}</button>
                ))}
              </div>
              {/* HCA slider inline when home */}
              {venue==="home"&&(
                <div style={{marginTop:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",fontWeight:500}}>Home advantage</span>
                    <span style={{fontSize:13,fontFamily:"var(--fd)",fontWeight:600,color:"var(--navy)"}}>{hca} pts</span>
                  </div>
                  <input type="range" min={1} max={7} step={0.5} value={hca} onChange={e=>setHca(parseFloat(e.target.value))} className="rng" />
                </div>
              )}
            </div>

            {/* ── ADJUSTMENTS TOGGLE — prominent button treatment ── */}
            <div
              className={"adj-toggle"+(activeSitCount>0?" adj-active":sitOpen?" adj-open":"")}
              onClick={()=>setSitOpen(o=>!o)}
            >
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {/* Sliders icon */}
                <div style={{display:"flex",flexDirection:"column",gap:3,opacity:.6}}>
                  <div style={{width:14,height:2,background:"var(--navy)",borderRadius:1}} />
                  <div style={{width:10,height:2,background:"var(--navy)",borderRadius:1}} />
                  <div style={{width:14,height:2,background:"var(--navy)",borderRadius:1}} />
                </div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span style={{fontSize:13,fontFamily:"var(--fb)",fontWeight:600,color:"var(--navy)"}}>Adjustments</span>
                    {activeSitCount>0
                      ? <span style={{background:"var(--navy)",color:"white",fontSize:10,fontFamily:"var(--fm)",fontWeight:700,padding:"2px 8px",borderRadius:10}}>{activeSitCount} active</span>
                      : <span style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",whiteSpace:"nowrap"}}>fatigue · rest · rivalry</span>
                    }
                  </div>
                  {sadj!==0&&(
                    <div style={{fontSize:11,fontFamily:"var(--fm)",fontWeight:600,color:sadj>0?"var(--green)":"var(--red)",marginTop:2}}>{sadj>0?"+":""}{sadj} pts applied to line</div>
                  )}
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0,marginLeft:8}}>
                <span style={{fontSize:10,fontFamily:"var(--fm)",fontWeight:600,color:"var(--navy)",letterSpacing:.5,opacity:.7}}>{sitOpen?"CLOSE":"OPEN"}</span>
                <div style={{width:24,height:24,borderRadius:6,background:"var(--navy)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"transform .2s",transform:sitOpen?"rotate(180deg)":"rotate(0deg)"}}>
                  <span style={{color:"white",fontSize:10,lineHeight:1}}>{"\u25BC"}</span>
                </div>
              </div>
            </div>

            {/* Expanded factors + notes */}
            <div style={{maxHeight:sitOpen?600:0,overflow:"hidden",transition:"max-height .35s cubic-bezier(.16,1,.3,1)"}}>
              <div style={{padding:"8px 20px 16px"}}>
                {SF.map(f=>(
                  <div key={f.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0"}}>
                    <input type="checkbox" className="chk" checked={!!sit[f.id]} onChange={e=>setSit(p=>({...p,[f.id]:e.target.checked}))} />
                    <span style={{flex:1,fontSize:13,fontFamily:"var(--fb)",color:"var(--ink2)"}}>{f.label}</span>
                    {f.val!==0&&<span style={{fontSize:11,fontFamily:"var(--fm)",color:sit[f.id]?(f.val>0?"var(--green)":"var(--red)"):"var(--ink4)"}}>{sit[f.id]?(f.val>0?"+":"")+f.val:""}</span>}
                  </div>
                ))}
                <div style={{marginTop:12}}>
                  <textarea className="inp" style={{height:48,resize:"vertical",fontSize:12,lineHeight:1.5}} placeholder="Injury / roster notes..." value={notes} onChange={e=>setNotes(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Power line hero — spread + total side by side */}
          {ht&&at&&(
            <div className="card up u3" style={{margin:"0 20px",padding:"22px 20px 18px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,var(--maize),transparent)"}} />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:9,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:2,marginBottom:10}}>POWER LINE</div>
                  <div style={{fontSize:52,fontFamily:"var(--fd)",fontWeight:300,color:"var(--navy)",lineHeight:1,letterSpacing:-1}}>{fmtS(-pl)}</div>
                  <div style={{fontSize:11,fontFamily:"var(--fb)",color:"var(--ink3)",marginTop:6}}>{ht.name}</div>
                </div>
                <div style={{textAlign:"center",borderLeft:"1px solid var(--border)",paddingLeft:12}}>
                  <div style={{fontSize:9,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:2,marginBottom:10}}>MY TOTAL</div>
                  <div style={{fontSize:52,fontFamily:"var(--fd)",fontWeight:300,color:myTotal?"var(--navy)":"var(--ink4)",lineHeight:1,letterSpacing:-1}}>{myTotal??"\u2014"}</div>
                  <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink4)",marginTop:6}}>{liveData[ht.name]&&liveData[at.name]?"live KenPom":"est. from rank"}</div>
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:14,fontSize:11,fontFamily:"var(--fm)",color:"var(--ink4)"}}>
                <span>EM {em(ht.rank)>0?"+":""}{em(ht.rank)}</span>
                <span style={{color:"var(--border)"}}>|</span>
                <span>EM {em(at.rank)>0?"+":""}{em(at.rank)}</span>
              </div>
            </div>
          )}

          {/* Spread + O/U inputs */}
          <div style={{padding:"0 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:1,marginBottom:6,fontWeight:500}}>SPREAD {ht?"("+ht.name+")":""}</div>
              <input className="inp" type="number" step="0.5" placeholder="e.g. -7.5" value={spread} onChange={e=>{setSpread(e.target.value);setResult(null);}} style={{fontSize:16,fontFamily:"var(--fm)"}} />
            </div>
            <div>
              <div style={{fontSize:11,fontFamily:"var(--fm)",color:"var(--ink3)",letterSpacing:1,marginBottom:6,fontWeight:500}}>OVER/UNDER</div>
              <input className="inp" type="number" step="0.5" placeholder="e.g. 143.5" value={ou} onChange={e=>{setOu(e.target.value);setResult(null);}} style={{fontSize:16,fontFamily:"var(--fm)"}} />
            </div>
          </div>

          {/* Edge cards — spread + total side by side */}
          {edge!==null&&(
            <div style={{display:"grid",gridTemplateColumns:ouEdge!==null?"1fr 1fr":"1fr",gap:10,padding:"0 20px"}}>
              <div className="card up" style={{padding:"18px 14px",textAlign:"center"}}>
                <div style={{fontSize:9,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:1.5,marginBottom:10}}>SPREAD EDGE</div>
                <div style={{position:"relative",height:5,background:"var(--bg)",borderRadius:3,margin:"0 4px 12px",overflow:"hidden"}}>
                  <div className="fill" style={{position:"absolute",top:0,height:"100%",borderRadius:3,left:edge>=0?"50%":(50-Math.min(Math.abs(edge)*4,50))+"%",width:Math.min(Math.abs(edge)*4,50)+"%",background:Math.abs(edge)>=3?"var(--navy)":"var(--ink4)",opacity:Math.abs(edge)>=5?1:.5}} />
                  <div style={{position:"absolute",left:"50%",top:-2,width:2,height:9,background:"var(--ink4)",borderRadius:1}} />
                </div>
                <div style={{fontSize:36,fontFamily:"var(--fd)",fontWeight:300,color:Math.abs(edge)>=3?"var(--navy)":"var(--ink4)",lineHeight:1}}>{edge>0?"+":""}{edge}</div>
                <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink3)",marginTop:6}}>{Math.abs(edge)>=3?(edge>0?ht.name:at.name)+" value":"Below threshold"}</div>
                {Math.abs(edge)>=3&&<div style={{marginTop:8,display:"flex",justifyContent:"center",gap:2}}>{[1,2,3].map(s=><span key={s} style={{color:s<=stars(edge)?"var(--maize)":"var(--ink4)",fontSize:14}}>{"\u2605"}</span>)}</div>}
              </div>
              {ouEdge!==null&&(
                <div className="card up" style={{padding:"18px 14px",textAlign:"center"}}>
                  <div style={{fontSize:9,fontFamily:"var(--fm)",color:"var(--ink4)",letterSpacing:1.5,marginBottom:10}}>TOTAL EDGE</div>
                  <div style={{position:"relative",height:5,background:"var(--bg)",borderRadius:3,margin:"0 4px 12px",overflow:"hidden"}}>
                    <div className="fill" style={{position:"absolute",top:0,height:"100%",borderRadius:3,left:ouEdge>=0?"50%":(50-Math.min(Math.abs(ouEdge)*4,50))+"%",width:Math.min(Math.abs(ouEdge)*4,50)+"%",background:Math.abs(ouEdge)>=3?"#9B1D20":"var(--ink4)",opacity:Math.abs(ouEdge)>=5?1:.5}} />
                    <div style={{position:"absolute",left:"50%",top:-2,width:2,height:9,background:"var(--ink4)",borderRadius:1}} />
                  </div>
                  <div style={{fontSize:36,fontFamily:"var(--fd)",fontWeight:300,color:Math.abs(ouEdge)>=3?"#9B1D20":"var(--ink4)",lineHeight:1}}>{ouEdge>0?"+":""}{ouEdge}</div>
                  <div style={{fontSize:10,fontFamily:"var(--fm)",color:"var(--ink3)",marginTop:6}}>{Math.abs(ouEdge)>=3?(ouEdge>0?"OVER":"UNDER")+" value":"Below threshold"}</div>
                  {Math.abs(ouEdge)>=3&&<div style={{marginTop:8,display:"flex",justifyContent:"center",gap:2}}>{[1,2,3].map(s=><span key={s} style={{color:s<=stars(ouEdge)?"var(--maize)":"var(--ink4)",fontSize:14}}>{"\u2605"}</span>)}</div>}
                </div>
              )}
            </div>
          )}

          {/* Run */}
          <div style={{padding:"0 20px",display:"flex",gap:8}}>
            <button className="btn bp" style={{flex:1,opacity:canRun&&!busy?1:.5}} onClick={run} disabled={!canRun||busy}>
              {busy?<span className="pulse">Analyzing...</span>:!ht||!at?"Select teams":isNaN(ps)?"Enter spread":Math.abs(edge||0)<1?"Edge too small":"Run Analysis"}
            </button>
            {(ht||at)&&<button className="btn bg" onClick={reset} style={{padding:"14px"}}>{"\u21BA"}</button>}
          </div>

          {err&&<div style={{margin:"0 20px",padding:"12px 16px",background:"var(--redBg)",borderRadius:"var(--rs)",fontSize:12,color:"var(--red)"}}>{err}</div>}

          <Result result={result} />

          <div style={{textAlign:"center",padding:"16px",fontSize:11,color:"var(--ink4)",lineHeight:2}}>
            Walters methodology {"\u00b7"} Informational only
          </div>
        </div>
      )}

      {tab==="log"&&<Log log={log} onUpdate={upO} onClear={clearLog} />}
      {tab==="ratings"&&<Ratings />}
      {tab==="system"&&<System />}

    </div>
  );
}
