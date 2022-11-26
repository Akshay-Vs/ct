let navState = false;
function openNav() {
    document.getElementById("mySidenav").style.display = "block";
    navState=true;
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
    navState=false;
  }

  function toogleNav() {
    if(navState==false) {
        openNav(); 
        navState=true;
    }
    else{
        closeNav();
        navState=false;
    }
  }