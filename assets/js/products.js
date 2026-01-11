// Data produk
const products = [
    {
        id: 'sport-250',
        name: 'Sport Bike 250cc',
        price: 'Rp 55.000.000',
        category: 'sport',
        image: 'assets/images/sport-1.jpg',
        description: 'Motor sport dengan performa tinggi dan desain modern yang memberikan pengalaman berkendara maksimal.',
        specifications: [
            { icon: 'fas fa-tachometer-alt', text: 'Mesin 250cc DOHC' },
            { icon: 'fas fa-bolt', text: 'Power 30 HP' },
            { icon: 'fas fa-cog', text: '6 Speed' },
            { icon: 'fas fa-shield-alt', text: 'ABS System' },
            { icon: 'fas fa-lightbulb', text: 'LED Lighting' }
        ]
    },
    {
        id: 'sport-150',
        name: 'Sport Bike 150cc',
        price: 'Rp 35.000.000',
        category: 'sport',
        image: 'assets/images/sport-2.jpg',
        description: 'Motor sport ringan dengan handling responsif.',
        specifications: [
            { icon: 'fas fa-tachometer-alt', text: 'Mesin 150cc DOHC' },
            { icon: 'fas fa-bolt', text: 'Power 19 HP' },
            { icon: 'fas fa-cog', text: '6 Speed' },
            { icon: 'fas fa-lightbulb', text: 'LED Headlight' },
            { icon: 'fas fa-compress-arrows-alt', text: 'USD Fork' }
        ]
    },
    {
        id: 'sport-300',
        name: 'Sport Bike 300cc',
        price: 'Rp 75.000.000',
        category: 'sport',
        image: 'assets/images/sport-3.jpg',
        description: 'Motor sport premium dengan performa tinggi dan fitur canggih.',
        specifications: [
            { icon: 'fas fa-tachometer-alt', text: 'Mesin 300cc DOHC' },
            { icon: 'fas fa-bolt', text: 'Power 42 HP' },
            { icon: 'fas fa-cog', text: '6 Speed' },
            { icon: 'fas fa-exchange-alt', text: 'Quick Shifter' },
            { icon: 'fas fa-shield-alt', text: 'Traction Control' }
        ]
    },
    {
        id: 'matic-premium',
        name: 'Matic Premium',
        price: 'Rp 25.000.000',
        category: 'matic',
        image: 'assets/images/matic-1.jpg',
        description: 'Motor matic premium dengan kenyamanan maksimal.',
        specifications: [
            { icon: 'fas fa-tachometer-alt', text: 'Mesin 150cc' },
            { icon: 'fas fa-bolt', text: 'Power 15 HP' },
            { icon: 'fas fa-cog', text: 'CVT' },
            { icon: 'fas fa-key', text: 'Smart Key System' },
            { icon: 'fas fa-lightbulb', text: 'LED Lighting' }
        ]
    },
    {
        id: 'cub-classic',
        name: 'Cub Classic',
        price: 'Rp 18.000.000',
        category: 'cub',
        image: 'assets/images/cub-1.jpg',
        description: 'Motor bebek klasik dengan performa handal.',
        specifications: [
            { icon: 'fas fa-tachometer-alt', text: 'Mesin 110cc' },
            { icon: 'fas fa-bolt', text: 'Power 9 HP' },
            { icon: 'fas fa-cog', text: '4 Speed' },
            { icon: 'fas fa-power-off', text: 'Electric Starter' },
            { icon: 'fas fa-key', text: 'Secure Key' }
        ]
    }
];

class ProductManager {
    constructor() {
        this.productGrid = document.getElementById('productGrid');
        this.filterButtons = document.querySelectorAll('#productFilters .nav-link');
        this.pagination = document.getElementById('pagination');
        this.modal = new bootstrap.Modal(document.getElementById('productModal'));
        this.itemsPerPage = 6;
        this.currentPage = 1;
        this.currentCategory = 'all';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.filterProducts('all');
        this.renderPagination();
    }

    setupEventListeners() {
        // Filter button clicks
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.currentCategory = category;
                this.currentPage = 1;
                this.filterProducts(category);
                this.renderPagination();
            });
        });

        // Product card clicks for modal
        this.productGrid.addEventListener('click', (e) => {
            const button = e.target.closest('.btn-primary');
            if (button) {
                const productCard = button.closest('.product-item');
                if (productCard) {
                    const productId = productCard.dataset.productId;
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        this.showProductDetails(product);
                    }
                }
            }
        });
    }

    filterProducts(category) {
        this.productGrid.innerHTML = '';
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        paginatedProducts.forEach(product => {
            this.productGrid.appendChild(this.createProductCard(product));
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-item';
        card.dataset.productId = product.id;
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="text-primary fw-bold mt-auto mb-3">${product.price}</p>
                    <button class="btn btn-primary mt-auto">
                        <i class="fas fa-info-circle me-2"></i>
                        Detail
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    renderPagination() {
        const filteredProducts = this.currentCategory === 'all'
            ? products
            : products.filter(product => product.category === this.currentCategory);
        
        const pageCount = Math.ceil(filteredProducts.length / this.itemsPerPage);
        this.pagination.innerHTML = '';

        for (let i = 1; i <= pageCount; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === this.currentPage ? 'active' : ''}`;
            
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentPage = i;
                this.filterProducts(this.currentCategory);
                this.renderPagination();
            });

            li.appendChild(a);
            this.pagination.appendChild(li);
        }
    }

    showProductDetails(product) {
        const modal = document.getElementById('productModal');
        modal.querySelector('.modal-title').textContent = product.name;
        modal.querySelector('.product-modal-image').src = product.image;
        modal.querySelector('.product-modal-image').alt = product.name;
        modal.querySelector('.product-modal-price').textContent = product.price;
        modal.querySelector('.product-modal-description').textContent = product.description;
        
        const specsList = modal.querySelector('.product-modal-specs');
        specsList.innerHTML = product.specifications.map(spec => `
            <li>
                <i class="${spec.icon}"></i>
                ${spec.text}
            </li>
        `).join('');
        
        this.modal.show();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});
