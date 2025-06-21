document.addEventListener('DOMContentLoaded', async function() { setEventListeners(); });

function setEventListeners()
{
    document.getElementById('add-proposal-btn').addEventListener('click', () => showAddModal('Proposta'));
    document.getElementById('add-plano-btn').addEventListener('click', () => showAddModal('Plano'));
    document.getElementById('add-dimensao-btn').addEventListener('click', () => showAddModal('Dimensão'));
    document.getElementById('add-produto-btn').addEventListener('click', () => showAddModal('Produto'));
    document.getElementById('add-pacote-btn').addEventListener('click', () => showAddModal('Pacote'));
    document.getElementById('add-cliente-btn').addEventListener('click', () => showAddModal('Cliente'));
    document.getElementById('add-usuario-btn').addEventListener('click', () => showAddModal('Usuário'));

    document.getElementById('add-custo-btn').addEventListener('click', () => showAddModal('Custo', 'Custo'));
    document.getElementById('add-receber-btn').addEventListener('click', () => showAddModal('Custo', 'Receber'));
    document.getElementById('add-pagar-btn').addEventListener('click', () => showAddModal('Custo', 'Pagar'));
}

let produtosSelecionados = [];
function showAddModal(model, subModel = null) 
{
    const modalOverlay = document.getElementById('addModal');
    const modalTitle = document.getElementById('modalAddTitle');
    const addForm = document.getElementById('addForm');
    const modalFooter = document.getElementById('modal-footer');

    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    modalTitle.textContent = `Adicionar ${model}`;
    addForm.innerHTML = '';
    modalFooter.style.display = 'flex';
    
    switch(model) 
    {
        case 'Proposta':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Cliente</label>
                    <select name="cliente_id" id="clienteSelect" required></select> 
                </div>
                <div class="form-group" style="display:flex; flex-direction:row; width:100%; gap:10px">
                    <div style="flex:1; width:100%">
                        <label>Páginas PB</label>
                        <input type="number" name="paginas" required>
                    </div>
                    <div style="flex:1; width:100%">
                        <label>Páginas Coloridas</label>
                        <input type="number" name="paginas_coloridas" required> 
                    </div>
                </div>
                <div class="form-group" style="display:flex; flex-direction:row; width:100%; gap:10px">
                    <div style="flex:1; width:100%">
                        <label>Dimensões</label>
                        <select name="dimensao_id" id="dimensaoSelect" required></select> 
                    </div>
                    <div style="flex:1; width:100%">
                        <label>Plano</label>
                        <select name="plano_id" id="planoSelect" required></select> 
                    </div>
                </div>
                <div class="form-group">
                    <label>Produtos</label>
                    <select name="produto_id" id="produtoSelect" required></select>
                    <div id="listaProdutos" style="margin-top: 10px;"></div>
                    <input type="hidden" name="pacote_pagina_id" id="pacote_pagina_id">
                    <input type="hidden" name="pacote_capa_id"   id="pacote_capa_id">
                </div>
                <div class="form-group">
                    <label>Preço de Venda</label>
                    <div style="display:flex; flex-direction:row; width:100%; gap:5px">
                        <input name="preco" type="text" step="0.001" readonly required></input>
                        <button class="calc-btn" id="btn-calcular" type="button">Calcular</button>
                    </div>
                </div>
            `;

            fetch(`${API_BASE_URL}/clientes`).then(response => response.json()).then(clientes => 
            {
                const select = document.getElementById('clienteSelect');
                select.innerHTML = '<option value="">Selecione um cliente</option>';
                clientes.forEach(c => 
                {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = `${c.nome}`;
                    select.appendChild(opt);
                });
            }).catch(error => { console.error('Erro ao carregar clientes: ', error); });

            fetch(`${API_BASE_URL}/planos`).then(response => response.json()).then(planos => 
            {
                const select = document.getElementById('planoSelect');
                select.innerHTML = '<option value="">Selecione um plano</option>';
                planos.forEach(p => 
                {
                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = `${p.nome} - ${p.quantidade_autor} livros`;
                    select.appendChild(opt);
                });
            }).catch(error => { console.error('Erro ao carregar planos: ', error); });

            fetch(`${API_BASE_URL}/dimensoes`).then(response => response.json()).then(dimensoes => 
            {
                const select = document.getElementById('dimensaoSelect');
                select.innerHTML = '<option value="">Selecione uma dimensão</option>';
                dimensoes.forEach(d => 
                {
                    const opt = document.createElement('option');
                    opt.value = d.id;
                    opt.textContent = `${d.largura_min} x ${d.altura_min} a ${d.largura_max} x ${d.altura_max}`;
                    select.appendChild(opt);
                });
            }).catch(error => { console.error('Erro ao carregar dimensões: ', error); });

            fetch(`${API_BASE_URL}/produtos`).then(response => response.json()).then(produtos => 
            {
                const select = document.getElementById('produtoSelect');
                select.innerHTML = '<option value="">Selecione um produto</option>';
                produtos.forEach(p => 
                {
                    if (p.tipo === 'COLOR') return;

                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = `${p.classe} - ${p.nome}`;
                    select.appendChild(opt);
                });
            }).catch(error => { console.error('Erro ao carregar produtos :', error); });

            function atualizarListaProdutos() 
            {
                const listaProdutos = document.getElementById('listaProdutos');
                listaProdutos.innerHTML = '';
                
                produtosSelecionados.forEach((produto, index) => 
                {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.style.display = 'flex';
                    produtoDiv.style.justifyContent = 'space-between';
                    produtoDiv.style.alignItems = 'center';
                    produtoDiv.style.padding = '8px';
                    produtoDiv.style.backgroundColor = '#f5f5f5';
                    produtoDiv.style.marginBottom = '5px';
                    produtoDiv.style.borderRadius = '4px';
                    
                    produtoDiv.innerHTML = `
                        <span>${produto.classe} - ${produto.nome}</span>
                        <button type="button" class="btn-remover" data-index="${index}"><i class="fa fa-trash"></i></button>
                    `;
                    
                    listaProdutos.appendChild(produtoDiv);
                });

                document.querySelectorAll('.btn-remover').forEach(button => 
                {
                    button.addEventListener('click', function() 
                    {
                        const index = parseInt(this.getAttribute('data-index'));
                        produtosSelecionados.splice(index, 1);
                        atualizarListaProdutos();
                    });
                });
            }

            const produtoSelect = document.getElementById('produtoSelect');
            produtoSelect.addEventListener('change', function() 
            {
                const selectedOption = produtoSelect.options[produtoSelect.selectedIndex];

                if (produtosSelecionados.length == 2) { showToast('Você só pode adicionar um tipo de folha e um tipo de capa', 'error'); return; }
                
                const produtoJaAdicionado = produtosSelecionados.some(p => p.id === selectedOption.value);
                    
                if (produtoJaAdicionado) { showToast('Este produto já foi adicionado', 'error'); return; }

                fetch(`${API_BASE_URL}/produtos/${selectedOption.value}`).then(r => r.json()).then(produto => 
                {
                    const classeJaAdicionada = produtosSelecionados.some(p => p.classe === produto.classe);
                    if (classeJaAdicionada) { showToast(`Você já adicionou um tipo de ${produto.classe}`, 'error'); return; }

                    produtosSelecionados.push({ id: produto.id, nome: produto.nome, tipo: produto.tipo, classe: produto.classe });

                    atualizarListaProdutos();
                    produtoSelect.selectedIndex = 0;
                });
            });

            document.getElementById('btn-calcular').addEventListener('click', async function() { await calcularPrecoVenda(); });
            break;

        case 'Plano':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" maxlength="30" name="nome" required>
                </div>
                <div class="form-group">
                    <label>Quantidade do Autor</label>
                    <input type="number" name="quantidade_autor" required>
                </div>
                <div class="form-group">
                    <label>Lucro</label>
                    <input type="number" step="0.001" name="lucro" required>
                </div>
            `;
            break;

        case 'Dimensão':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Largura Mínima</label>
                    <input type="number" step="0.01" name="largura_min" required>
                </div>
                <div class="form-group">
                    <label>Largura Máxima</label>
                    <input type="number" step="0.01" name="largura_max" required>
                </div>
                <div class="form-group">
                    <label>Altura Mínima</label>
                    <input type="number" step="0.01" name="altura_min" required>
                </div>
                <div class="form-group">
                    <label>Altura Máxima</label>
                    <input type="number" step="0.01" name="altura_max" required>
                </div>
            `;
            break;
            
        case 'Produto':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Nome do Produto</label>
                    <input type="text" name="nome" maxlength="100" required>
                </div>
                <div class="form-group">
                    <label>Tipo</label>
                    <select name="tipo" id="tipoSelect" required></select>
                </div>
                <div class="form-group">
                    <label>Categoria</label>
                    <select name="categoria" id="categoriaSelect" required></select>
                </div>
            `;
            Promise.all([
                fetch('/api/diversos/tipos').then(res => res.json()),
                fetch('/api/diversos/categorias').then(res => res.json()),
            ]).then(([tipos, categorias]) => 
            {
                const tipoSelect      = addForm.querySelector('[name="tipo"]');
                const categoriaSelect = addForm.querySelector('[name="categoria"]');
                
                tipoSelect.innerHTML = '<option value="">Selecione um tipo</option>';
                tipos.forEach(tipo => 
                {
                    const option = document.createElement('option');
                    option.value = tipo.nome;
                    option.textContent = `${tipo.nome}`;
                    tipoSelect.appendChild(option);
                });

                categoriaSelect.innerHTML = '<option value="">Selecione uma categoria</option>';
                categorias.forEach(categoria => 
                {
                    const option = document.createElement('option');
                    option.value = categoria.nome;
                    option.textContent = `${categoria.nome}`;
                    categoriaSelect.appendChild(option);
                });
            });
            break;
           
        case 'Cliente':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Nome Completo</label>
                    <input type="text" name="nome" maxlength="50" required>
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" name="email" maxlength="100" required>
                </div>
                <div class="form-group">
                    <label>Telefone</label>
                    <input type="text" name="telefone" maxlength="20" required>
                </div>
                <div class="form-group">
                    <label>Endereço</label>
                    <input type="text" name="endereco" maxlength="255" required>
                </div>
            `;
            break;
        
        case 'Usuário':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Nome Completo</label>
                    <input type="text" name="nome" maxlength="30" required>
                </div>
                <div class="form-group">
                    <label>Usuário</label>
                    <input type="text" name="usuario" maxlength="20" required>
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" name="email" maxlength="100" required>
                </div>
                <div class="form-group">
                    <label>Senha</label>
                    <input type="password" name="senha" maxlength="20" required>
                </div>
                <div class="form-group">
                    <label>Tipo</label>
                    <select name="tipo" required>
                        <option value="">Selecione um perfil</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Projetos">Projetos</option>
                        <option value="Suporte">Suporte</option>
                    </select>
                </div>
            `;
            break;

        case 'Plano':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Nome do Plano</label>
                    <input type="text" name="nome" maxlength="30" required>
                </div>
                <div class="form-group">
                    <label>Quantidade de Livros</label>
                    <input type="number" name="quantidade_autor" required>
                </div>
            `;
            break;
        
        case 'Pacote':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Produto</label>
                    <select name="produto_id" id="produtoSelect" required></select> 
                </div>
                <div class="form-group">
                    <label>Dimensões</label>
                    <select name="dimensao_id" id="dimensaoSelect" required></select>
                </div>
                <div class="form-group" style="display:flex; flex-direction:row; width:100%; gap:10px">
                    <div style="flex:1; width:100%">
                        <label>Quantidade Mínima</label>
                        <input type="number" name="quantidade_minima" required>  
                    </div>
                    <div style="flex:1; width:100%">
                        <label>Quantidade Máxima</label>
                        <input type="number" name="quantidade_maxima" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Preço</label>
                    <input type="number" name="preco" step="0.001" required>
                </div>
            `;

            fetch(`${API_BASE_URL}/produtos`)
            .then(response => response.json())
            .then(produtos => 
            {
                const select = document.getElementById('produtoSelect');
                select.innerHTML = '<option value="">Selecione um produto</option>';
                produtos.forEach(p => 
                {
                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = `${p.nome} (${p.tipo})`;
                    select.appendChild(opt);
                });
            })
            .catch(error => { console.error('Erro ao carregar produtos:', error); });

            fetch(`${API_BASE_URL}/dimensoes`)
            .then(response => response.json())
            .then(dimensoes => 
            {
                const select = document.getElementById('dimensaoSelect');
                select.innerHTML = '<option value="">Selecione uma dimensão</option>';
                dimensoes.forEach(d => 
                {
                    const opt = document.createElement('option');
                    opt.value = d.id;
                    opt.textContent = `${d.largura_min} x ${d.altura_min} a ${d.largura_max} x ${d.altura_max}`;
                    select.appendChild(opt);
                });
            })
            .catch(error => { console.error('Erro ao carregar dimensões:', error); });
            break;

        case 'Custo':
            addForm.innerHTML = `
                <div class="form-group">
                    <label>Valor</label>
                    <input type="number" step="0.01" name="valor" required>
                </div>
            `;
    }

    const confirmarBtn = document.getElementById('confirmAddButton');
    confirmarBtn.addEventListener('click', () => 
    { 
        switch(model) 
        {
            case 'Proposta': handleAddProposta(); break;
            case 'Plano': handleAddPlano(); break;
            case 'Dimensão': handleAddDimension(); break;
            case 'Produto': handleAddProduct(); break;
            case 'Pacote': handleAddPacote(); break;
            case 'Cliente': handleAddClient(); break;
            case 'Usuário': handleAddUser(); break;
        }

        switch(subModel) 
        {
            case 'Custo': handleAddCusto('custos'); break;
            case 'Receber': handleAddCusto('receber'); break;
            case 'Pagar': handleAddCusto('pagar'); break;
        }

        modalOverlay.style.display = 'none';
    });

    closeModalButtons.forEach(btn => { btn.addEventListener('click', () => { modalOverlay.style.display = 'none'; }); });
    
    modalOverlay.style.display = 'flex';
}   

