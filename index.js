
//i dont know hot to rewrite all this to class and component conditon; 
//now im gonna to learn and maybe became better
//ty for test
//get elements from page
const input = document.querySelector(".input");
const addButton = document.querySelector(".add-button");
const listField = document.querySelector(".list-field");
const readOnlyBox = document.querySelector(".readonly");
let id = 0, tagsList = [] ;

// get tags from local storage
let data = localStorage.getItem("taglistlocal")
if(data){
    tagsList = JSON.parse(data);    
	id = tagsList.length;	
	loadTags(tagsList);    
}

// load local storage items
function loadTags(tagsList){
    tagsList.forEach(elem => {
        createTag(elem.tagname,elem.id,elem.trash)
    });
}

// event listeners
addButton.addEventListener("click", ()=> {createNewTag(input)})
document.addEventListener("keydown", ev=>{
	if(ev.code == 'Enter'){
		createNewTag(input)
	}
})
readOnlyBox.addEventListener("change", readOnlyMode)
// adding tag to list 
function createNewTag(input){
    let tagsname = input.value
    if(tagsname) {          
        let tagname = input.value.split(",")        
        if(tagname.length < 2) {
            createTag(tagname,id,false)
            tagsList.push({tagname,id,trash: false})
            id++;
        }
        if(tagname.length > 1){
            tagname.forEach(tagname=>{
                createTag(tagname,id,false)
                tagslist.push({tagname,id,trash: false})
                id++;
            })
        }           
        
    }
    localStorage.setItem("taglistlocal", JSON.stringify(tagsList))
    input.value = "";
}
function readOnlyMode(){
    if(readOnlyBox.checked){
        input.value = ""
        input.disabled = true
        listField.setAttribute("disabled","disabled")
    }
    else {listField.removeAttribute("disabled")
    input.disabled = false
}
}
function createTag(tagname,id,trash){
    if(trash){return}    
	const text = `
	<li class="item">		
		<p>${tagname}</p>
		<i class="fa fa-trash" delete="delete" id="${id}"></i>		
	</li>`; 
	listField.insertAdjacentHTML("beforeend",text);    
}
function removeTag(elem) {    
   if(elem.parentNode.parentNode.attributes.disabled == undefined) {
    elem.parentNode.remove()    
    tagsList[elem.id].trash = true;
    }     
}
listField.addEventListener("click", ev=>{ 
    let elem = ev.target
    if(!elem.attributes.delete) {return}
    if(elem.attributes.delete.value === "delete") {        
        removeTag(elem)
        localStorage.setItem("taglistlocal", JSON.stringify(tagsList)); 
    }        	
})
