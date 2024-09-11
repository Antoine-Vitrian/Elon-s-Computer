// Adiciona o produto ao carrinho
function adicionarAoCarrinho(nome, preco) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const notificacoes = document.getElementById('notiicacao-log');
    
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
    notificacao.textcontent = `${nome} foi adicionado ao carrinho!`;
    notificacao.style.color = 'white';
    notificacoes.appendChild(notificacao);

    atualizarNotificacao(true);
}

function atualizarNotificacao(state) {
    let unread = state;
    const notificacao = document.getElementById('notify');
    const notificacaoLog = document.getElementById('notificacao-log');

    if(unread = true) {
        notificacao.style.display = 'block';
        return;
    } else if (unread = false) {
        notificacao.style.display = 'none';
        
        notificacaoLog.style.height = '20vh';
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
        carrinhoContainer.innerHTML = '<p>Valor de preço inválido</p>';
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

function ordenar() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoContainer = document.getElementById('carrinho');
    const opcao = document.getElementById('tipos-ordem').value;

    carrinhoContainer.innerHTML = '';

    switch(opcao) {
        case 'crescente': 
            carrinho.sort((a,b) => a.preco - b.preco);
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
            });
            break;
        case 'decrescente':
            carrinho.sort((a, b) => b.preco - a.preco);
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
            });
            break;
        case 'alfabetica':
            carrinho.sort((a, b) => a.nome.localeCompare(b.nome));
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
            });
            break;
        case 'alfabetica-r':
            carrinho.sort((a, b) => a.nome.localeCompare(b.nome));
            carrinho.reverse();
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
            });
            break;
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