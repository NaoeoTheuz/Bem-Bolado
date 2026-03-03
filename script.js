// Elementos
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const forgotModal = document.getElementById('forgotModal');
const closeBtns = document.querySelectorAll('.close');

// Botões principais
document.getElementById('criarContaBtn').addEventListener('click', () => {
    registerModal.classList.add('show');
});

document.getElementById('temContaBtn').addEventListener('click', () => {
    loginModal.classList.add('show');
});

// Links nos modais
document.getElementById('esqueciSenha').addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('show');
    forgotModal.classList.add('show');
});

document.getElementById('criarContaModal').addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('show');
    registerModal.classList.add('show');
});

document.getElementById('jaTemConta').addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('show');
    loginModal.classList.add('show');
});

document.getElementById('voltarLogin').addEventListener('click', (e) => {
    e.preventDefault();
    forgotModal.classList.remove('show');
    loginModal.classList.add('show');
});

// Fechar modais
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.remove('show');
        registerModal.classList.remove('show');
        forgotModal.classList.remove('show');
    });
});

// Fechar ao clicar fora
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('show');
    }
    if (e.target === forgotModal) {
        forgotModal.classList.remove('show');
    }
});

// Máscara para CPF
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    if (valor.length <= 11) {
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        input.value = valor;
    }
}

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}

// Validação de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar alerta
function showAlert(modal, message, type) {
    const oldAlert = modal.querySelector('.alert');
    if (oldAlert) oldAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} show`;
    alert.textContent = message;
    
    const form = modal.querySelector('form');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Handler do Login (COM REDIRECIONAMENTO)
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    
    if (!validarEmail(email)) {
        showAlert(loginModal, 'Por favor, digite um email válido!', 'error');
        return;
    }
    
    if (senha.length < 3) {
        showAlert(loginModal, 'A senha deve ter pelo menos 3 caracteres!', 'error');
        return;
    }
    
    showAlert(loginModal, 'Login realizado com sucesso!', 'success');
    
    setTimeout(() => {
        loginModal.classList.remove('show');
        document.getElementById('loginForm').reset();
        
        // REDIRECIONAMENTO PARA A PÁGINA HOME
        window.location.href = 'dashboard.html';
    }, 1500);
});

// Handler do Registro
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nomeCompleto').value;
    const email = document.getElementById('emailRegistro').value;
    const senha = document.getElementById('senhaRegistro').value;
    const cpf = document.getElementById('cpf').value;
    
    if (nome.length < 3) {
        showAlert(registerModal, 'Nome completo deve ter pelo menos 3 caracteres!', 'error');
        return;
    }
    
    if (!validarEmail(email)) {
        showAlert(registerModal, 'Email inválido!', 'error');
        return;
    }
    
    if (senha.length < 6) {
        showAlert(registerModal, 'A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }
    
    const cpfLimpo = cpf.replace(/[^\d]/g, '');
    if (!validarCPF(cpfLimpo)) {
        showAlert(registerModal, 'CPF inválido!', 'error');
        return;
    }
    
    showAlert(registerModal, 'Conta criada com sucesso!', 'success');
    
    setTimeout(() => {
        registerModal.classList.remove('show');
        document.getElementById('registerForm').reset();
        loginModal.classList.add('show');
    }, 2000);
});

// Handler do Recuperar Senha
document.getElementById('forgotForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('emailForgot').value;
    
    if (!validarEmail(email)) {
        showAlert(forgotModal, 'Email inválido!', 'error');
        return;
    }
    
    showAlert(forgotModal, 'Instruções de recuperação enviadas para seu email!', 'success');
    
    setTimeout(() => {
        forgotModal.classList.remove('show');
        document.getElementById('forgotForm').reset();
        loginModal.classList.add('show');
    }, 2000);
});

// Adiciona máscara ao campo CPF
document.getElementById('cpf').addEventListener('input', function() {
    mascaraCPF(this);
});