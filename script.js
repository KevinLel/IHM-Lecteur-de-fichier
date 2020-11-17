document.getElementById("OpeningClosingButton").addEventListener("click", openClosedHeader);

function OpenCloseHeader(){
    headerClass = document.getElementById('header').className
    mainClass = document.getElementById("main").className

    if(headerClass == "headerClosed"){
        document.getElementById('header').className = "header" 
    }
}