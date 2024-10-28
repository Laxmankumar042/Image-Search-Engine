const imagesContainer = document.querySelector('.images-container');
const inputBox = document.querySelector('input');
const loadMoreBtn = document.querySelector('button');

let page = 1;

// Search Function
const searchImages = ()=>{
    document.querySelector('form').addEventListener('submit',(e)=>{
        e.preventDefault()
        fetchImage();
        document.querySelector('.images-container').style.display = 'flex';
        loadMoreBtn.style.display = 'flex';
        loadMoreImages();
        imagesContainer.innerHTML = ''; 
    })
}
searchImages();


// Load More Images :-
const loadMoreImages = ()=>{
    loadMoreBtn.addEventListener('click',()=>{
        page+=1;
        fetchImage();
    })
}


async function fetchImage(){
    let keyword = inputBox.value;
    const accessKey = 'BZ-6tJCTgOwo-rIUNjjzC3bpg_ZhdcnZOaTMJ8FpzOw';
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

        try{
            let respone = await fetch(url);
            let data = await respone.json();
            console.log(data);

            for(let i=0;i<8;i++){
                const div = document.createElement('div');
                div.classList.add('image-box');
                const image = document.createElement('img');
                image.setAttribute('src',`${data.results[i].urls.regular}`);
                div.append(image);
                imagesContainer.append(div)
            }
        }
        catch(error){
            console.log('Error');
        }
        
}
