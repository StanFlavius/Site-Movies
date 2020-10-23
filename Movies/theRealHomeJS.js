function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createSlideshow(genre){
        var divGenre = document.getElementById(genre);
        console.log(genre);
        const baseURL = 'https://sampleapis.com/movies/api/' + genre;
        fetch(baseURL)
        .then(resp => resp.json())
        .then(function(data){
            var lg = data.length;
            var id1 = getRandomInt(lg);
            var id2 = id1;
            while(id2 == id1){
                id2 = getRandomInt(lg);
            }
            var id3 = id2;
            while(id3 == id1 || id3 == id2){
                id3 = getRandomInt(lg);
            }
            var id4 = id3;
            while(id4 == id1 || id4 == id2 || id4 == id3){
                id4 = getRandomInt(lg);
            }
            var id5 = id4;
            while(id5 == id1 || id5 == id2 || id5 == id3 || id5 == id4){
                id5 = getRandomInt(lg);
            }
            
            var listOfIds = []
            listOfIds.push(id1);
            listOfIds.push(id2);
            listOfIds.push(id3);
            listOfIds.push(id4);
            listOfIds.push(id5);
            
            var slideshowDiv = document.createElement("div");
            slideshowDiv.style.margin = "0 auto";
            slideshowDiv.className = "slideshow";
            slideshowDiv.style.height = "500px";
            slideshowDiv.style.width = "300px";
            slideshowDiv.style.display = "flex";
            slideshowDiv.style.flexDirection = "column";
            slideshowDiv.style.marginBottom = "15px";
            
            var index = 0;

            var arrayOfDivs = []
            for(var it = 0; it < 5; it++){
                var thisId = listOfIds[it];
                var bigDiv = document.createElement("div");
                bigDiv.style.margin = "0 auto";
                bigDiv.style.display = "flex";
                bigDiv.style.flexDirection = "row";
                bigDiv.style.alignItems = "center";

                var littleDiv = document.createElement("div");
                littleDiv.style.margin = "0 auto";
                littleDiv.style.display = "flex";
                littleDiv.style.flexDirection = "column";
                littleDiv.style.alignItems = "center";

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
                    var buttonFav = document.createElement("button");
                    buttonFav.innerHTML = "Add to Watch Later";
                    buttonFav.onclick = function(){
                        if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                            localStorage.setItem("theTitles", data[thisId].title);
                            console.log(localStorage.getItem("theTitles"));
                        }
                        else{
                            var str = localStorage.getItem("theTitles");
                            var newStr = str + ',' + data[thisId].title;
                            localStorage.setItem("theTitles", newStr);
                            console.log(localStorage.getItem("theTitles"));
                        }
                    }
                    slideshowDiv.appendChild(buttonFav);
                    divGenre.appendChild(slideshowDiv);
                }

                var imgEl = document.createElement("img");
                imgEl.setAttribute("src", data[thisId].posterURL);
                littleDiv.appendChild(imgEl);

                var titleEl = document.createElement("p");
                var node = document.createTextNode(data[thisId].title);
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
                    if(index < 4){
                        index++;
                        console.log(index);
                    }
                    while (slideshowDiv.firstChild) {
                        slideshowDiv.removeChild(slideshowDiv.lastChild);
                    }
                    slideshowDiv.appendChild(arrayOfDivs[index]);
                    var buttonFav = document.createElement("button");
                    buttonFav.innerHTML = "Add to Watch Later";
                    buttonFav.onclick = function(){
                        if(typeof(localStorage.getItem("theTitles"))=='undefined'){
                            localStorage.setItem("theTitles", data[thisId].title);
                            console.log(localStorage.getItem("theTitles"));
                        }
                        else{
                            var str = localStorage.getItem("theTitles");
                            var newStr = str + ',' + data[thisId].title;
                            localStorage.setItem("theTitles", newStr);
                            console.log(localStorage.getItem("theTitles"));
                        }
                    }
                    slideshowDiv.appendChild(buttonFav);
                    divGenre.appendChild(slideshowDiv);
                }

                arrayOfDivs.push(bigDiv);

                while (slideshowDiv.firstChild) {
                    slideshowDiv.removeChild(slideshowDiv.lastChild);
                }
                slideshowDiv.appendChild(arrayOfDivs[index]);
                var buttonFav = document.createElement("button");
                buttonFav.innerHTML = "Add to Watch Later";
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
            }
            
            divGenre.style.margin = "0 auto";
            divGenre.appendChild(slideshowDiv);
        });
}

window.onload = function(){
    var listOfGenres = ['action-adventure', 'animation', 'classic', 'comedy', 'drama', 'horror', 'family', 'mystery', 'scifi-fantasy', 'western'];

    for(i in listOfGenres){
        genre = listOfGenres[i];
        createSlideshow(genre);

            /*var listMovieDivs = document.getElementsByClassName("movieDiv");
            var lg = listMovieDivs.length;
            for(var it = 0; it < lg; it++){
                var movie = listMovieDivs[it];
                movie.onmouseover = function(){
                    var newEl = document.createElement("div");
                    newEl.className = "intermediateClass";
                    newEl.style.backgroundColor = "blue";
                    newEl.innerHTML = "EU";
                    movieDiv.appendChild(newEl);
                }
                /*movie.onmouseout = function(){
                    var listInt = document.getElementsByClassName("intermediateClass");
                    var lgListInt = listInt.length;
                    for(var it2 = 0; it2 < lgListInt; it2++){
                        document.this.removeChild(listInt[it2]);
                    }
                }
            }*/
    }
}