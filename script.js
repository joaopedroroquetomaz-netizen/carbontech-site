/* CarbonTech: interações apenas demonstrativas, sem dependências externas. */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  document.getElementById('contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const feedback = event.currentTarget.querySelector('.form-feedback');
    feedback.textContent = 'Recebemos sua solicitação. Nossa equipe entrará em contato em breve.';
    event.currentTarget.reset();
  });

  // Abre a mensagem já endereçada ao suporte técnico, sem depender de servidor.
  document.getElementById('support-form').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('support-email').value;
    const question = document.getElementById('support-question').value;
    const subject = encodeURIComponent('Solicitação de suporte técnico — CarbonTech');
    const body = encodeURIComponent(`E-mail para retorno: ${email}\n\nDúvida ou problema:\n${question}`);
    window.location.href = `mailto:suporte@carbontech.com?subject=${subject}&body=${body}`;
    event.currentTarget.querySelector('.support-feedback').textContent = 'Abrindo sua mensagem para o time técnico...';
  });
});
