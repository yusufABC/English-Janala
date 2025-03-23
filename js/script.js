
// add hide 
const header=document.getElementById("header")
header.style.display="none"
const vocabulary=document.getElementById("section2")
vocabulary.style.display="none"
const faq=document.getElementById("section1")
faq.style.display="none"
const hero=document.getElementById("hero")


// add 
const inputpass=()=>{
    const inputPassword=document.getElementById("input-pass").value
    
    if (inputPassword === "123456") { 
        header.style.display = "block";
        vocabulary.style.display="block"
        faq.style.display="block"
        hero.style.display="none"


    } else {
        alert("Incorrect Password!"); 
    }
};


const logout=()=>{
        
    
       if (header) header.style.display = "none";
       if (vocabulary) vocabulary.style.display="none"
       if(faq) faq.style.display="none"
       if (hero) hero.style.display="block"



}

// loader work 




const removeActive=()=>{
    const activeButtons=document.getElementsByClassName("active")
  for(let btn of activeButtons){
    btn.classList.remove("active")
  }
 
}

const addActive=(id)=>{
    removeActive()
    const clickButton=document.getElementById(`btn-${id}`)
    if(clickButton){
        clickButton.classList.add("active")
    }
}

// modal showing 

const loadCardDetails=async (id)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    const res1=await res.json()
    const index=res1.data


    displayCardDeatils(index)

    }

    const displayCardDeatils=(details)=>{
        console.log(details)
        document.getElementById("card_details").showModal()
        const detailsContainer=document.getElementById("details-container")
        detailsContainer.innerHTML=`
                <span class="text-xl">${details.word} (${details.meaning})</span>
        <div>
            <p class="font-bold">Meaning</p>
            <p class="">${details.meaning}</p>
        </div>
      
        <div>
            <p class="font-bold">Example</p>
            <p class="">${details.sentence}</p>
        </div>
        <div>
            <p class="font-bold mb-2">সমার্থক শব্দ গুলো</p>
            <div class="flex gap-3 ">
                <button class="btn btn-xs bg-blue-100">${details.synonyms[0]}</button>
                <button class="btn btn-xs bg-blue-100">${details.synonyms[1]}</button>
                <button class="btn btn-xs bg-blue-100">${details.synonyms[2]}</button>
              
            </div>
        </div>
   
        
        `
    }






const loadVocBtn =async ()=>{


    let res=await fetch("https://openapi.programming-hero.com/api/levels/all")
    let res1=await res.json()
    // console.log(res1)
    let index=res1.data
    console.log(index)
  
    displayVoc(index)
 
}


const loadVocCard =async()=>{
    
    let res2 =await fetch("https://openapi.programming-hero.com/api/levels/all")
    let response=await res2.json()
    let index1=response.data
    console.log(index1)

    displayVocabsCards(index1)

    addActive(id)

    
}

const loadCategoryCard=(id)=>{

    const url=`https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> {
        displayVocabsCards(data.data)
    addActive(id)
})
}

const displayVoc=(vocabulary)=>{
    const vocabularyContainer=document.getElementById("vocabulary-container")
    


    vocabulary.forEach((voca)=>{
       const vocaDiv=document.createElement("div")
    vocaDiv.innerHTML=` <button id="btn-${voca.level_no}" onclick="loadCategoryCard(${voca.level_no})" class="btn btn-sm hover:text-white border-[#422AD5] text-[#422AD5]">
                <img src="assets/fa-book-open.png" class="bg-white" alt="Book Icon" class="inline-block mr-2"> Lesson-${voca.level_no}
            </button>
        `;


        
    // const vocaButton = document.createElement("button");
    // vocaButton.textContent = `Button${voca.level_no}`;
 
vocabularyContainer.append(vocaDiv)
        })
}




const displayVocabsCards=(vocabs)=>{


const vocaCardContainer=document.getElementById("vocabulary-card-container")
vocaCardContainer.innerHTML=""

const firstVocabs = vocabs.slice(0, 8);
if (!Array.isArray(firstVocabs) || firstVocabs.length === 0) {
    vocaCardContainer.innerHTML = `
        <div class="col-span-full mx-auto flex justify-center flex-col items-center py-10 space-y-4 ">
<img src="assets/alert-error.png" alt="">
        
              <p class="text-xs">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>
    `;
    return;
}

    firstVocabs.forEach((vocab)=>{
    
        console.log(vocab)
        const vocaCardDiv=document.createElement("div")
    if(vocab.meaning==null){
        vocab.meaning="অর্থ পাওয়া যাইনি"
    }
        vocaCardDiv.innerHTML=`
        <div class="bg-base-100 shadow-sm my-6 mx-5  rounded">
                        <div class="card-body text-center ">
                          <h2 class="card-title text-center mx-auto">${vocab.word}</h2>
                           <p class="text-xs">Meaning/pronounciation</p>
                          <p>${vocab.meaning}/${vocab.pronunciation}</p>
                          
                        </div>
                        <div class="flex justify-between p-4">
                             <button onclick="loadCardDetails('${vocab.id}')" class="btn btn-xs">
                             <img src="https://img.icons8.com/?size=100&id=37212&format=png" class="w-5" alt=""> 
                             </button>  

        
                             <button class="btn btn-xs">
                             <img src="https://img.icons8.com/?size=100&id=y8FEyWnp5h1t&format=png&color=000000" class="w-5" alt="">
                              </button>
        
                        </div>
                       
               
                      </div>
        `
        vocaCardContainer.append(vocaCardDiv)
    }) 
   
    hideLoader()

}


loadVocBtn()
// loadVocCard()
// displayVocabsCards()
// displayVoc()

