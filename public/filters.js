let filtroDataInicio = null;
let filtroDataFim = null;

function parseMonthYear(str) 
{
    if (!str) return null;
    const [year, month] = str.split('-').map(Number);
    return new Date(year, month - 1, 1);
}

function dataNoIntervalo(dataStr, inicio, fim) 
{
    if (!dataStr) return false;
    
    const dataComparar = dataStr.substring(0, 7);
    const [year, month] = dataComparar.split('-').map(Number);
    const data = new Date(year, month - 1, 1);
    
    if (inicio && data < parseMonthYear(inicio)) return false;
    if (fim && data > parseMonthYear(fim)) return false;
    
    return true;
}

function aplicarFiltro() 
{
    filtroDataInicio = document.getElementById('data-inicio').value;
    filtroDataFim = document.getElementById('data-fim').value;
    
    if (filtroDataInicio && filtroDataFim && filtroDataInicio > filtroDataFim) 
    {
        alert('A data inicial não pode ser maior que a data final');
        return;
    }
    
    loadStats();
    filtrarTabelas();
}

function limparFiltro() 
{
    document.getElementById('data-inicio').value = '';
    document.getElementById('data-fim').value = '';
    filtroDataInicio = null;
    filtroDataFim = null;
    loadStats();
    mostrarTodasLinhas();
}

function filtrarTabelas() 
{
    const tabelasConfig = [
        { id: 'custos-propostas-table', dataIndex: 1 }, // Coluna 1 = Data
        { id: 'custos-table', dataIndex: 0 },           // Coluna 0 = Data
        { id: 'receber-table', dataIndex: 0 },          // Coluna 0 = Data
        { id: 'pagar-table', dataIndex: 0 }             // Coluna 0 = Data
    ];

    tabelasConfig.forEach(config => 
    {
        const tabela = document.getElementById(config.id);
        if (!tabela) return;

        const linhas = tabela.querySelectorAll('tbody tr');
        
        linhas.forEach(linha => 
        {
            const celulaData = linha.cells[config.dataIndex];
            if (!celulaData) 
            {
                linha.style.display = 'none';
                return;
            }

            const dataTexto = celulaData.textContent.trim();
            const deveMostrar = dataNoIntervalo(dataTexto, filtroDataInicio, filtroDataFim);
            
            linha.style.display = deveMostrar ? '' : 'none';
        });
    });
}

function dataNoIntervalo(dataStr, inicio, fim) 
{
    if (!inicio && !fim) return true;
    
    try 
    {
        const dataParts = dataStr.substring(0, 7).split('-');
        if (dataParts.length !== 2) return false;
        
        const ano = parseInt(dataParts[0]);
        const mes = parseInt(dataParts[1]);
        
        const data = new Date(ano, mes - 1, 1);
        
        if (inicio) 
        {
            const [inicioAno, inicioMes] = inicio.split('-').map(Number);
            const dataInicio = new Date(inicioAno, inicioMes - 1, 1);
            if (data < dataInicio) return false;
        }
        
        if (fim) 
        {
            const [fimAno, fimMes] = fim.split('-').map(Number);
            const dataFim = new Date(fimAno, fimMes, 1);
            if (data >= dataFim) return false;
        }
        
        return true;
    } 
    catch (e) 
    {
        console.error('Erro ao processar data:', dataStr, e);
        return false;
    }
}

function mostrarTodasLinhas() 
{
    const tabelas = ['custos-propostas', 'custos', 'receber', 'pagar'];
    
    tabelas.forEach(tabela => 
    {
        const rows = document.querySelectorAll(`#${tabela}-table tbody tr`);
        rows.forEach(row => { row.style.display = ''; });
    });
}

document.getElementById('aplicar-filtro').addEventListener('click', aplicarFiltro);
document.getElementById('limpar-filtro').addEventListener('click', limparFiltro);