async function handleAddProposta() 
{
    await calcularPrecoVenda(); 

    const formData = new FormData(document.getElementById('addForm'));

    const preco = formData.get('preco');
    const preco_venda = parseFloat(preco.replace("R$", "").replace(/\./g, "").replace(",", ".") .trim());

    const pacote_pagina_id = formData.get('pacote_pagina_id');
    const pacote_capa_id   = formData.get('pacote_capa_id');

    if (pacote_pagina_id === '' || !pacote_capa_id === '') { showToast('Selecione um tipo de capa e página', 'error'); return; }

    const propostaData = 
    {
        cliente_id: formData.get('cliente_id'),
        paginas: formData.get('paginas'),
        paginas_coloridas: formData.get('paginas_coloridas'),
        pacote_pagina_id: pacote_pagina_id,
        pacote_capa_id: pacote_capa_id,
        plano_id: formData.get('plano_id'),
        preco_venda: preco_venda
    };
    
    fetch(`${API_BASE_URL}/propostas`, 
    {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(propostaData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadProposalsTable();
        loadContractsTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar proposta: ', error);
    });
}

async function calcularPrecoVenda() 
{
    const paginas = parseInt(document.querySelector('[name="paginas"]').value);
    const paginasColoridas = parseInt(document.querySelector('[name="paginas_coloridas"]').value);
    const dimensaoId = parseInt(document.querySelector('[name="dimensao_id"]').value);
    const planoId = parseInt(document.querySelector('[name="plano_id"]').value);
    const produtos = produtosSelecionados;

    if (!paginas || !dimensaoId || !planoId || !produtos) { showToast('Preencha todos os dados', 'error'); return; }

    const taxas = await fetch(`${API_BASE_URL}/taxas`).then(r => r.json());
    const plano = await fetch(`${API_BASE_URL}/planos/${planoId}`).then(r => r.json());

    if (!taxas || !plano) { showToast('Preencha todos os dados', 'error'); return; }

    let precoTotal = 0;
    for (let produto of produtos) 
    {
        const pacote = await fetch(`${API_BASE_URL}/pacotes/filtro/${produto.id}/${dimensaoId}/${paginas}`).then(r => r.json());
        if (!pacote) { showToast('Nenhum pacote encontrado com as especificações', 'error'); return; }

        if (produto.classe === 'Página') 
        { 
            precoTotal += parseFloat(pacote.preco * paginas); 
            document.getElementById('pacote_pagina_id').value = pacote.id;

            if (paginasColoridas > 0)
            {
                const pacoteColor = await fetch(`${API_BASE_URL}/pacotes/filtro/color/${produto.id}/${dimensaoId}/${paginasColoridas}`).then(r => r.json());
                precoTotal += parseFloat(pacoteColor.preco * paginasColoridas);   
            }
        }
        if (produto.classe === 'Capa')   { precoTotal += parseFloat(pacote.preco);           document.getElementById('pacote_capa_id').value   = pacote.id }
    }

    const lucro = parseFloat(plano.lucro);
    const custoEditorial = parseFloat(taxas.custo_editorial);
    const cartao = parseFloat(taxas.cartao / 100);
    const imposto = parseFloat(taxas.imposto / 100);
    const precoVenda = (((precoTotal * plano.quantidade_autor) + custoEditorial) + lucro);
    const precoTaxa = (precoVenda * cartao) * imposto;
    const precoFinal = precoVenda + precoTaxa + 0.01;

    document.querySelector('[name="preco"]').value = formatMoeda(precoFinal);
}

function handleAddPlano() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const planoData = 
    {
        nome: formData.get('nome'),
        quantidade_autor: formData.get('quantidade_autor'),
        lucro: formData.get('lucro')
    };
    
    fetch(`${API_BASE_URL}/planos`, 
    {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(planoData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadPlanosTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar plano:', error);
    });
}

function handleAddDimension() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const dimensionData = 
    {
        largura_min: formData.get('largura_min'),
        largura_max: formData.get('largura_max'),
        altura_min: formData.get('altura_min'),
        altura_max: formData.get('altura_max')
    };
    
    fetch('/api/dimensoes', 
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dimensionData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadDimensionsTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar dimensão:', error);
    });
}

