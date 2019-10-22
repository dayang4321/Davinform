// JavaScript Document

function pageLoad() {document.getElementsByClassName("newsrow")[0].style.display = "flex";
					 document.getElementsByClassName("spinbox")[0].style.display = "none";
									};  


var iParse = new XMLHttpRequest();
iParse.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var newsfeed = JSON.parse(this.responseText);
	pageLoad();
	
	var i ;  
	
	
	  
	for (i = 0 ; i < (newsfeed.results.length)  ; i++ ){ 
	
	function cloner() {var ancestor = document.getElementsByClassName("newscol")[i];
	var colClone = ancestor.cloneNode(true);
	document.getElementsByClassName("newsrow")[0].appendChild(colClone)};	
	
	
		
	
	 
		
    document.getElementsByClassName("newswriter")[i].innerHTML = newsfeed.results[i].byline;
    document.getElementsByClassName("newstitle")[i].innerHTML = newsfeed.results[i].title;
	document.getElementsByClassName("abstract")[i].innerHTML = newsfeed.results[i].abstract;
    document.getElementsByClassName("section")[i].innerHTML = newsfeed.results[i].section;
    
    document.getElementsByClassName("subsection")[i].innerHTML = ": " + newsfeed.results[i].subsection;
	
	var subSect = newsfeed.results[i].subsection; 
		
	if ( subSect == "" ) {document.getElementsByClassName("subsection")[i].innerHTML = ""}	;
		
	//Date Handler	
	var rawDate =  newsfeed.results[i].published_date;
	
	if (rawDate.length < 25) { 
	var rawDateArr = rawDate.split("");	
	rawDateArr[19] = "-0";
	var rawDateStr = rawDateArr.join("");
							} 
	else { rawDateStr = rawDate };
	 
	document.getElementsByClassName("newsdate")[i].innerHTML= moment(rawDateStr).format('lll');
		
	// Image Exception
	
	try {
		document.getElementsByClassName("mainimg")[i].src = newsfeed.results[i].multimedia[3].url;  
	}
	catch {
		document.getElementsByClassName("mainimg")[i].src = "img/colour.jpg"
	}
	  
	
	if (i < newsfeed.results.length - 1 ) { cloner()}
		else {return;}
  }
  
  }
	  
};
iParse.open("GET", "https://api.myjson.com/bins/nl6jh", true);
iParse.send();

