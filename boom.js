const apiKey = '987395e12eb940618f1eb5dc38d0f7b2';
const bingApiKey = 'YOUR_BING_API_KEY'; // Replace 'YOUR_BING_API_KEY' with your actual Bing API key
const worldDiv = document.getElementById('world');
const sportsDiv = document.getElementById('sports');
const marketDiv = document.getElementById('market');

async function fetchNews(category, container) {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`);
        const data = await response.json();
        
        container.innerHTML = ''; // Clear previous content

        data.articles.forEach(async article => {
            const articleElement = document.createElement('div');
            articleElement.innerHTML = `
                <div>
                    <h3>${article.title}</h3>
                    <p><a href="${article.url}" target="_blank">Read more</a></p>
                    <p>Source: ${article.source.name}</p>
                </div>
            `;
            container.appendChild(articleElement);

            // Fetch image using Bing Image Search API
            const imageUrl = await fetchImage(article.title);
            if (imageUrl) {
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = article.title;
                imageElement.classList.add('article-image');
                container.appendChild(imageElement);
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        container.innerHTML = '<p>Error loading news. Please try again later.</p>';
    }
}

async function fetchImage(query) {
    const response = await fetch(`https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=1&safeSearch=Strict`, {
        headers: {
            'Ocp-Apim-Subscription-Key': bingApiKey
        }
    });
    const data = await response.json();
    return data.value.length > 0 ? data.value[0].thumbnailUrl : null;
}

// Fetch news for each category
fetchNews('world', worldDiv);
fetchNews('sports', sportsDiv);
fetchNews('business', marketDiv);