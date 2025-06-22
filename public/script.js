let usuario     = null;
let tipoUsuario = '';

document.addEventListener('DOMContentLoaded', async function() 
{
    await checkAuth();
    loadInitialData();
    setupMenu();
    setupTabs();
    loadStats();

    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    
    menuItems.forEach(item => 
    {
        item.addEventListener('click', function(e) 
        {
            e.preventDefault();
            
            menuItems.forEach(i => { i.classList.remove('active'); });
            
            this.classList.add('active');
            
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => { section.classList.remove('active'); });
            
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            
            updateBreadcrumb(this.querySelector('span').textContent);
        });
    });
    
    function updateBreadcrumb(currentPage) 
    {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) breadcrumb.innerHTML = `<li>Home</li><li>${currentPage}</li>`;
    }
    
    function exportToExcel(tableId, fileName) 
    {
        const table = document.getElementById(tableId);
        const workbook = XLSX.utils.table_to_book(table);
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
    
    document.getElementById('export-proposal')?.addEventListener('click', () => exportToExcel('proposal-table', 'propostas'));
    document.getElementById('export-contracts')?.addEventListener('click', () => exportToExcel('contracts-table', 'contratos'));
    document.getElementById('export-projects')?.addEventListener('click', () => exportToExcel('projects-table', 'projetos'));
    document.getElementById('export-custos-propostas')?.addEventListener('click', () => exportToExcel('custos-propostas-table', 'custos_propostas'));
    document.getElementById('export-clients')?.addEventListener('click', () => exportToExcel('clients-table', 'clientes'));
    document.getElementById('export-users')?.addEventListener('click', () => exportToExcel('users-table', 'usuarios'));
});

async function checkAuth() 
{
    try 
    {
        const responseUsuario = await fetch('/api/session', { method: 'GET', credentials: 'include' });
        const tokenUsuario    = await responseUsuario.json();

        const id = tokenUsuario.usuario ? (tokenUsuario.usuario.id || -1) : -1;

        if (!responseUsuario.ok || id === -1) { showToast('Erro ao buscar credenciais', 'error'); window.location.href = '/login'; return; }

        tipoUsuario = tokenUsuario.usuario ? (tokenUsuario.usuario.tipo || '') : '';

        const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
        if (!response.ok) { showToast('Erro ao buscar usuário', 'error'); return; }
        usuario = await response.json();
    } 
    catch (error) 
    {
        showToast('Erro na autenticação', 'error');
        console.log(error);
    }
}

async function loadStats() 
{
    try 
    {
        const response = await fetch(`${API_BASE_URL}/propostas`, { credentials: 'include' });

        if (!response.ok) { throw new Error('Erro ao carregar dados financeiros'); }

        const data = await response.json();
        if (!data) return;
        
        let valorTotal  = 0; let valorAceito = 0;
        data.forEach(proposta => 
        {
            const preco = parseFloat(proposta.preco_venda);

            valorTotal  += preco;
            if (proposta.status === 'Aceita') valorAceito += preco;
        });

        document.querySelectorAll('.stat-card p')[0].textContent = formatMoeda(valorTotal);
        document.querySelectorAll('.stat-card p')[1].textContent = formatMoeda(valorAceito);

        const calcularTotal = (selector, dataCellIndex, valueCellIndex) => 
        {
            let total = 0;
            document.querySelectorAll(selector).forEach(row => 
            {
                const dataCell = row.cells[dataCellIndex].textContent;
                if (dataNoIntervalo(dataCell, filtroDataInicio, filtroDataFim)) total += parseFloat(row.cells[valueCellIndex].textContent.replace(/[^\d,]/g, '').replace(',', '.'));
            });
            return total;
        };

        const propostas = calcularTotal('#custos-propostas-table tbody tr', 1, 5);
        const custos    = calcularTotal('#custos-table tbody tr', 0, 1);
        const receber   = calcularTotal('#receber-table tbody tr', 0, 1);
        const pagar     = calcularTotal('#pagar-table tbody tr', 0, 1);

        document.querySelectorAll('.stat-card p')[2].textContent = formatMoeda(propostas);
        document.querySelectorAll('.stat-card p')[3].textContent = formatMoeda(custos);
        document.querySelectorAll('.stat-card p')[4].textContent = formatMoeda(receber);
        document.querySelectorAll('.stat-card p')[5].textContent = formatMoeda(pagar);
    } 
    catch (error) 
    {
        console.error('Erro ao carregar dados financeiros: ', error);
        throw error;
    }
}

async function loadInitialData() 
{
    try 
    {
        initializeTableLinks();

        await loadProposalsTable();
        await loadContractsTable();
        await loadProjectsTable();
        await loadDimensionsTable();
        await loadDiversosTable();
        await loadTaxasTable();
        await loadProdutosTable();
        await loadPlanosTable();
        await loadPacotesTable();
        await loadClientsTable();
        await loadUsersTable();

        await loadCustosTable();
    } 
    catch (error) 
    {
        console.error('Erro ao carregar dados iniciais:', error);
        showToast('Erro ao carregar dados. Tente novamente.', 'error');
    }
}

function setupMenu() 
{
    hideAll();
    if (tipoUsuario === '') return;
    
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.style.display = 'none');
    
    const baseItems = ['profile', 'logout'];
    
    baseItems.forEach(item => { const el = document.querySelector(`.sidebar-menu li[data-section="${item}"]`); if (el) el.style.display = 'block'; });
    
    switch(tipoUsuario) 
    {
        case 'Administrador':
            showAdminMenu();
            break;
        case 'Comercial':
            showComercialMenu();
            break;
        case 'Financeiro':
            showFinanceMenu();
            break;
        case 'Projetos':
            showProjectsMenu();
            break;
        case 'Pós-Venda':
            showPosMenu();
            break;
        case '':
            window.Location.redirect = '/logi';
    }
}

function hideAll() 
{
    const sections = ['proposals', 'contracts', 'projects', 'financial', 'clients', 'configurations', 'users'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'none'; });
}

function showAdminMenu() 
{
    const sections = ['proposals', 'contracts', 'projects', 'financial', 'clients', 'configurations', 'users'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'block'; });
}

function showComercialMenu() 
{
    const sections = ['proposals', 'contracts'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'block'; });
}

function showFinanceMenu() 
{
    const sections = ['financial'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'block'; });
}

function showProjectsMenu()
{
    const sections = ['projects'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'block'; });
}

function showPosMenu() 
{
    const sections = ['contracts'];
    sections.forEach(section => { const el = document.querySelector(`.sidebar-menu a[data-section="${section}"]`); if (el) el.parentElement.style.display = 'block'; });
}

function setupTabs()
{
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
            
    tabButtons.forEach(button => 
    {
        button.addEventListener('click', () => 
        {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            
            const tabId = button.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
} 
