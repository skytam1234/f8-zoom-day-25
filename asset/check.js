$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);

const checkAll=$('#checkAll');
let listCheckBox=$$(".item-checkbox")
const divCount= $('.count')

function checkChecked(elements){
    let count=0;
    elements.forEach((item)=>{
        if(item.checked)count++;
    })
    return count;
}

checkAll.onchange=function(e){
    listCheckBox=$$(".item-checkbox")
  if(checkAll.checked) {
    listCheckBox.forEach((item)=>{
        item.checked=true
    });
    let result=checkChecked(listCheckBox);
    divCount.textContent=`Tổng số hàng đã chọn: ${result}`
    return;
  }
  listCheckBox.forEach((item)=>{
    item.checked=false
  });
  let result=checkChecked(listCheckBox);
    divCount.textContent=`Tổng số hàng đã chọn: ${result}`

}
listCheckBox.forEach((item)=>{
    item.onchange=function(){
        checkAll.checked = false;
        checkAll.indeterminate =false
        let result=checkChecked(listCheckBox);
        console.log(listCheckBox.length)      
        if(result > 0 && result <listCheckBox.length)checkAll.indeterminate =true;
        if(result === listCheckBox.length){
            checkAll.indeterminate =false
            checkAll.checked=true;
        } 
        divCount.textContent=`Tổng số hàng đã chọn: ${result}`
    }
    
})
