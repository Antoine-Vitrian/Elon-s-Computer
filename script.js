// Adiciona o produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const notificacoes = document.getElementById('notificacao-log');
    
    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(p => p.nome === nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({nome: nome, preco: preco, quantidade: 1, imagem: `img/${nome}.png`});
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    const notificacao = document.createElement('p');
    notificacao.className = 'notificacao';
    notificacao.textContent = `${nome} foi adicionado ao carrinho!`;
    notificacao.style.color = 'white';
    notificacao.style.padding = '0.8em'
    notificacao.style.background = 'rgba(98, 0, 255, 0.200)'
    notificacao.style.outline = 'solid 1px rgb(98, 0, 255)'
    notificacoes.appendChild(notificacao);

    atualizarNotificacao(true);
}

function atualizarNotificacao(state) {
    const notificacao = document.getElementById('notify');
    const notificacaoLog = document.getElementById('notificacao-log');

    notificacaoLog.addEventListener("mouseenter", () => {
        notificacao.style.display = 'none';
    });

    if(state) {
        notificacao.style.display = 'block';
        notificacao.style.animation = 'pop 100ms ease-in-out';
        return;
    }else if (!state) {
        notificacao.style.display = 'none';
        if(notificacaoLog.style.height != '20vh') {
            notificacaoLog.style.height = '20vh';
        }else {
            notificacaoLog.style.height = '0';
        }
    }

}

function ordenar() {
    const valor = document.getElementById('tipo').value;
    const containers = Array.from(document.getElementsByClassName('produtos')); // Converte para array


    switch(valor) {
        case 'crescente': // Compara strings
            containers.forEach((container) => {
                const produtos = Array.from(container.children);
                produtos.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // Ordena em ordem crescente
                produtos.forEach(div => container.appendChild(div));
            });
            break;
    
        case 'decrescente': // Compara strings
            containers.forEach((container) => {
                const produtos = Array.from(container.children);
                produtos.sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Ordena em ordem decrescente
                produtos.forEach(div => container.appendChild(div));
            });
            break;
    }
}

// Remove um item do carrinho
function removerDoCarrinho(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(p => p.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho(); // Atualiza a página do carrinho
}

function filtrarPreco(tipo) {
    const preco = parseFloat(document.getElementById('preco-filtro').value);
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinho');

    if(isNaN(preco)) {
        carrinhoContainer.innerHTML = '<p style="text-align: center; margin-top: 50px; font-size: 1.5rem;">Valor de preço inválido</p>';
        return;
    }

    carrinhoContainer.innerHTML = '';

    if(carrinho.length > 0) {
        carrinho.forEach(item => {
            if(tipo === 'menor' && item.preco < preco) {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="cart-item-info">
                        <h2>${item.nome}</h2>
                        <p>R$${item.preco.toFixed(2)}</p>
                        <p>Quantidade: ${item.quantidade}</p>
                        <p>Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}</p>
                    </div>
                    <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                `;
                carrinhoContainer.appendChild(itemElement);
            }else if(tipo === 'maior' && item.preco > preco) {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="cart-item-info">
                        <h2>${item.nome}</h2>
                        <p>R$${item.preco.toFixed(2)}</p>
                        <p>Quantidade: ${item.quantidade}</p>
                        <p>Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}</p>
                    </div>
                    <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                `;
                carrinhoContainer.appendChild(itemElement);
            }
        });
    }else {
        carrinhoContainer.innerHTML = '<p>Não há itens para filtrar</p>';
    }
}

// Atualiza o carrinho na página
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinho');
    const totalContainer = document.getElementById('total');
    
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        totalContainer.innerText = 'Total: R$0,00';
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="cart-item-info">
                <h2>${item.nome}</h2>
                <p>R$${item.preco.toFixed(2)}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p>Subtotal: R$${(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        carrinhoContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });

    totalContainer.innerText = `Total: R$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', atualizarCarrinho);