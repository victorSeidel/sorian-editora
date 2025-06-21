async function loadProposalsTable() 
{
    try
    {
        const response = await fetch(`${API_BASE_URL}/propostas`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar propostas'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#proposal-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        const formattedData = formatTableLinks('proposal-table', data);
        
        formattedData.forEach(proposta => {
            const row = document.createElement('tr');
            row.setAttribute('data-row-id', proposta.id);

            const p = proposta.pacotePagina.Produto;
            const c = proposta.pacoteCapa.Produto;
            const d = proposta.pacotePagina.Dimensao;

            row.innerHTML = `
                <td>${proposta.id}</td>
                <td>${proposta.data.slice(0, 10)}</td>
                <td>${proposta.cliente_id_formatted || proposta.cliente.nome}</td>
                <td>${p.nome} (${p.tipo}) - ${c.nome} (${c.tipo}) - ${d.largura_min} x ${d.altura_min} a ${d.largura_max} x ${d.altura_max}</td>
                <td>${formatMoeda(proposta.preco_venda)}</td>
                <td><span class="status ${proposta.status}">${proposta.status}</span></td>
                <td>
                    <button class="btn-action edit" data-id="${proposta.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${proposta.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        setupTableActions('#proposal-table');
        loadContractsTable();
        loadProjectsTable();
        loadCustosTable();
    }
    catch (error)
    {
        showToast('Erro ao carregar propostas', 'error');
        console.error(error);
        throw error;
    }
}

async function loadContractsTable() 
{
    try
    {
        const response = await fetch(`${API_BASE_URL}/contratos`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar contratos'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#contracts-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        const formattedData = formatTableLinks('contracts-table', data);
        
        formattedData.forEach(contrato => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contrato.id}</td>
                <td>${contrato.proposta_id_formatted || contrato.proposta_id}</td>
                <td>${contrato.data.slice(0, 10)}</td>
                <td>${contrato.proposta.cliente.nome}</td>
                <td>${formatMoeda(contrato.proposta.preco_venda)}</td>
                <td>
                    <button class="btn-action delete" data-id="${contrato.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        setupTableActions('#contracts-table');
    }
    catch (error)
    {
        showToast('Erro ao carregar contratos', 'error');
        console.error(error);
        throw error;
    }
}

async function loadProjectsTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/projetos`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar projetos'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#projects-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        const formattedData = formatTableLinks('projects-table', data);
        
        formattedData.forEach(projeto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${projeto.id}</td>
                <td>${projeto.proposta_id_formatted || projeto.proposta_id}</td>
                <td>${projeto.data ? projeto.data.slice(0, 10) : ''}</td>
                <td>${projeto.ultimo_update ? projeto.ultimo_update.slice(0, 10) : ''}</td>
                <td><span class="status ${projeto.status}">${projeto.status}</span></td>
                <td>${projeto.obs}</td>
                <td>${projeto.livros_enviados}</td>
                <td>
                    <button class="btn-action edit" data-id="${projeto.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${projeto.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        setupTableActions('#projects-table');
    }
    catch (error) 
    {
        showToast('Erro ao carregar projetos', 'error');
        console.error(error);
        throw error;
    }
}

async function loadClientsTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/clientes`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar clientes'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#clients-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;
        
        data.forEach(cliente => {
            const row = document.createElement('tr');
            row.setAttribute('data-row-id', cliente.id);
            
            row.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.endereco}</td>
                <td>
                    <button class="btn-action edit" data-id="${cliente.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${cliente.id}" title="Remover"><i class="fas fa-trash"></i></button>
                    <button class="btn-action view" data-id="${cliente.id}" title="View"><i class="fas fa-eye"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        setupTableActions('#clients-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar clientes', 'error');
        console.error(error);
        throw error;
    }
}

async function loadUsersTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/usuarios`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar usuários'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#users-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;
        
        data.forEach(usuario => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${usuario.nome}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.email}</td>
                <td>${usuario.tipo}</td>
                <td>
                    <button class="btn-action edit" data-id="${usuario.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${usuario.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        setupTableActions('#users-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar usuários', 'error');
        console.error(error);
        throw error;
    }
}

async function loadDimensionsTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/dimensoes`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar dimensões'); }
        
        const data = await response.json();
        const tableBody = document.querySelector('#dimensoes-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;
        
        data.forEach(dimensao => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${dimensao.largura_min}</td>
                <td>${dimensao.largura_max}</td>
                <td>${dimensao.altura_min}</td>
                <td>${dimensao.altura_max}</td>
                <td>
                    <button class="btn-action edit" data-id="${dimensao.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${dimensao.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        setupTableActions('#dimensoes-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar dimensões', 'error');
        console.error(error);
        throw error;
    }
}

async function loadTaxasTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/taxas`, { credentials: 'include' });
        
        if (!response.ok) { throw new Error('Erro ao carregar taxas'); }
        
        const taxa = await response.json();

        const tableBody = document.querySelector('#taxas-table tbody');
        tableBody.innerHTML = '';

        if (!taxa) return;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatMoeda(taxa.custo_editorial)}</td>
            <td>${taxa.cartao} %</td>
            <td>${taxa.imposto} %</td>
            <td>
                <button class="btn-action edit" data-id="${1}" title="Editar"><i class="fas fa-edit"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        setupTableActions('#taxas-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar taxas', 'error');
        console.error(error);
        throw error;
    }
}

