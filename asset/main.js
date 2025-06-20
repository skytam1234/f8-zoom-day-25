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
const slideAround=$('.slide-around')
const nextBtn = $(".next-btn");
const previousBtn = $(".previous-btn");
let rotate=null;
let count = 1;
const duration=0.6;

let firstItem = slideItems[0].cloneNode(true);
let lastItem = slideItems[slideItems.length-1].cloneNode(true);

slideBar.appendChild(firstItem);
slideBar.insertBefore(lastItem,slideItems[0]);
const allItems = $$(".slide-item");

function renderAround(number){
    if(typeof number==='number'){
      for(let i=0; i<number;i++){
        const element= document.createElement('div');
        element.className="slide-around-item";
        i===0?element.classList.add("active"):"";
        element.dataset.index=i;
        slideAround.appendChild(element);
      }
    }
}
renderAround(slideItems.length)
  
nextBtn.onclick = function () {
  this.style.pointerEvents= `none`;
  setTimeout(()=>{
    nextBtn.style.pointerEvents=`visible`;
  },duration*1000);
  if(rotate==="pre")count++;
  rotate="next";
  if (count >= allItems.length-1) return;
  slideBar.style.transform = `translateX(-${ (count+1) * 100}%)`;
  slideBar.style.transition = `transform  ease ${duration}s`;
  count++;
  
  
};
previousBtn.onclick = function () {
  this.style.pointerEvents= `none`;
  setTimeout(()=>{
    previousBtn.style.pointerEvents=`visible`;
  },duration*1000);
  if(rotate==="next")count--;
  rotate="pre";
  if (count <= 0) return;
  slideBar.style.transform = `translateX(-${(count-1) * 100}%)`;
  slideBar.style.transition = `transform  ease ${duration}s`;
  count--;
};
slideBar.addEventListener("transitionend", () => {
  if (count >= allItems.length - 1) {
    slideBar.style.transition = false;
    count = 1;
    slideBar.style.transform = `translateX(-${count * 100}%)`;
    setTimeout(() => {
      slideBar.style.transition = `transform  ease ${duration}s`;
    });
  }
    if (count <= 0) {
      console.log(count)
      slideBar.style.transition = false;
      count = allItems.length-2;
      slideBar.style.transform = `translateX(-${ (count ) * 100}%)`;
      setTimeout(()=>{
        slideBar.style.transition = `transform  ease ${duration}s`;
      })
    }
});
function showSlideAuto(){
  const aroundElements=slideAround.querySelectorAll('.slide-around-item');
  aroundElements[0].classList.add('active')
  nextBtn.onclick();
  let checkOut= count;
  if(checkOut>slideItems.length)checkOut=1;
  aroundElements.forEach((aroundElement)=>{
    aroundElement.classList.remove('active');
    if(Number(aroundElement.dataset.index)===(checkOut-1)){
      aroundElement.classList.add("active")
    }
  }); 
};
let showAuto= setInterval(()=>{
  showSlideAuto();
},3000);

slideView.addEventListener('mouseenter',()=>{
  clearInterval(showAuto);
})
slideView.addEventListener('mouseleave',()=>{
  showAuto= setInterval(()=>{
    showSlideAuto();
  },3000);
})



