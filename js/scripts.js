/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
import { EMAIL_JS_PUBLIC_KEY, EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID } from './config.js';

window.addEventListener('DOMContentLoaded', event => {

    emailjs.init(EMAIL_JS_PUBLIC_KEY);
    
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Email.js form submission logic
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior
    
        const submitButton = document.getElementById('submitButton');
        const successMessage = document.getElementById('submitSuccessMessage');
        const errorMessage = document.getElementById('submitErrorMessage');
    
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
    
        // Validate inputs
        let isValid = true;
    
        [nameField, phoneField, messageField].forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });
    
        // Validate email input
        if (!emailField.value.trim()) {
            emailField.classList.add('is-invalid');
            emailField.nextElementSibling.textContent = "An email is required."; // Custom message for empty email
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            emailField.classList.add('is-invalid');
            emailField.nextElementSibling.textContent = "Email is not valid."; // Custom message for invalid email
            isValid = false;
        } else {
            emailField.classList.remove('is-invalid');
            emailField.classList.add('is-valid');
        }
    
        // If form is invalid, stop submission
        if (!isValid) {
            return;
        }
    
        // Change button text to show progress
        submitButton.textContent = "Sending...";
        console.log('this data',this)
        // Send email using Email.js
        emailjs.sendForm(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, this)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
    
                // Show success message
                successMessage.classList.remove('d-none');
                errorMessage.classList.add('d-none');
    
                // Reset form and button
                document.getElementById('contactForm').reset();
                [nameField, emailField, phoneField, messageField].forEach(field => {
                    field.classList.remove('is-valid', 'is-invalid');
                });
                submitButton.textContent = "Send Message";
            }, function (error) {
                console.error('FAILED...', error);
    
                // Show error message
                successMessage.classList.add('d-none');
                errorMessage.classList.remove('d-none');
    
                // Reset button
                submitButton.textContent = "Send Message";
            });
    });
    


});
