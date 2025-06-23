$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
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
function activeAround(){
    const aroundElements=slideAround.querySelectorAll('.slide-around-item');
    let checkOut= currentIndex;
  if(checkOut>slideItems.length)checkOut=1; 
  if(checkOut<1)checkOut=slideItems.length;
  aroundElements.forEach((aroundElement)=>{
    aroundElement.classList.remove('active');
    if(Number(aroundElement.dataset.index)===(checkOut-1)){
      aroundElement.classList.add("active")
    }
  });
}
  
let currentIndex=1;
function handleMoving(isNext){
isNext?currentIndex++:currentIndex--;
slideBar.style.transform = `translateX(-${(currentIndex) * 100}%)`;
slideBar.style.transition =`all ease ${duration}s`;

}
nextBtn.onclick=function(){
    this.style.display='none';
    setTimeout(()=>{this.style.display='block';},duration*1000)
    handleMoving(true);
    activeAround();
};
previousBtn.onclick=function(){
    this.style.display='none';
    setTimeout(()=>{this.style.display='block';},duration*1000)
    handleMoving(false)
    activeAround();
}

slideBar.addEventListener("transitionend", () => {
  if (currentIndex >= allItems.length - 1) {
    slideBar.style.transition = false;
    currentIndex = 1;
    slideBar.style.transform = `translateX(-${currentIndex * 100}%)`;
    setTimeout(() => {
      slideBar.style.transition = `transform  ease ${duration}s`;
    });
  }
    if (currentIndex <= 0) {
      slideBar.style.transition = false;
      currentIndex = allItems.length-2;
      slideBar.style.transform = `translateX(-${ (currentIndex ) * 100}%)`;
      setTimeout(()=>{
        slideBar.style.transition = `transform  ease ${duration}s`;
      })
    }
});
function showSlideAuto(){
  const aroundElements=slideAround.querySelectorAll('.slide-around-item');
  aroundElements[0].classList.add('active')
  nextBtn.onclick();
  activeAround();
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