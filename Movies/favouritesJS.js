window.onload = function(){
    var str = localStorage.getItem("theTitles");
    //window.alert(str);
    var allGenres = ['action-adventure', 'animation', 'classic', 'comedy', 'drama', 'horror', 'family', 'mystery', 'scifi-fantasy', 'western'];

    var listOfMovies = str.split(",");

    for(var j = 0; j < allGenres.length; j++){
        const baseURL = 'https://sampleapis.com/movies/api/' + allGenres[j];
        fetch(baseURL)
        .then(resp => resp.json())
        .then(function(data){
            var left = document.getElementById("left");
            var right = document.getElementById("right");
            var whTurn = 0;

            var lgMovies = data.length;
            for(var k = 0; k < lgMovies; k++){
                for(var i = 0; i < listOfMovies.length; i++){
                    if(listOfMovies[i] == data[k].title){
                        console.log(listOfMovies[i] + " " + data[k].title + " " + data[k].posterURL);
                        var slideshowDiv2 = document.createElement("div");
                        slideshowDiv2.className = "slideshowClassMovieFV";
                        slideshowDiv2.id = data[k].title;
                    
                        console.log(slideshowDiv2.value);
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

                        if(whTurn == 0){
                            var check = document.getElementById(data[k].title);
                            if(check != null){
                                console.log("EXISTA DEJA");
                            }
                            else{
                                left.appendChild(slideshowDiv2);
                            }  
                            whTurn = 1;
                        }
                        else{
                            var check = document.getElementById(data[k].title);
                            if(check != null){
                                console.log("EXISTA DEJA");
                            }
                            else{
                                right.appendChild(slideshowDiv2);
                            }  
                            whTurn = 0;
                        }   
                    }
                }
            }
        });



    }
}