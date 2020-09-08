const btnShowMenu = document.getElementsByClassName("material-icons")[0];
const menuResponsive = document.getElementsByClassName("submenu-responsive")[0];
const navBar = document.getElementsByClassName('nav-bar')[0];
btnShowMenu.addEventListener('click', showMenu);
let showAndHide = false;

const stickyLimit = navBar.offsetTop;


/*setInterval('widhScreen()', 500);*/
window.onscroll = function() { sticky() };

function showMenu() {
    if (!showAndHide)
        menuResponsive.className = "submenu-responsive show";
    else
        menuResponsive.className = "submenu-responsive hide";
    showAndHide = !showAndHide;
}

function widhScreen() {
    let ancho = window.innerWidth;
    console.log(`Ancho ${ancho}`);
    console.log(`Página ${window.pageYOffse}`);
    console.log(`Offset ${stickyLimit}`);
}

function sticky() {

    if (window.pageYOffset > stickyLimit) {
        console.log("sticky");
        //navBar.classList.add("sticky");
        navBar.classList.add("colorStiky");
        // menuResponsive.style.fontSize = "18px";
        //menuResponsive.style.textAlign = "start";
    } else {
        console.log("No sticky");
        //navBar.classList.remove("sticky");
        navBar.classList.remove("colorStiky");
        // menuResponsive.style.fontSize = "24px"
        //menuResponsive.style.textAlign = "center";
    }

    if (window.pageYOffset >= stickyLimit + 15) {
        navBar.classList.add("colorStiky");
    }
}