function handleAddProduct() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const productData = 
    {
        nome: formData.get('nome'),
        tipo: formData.get('tipo'),
        classe: formData.get('categoria')
    };
    
    fetch(`${API_BASE_URL}/produtos`, 
    {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadProdutosTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar produto: ', error);
    });
}

function handleAddPacote() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const pacoteData = 
    {
        produto_id: formData.get('produto_id'),
        dimensao_id: formData.get('dimensao_id'),
        quantidade_minima: formData.get('quantidade_minima'),
        quantidade_maxima: formData.get('quantidade_maxima'),
        preco: formData.get('preco')
    };
    
    fetch(`${API_BASE_URL}/pacotes`, 
    {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacoteData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadPacotesTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar pacote:', error);
    });
}

function handleAddClient() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const userData = 
    {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco')
    };
    
    fetch(`${API_BASE_URL}/clientes`, 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadClientsTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar cliente:', error);
    });
}

function handleAddUser() 
{
    const formData = new FormData(document.getElementById('addForm'));
    const userData = 
    {
        nome: formData.get('nome'),
        usuario: formData.get('usuario'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        tipo: formData.get('tipo')
    };
    
    fetch(`${API_BASE_URL}/usuarios`, 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadUsersTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar usuário:', error);
    });
}

function handleAddCusto(url) 
{
    const formData = new FormData(document.getElementById('addForm'));
    const custoData = { valor: formData.get('valor') };
    
    fetch(`${API_BASE_URL}/financeiro/${url}`, 
    {
        method: 'POST',
        headers:  { 'Content-Type': 'application/json' },
        body: JSON.stringify(custoData)
    })
    .then(response => response.json())
    .then(data => 
    {
        showToast("Sucesso!", 'success');
        loadCustosTable();
    })
    .catch(error => 
    {
        showToast("Error: " + error, 'error');
        console.error('Erro ao adicionar custo: ', error);
    });
}
