const apiKey = '987395e12eb940618f1eb5dc38d0f7b2';
const worldDiv = document.getElementById('world');
        const sportsDiv = document.getElementById('sports');
        const marketDiv = document.getElementById('market');

        async function fetchNews(category, container) {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`);
                const data = await response.json();
                
                container.innerHTML = ''; // Clear previous content

                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.innerHTML = `
                        <div>
                            ${article.urlToImage && article.urlToImage !== 'null' ? `<img src="${article.urlToImage}" alt="${article.title}" class="article-image">` : ''}
                            <h3>${article.title}</h3>
                            <p><a href="${article.url}" target="_blank">Read more</a></p>
                            <p>Source: ${article.source.name}</p>
                        </div>
                    `;
                    container.appendChild(articleElement);
                });
            } catch (error) {
                console.error('Error fetching news:', error);
                container.innerHTML = '<p>Error loading news. Please try again later.</p>';
            }
        }

        // Fetch news for each category
        fetchNews('world', worldDiv);
        fetchNews('sports', sportsDiv);
        fetchNews('business', marketDiv);
