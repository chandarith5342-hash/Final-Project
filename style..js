    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
      }, 800);
      createParticles();
    });


    function createParticles() {
      const container = document.getElementById('particles');
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        const colors = ['var(--neon-pink)', 'var(--neon-blue)', 'var(--neon-purple)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
        
        container.appendChild(particle);
      }
    }

    let cart = [];
    let total = 0;

    function addToCart(name, price) {
      cart.push({ name, price });
      total += price;
      updateCartCount();
      showToast(name);
      
      // Animate cart button
      const cartBtn = document.querySelector('.cart-btn');
      cartBtn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
      }, 200);
    }

    function updateCartCount() {
      const countEl = document.getElementById('cart-count');
      countEl.innerText = cart.length;
      countEl.style.display = cart.length > 0 ? 'flex' : 'none';
      
      // Trigger bounce animation
      countEl.style.animation = 'none';
      setTimeout(() => {
        countEl.style.animation = 'bounce 0.5s ease';
      }, 10);
    }

    function showToast(itemName) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMessage').innerText = `${itemName} added to your cart`;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    function viewCart() {
      const cartSection = document.getElementById('cart');
      const overlay = document.getElementById('cartOverlay');
      
      cartSection.classList.add('active');
      overlay.classList.add('active');
      
      renderCart();
    }

    function closeCart() {
      const cartSection = document.getElementById('cart');
      const overlay = document.getElementById('cartOverlay');
      
      cartSection.classList.remove('active');
      overlay.classList.remove('active');
    }

    function renderCart() {
      const list = document.getElementById('cart-items');
      const emptyCart = document.getElementById('emptyCart');
      const cartFooter = document.getElementById('cartFooter');
      
      list.innerHTML = '';
      
      if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartFooter.style.display = 'none';
      } else {
        emptyCart.style.display = 'none';
        cartFooter.style.display = 'block';
        
        cart.forEach((item, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price">$${item.price.toFixed(2)}</div>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
          `;
          list.appendChild(li);
        });
        
        document.getElementById('total').innerText = '$' + total.toFixed(2);
      }
    }

    function removeItem(index) {
      total -= cart[index].price;
      cart.splice(index, 1);
      updateCartCount();
      renderCart();
    }

    function searchProduct() {
      const input = document.getElementById('search').value.toLowerCase();
      const products = document.querySelectorAll('.product');
      
      products.forEach((product, index) => {
        const name = product.getAttribute('data-name');
        if (name.includes(input)) {
          product.style.display = 'block';
          product.style.animation = `cardAppear 0.5s ease ${index * 0.1}s both`;
        } else {
          product.style.display = 'none';
        }
      });
    }


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeCart();
    });