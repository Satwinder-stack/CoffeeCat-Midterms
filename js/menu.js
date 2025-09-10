const hamburger = document.querySelector('.hamburger');
const mobileNav = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
        mobileNav.classList.toggle('open');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });
}

function getCart() {
    return JSON.parse(localStorage.getItem('coffeeCatCart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('coffeeCatCart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    const found = cart.findIndex(
        item => item.name === product.name && item.variant === product.variant
    );
    if (found >= 0) {
        cart[found].qty += Number(product.qty || 1);
    } else {
        product.qty = Number(product.qty || 1);
        cart.push(product);
    }
    saveCart(cart);
    alert(product.name + (product.variant ? ` (${product.variant})` : '') + ' added to cart!');
}

function pickVariant(options, callback) {
    let existing = document.getElementById('variant-modal');
    if(existing) existing.remove();
    const modal = document.createElement('div');
    modal.id = 'variant-modal';
    modal.style.position = 'fixed';
    modal.style.left = 0;
    modal.style.top = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(33,25,13,0.28)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 9999;
    
    const inner = document.createElement('div');
    inner.style.background = '#fffaf6';
    inner.style.padding = '2em 2.5em';
    inner.style.borderRadius = '18px';
    inner.style.boxShadow = '0 8px 32px rgba(160,120,80,0.19)';
    inner.innerHTML = `<div style="font-weight:bold;font-size:1.1em;margin-bottom:0.7em">Choose an option:</div>`;
    const select = document.createElement('select');
    select.style.fontSize = '1em';
    select.style.marginBottom = '1.2em';
    select.style.padding = '0.3em 1.2em';
    select.style.borderRadius = '10px';
    options.forEach(opt => {
        let o = document.createElement('option');
        o.value = opt.variant;
        o.textContent = `${opt.variant} - ₱${opt.price}`;
        select.appendChild(o);
    });
    inner.appendChild(select);
    const btn = document.createElement('button');
    btn.textContent = 'Add to Cart';
    btn.className = 'add-to-cart-btn';
    btn.style.marginLeft = '1em';
    btn.style.fontSize = '0.97em';
    btn.onclick = () => {
        modal.remove();
        callback(options[select.selectedIndex]);
    };
    inner.appendChild(btn);
    const cancel = document.createElement('button');
    cancel.textContent = 'Cancel';
    cancel.className = 'cancel-btn';
    cancel.style.marginLeft = '2em';
    cancel.onclick = () => modal.remove();
    inner.appendChild(cancel);
    modal.appendChild(inner);
    document.body.appendChild(modal);
}

function parsePriceOptions(priceText) {
    let opts = priceText.split('|').map(part => {
        let [variant, price] = part.split(':').map(s => s.trim());
        let priceNum = price ? parseInt(price.replace('₱', '').replace(',', '')) : 0;
        return {variant: variant || '', price: priceNum};
    }).filter(o => o.variant && o.price);
    return opts.length > 1 ? opts : null;
}

function setupAddToCartButtons() {
    const btns = document.querySelectorAll('.add-to-cart-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.menu-item');
            const name = card.querySelector('h3').textContent.trim();
            let priceDiv = card.querySelector('.menu-price');
            let priceText = priceDiv ? priceDiv.textContent.trim() : '';
            let options = parsePriceOptions(priceText);
            if(options) {
                pickVariant(options, (chosen) => {
                    addToCart({name, variant: chosen.variant, price: chosen.price});
                });
            } else {
                let variant = '';
                let match = priceText.match(/([A-Za-z ]+): ?₱?(\d+)/);
                if(match) {
                    variant = match[1].trim();
                    priceText = match[2];
                }
                let priceNum = parseInt(priceText.replace('₱','').replace(',', ''));
                addToCart({name, variant, price: priceNum});
            }
        });
    });
}

function setupMenuSearch() {
    const input = document.getElementById('menu-search');
    if (!input) return;

    const getItemText = (item) => {
        let texts = [];
        const title = item.querySelector('h3');
        if (title) texts.push(title.textContent);
        const desc = item.querySelector('p');
        if (desc) texts.push(desc.textContent);
        const price = item.querySelector('.menu-price');
        if (price) texts.push(price.textContent);
        // Include list items under non-card sections (e.g., Non-coffee)
        item.querySelectorAll('li').forEach(li => texts.push(li.textContent));
        return texts.join(' ').toLowerCase();
    };

    const allItems = Array.from(document.querySelectorAll('.menu-items .menu-item'));

    const filter = () => {
        const q = input.value.trim().toLowerCase();
        allItems.forEach(item => {
            const text = getItemText(item);
            const match = q === '' || text.includes(q);
            item.style.display = match ? '' : 'none';
        });
        // Hide category headings if their following .menu-items has all items hidden
        document.querySelectorAll('.menu-category').forEach(cat => {
            const itemsContainer = cat.nextElementSibling;
            if (itemsContainer && itemsContainer.classList.contains('menu-items')) {
                const visible = Array.from(itemsContainer.children).some(child => child.classList.contains('menu-item') && child.style.display !== 'none');
                cat.style.display = visible ? '' : 'none';
                itemsContainer.style.display = visible ? '' : 'none';
            }
        });
    };

    input.addEventListener('input', filter);
}

document.addEventListener('DOMContentLoaded', () => {
    setupAddToCartButtons();
    setupMenuSearch();
});
