//const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = 'https://sorian-editora.onrender.com/api';

function setupTableActions(tableId) 
{
    const table = document.querySelector(tableId);
    
    table.addEventListener('click', async function(e) 
    {
        const btn = e.target.closest('.btn-action');
        if (!btn) return;
        
        const id = btn.dataset.id;
        const action = btn.classList.contains('view') ? 'view' :
                       btn.classList.contains('edit') ? 'edit' :
                       btn.classList.contains('delete') ? 'delete' : null;
        
        if (!action) return;
        
        try 
        {
            switch (action) 
            {
                case 'edit':
                    await editItem(tableId, id);
                    break;
                case 'delete':
                    await deleteItem(tableId, id);
                    break;
                case 'view':
                    await viewItem(tableId, id);
                    break;
            }
        } 
        catch (error) 
        {
            console.error(`Erro ao executar ação ${action}:`, error);
            showToast(`Erro ao ${action} item. Tente novamente.`, 'error');
        }
    });
}

async function editItem(tableId, id)
{
    if (!tableId || !id) { showToast('Parâmetros inválidos para edição', 'error'); return; }

    const tableConfig = 
    {
        '#proposal-table': 
        {
            endpoint: `${API_BASE_URL}/propostas/${id}`,
            title: 'Editar Proposta',
            fields: 
            [
                { name: 'status', label: 'Status', type: 'select', required: true,  
                    options: [
                        { value: 'Pendente',  label: 'Pendente' },
                        { value: 'Enviada',   label: 'Enviada' },
                        { value: 'Rejeitada', label: 'Rejeitada' },
                        { value: 'Aceita',    label: 'Aceita' }
                    ]
                },
            ],
            loader: loadProposalsTable
        },
        '#projects-table': 
        {
            endpoint: `${API_BASE_URL}/projetos/${id}`,
            title: 'Editar Projeto',
            fields: 
            [
                { name: 'status', label: 'Status', type: 'select', required: true,  
                    options: [
                        { value: 'Iniciado', label: 'Iniciado' },
                        { value: 'Em andamento', label: 'Em andamento' },
                        { value: 'Aguardando aprovação final do autor', label: 'Aguardando aprovação final do autor' },
                        { value: 'Finalizado', label: 'Finalizado' }
                    ]
                },
                { name: 'obs', label: 'Observações', type: 'textarea' },
                { name: 'livros_enviados', label: 'Livros Enviados', type: 'number' },
            ],
            loader: loadProjectsTable
        },
        '#clients-table': 
        {
            endpoint: `${API_BASE_URL}/clientes/${id}`,
            title: 'Editar Cliente',
            fields: 
            [
                { name: 'nome', label: 'Nome', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'telefone', label: 'Telefone', type: 'text', required: true },
                { name: 'endereco', label: 'Endereço', type: 'text', required: true }
            ],
            loader: loadClientsTable
        },
        '#users-table': 
        {
            endpoint: `${API_BASE_URL}/usuarios/${id}`,
            title: 'Editar Usuário',
            fields: 
            [
                { name: 'nome', label: 'Nome', type: 'text', required: true },
                { name: 'usuario', label: 'Usuário', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'tipo', label: 'Tipo', type: 'select', required: true,  
                    options: [
                        { value: 'Administrador', label: 'Administrador' },
                        { value: 'Financeiro',    label: 'Financeiro' },
                        { value: 'Projetos',      label: 'Projetos' },
                        { value: 'Suporte',       label: 'Suporte' }
                    ]
                },
            ],
            loader: loadUsersTable
        },
        '#dimensoes-table': 
        {
            endpoint: `${API_BASE_URL}/dimensoes/${id}`,
            title: 'Editar Dimensão',
            fields: 
            [
                { name: 'largura_min', label: 'Largura Mínima', type: 'number', required: true },
                { name: 'largura_max', label: 'Largura Máxima', type: 'number', required: true },
                { name: 'altura_min', label: 'Altura Mínima', type: 'number', required: true },
                { name: 'altura_max', label: 'Altura Máxima', type: 'number', required: true }
            ],
            loader: loadDimensionsTable
        },
        '#taxas-table': 
        {
            endpoint: `${API_BASE_URL}/taxas`,
            title: 'Editar Taxas',
            fields: 
            [
                { name: 'custo_editorial', label: 'Custo Editorial', type: 'number', required: true },
                { name: 'cartao', label: 'Cartão', type: 'number', required: true },
                { name: 'imposto', label: 'Imposto', type: 'number', required: true }
            ],
            loader: loadTaxasTable
        },
        '#planos-table': 
        {
            endpoint: `${API_BASE_URL}/planos/${id}`,
            title: 'Editar Taxas',
            fields: 
            [
                { name: 'nome', label: 'Nome', type: 'text', required: true },
                { name: 'quantidade_autor', label: 'Quantidade do Autor', type: 'number', required: true },
                { name: 'lucro', label: 'Lucro', type: 'number', required: true }
            ],
            loader: loadPlanosTable
        },

        '#custos-propostas-table': 
        {
            endpoint: `${API_BASE_URL}/financeiro/propostas/${id}`,
            title: 'Editar Proposta',
            fields: 
            [
                { name: 'metodo_pagamento', label: 'Método de Pagamento', type: 'select', required: true, showIf: { field: 'parcelas', equals: '' },
                    options: [
                        { value: 'PIX', label: 'PIX' },
                        { value: 'Boleto', label: 'Boleto' },
                        { value: 'Crédito', label: 'Crédito' },
                        { value: 'Débito', label: 'Débito' },
                        { value: 'Dinheiro', label: 'Dinheiro' },
                        { value: 'Transferência Bancária', label: 'Transferência Bancária' },
                        { value: 'PayPal', label: 'PayPal' }
                    ]
                },
                { name: 'parcelas', label: 'Parcelas', type: 'number', required: true, showIf: { field: 'parcelas', equals: 0 } },
                { name: 'entrada', label: 'Entrada', type: 'number', required: true, showIf: { field: 'entrada', equals: 0 } },
                { name: 'parcelas_pagas', label: 'Parcelas Pagas', type: 'number', required: true },
            ],
            loader: loadCustosTable
        },
    }

    const config = tableConfig[tableId];
    if (!config) { showToast('Ação não suportada para esta tabela', 'error'); return; }

    try 
    {
        const response = await fetch(config.endpoint, { credentials: 'include' });
        
        if (!response.ok) throw new Error('Erro ao carregar dados para edição');
        
        let existingData = await response.json();
        if (existingData.data && typeof existingData.data === 'object' && !Array.isArray(existingData.data) === false) existingData = existingData.data;
        
        if (config.preProcess) existingData = config.preProcess(existingData);

        const result = await showEditModal({
            title: config.title,
            fields: config.fields,
            values: existingData
        });
        
        if (!result) return;
        
        const dataToSend = config.postProcess ? config.postProcess({ ...result }) : { ...result };
        
        const updateResponse = await fetch(config.endpoint, 
        {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        
        document.getElementById('addModal').style.display = 'none';

        if (!updateResponse.ok) 
        {
            const errorData = await updateResponse.json().catch(() => ({}));
            throw new Error(errorData.message || 'Erro ao atualizar item');
        }
        
        showToast('Item atualizado com sucesso!', 'success');
        
        if (config.loader) await config.loader();
    } 
    catch (error) 
    {
        console.error(`Erro ao editar item da tabela ${tableId}:`, error);
        showToast(error.message || 'Erro ao editar item', 'error');
    }
}

async function showEditModal({ title, fields, values }) 
{
    return new Promise((resolve) => 
    {
        const modal = document.getElementById('addModal');
        const modalTitle = document.getElementById('modalAddTitle');
        const modalForm = document.getElementById('addForm');
        const modalFooter = document.getElementById('modal-footer');
        const confirmButton = document.getElementById('confirmAddButton');
        const cancelButton = document.getElementById('cancelAddButton');
        
        modal.style.display = 'flex';
        modalForm.innerHTML = '';
        modalFooter.style.display = 'flex';
        
        modalTitle.textContent = title;
        
        fields.forEach(field => 
        {
            let shouldDisable = false;
            if (field.showIf) { const compareValue = values[field.showIf.field]; if (compareValue !== field.showIf.equals) shouldDisable = true; }

            const div = document.createElement('div');
            div.className = 'form-group';
            
            const label = document.createElement('label');
            label.textContent = field.label;
            label.htmlFor = field.name;
            div.appendChild(label);
            
            let input;
            
            if (field.type === 'select') 
            {
                input = document.createElement('select');
                input.id = field.name;
                input.name = field.name;
                input.required = field.required || false;
                
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option.value;
                    opt.textContent = option.label;
                    if (values[field.name] === option.value) { opt.selected = true; input.value = opt.value; }
                    input.appendChild(opt);
                });
            } 
            else if (field.type === 'textarea') 
            {
                input = document.createElement('textarea');
                input.id = field.name;
                input.name = field.name;
                input.required = field.required || false;
                input.rows = 3;
                const getNestedValue = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj);
                input.value = getNestedValue(values, field.name) ?? '';
            } 
            else 
            {
                input = document.createElement('input');
                input.type = field.type;
                input.id = field.name;
                input.name = field.name;
                input.required = field.required || false;
                input.step = 0.001;
                const getNestedValue = (obj, path) => path.split('.').reduce((o, key) => o?.[key], obj);
                input.value = getNestedValue(values, field.name) ?? '';
                
                if (field.min !== undefined) input.min = field.min;
                if (field.max !== undefined) input.max = field.max;
            }

            if (shouldDisable) input.disabled = true;
            
            div.appendChild(input);
            modalForm.appendChild(div);
        });
        
        modal.classList.add('active');
        
        const firstInput = modalForm.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
        
        const closeModal = () => { modal.classList.remove('active'); };
        
        confirmButton.onclick = () => 
        {
            if (modalForm.checkValidity()) 
            {
                const result = {};
                fields.forEach(field => 
                {
                    const input = modalForm.querySelector(`[name="${field.name}"]`);
                    const setNestedValue = (obj, path, value) =>
                    {
                        const keys = path.split('.');
                        let current = obj;
                        keys.forEach((key, index) => 
                        {
                            if (index === keys.length - 1) current[key] = value;
                            else { if (!current[key]) current[key] = {}; current = current[key]; }
                        });
                    };
                    if (input) setNestedValue(result, field.name, input.type === 'number' ? parseFloat(input.value) || null : input.value);
                });
                
                closeModal();
                resolve(result);
            } 
            else 
            {
                modalForm.reportValidity();
            }
        };
        
        cancelButton.onclick = () => { modal.style.display = 'none'; resolve(null); };
    });
}

