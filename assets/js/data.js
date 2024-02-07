let filterContainer = document.querySelector('.filter-sec__container');
let root = document.getElementById('root');
let shopCounter = document.getElementById('shopCounter');
let shopBtn = document.getElementById('shopBtn');

let sleceted = [];
let filtered = [];
let categ = [];
let items = [];
let shopSelected = [];

let filterInps;

shopBtn.addEventListener('click',shopHandle);