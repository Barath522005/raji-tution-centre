import { inject } from '@vercel/analytics';

inject();

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const enquiryForm = document.querySelector("#enquiry-form");
const formMessage = document.querySelector("#form-message");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navMenu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navMenu.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  }
});

enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.className = "form-message";

  if (!enquiryForm.checkValidity()) {
    formMessage.textContent = "Please complete the required fields with valid details.";
    formMessage.classList.add("error");
    enquiryForm.reportValidity();
    return;
  }

  const button = enquiryForm.querySelector(".submit-btn");
  button.disabled = true;
  button.textContent = "Submitting...";

  window.setTimeout(() => {
    formMessage.textContent = "Thank you! Your enquiry has been received. Our team will contact you shortly.";
    button.disabled = false;
    button.textContent = "Submit Enquiry";
    enquiryForm.reset();
  }, 700);
});
