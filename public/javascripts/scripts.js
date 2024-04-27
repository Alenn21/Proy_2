//Diego Alejandro Vega Bohórquez

/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

//establece un evento que se activa cuando el Document Object Model del documento HTML ha sido completamente cargado
window.addEventListener('DOMContentLoaded', event => {

    // Función para reducir la barra de navegación
    var navbarShrink = function () {
         // Obtener el elemento de navegación principal
        const navbarCollapsible = document.body.querySelector('#mainNav');
        // Comprobar si el elemento de navegación principal existe
        if (!navbarCollapsible) {
            return;
        }
        // Comprobar si la página está desplazada hasta arriba
        if (window.scrollY === 0) {
            // Eliminar la clase 'navbar-shrink' del elemento de navegación principal
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            // Agregar la clase 'navbar-shrink' al elemento de navegación principal
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Reducir la barra de navegación 
    navbarShrink();

    // Reducir la barra de navegación cuando se desplaza la página
    document.addEventListener('scroll', navbarShrink);

    // Activar Bootstrap scrollspy en el elemento de navegación principal
    const mainNav = document.body.querySelector('#mainNav');
    // Comprobar si el elemento de navegación principal existe
    if (mainNav) {
        // Crear una nueva instancia de scrollspy
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Colapsar la barra de navegación responsiva cuando el botón está visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    // Obtener todos los elementos de navegación responsivos
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    // Iterar a través de cada elemento de navegación responsivo
    responsiveNavItems.map(function (responsiveNavItem) {
        // Agregar un escuchador de eventos de clic a cada elemento de navegación responsivo
        responsiveNavItem.addEventListener('click', () => {
             // Comprobar si el botón de la barra de navegación está visible
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                // Simular clic en el botón de la barra de navegación para colapsar la barra de navegación
                navbarToggler.click();
            }
        });
    });

});