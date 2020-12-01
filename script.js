$( document ).ready(function() {
    $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      });

    var Mytext = document.getElementById("textContainer").innerHTML;
    var nombreMot = Mytext.split(' ').length;
    var nombreParagraphe = Mytext.split('\n').length;
    document.getElementById("nbMot").innerHTML = nombreParagraphe + "paragraphe" + nombreMot + "mots";
});

//Highlight du text
document.getElementById("SearchedElement").addEventListener('input', function(evt){
    var text = document.getElementById("textContainer").innerHTML;
    var exist = text.split(document.getElementById("SearchedElement").value).length;
    document.getElementById("numberWord").innerHTML = exist + "mots trouvé";

    text.replace("is", '<span class="highlight">is</span>');
});

