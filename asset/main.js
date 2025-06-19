$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

//Xử lý tabs
const tabs = $$(".tabs");
function removeActive(tab) {
  const activeNodes = tab.querySelectorAll(".active");
  activeNodes.forEach((node) => {
    node.classList.remove("active");
  });
}
function handle(tab) {
  const grandElement = this.parentElement.parentElement;
  removeActive(grandElement);
  this.classList.add("active");
  const index = this.dataset.index;
  const tabContent = grandElement.querySelector(
    `.tab-content[data-index="${index}"]`
  );
  tabContent.classList.add("active");
}
tabs.forEach((tab) => {
  const tabLinks = tab.querySelectorAll(".tab-link");
  const tabContents = tab.querySelectorAll(".tab-content");
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", handle);
  });
});
function activeTabsByKey() {
  let keyTab = event.key;
  tabs.forEach((tab) => {
    const tabLink = tab.querySelector(`.tab-link[data-index="${keyTab - 1}"]`);
    if (tabLink) {
      removeActive(tab);
      tabLink.classList.add("active");
      tab
        .querySelector(`.tab-content[data-index="${keyTab - 1}"]`)
        .classList.add("active");
    }
  });
}

document.body.addEventListener("keydown", activeTabsByKey);
//Slide show
const slideView = $(".slide-view");
const slideBar = $(".slide-bar");
const slideItems = $$(".slide-item");
const nextBtn = $(".next-btn");
const previousBtn = $(".previous-btn");
let count = 1;

let firstItem = slideItems[0].cloneNode(true);
slideBar.appendChild(firstItem);
const allItems = $$(".slide-item");

nextBtn.onclick = function () {
  console.log(allItems.length);
  console.log(count);
  if (count > allItems.length - 1) return;
  slideBar.style.transform = `translateX(-${count * 100}%)`;
  count++;
};
previousBtn.onclick = function () {
  count--;
  if (count < 0) return;
  slideBar.style.transform = `translateX(-${count * 500}px)`;
};
slideBar.addEventListener("transitionend", () => {
  if (count > allItems.length - 1) {
    slideBar.style.transition = false;
    count = 0;
    slideBar.style.transform = `translateX(-${count * 100}%)`;
    setTimeout(() => {
      slideBar.style.transform = `translateX(-${count * 100}%)`;
      slideBar.style.transition = "transform 0.6s ease-in-out";
    }, 1000);
  }
  //   if (count < 0) {
  //     slideBar.style.transition = false;
  //     count = slideItems.length;
  //   }
});
