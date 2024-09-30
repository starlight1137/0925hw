// 圖片主題
const themes = {
    theme1: [
        'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 
        'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg'
    ],
    theme2: [
        'theme2_img1.jpg', 'theme2_img2.jpg', 'theme2_img3.jpg', 'theme2_img4.jpg',
        'theme2_img5.jpg', 'theme2_img6.jpg', 'theme2_img7.jpg', 'theme2_img8.jpg'
    ]
};

const cardContainer = document.getElementById('cardContainer');
const startGameButton = document.getElementById('startGame');
const themeSelector = document.getElementById('theme');
const countdownElement = document.getElementById('countdown');
let selectedTheme = 'theme1'; // 預設主題
let shuffledCards = [];

// 動態生成卡片
function generateCards(theme) {
    const images = [...themes[theme], ...themes[theme]]; // 複製圖片使成對
    shuffledCards = shuffleArray(images); // 打亂順序

    // 清空現有卡片
    cardContainer.innerHTML = '';

    shuffledCards.forEach((imgFile, index) => {
        const imgSrc = `./images/${theme}/${imgFile}`; // 使用主題和文件名生成完整路徑
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-flip', "false");
        card.innerHTML = `
            <img class="front" src="${imgSrc}" alt="Image ${index + 1}">
            <img class="back" src="images/back.jpg" alt="Back">
        `;
        cardContainer.appendChild(card);
    });

    attachFlipHandlers();
}

// 隨機打亂陣列
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 開始遊戲邏輯
startGameButton.addEventListener('click', () => {
    selectedTheme = themeSelector.value; // 取得當前選中的主題
    generateCards(selectedTheme); // 生成卡片
    console.log(selectedTheme); // 輸出選擇的主題
    startGameButton.disabled = true; // 禁用按鈕避免重複點擊

    // 倒數計時提示 10 秒
    let countdown = 10;
    countdownElement.textContent = `剩餘 ${countdown} 秒開始`;
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownElement.textContent = `剩餘 ${countdown} 秒開始`;
        } else {
            clearInterval(countdownInterval);
            countdownElement.textContent = ''; // 清除倒計時提示
            flipAllCardsTo('front'); // 10 秒後翻回正面
        }
    }, 1000);

    // 一開始將所有卡片翻到背面
    flipAllCardsTo('back'); // 確保遊戲開始時所有卡片都是背面
});

// 重置遊戲的邏輯
document.getElementById('resetGame').addEventListener('click', () => {
    cardContainer.innerHTML = ''; // 清空卡片容器
    countdownElement.textContent = ''; // 清除倒計時提示
    startGameButton.disabled = false; // 啟用開始遊戲按鈕
    flipAllCardsTo('back'); // 確保卡片翻到背面
});

// 附加卡片翻轉事件
function attachFlipHandlers() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('flipped');
            if (!isFlipped) {
                card.classList.add('flipped');
            } else {
                card.classList.remove('flipped');
            }
        });
    });
}

// 翻轉所有卡片
function flipAllCardsTo(side) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (side === 'back') {
            card.classList.add('flipped');
        } else {
            card.classList.remove('flipped');
        }
    });
}

// 新增翻轉到正面的按鈕
document.getElementById('flipAllFront').addEventListener('click', () => {
    flipAllCardsTo('front'); // 翻轉到正面
});

// 新增翻轉到背面的按鈕
document.getElementById('flipAllBack').addEventListener('click', () => {
    flipAllCardsTo('back'); // 翻轉到背面
});

// 初始化主題選擇
themeSelector.addEventListener('change', (e) => {
    selectedTheme = e.target.value; // 更新選中的主題
});
