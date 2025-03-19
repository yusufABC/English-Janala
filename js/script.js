
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

}

const loadCategoryCard=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    console.log(url)
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> displayVocabsCards(data.data))

}

const displayVoc=(vocabulary)=>{
    const vocabularyContainer=document.getElementById("vocabulary-container")
    console.log(vocabulary)
    if (!Array.isArray(vocabulary) || vocabulary.length == 0) {
        vocabularyContainer.innerHTML = `
         <div class="col-span-full mx-auto flex justify-center flex-col items-center py-10 space-y-4 ">
              <p class="text-xs">আপনি এখনো কোন Lesson Select করেন ন</p>
            <h2 class="text-xl font-bold">একটি Lesson Select করুন।</h2>
        </div>
        `;
        return;
      }

    vocabulary.forEach((voca)=>{
       const vocaDiv=document.createElement("div")
    vocaDiv.innerHTML=` <button  onclick="loadCategoryCard(${voca.level_no})" class="btn btn-sm hover:text-white border-[#422AD5] text-[#422AD5]">
                <img src="assets/fa-book-open.png" alt="Book Icon" class="inline-block mr-2"> Lesson-${voca.level_no}
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
        vocaCardDiv.innerHTML=`
        <div class="bg-base-100 shadow-sm my-6 mx-5  rounded">
                        <div class="card-body text-center ">
                          <h2 class="card-title text-center mx-auto">${vocab.word}</h2>
                           <p class="text-xs">Meaning/pronounciation</p>
                          <p>${vocab.meaning}/${vocab.pronunciation}</p>
                          
                        </div>
                        <div class="flex justify-between p-4">
                            <img src="https://img.icons8.com/?size=100&id=37212&format=png" class="w-5" alt="">
        
                            <img src="https://img.icons8.com/?size=100&id=y8FEyWnp5h1t&format=png&color=000000" class="w-5" alt="">
        
                        </div>
                       
               
                      </div>
        `
        vocaCardContainer.append(vocaCardDiv)
    }) 
   

}

loadVocBtn()
// loadVocCard()
// displayVocabsCards()
displayVoc