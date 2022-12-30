const qouteContainer = document.querySelector('#qoute-container');
const qouteText = document.querySelector('#qoute');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQouteBtn = document.querySelector('#new-qoute');
const loader = document.querySelector('#loader');

let apiQoutes = [];

//Show Loading
function showLoadingSpiner() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}
//Hide LoadingSpiner
function hideLoadingSpiner() {
    qouteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Qoute
function newQoute() {
    showLoadingSpiner();
    // Pic a random qoute from apiQoutes array
    const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    // Check if the author name is blank and if it's replace it with 'unknown'
    if(!qoute.author) {
        authorText.textContent = 'unknown!';
    } else {
        authorText.textContent = qoute.author;
    }
    // Check Qoute length to determine styling
    if(qoute.text.length > 50) {
        qouteText.classList.add('long-qoute');
    } else {
        qouteText.classList.remove('long-qoute');
    }
    // Set Qoute, Hide Loader
    qouteText.textContent = qoute.text;
    hideLoadingSpiner();
}

// Get Qoutes From Api
async function getQoutes() {
    showLoadingSpiner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQoutes = await response.json();
        newQoute();
    } catch (error) {
        console.log(error);
        // Catch Errorr
    }
}

// Tweet Qoute
function TweetQoute() {
    const TweetUrl= `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(TweetUrl, '_Blank');
}

//Event Listiner
newQouteBtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click', TweetQoute);

// On Load
getQoutes();