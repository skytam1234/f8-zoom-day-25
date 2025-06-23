$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const tabs = $$(".tabs");
const params= new URLSearchParams(location.search);


function removeActive(tab) {
  const activeNodes = tab.querySelectorAll(".active");
  activeNodes.forEach((node) => {
    node.classList.remove("active");
  });
}
function activeByUrl(){
  tabs.forEach((tab)=>{
    if(params.size){
      removeActive(tab);
      const tabIndex= params.get(tab.id);
      if(tabIndex){
        console.log(tabIndex);
        tab.querySelector(`.tab-link[data-index="${tabIndex}"]`).classList.add('active');
        tab.querySelector(`.tab-content[data-index="${tabIndex}"]`).classList.add('active');
      }
    }
  });
}
activeByUrl();

tabs.forEach((tab) => {
  const tabLinks = tab.querySelectorAll(".tab-link");
  const tabContents = tab.querySelectorAll(".tab-content");
  tabLinks.forEach((tabLink) => {
    tabLink.onclick=function(){
      removeActive(tab);
      tabLink.classList.add("active");
      const index = tabLink.dataset.index;
      const tabContent = tab.querySelector(
    `.tab-content[data-index="${index}"]`
  );
  tabContent.classList.add("active");
  params.set(tab.id,tabLink.dataset.index)
  const paramStr=params.size?params.toString():""+location.hash;
  const newUrl= location.origin+location.pathname+`?`+paramStr;
  history.replaceState(null,null,newUrl);
    };
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





