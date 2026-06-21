let selectedProduct = "";
const ctaBlocks = document.querySelectorAll('.cta-block');
if (ctaBlocks.length) {
    const checkCta = () => {
        ctaBlocks.forEach(cta => {
            if (cta.getBoundingClientRect().top < window.innerHeight - 100) {
                cta.classList.add('show');
            }
        });
    };
    checkCta(); // срабатывает сразу при загрузке
    window.addEventListener('scroll', checkCta);
}
// Открыть модалку товара
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        selectedProduct = this.dataset.title;
        document.getElementById('modalTitle').textContent = this.dataset.title;
        document.getElementById('modalImg').src = this.dataset.img;
        document.getElementById('modalDescription').textContent = this.dataset.desc;
        document.getElementById('productModal').style.display = 'flex';
    });
});

// Закрыть модалку товара
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
});

// Открыть форму из модалки товара
document.getElementById('modalOrderBtn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('formModal').style.display = 'flex';
});

// Открыть форму из кнопки на странице
const openFormBtn = document.getElementById('openFormBtn');
if (openFormBtn) {
    openFormBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('formModal').style.display = 'flex';
    });
}

// Закрыть форму
document.querySelector('.form-close').addEventListener('click', () => {
    document.getElementById('formModal').style.display = 'none';
});

// Закрыть по клику вне модалки
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Анимация cta-block при скролле
const cta = document.querySelector('.cta-block');
if (cta) {
    window.addEventListener('scroll', () => {
        if (cta.getBoundingClientRect().top < window.innerHeight - 100) {
            cta.classList.add('show');
        }
    });
}

// Отправка формы
const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = form.querySelector("input[name='name']").value;
        const phone = form.querySelector("input[name='phone']").value;
        let comment = form.querySelector("textarea[name='comment']").value;

        if (name.trim().length < 2) { alert("Введите имя"); return; }
        if (phone.trim().length < 10) { alert("Введите телефон"); return; }
        if (!comment) comment = "Без комментария";

        const btn = form.querySelector("button");
        btn.disabled = true;

        try {
            await fetch("/send", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, comment, product: selectedProduct || "Не указан" })
            });

            const successMsg = document.getElementById("successMessage");
            if (successMsg) {
                successMsg.classList.add("show");
                setTimeout(() => successMsg.classList.remove("show"), 3000);
            }

            form.reset();
            document.getElementById("formModal").style.display = "none";

        } catch (err) {
            console.error(err);
            alert("Ошибка отправки");
        } finally {
            btn.disabled = false;
        }
    });
}