async function deleteItem(tableId, id) 
{
    const tableConfigs = 
    {
        '#dimensoes-table': {
            endpoint: (id) => `${API_BASE_URL}/dimensoes/${id}`,
            message: 'Dimensão removida com sucesso!',
            reload: loadDimensionsTable
        },
        '#contracts-table': {
            endpoint: (id) => `${API_BASE_URL}/contratos/${id}`,
            message: 'Contrato removido com sucesso!',
            reload: loadContractsTable
        },
        '#projects-table': {
            endpoint: (id) => `${API_BASE_URL}/projetos/${id}`,
            message: 'Projeto removido com sucesso!',
            reload: loadProjectsTable
        },
        '#proposal-table': {
            endpoint: (id) => `${API_BASE_URL}/propostas/${id}`,
            message: 'Proposta removida com sucesso!',
            reload: loadProposalsTable
        },
        '#produtos-table': {
            endpoint: (id) => `${API_BASE_URL}/produtos/${id}`,
            message: 'Produto removido com sucesso!',
            reload: loadProdutosTable
        },
        '#planos-table': {
            endpoint: (id) => `${API_BASE_URL}/planos/${id}`,
            message: 'Plano removido com sucesso!',
            reload: loadPlanosTable
        },
        '#taxas-table': {
            endpoint: (id) => `${API_BASE_URL}/taxas/${id}`,
            message: 'Taxa removida com sucesso!',
            reload: loadTaxasTable
        },
        '#clients-table': {
            endpoint: (id) => `${API_BASE_URL}/clientes/${id}`,
            message: 'Cliente removido com sucesso!',
            reload: loadClientsTable
        },
        '#users-table': {
            endpoint: (id) => `${API_BASE_URL}/usuarios/${id}`,
            message: 'Usuário removido com sucesso!',
            reload: loadUsersTable
        },
        '#custos-propostas-table': {
            endpoint: (id) => `${API_BASE_URL}/financeiro/propostas/${id}`,
            message: 'Proposta removida com sucesso!',
            reload: loadCustosTable
        },
        '#custos-table': {
            endpoint: (id) => `${API_BASE_URL}/financeiro/custos/${id}`,
            message: 'Custo removido com sucesso!',
            reload: loadCustosTable
        },
        '#receber-table': {
            endpoint: (id) => `${API_BASE_URL}/financeiro/receber/${id}`,
            message: 'Conta removida com sucesso!',
            reload: loadCustosTable
        },
        '#pagar-table': {
            endpoint: (id) => `${API_BASE_URL}/financeiro/pagar/${id}`,
            message: 'Conta removida com sucesso!',
            reload: loadCustosTable
        }
    };

    const config = tableConfigs[tableId];

    if (!config) 
    {
        showToast('Ação não suportada para esta tabela', 'error');
        return;
    }

    const confirm = await showConfirmModal('Tem certeza que deseja realizar esta ação?');
    if (!confirm) return;

    try 
    {
        await fetch(config.endpoint(id), 
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (config.reload) await config.reload();

        showToast(config.message, 'success');
    } 
    catch (error) 
    {
        console.error(error);
        showToast('Erro ao remover item', 'error');
    }

    document.getElementById('addModal').style.display = 'none';
}

async function viewItem(tableId, id) 
{

    const modal = document.getElementById('addModal');
    const modalTitle = document.getElementById('modalAddTitle');
    const modalForm = document.getElementById('addForm');
    const modalFooter = document.getElementById('modal-footer');

    const cancelButton = document.getElementById('cancelAddButton');
    cancelButton.onclick = () => { modal.style.display = 'none'; }
    
    modal.style.display = 'flex';
    modalForm.innerHTML = '';
    modalFooter.style.display = 'none';

    const tableConfigs = 
    {
        '#clients-table': {
            endpoint: (id) => `${API_BASE_URL}/clientes/${id}`,
            title: 'Detalhes do Cliente',
            fields: [
                { name: 'nome', label: 'Nome', type: 'text' },
            ],
            relatedEndpoints: [
            {
                endpoint: (id) => `${API_BASE_URL}/propostas?clienteId=${id}`,
                title: 'Propostas Relacionadas',
                fields: [
                    { name: 'proposal-table', label: 'Table', type: 'hidden' },
                    { name: 'id', label: 'ID', type: 'text' },
                    { name: 'plano.nome', label: 'Plano', type: 'text' },
                    { name: 'data', label: 'Data', type: 'date' },
                    { name: 'status', label: 'Status', type: 'text' },
                    { name: 'preco_venda', label: 'Valor', type: 'currency' }
                ],
            }]
        },
    };

    const config = tableConfigs[tableId];

    if (!config) { showToast('Ação não suportada para esta tabela', 'error'); return; }

    try 
    {
        const response = await fetch(config.endpoint(id), { credentials: 'include' });
        
        if (!response.ok) throw new Error('Erro ao carregar dados para visualização');
        
        let itemData = await response.json();
        if (itemData.data && typeof itemData.data === 'object' && !Array.isArray(itemData.data)) itemData = itemData.data;

        modalTitle.textContent = config.title;

        let htmlContent = ``;
        config.fields.forEach(field => 
        {
            const value = itemData[field.name] || 'Não informado';
            htmlContent += `<div class="main-data-section"><label>${field.label}: <span>${value}</span></label></div>`;
        });
        htmlContent += `</div>`;

        if (config.relatedEndpoints && config.relatedEndpoints.length > 0) 
        {
            for (const relConfig of config.relatedEndpoints) 
            {
                const relatedResponse = await fetch(relConfig.endpoint(id), { credentials: 'include' });
                
                if (relatedResponse.ok) 
                {
                    let relatedData = await relatedResponse.json();
                    if (relatedData.data) relatedData = relatedData.data;

                    htmlContent += `<div class="related-data-section"><h3>${relConfig.title}</h3>`;

                    if (Array.isArray(relatedData))
                    {   
                        if (relatedData.length > 0) 
                        {
                            relatedData.forEach(item => 
                            {
                                const id = item.id;
                                const tableField = relConfig.fields.find(field => field.label === 'Table');
                                const tableName = tableField ? tableField.name : '';

                                htmlContent += `<div class="related-items-list"><div class="related-item" onclick="navigateToTableRow('${tableName}', '${id}')">`;
                                
                                relConfig.fields.forEach(field => 
                                {
                                    if (field.label !== 'Table')
                                    {
                                        function getNestedValue(obj, path) { return path.split('.').reduce((acc, part) => acc && acc[part], obj); }
                                        const value = getNestedValue(item, field.name) ?? '-';
                                        htmlContent += `<div class="related-field"><label>${field.label}: <span>${formatValue(value, field.type)}</span></label></div>`;
                                    }
                                });

                                htmlContent += `</div></div>`;
                            });
                        }
                    } 
                    else if (typeof relatedData === 'object') 
                    {
                        htmlContent += `<div class="related-object">`;
                        for (const [key, value] of Object.entries(relatedData)) 
                        {
                            htmlContent += `<div class="related-field"><label>${key}: <span>${value !== null && value !== undefined ? value : '-'}</span></label></div>`;
                        }
                        htmlContent += `</div>`;
                    }

                    htmlContent += `</div>`; 
                }
            }
        }

        modalForm.innerHTML = htmlContent;

    } 
    catch (error) 
    {
        console.error(`Erro ao visualizar item da tabela ${tableId}:`, error);
        showToast(error.message || 'Erro ao visualizar item', 'error');
    }
}

function formatValue(value, type) 
{
    if (value === null || value === undefined) return '-';
    
    switch (type) 
    {
        case 'date': return new Date(value).toLocaleDateString();
        case 'datetime': return new Date(value).toLocaleString();
        case 'currency': return formatMoeda(value);
        case 'boolean': return value ? 'Sim' : 'Não';
        case 'hidden': return '';
        default: return value;
    }
}

const tableRelations = 
{
    'proposal-table': { 'cliente.id': 'clients-table' },
    'contracts-table': { 'proposta_id': 'proposal-table' },
    'projects-table': { 'proposta_id': 'proposal-table' },

    'custos-propostas-table': { 'proposta_id': 'proposal-table' }
};

function initializeTableLinks() 
{
    document.addEventListener('click', function(e) 
    {
        const link = e.target.closest('.table-link');
        if (link) 
        {
            e.preventDefault();
            const targetTableId = link.getAttribute('data-target-table');
            const targetId = link.getAttribute('data-target-id');
            navigateToTableRow(targetTableId, targetId);
        }
    });
}

function formatTableLinks(tableId, data) 
{
    const relations = tableRelations[tableId];
    if (!relations || !data) return data;
    
    const formattedData = JSON.parse(JSON.stringify(data));
    
    Object.keys(relations).forEach(relationField => {
        const targetTable = relations[relationField];
        const fieldParts = relationField.split('.');
        
        formattedData.forEach(item => 
        {
            let value = item;
            for (const part of fieldParts) 
            {
                if (value && value[part] !== undefined) 
                {
                    value = value[part];
                } 
                else 
                {
                    value = null;
                    break;
                }
            }
            
            if (value) 
            {
                const formattedField = `${fieldParts.join('_')}_formatted`;
                
                item[formattedField] = `<a href="#" class="table-link" data-target-table="${targetTable}" data-target-id="${value}"> ${value} </a>`;
                
                if (fieldParts.length > 1 && fieldParts[1] === 'id') 
                {
                    const objectField = fieldParts[0];
                    const nameField = `${objectField}.${fieldParts[1].replace('id', 'nome')}`;
                    
                    let nameValue = item;
                    for (const part of nameField.split('.')) 
                    {
                        if (nameValue && nameValue[part] !== undefined) 
                        {
                            nameValue = nameValue[part];
                        } 
                        else 
                        {
                            nameValue = null;
                            break;
                        }
                    }
                    
                    if (nameValue) 
                    {
                        item[formattedField] = `<a href="#" class="table-link" data-target-table="${targetTable}" data-target-id="${value}"> ${nameValue} </a>`;
                    }
                }
            }
        });
    });
    
    return formattedData;
}

function navigateToTableRow(targetTableId, targetId) 
{
    document.getElementById('addModal').style.display = 'none';
    
    const targetSection = document.querySelector(`#${targetTableId}`).closest('.content-section');
    const sectionId = targetSection.id;
    
    document.querySelector(`[data-section="${sectionId}"]`).click();
    
    setTimeout(() => 
    {
        const targetTable = document.getElementById(targetTableId);
        if (!targetTable) { showToast(`Tabela alvo não encontrada: ${targetTableId}`, 'error'); return; }
        let foundRow = null;
        const rows = targetTable.querySelectorAll('tbody tr');
        
        rows.forEach(row => 
        {
            const rowId = row.getAttribute('data-row-id') || row.cells[0].textContent.trim();
            if (rowId === targetId) foundRow = row;
        });
        
        if (foundRow) 
        {
            foundRow.classList.add('highlighted-row');
            foundRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => { foundRow.classList.add('fade-out'); setTimeout(() => { foundRow.classList.remove('highlighted-row', 'fade-out'); }, 1000); }, 2000);
        } 
        else 
        {
            showToast(`ID ${targetId} não encontrado na tabela ${targetTableId}`, 'error');
        }
    }, 100);
}

async function showConfirmModal(message) 
{
    return new Promise((resolve) => 
    {
        document.querySelectorAll('.confirm-modal').forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'confirm-modal';
        modal.innerHTML = `
            <div class="confirm-content">
                <p>${message}</p>
                <div class="confirm-buttons">
                    <button class="confirm-btn confirm-no">Não</button>
                    <button class="confirm-btn confirm-yes">Sim</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.confirm-no').addEventListener('click', () => 
        {
            document.body.removeChild(modal);
            resolve(false);
        });
        
        modal.querySelector('.confirm-yes').addEventListener('click', () => 
        {
            document.body.removeChild(modal);
            resolve(true);
        });
    });
}