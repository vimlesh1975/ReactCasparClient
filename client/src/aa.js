var paths=document.querySelectorAll("svg path"),

i=0,
speed=750;
console.log('paths');
paths.forEach((item,index)=>{
    i++;
    var pathlength=item.getTotalLength();
    item.setAttribute("stroke-dasharray", pathlength);
    item.setAttribute("stroke-dashoffset", pathlength);
    if(index===0){
        item.innerHTML="<animate id='a" + i +"' attributeName='stroke-dashoffset' begin='0s' dur='" + pathlength/speed + "'s to='0' fill='freez' />"
    }
    else
    {
        item.innerHTML="<animate id='a" + i +"' attributeName='stroke-dashoffset' begin='a" +(i-1) + ".end' dur='" + pathlength/speed + "'s to='0' fill='freez' />"
        
    }
})