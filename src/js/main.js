function clear(b){
	var l=b.childNodes
	for (var ci=l.length-1;ci>=0;ci--){
		if (!l[ci].classList){
			b.removeChild(l[ci])
		}
		else{
			l[ci]=clear(l[ci])
		}
	}
	return b
}
function new_block(x,y){
	var d=document.createElement("div")
	d.classList.add("block")
	d.classList.add(`c${COL+1}`)
	d.style.left=`${x*30}px`
	d.style.top=`${pr.H-y}px`
	if (CTRL==true){d.classList.add("W")}
	if (SHIFT==true){d.classList.add("F")}
	pr.appendChild(d)
	if (CTRL==true){
		var h=Math.max(build.h[x+1],build.h[x])+(SHIFT==true?10:30)
		build.h[x]=h
		build.h[x+1]=h
	}
	else{
		build.h[x]+=SHIFT==true?10:30
	}
	return d
}
function clk(e){
	if (DEL==true){
		for (var k of build.bl){
			console.log(k.offsetLeft,e)
		}
		return
	}
	e={x:Math.floor((e.pageX-pr.offsetLeft+pr.offsetWidth/2)/30),y:-(e.pageY-pr.offsetTop-pr.offsetHeight/2)}
	build.h[e.x]=build.h[e.x]||0
	if (CTRL==true){
		build.h[e.x+1]=build.h[e.x+1]||0
	}
	if (build.h[e.x]<e.y&&((CTRL==true&&e.x*30+30<pr.W&&build.h[e.x+1]<e.y)||CTRL==false)){
		var h=build.h[e.x]
		if (CTRL==true){h=Math.max(build.h[e.x+1],h)}
		build.bl.push(new_block(e.x,h))
	}
}
window.onload=function(){
	document.body=clear(document.body)
	pr=document.getElementsByClassName("build")[0]
	wr=document.getElementsByClassName("wr-sc")[0]
	tbrick=document.getElementsByClassName("tbrick")[0]
	tbrick.update=function(){
		var c=this.classList.toString().split(" ")
		for (var k of c){this.classList.remove(k)}
		this.classList.add("tbrick")
		this.classList.add("block")
		if (SHIFT==true){this.classList.add("F")}
		if (CTRL==true){this.classList.add("W")}
		if (DEL==true){this.classList.add("sh")}
		this.classList.add(`c${COL+1}`)
	}
	pr.onclick=clk
	pr.res=function(w,h){
		this.style=`width: ${w}px;height: ${h}px`
		this.W=w
		this.H=h
	}
	document.body.onkeydown=function(e){
		if (e.key=="Control"){CTRL=true}
		if (e.key=="Shift"){SHIFT=true}
		if (e.key=="Delete"){DEL=true}
		tbrick.update()
	}
	document.body.onkeyup=function(e){
		if (e.key=="Control"){CTRL=false}
		if (e.key=="Shift"){SHIFT=false}
		if (e.key=="Delete"){DEL=false}
		tbrick.update()
	}
	wr.onwheel=function(e){
		e.preventDefault()
		e.stopPropagation()
		if (e.deltaY>0){
			COL=(COL+1)%COLORS.length
		}
		else{
			COL-=1
			if (COL<0){COL=COLORS.length}
		}
		tbrick.update()
	}
	wr.focus()
	pr.res(120,120)
	tbrick.update()
}
var pr,wr,COLORS=["#fa0410","#ff5e00","#e6fb03","#41dd03","#18dccd","#0c63f2","#a312ec","#eb13a4","#1e1e1e","#707070","#bcbcbc","#fafafa"],build={h:[],bl:[]},SHIFT=false,CTRL=false,DEL=false,COL=0,tbrick