async function loadProdutosTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/produtos`, { credentials: 'include' });
        
        if (!response.ok) { return; }
        
        const data = await response.json();
        const tableBody = document.querySelector('#produtos-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        data.forEach(produto => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.tipo}</td>
                <td>${produto.classe}</td>
                <td>
                    <button class="btn-action edit" data-id="${produto.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${produto.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        setupTableActions('#produtos-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar usuários', 'error');
        console.error(error);
        throw error;
    }
}

async function loadPlanosTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/planos`, { credentials: 'include' });
        
        if (!response.ok) { return; }
        
        const data = await response.json();
        const tableBody = document.querySelector('#planos-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        data.forEach(plano => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${plano.nome}</td>
                <td>${plano.quantidade_autor}</td>
                <td>${formatMoeda(plano.lucro)}</td>
                <td>
                    <button class="btn-action edit" data-id="${plano.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${plano.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        setupTableActions('#planos-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar usuários', 'error');
        console.error(error);
        throw error;
    }
}

async function loadPacotesTable() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/pacotes`, { credentials: 'include' });
        
        if (!response.ok) { return; }
        
        const data = await response.json();
        const tableBody = document.querySelector('#pacotes-table tbody');
        tableBody.innerHTML = '';

        if (!data) return;

        data.forEach(pacote => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${pacote.Produto.nome} (${pacote.Produto.tipo})</td>
                <td>${pacote.Dimensao.largura_min} x ${pacote.Dimensao.altura_min} a ${pacote.Dimensao.largura_max} x ${pacote.Dimensao.altura_max}</td>
                <td>${pacote.quantidade_minima} a ${pacote.quantidade_maxima}</td>
                <td>${formatMoeda3(pacote.preco)}</td>
                <td>
                    <button class="btn-action edit" data-id="${pacote.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${pacote.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        setupTableActions('#pacotes-table');
    } 
    catch (error) 
    {
        showToast('Erro ao carregar pacotes', 'error');
        console.error(error);
        throw error;
    }
}

async function loadCustosTable() 
{
    try 
    {
        const responsePropostas  = await fetch(`${API_BASE_URL}/financeiro/propostas`,  { credentials: 'include' });
        const responseCustos     = await fetch(`${API_BASE_URL}/financeiro/custos`,  { credentials: 'include' });
        const responseReceber    = await fetch(`${API_BASE_URL}/financeiro/receber`, { credentials: 'include' });
        const responsePagar      = await fetch(`${API_BASE_URL}/financeiro/pagar`,   { credentials: 'include' });
        
        if (!responsePropostas || !responseCustos.ok || !responseReceber.ok || !responsePagar.ok) { throw new Error('Erro ao carregar custos'); }
        
        const dataPropostas = await responsePropostas.json();
        const dataCustos    = await responseCustos.json();
        const dataReceber   = await responseReceber.json();
        const dataPagar     = await responsePagar.json();

        const propostasTableBody  = document.querySelector('#custos-propostas-table tbody');
        const custosTableBody     = document.querySelector('#custos-table tbody');
        const receberTableBody    = document.querySelector('#receber-table tbody');
        const pagarTableBody      = document.querySelector('#pagar-table tbody');

        propostasTableBody.innerHTML = '';
        custosTableBody.innerHTML    = '';
        receberTableBody.innerHTML   = '';
        pagarTableBody.innerHTML     = '';

        const formattedPropostasData = formatTableLinks('custos-propostas-table', dataPropostas);
        formattedPropostasData.forEach(custo => 
        {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${custo.proposta_id_formatted || custo.proposta_id}</td>
                <td>${custo.metodo_pagamento || ''}</td>
                <td>${custo.parcelas}</td>
                <td>${formatMoeda(custo.entrada)}</td>
                <td>${formatMoeda(custo.pago)}</td>
                <td>${formatMoeda(custo.pagar)}</td>
                <td>
                    <button class="btn-action edit" data-id="${custo.id}" title="Editar"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete" data-id="${custo.id}" title="Remover"><i class="fas fa-trash"></i></button>
                </td>
            `;

            propostasTableBody.appendChild(row);
        });

        dataCustos.forEach(custo => 
        {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${formatMoeda(custo.valor)}</td>
                <td><button class="btn-action delete" data-id="${custo.id}" title="Remover"><i class="fas fa-trash"></i></button></td>
            `;

            custosTableBody.appendChild(row);
        });

        dataReceber.forEach(custo => 
        {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${formatMoeda(custo.valor)}</td>
                <td><button class="btn-action delete" data-id="${custo.id}" title="Remover"><i class="fas fa-trash"></i></button></td>
            `;

            receberTableBody.appendChild(row);
        });

        dataPagar.forEach(custo => 
        {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${formatMoeda(custo.valor)}</td>
                <td><button class="btn-action delete" data-id="${custo.id}" title="Remover"><i class="fas fa-trash"></i></button></td>
            `;

            pagarTableBody.appendChild(row);
        });

        setupTableActions('#custos-propostas-table');
        setupTableActions('#custos-table');
        setupTableActions('#receber-table');
        setupTableActions('#pagar-table');
        loadStats();
    } 
    catch (error) 
    {
        showToast('Erro ao carregar custos', 'error');
        console.error(error);
        throw error;
    }
}

const formatMoeda  = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
const formatMoeda3 = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(valor);

function showToast(message, type, duration = 3000) 
{
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => { toast.style.opacity = '1'; }, 10);
    
    setTimeout(() => 
    {
        toast.style.opacity = '0';
        setTimeout(() => { document.body.removeChild(toast); }, 300);
    }, duration);
}