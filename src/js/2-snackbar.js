import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const myBtn = document.querySelector(".my-btn");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;

    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state == "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    });

    prom
    .then(value => {
        iziToast.success({
            title: 'Success',
            message: `Fulfilled promise in ${value}ms`,
            position: 'topCenter',
            // backgroundColor: '#59A10D',
        })
    })
    .catch(error => {
        iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${error}ms`,
            position: 'topCenter',
            // backgroundColor: '#EF4040',
        })
    })
});



