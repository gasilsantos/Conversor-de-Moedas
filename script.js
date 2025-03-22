// Configuração da API
const API_KEY = '768402831754c3048e63d00b';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Elementos do DOM
const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Função para converter moeda
async function convertCurrency() {
    try {
        const amount = parseFloat(fromAmount.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rates[to];
            const result = (amount * rate).toFixed(2);
            toAmount.value = result;
        } else {
            throw new Error('Erro na conversão');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro na conversão. Tente novamente.');
    }
}

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-bs-theme') === 'dark';
    body.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
    themeIcon.className = isDark ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
}

// Event listeners
convertBtn.addEventListener('click', convertCurrency);
fromAmount.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') convertCurrency();
});

// Converter automaticamente quando mudar as moedas
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Alternar tema
themeToggle.addEventListener('click', toggleTheme);

// Realizar primeira conversão
convertCurrency();