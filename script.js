/* ========== Menu Mobile ========== */
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('show'); // Padronizado com o CSS
}

/* ========== Scroll Suave ========== */
function scrollActive(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70;
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: "smooth" });

    // Fecha o menu mobile após clicar
    const menu = document.getElementById('navMenu');
    menu.classList.remove('show');
}

/* ========== Cadastro de Voluntários ========== */
function handleSubmit(event) {
    event.preventDefault();
    console.log("Formulário enviado!"); // <-- teste

    const form = document.getElementById('volunteerForm');
    if (!form) return;

    const formData = {
        nome: form.nome.value,
        email: form.email.value,
        telefone: form.telefone.value,
        idade: form.idade.value,
        disponibilidade: form.disponibilidade.value,
        areainteresse: form.areainteresse.value,
        experiencia: form.experiencia.value,
        motivacao: form.motivacao.value,
        dataCadastro: new Date().toLocaleDateString()
    };

    let voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));

    // Mostra mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => successMessage.classList.remove('show'), 3000);
    }

    // Limpa o formulário
    form.reset();

    // Atualiza a tabela
    exibirVoluntarios();
}

/* ========== Exibir Voluntários ========== */
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado</p>';
        return;
    }

    // Monta tabela
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Idade</th>
                    <th>Disponibilidade</th>
                    <th>Área de Interesse</th>
                    <th>Experiência</th>
                    <th>Motivação</th>
                    <th>Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
    `;

    voluntarios.forEach(v => {
        html += `
            <tr>
                <td>${v.nome}</td>
                <td>${v.email}</td>
                <td>${v.telefone}</td>
                <td>${v.idade}</td>
                <td>${v.disponibilidade}</td>
                <td>${v.areainteresse}</td>
                <td>${v.experiencia}</td>
                <td>${v.motivacao}</td>
                <td>${v.dataCadastro}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    tabelaContainer.innerHTML = html;
}

// Inicializa a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', exibirVoluntarios);
