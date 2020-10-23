window.onload = function(){
    var myBtn = document.getElementById("myButtonID");
    var input = document.getElementById("myInputID");
    
    myBtn.onclick = function(){
        var inputText = input.value;

        var listOfGenres = ['action-adventure', 'animation', 'classic', 'comedy', 'drama', 'horror', 'family', 'mystery', 'scifi-fantasy', 'western'];

        if(listOfGenres.includes(inputText)){
            var listOfDivsMovies = document.getElementsByClassName("slideshowClassMovie");
            if(listOfDivsMovies.length == 1){
                document.body.removeChild(listOfDivsMovies[0]);
            }
                    var listOfNewDivs = document.getElementsByClassName("slideshowClass");
                    if(listOfNewDivs.length == 1){
                        document.body.removeChild(listOfNewDivs[0]);
                    }
                    
                    const baseURL = 'https://sampleapis.com/movies/api/' + inputText;
                    fetch(baseURL)
                    .then(resp => resp.json())
                    .then(function(data){

                        var slideshowDiv = document.createElement("div");
                        slideshowDiv.className = "slideshowClass";
                        slideshowDiv.style.alignItems = "center"
                        slideshowDiv.style.zIndex = "9";
                        slideshowDiv.style.backgroundColor = "blanchedalmond";
                        slideshowDiv.style.height = "500px";
                        slideshowDiv.style.width = "400px";
                        slideshowDiv.style.display = "flex";
                        slideshowDiv.style.flexDirection = "column";
                        var lg = data.length;
                        
                        var index = 0;
                        var movieTitle = "";

                        var arrayOfDivs = [];
                        for(var i = 0; i < lg; i++){
                            console.log(data[i].id);

                            var bigDiv = document.createElement("div");
                            bigDiv.style.display = "flex";
                            bigDiv.style.flexDirection = "row";
                            bigDiv.style.alignItems = "center";

                            var littleDiv = document.createElement("div");
                            littleDiv.style.display = "flex";
                            littleDiv.style.flexDirection = "column";
                            littleDiv.style.alignItems = "center";
                            littleDiv.style.backgroundColor = "blanchedalmond";
                            //littleDiv.style.visibility = "hidden";
                            
                            var prevBtn = document.createElement("button");
                            prevBtn.style.cursor = "pointer";
                            prevBtn.style.top = "50%";
                            prevBtn.style.width = "auto";
                            prevBtn.style.padding = "16px";
                            prevBtn.style.marginTop = "-22px";
                            prevBtn.style.color = "white";
                            prevBtn.style.fontWeight = "bold";
                            prevBtn.style.fontSize = "18px";
                            prevBtn.style.transition = "0.6s ease";
                            prevBtn.style.borderRadius = "0 3px 3px 0";
                            prevBtn.style.userSelect = "none";
                            prevBtn.innerHTML = "&#10094";

                            bigDiv.appendChild(prevBtn);
                            prevBtn.onclick = function(){
                                if(index > 0){
                                    index--;
                                    console.log(index);
                                }
                                while (slideshowDiv.firstChild) {
                                    slideshowDiv.removeChild(slideshowDiv.lastChild);
                                }
                                slideshowDiv.appendChild(arrayOfDivs[index]);
                                slideshowDiv.style.margin = '0 auto';
                                //slideshowDiv.style.marginLeft = centerPos+'px';
                                buttonFav.onclick = function(){
                                    if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                                        localStorage.setItem("theTitles", data[index].title);
                                        console.log(localStorage.getItem("theTitles"));
                                    }
                                    else{
                                        var str = localStorage.getItem("theTitles");
                                        var newStr = str + ',' + data[index].title;
                                        localStorage.setItem("theTitles", newStr);
                                        console.log(localStorage.getItem("theTitles"));
                                    }
                                }
                                slideshowDiv.appendChild(buttonFav);
                                document.body.appendChild(slideshowDiv);
                            }

                            var imgEl = document.createElement("img");
                            imgEl.setAttribute("src", data[i].posterURL);
                            littleDiv.appendChild(imgEl);
                            
                            var titleEl = document.createElement("p");
                            var node = document.createTextNode(data[i].title);
                            movieTitle = data[i].title;
                            titleEl.appendChild(node);
                            littleDiv.appendChild(node);
                            bigDiv.appendChild(littleDiv);
                            
                            var nextBtn = document.createElement("button");
                            nextBtn.style.cursor = "pointer";
                            nextBtn.style.top = "50%";
                            nextBtn.style.width = "auto";
                            nextBtn.style.padding = "16px";
                            nextBtn.style.marginTop = "-22px";
                            nextBtn.style.color = "white";
                            nextBtn.style.fontWeight = "bold";
                            nextBtn.style.fontSize = "18px";
                            nextBtn.style.transition = "0.6s ease";
                            nextBtn.style.borderRadius = "0 3px 3px 0";
                            nextBtn.style.userSelect = "none";
                            nextBtn.innerHTML = "&#10095";

                            bigDiv.appendChild(nextBtn);
                            nextBtn.onclick = function(){
                                if(index < lg - 1){
                                    index++;
                                    console.log(index);
                                }
                                while (slideshowDiv.firstChild) {
                                    slideshowDiv.removeChild(slideshowDiv.lastChild);
                                }
                                slideshowDiv.appendChild(arrayOfDivs[index]);
                                slideshowDiv.style.margin = '0 auto';
                                //slideshowDiv.style.marginLeft = centerPos+'px';
                                var buttonFav = document.createElement("button");
                                buttonFav.onclick = function(){
                                    if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                                        localStorage.setItem("theTitles", data[index].title);
                                        console.log(localStorage.getItem("theTitles"));
                                    }
                                    else{
                                        var str = localStorage.getItem("theTitles");
                                        var newStr = str + ',' + data[index].title;
                                        localStorage.setItem("theTitles", newStr);
                                        console.log(localStorage.getItem("theTitles"));
                                    }
                                }
                                slideshowDiv.appendChild(buttonFav);
                                document.body.appendChild(slideshowDiv);
                            }

                            arrayOfDivs.push(bigDiv);
                        }
                        
                        while (slideshowDiv.firstChild) {
                            slideshowDiv.removeChild(slideshowDiv.lastChild);
                        }
                        slideshowDiv.appendChild(arrayOfDivs[index]);
                        //slideshowDiv.style.marginLeft = '572.5px';
                        slideshowDiv.style.margin = '0 auto';

                        var buttonFav = document.createElement("button");
                        buttonFav.innerHTML = "Add to Watch Later";
                        buttonFav.onclick = function(){
                            if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                                localStorage.setItem("theTitles", data[0].title);
                                console.log(localStorage.getItem("theTitles"));
                            }
                            else{
                                var str = localStorage.getItem("theTitles");
                                var newStr = str + ',' + data[0].title;
                                localStorage.setItem("theTitles", newStr);
                                console.log(localStorage.getItem("theTitles"));
                            }
                        }
                        slideshowDiv.appendChild(buttonFav);
                        document.body.appendChild(slideshowDiv);
                    });
        }else{
            localStorage.setItem("exist","0");
            var listOfNewDivs = document.getElementsByClassName("slideshowClass");
            if(listOfNewDivs.length == 1){
                document.body.removeChild(listOfNewDivs[0]);
            }
                    console.log("NUUUU")
                    var pp = 0;
                    for(var j = 0; j < listOfGenres.length; j++){
                        console.log("AD");
                        var pp2 = 0;
                        const baseURL = 'https://sampleapis.com/movies/api/' + listOfGenres[j];
                        fetch(baseURL)
                        .then(resp => resp.json())
                        .then(function(data){
                            var lgMovies = data.length;
                            for(var k = 0; k < lgMovies; k++){
                                if(data[k].title == inputText){
                                    localStorage.setItem("exist","1");
                                    pp2 = 1;
                                    console.log(data[k].title + inputText)
                                    console.log("AS");
                                    var slideshowDiv2 = document.createElement("div");
                                    slideshowDiv2.className = "slideshowClassMovie";
                                    slideshowDiv2.style.alignItems = "center"
                                    slideshowDiv2.style.backgroundColor = "blanchedalmond";
                                    slideshowDiv2.style.height = "500px";
                                    slideshowDiv2.style.width = "400px";
                                    slideshowDiv2.style.display = "flex";
                                    slideshowDiv2.style.flexDirection = "column";

                                    var bigDiv2 = document.createElement("div");
                                    bigDiv2.style.display = "flex";
                                    bigDiv2.style.flexDirection = "row";
                                    bigDiv2.style.alignItems = "center";

                                    var littleDiv2 = document.createElement("div");
                                    littleDiv2.style.display = "flex";
                                    littleDiv2.style.flexDirection = "column";
                                    littleDiv2.style.alignItems = "center";
                                    littleDiv2.style.backgroundColor = "blanchedalmond";

                                    var imgEl2 = document.createElement("img");
                                    imgEl2.setAttribute("src", data[k].posterURL);
                                    littleDiv2.appendChild(imgEl2);
                                    
                                    var titleEl2 = document.createElement("p");
                                    var node2 = document.createTextNode(data[k].title);
                                    titleEl2.appendChild(node2);
                                    littleDiv2.appendChild(node2);
                                    bigDiv2.appendChild(littleDiv2);

                                    slideshowDiv2.appendChild(bigDiv2);
                                    slideshowDiv2.style.margin = '0 auto';
                                    //slideshowDiv2.style.marginLeft = '572.5px';
                                    var listOfDivsMovies = document.getElementsByClassName("slideshowClassMovie");
                                    console.log(listOfDivsMovies.length)
                                    if(listOfDivsMovies.length == 1){
                                        console.log("RESPECT");
                                        document.body.remove(listOfDivsMovies[0]);
                                    }
                                    var buttonFav = document.createElement("button");
                                    buttonFav.innerHTML = "Add to Watch Later";
                                    buttonFav.onclick = function(){
                                        if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                                            localStorage.setItem("theTitles", data[k].title);
                                            console.log(localStorage.getItem("theTitles"));
                                        }
                                        else{
                                            var str = localStorage.getItem("theTitles");
                                            var newStr = str + ',' + data[k].title;
                                            localStorage.setItem("theTitles", newStr);
                                            console.log(localStorage.getItem("theTitles"));
                                        }
                                    }
                                    slideshowDiv2.appendChild(buttonFav);
                                    document.body.appendChild(slideshowDiv2);
                                    break;
                                }
                                console.log(pp2)
                                if(pp2 == 1){
                                    console.log("AICI")
                                    return;
                                }
                            }
                        });
                        if(pp2 == 1){
                            console.log("AICI")
                            break;
                        }
                    }
                    //console.log(localStorage.getItem("exist")  + "exist");
            }
    }

}