function displayTwitterResults(data) {
    const container = document.getElementById('twitter-results');
    
    if (!data.nfts || data.nfts.length === 0) {
        container.innerHTML = '<p class="no-results">Пока ничего не найдено</p>';
        return;
    }

    const nftsHTML = data.nfts.map(nft => {
        const shortText = nft.text.substring(0, 80) + '...'; // ← КРАТКО!
        
        return `
            <div class="nft-card">
                <div class="nft-header">
                    <strong>${nft.project}</strong>
                    <span class="time">${formatTime(nft.time_ago)}</span>
                </div>
                <div class="nft-text">${shortText}</div>
                <a href="${nft.url}" target="_blank" class="nft-link">Открыть твит →</a>
            </div>
        `;
    }).join('');

    container.innerHTML = nftsHTML;
}
