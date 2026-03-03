// Logout - volta para a página de login
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Nova publicação
document.getElementById('novaPublicacaoBtn').addEventListener('click', () => {
    alert('Funcionalidade de nova publicação será implementada em breve!');
});

// Menu ativo - muda a cor do item clicado
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        const itemText = this.querySelector('span:last-child').textContent;
        console.log(`Navegando para: ${itemText}`);
        alert(`Você clicou em: ${itemText}`);
    });
});

// Ações nos posts (curtir, comentar, compartilhar)
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const action = this.textContent;
        alert(`Você clicou em: ${action}`);
        
        // Se for curtir, pode mudar a cor do botão
        if (action === 'Curtir') {
            this.style.backgroundColor = '#000';
            this.style.color = 'white';
        }
    });
});