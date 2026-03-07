
  // ─── QUIZ STATE ───
  let currentStep = 1;
  const totalSteps = 6;
  let scores = {};
  let selectedSkin = 'sensivel';

  const budgetData = {
    sensivel: [
      { tag: 'basic', label: 'Básico', range: 'R$50–R$100/mês', desc: 'Sabonete suave + hidratante barreira + protetor solar mineral. Essencial e eficaz.' },
      { tag: 'mid', label: 'Intermediário', range: 'R$100–R$250/mês', desc: 'Adiciona sérum com niacinamida + água micelar + máscara calmante semanal.' },
      { tag: 'premium', label: 'Premium', range: 'R$250+/mês', desc: 'Sérum com peptídeos, protetor solar premium, óleo facial e tratamento noturno com ceramidas.' },
    ],
    oleosa: [
      { tag: 'basic', label: 'Básico', range: 'R$50–R$100/mês', desc: 'Gel de limpeza + hidratante oil-free + protetor solar com toque seco. Controla brilho sem ressecar.' },
      { tag: 'mid', label: 'Intermediário', range: 'R$100–R$250/mês', desc: 'Adiciona tônico com ácido salicílico + sérum com niacinamida + argila para limpeza semanal.' },
      { tag: 'premium', label: 'Premium', range: 'R$250+/mês', desc: 'Tratamento com retinol, ácido azelaico, protetor solar sérum e detox enzimático semanal.' },
    ],
    acneica: [
      { tag: 'basic', label: 'Básico', range: 'R$50–R$100/mês', desc: 'Limpador com ácido salicílico + hidratante não comedogênico + protetor solar. Base sólida para controle.' },
      { tag: 'mid', label: 'Intermediário', range: 'R$100–R$250/mês', desc: 'Sérum com niacinamida 10% + gel de benzoíla peróxida + tratamento spot + protetor solar leve.' },
      { tag: 'premium', label: 'Premium', range: 'R$250+/mês', desc: 'Retinóide tópico + ácido azelaico + sérum calmante + protetor solar premium + cicatrizante noturno.' },
    ]
  };

  function renderBudget() {
    const levels = budgetData[selectedSkin];
    document.getElementById('budgetLevels').innerHTML = levels.map(l => `
      <div class="budget-item">
        <div class="budget-label">
          <span class="budget-tag ${l.tag}">${l.label}</span>
          <span class="budget-range">${l.range}</span>
        </div>
        <div class="budget-desc">${l.desc}</div>
      </div>
    `).join('');
  }

  function selectSkin(el, skin) {
    selectedSkin = skin;
    document.querySelectorAll('.skin-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderBudget();
  }

  renderBudget();

  // ─── QUIZ LOGIC ───
  function updateProgress() {
    const pct = ((currentStep - 1) / totalSteps) * 100;
    document.getElementById('quizProgress').style.width = pct + '%';
    document.getElementById('progressText').textContent = currentStep + ' / ' + totalSteps;
  }

  function selectOpt(el) {
    el.closest('.quiz-options').querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
  }

  function nextStep() {
    const step = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    const selected = step.querySelector('.quiz-opt.selected');
    if (!selected) { showToast('Seleciona uma opção para continuar 😊'); return; }

    scores[currentStep] = parseInt(selected.dataset.score);

    step.classList.remove('active');

    if (currentStep < totalSteps) {
      currentStep++;
      document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
      updateProgress();
    } else {
      document.getElementById('quizProgress').style.width = '85%';
      document.getElementById('progressText').textContent = 'Quase lá!';
      document.getElementById('quizEmailStep').classList.add('active');
    }
  }

  function prevStep() {
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep--;
    document.querySelector(`.quiz-step[data-step="${currentStep}"]`).classList.add('active');
    updateProgress();
  }

  function showResult() {
    const name = document.getElementById('quizName').value.trim();
    const email = document.getElementById('quizEmail').value.trim();
    if (!name || !email) { showToast('Preenche nome e e-mail para continuar 💌'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { showToast('E-mail parece inválido, verifica!'); return; }

    const total = Object.values(scores).reduce((a, b) => a + b, 0);

    let type, card, recs;
    if (total >= 10) {
      type = 'ferrada';
      card = `
        <div class="result-card ferrada">
          <div class="result-badge">🚨 Barreira comprometida</div>
          <h3>Sua barreira precisa de atenção urgente, ${name}.</h3>
          <p>Sua pontuação indica que a barreira cutânea está fragilizada. Isso explica aquela sensação de aperto, irritação fácil e pele reativa. A boa notícia: tem cura — e começa com 3 ajustes simples.</p>
        </div>`;
      recs = [
        { icon: '🧴', title: 'Ceramidas first', text: 'Prioriza hidratantes com <strong>ceramidas, colesterol e ácidos graxos</strong>. Eles reconstroem a barreira literalmente.' },
        { icon: '❌', title: 'Pause os ácidos', text: '<strong>Esfoliação química zero</strong> por 2–4 semanas. Retinol também fica de fora por enquanto.' },
        { icon: '🛡️', title: 'Protetor mineral', text: 'Troca o protetor solar convencional por um <strong>mineral (óxido de zinco)</strong> — muito menos irritante.' },
      ];
    } else if (total >= 5) {
      type = 'atencao';
      card = `
        <div class="result-card atencao">
          <div class="result-badge">⚠️ Barreira em alerta</div>
          <h3>Sua barreira está em alerta, ${name}.</h3>
          <p>Nada comprometido de forma grave, mas há sinais de desgaste. Com alguns ajustes na rotina, você pode chegar a uma pele equilibrada e resistente rapidinho.</p>
        </div>`;
      recs = [
        { icon: '💧', title: 'Hidratação em camadas', text: 'Aplica tônico hidratante <strong>antes</strong> do sérum. A ordem importa mais do que o produto.' },
        { icon: '🌙', title: 'Rotina noturna', text: 'A noite é quando a pele se repara. Um <strong>hidratante mais rico à noite</strong> faz toda diferença.' },
        { icon: '☀️', title: 'FPS todo dia', text: 'Protetor solar diário é o <strong>anti-aging mais acessível</strong> que existe. Não pula mais!' },
      ];
    } else {
      type = 'saudavel';
      card = `
        <div class="result-card saudavel">
          <div class="result-badge">✅ Barreira saudável</div>
          <h3>Parabéns, ${name}! Sua barreira está ótima.</h3>
          <p>Sua pele está bem protegida e equilibrada. Agora é hora de manter o que funciona e, se quiser, adicionar ativos de performance para resultados ainda melhores.</p>
        </div>`;
      recs = [
        { icon: '✨', title: 'Vitamina C de manhã', text: '<strong>Vitamina C 10–15%</strong> pela manhã protege contra radicais livres e uniformiza o tom.' },
        { icon: '🌙', title: 'Retinol à noite', text: 'Sua barreira aguenta. Introduz <strong>retinol 0.025%</strong> 2x/semana e vai aumentando gradual.' },
        { icon: '💪', title: 'Mantenha a consistência', text: 'O segredo da sua pele saudável é a <strong>rotina consistente</strong>. Não muda o que tá funcionando!' },
      ];
    }

    document.getElementById('quizProgress').style.width = '100%';
    document.getElementById('progressText').textContent = 'Resultado!';

    document.getElementById('resultCard').innerHTML = card;
    document.getElementById('resultRecs').innerHTML = `
      <h4>Suas 3 recomendações personalizadas</h4>
      ${recs.map(r => `
        <div class="rec-item">
          <div class="rec-icon">${r.icon}</div>
          <div class="rec-text"><strong>${r.title}</strong><br>${r.text}</div>
        </div>
      `).join('')}
    `;

    document.getElementById('quizEmailStep').classList.remove('active');
    document.getElementById('quizResult').classList.add('active');
    showToast(`Resultado enviado para ${email}! 💌`);
  }

  // ─── PDF FORM ───
  function submitPDF() {
    if (!window._pdfFromQuiz) {
      const name = document.getElementById('pdfName').value.trim();
      const email = document.getElementById('pdfEmail').value.trim();
      const phone = document.getElementById('pdfPhoneDirect').value.trim();
      if (!name) { showToast('Preenche seu nome para continuar 😊'); return; }
      if (!email || !/\S+@\S+\.\S+/.test(email)) { showToast('E-mail inválido, verifica!'); return; }
      if (!phone) { showToast('Adiciona seu WhatsApp para receber o guia 📱'); return; }
    }
    const skinLabels = { sensivel: 'Pele Sensível', oleosa: 'Pele Oleosa', acneica: 'Pele Acneica' };
    showToast(`Perfeito! Sua rotina para ${skinLabels[selectedSkin]} vai chegar em instantes ✅`);
    closeModal('pdfModal');
  }

  // ─── MODAL UTILS ───
  function openQuiz() {
    document.getElementById('quizModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function openPDF(fromQuiz) {
    window._pdfFromQuiz = !!fromQuiz;
    const savedBlock = document.getElementById('pdfDataSaved');
    const directFields = document.getElementById('pdfDirectFields');
    const skinSection = document.getElementById('pdfSkinSection');
    const introText = document.getElementById('pdfIntroText');
    if (fromQuiz) {
      savedBlock.style.display = 'flex';
      directFields.style.display = 'none';
      skinSection.style.display = 'block';
      introText.style.display = 'block';
    } else {
      savedBlock.style.display = 'none';
      directFields.style.display = 'block';
      skinSection.style.display = 'none';
      introText.style.display = 'none';
    }
    document.getElementById('pdfModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
  });

  // ─── TOAST ───
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

  // ─── SCROLL ANIMATIONS ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ─── NAV: progress bar + hide/show + dark mode + sticky CTA ───
  const mainNav = document.getElementById('mainNav');
  const navCta = document.getElementById('navCta');
  const progressBar = document.getElementById('scrollProgress');
  const heroSection = document.querySelector('.hero');
  const carouselSection = document.querySelector('.carousel-section');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    // Progress bar
    if (progressBar) progressBar.style.width = (scrollY / docH * 100) + '%';

    // Hide/show nav
    if (scrollY > lastScrollY && scrollY > 120) {
      mainNav.classList.add('nav-hidden');
    } else {
      mainNav.classList.remove('nav-hidden');
    }
    lastScrollY = scrollY;

    // Sticky CTA always visible - no toggle needed

    // Dark mode over carousel
    if (carouselSection && mainNav) {
      const rect = carouselSection.getBoundingClientRect();
      if (rect.top <= 68 && rect.bottom >= 68) mainNav.classList.add('nav-dark');
      else mainNav.classList.remove('nav-dark');
    }
  }, { passive: true });

  // ─── LEGAL MODALS ───
  const legalContent = {
    historia: {
      title: 'Nossa História',
      html: `<p>O Refúgio da Pele nasceu de conversas reais — relatos de pessoas que acordavam todo dia com a mesma dor, a mesma frustração, a mesma pergunta sem resposta: <em>"por que nada funciona para mim?"</em></p>
      <p>Ouvimos. Pesquisamos. Estudamos casos reais, ingredientes, rotinas. E decidimos que essa voz merecia um canal — um lugar onde o cuidado com a pele fosse traduzido em algo simples, natural e acessível para qualquer pessoa.</p>`
    },
    porque: {
      title: 'Por que criamos o Refúgio',
      html: `<p>Para quem já cuida de si e quer ir mais fundo. E para quem ainda não sabe por onde começar.</p>
      <p>Criamos o Refúgio porque acreditamos que toda pessoa merece entender a própria pele — sem termos difíceis, sem produtos desnecessários, sem medo de errar. Um ponto de partida seguro para qualquer jornada de cuidado.</p>
      <p>Queremos que você chegue até nós como uma pergunta — e saia como uma certeza de que é capaz de cuidar de si com leveza e amor.</p>`
    },
    missao: {
      title: 'Missão & Valores',
      html: `<p>Acreditamos que toda pele tem uma história bonita para contar. Que naturalidade não é uma tendência — é um retorno a quem você sempre foi.</p>
      <p>Nossa missão é simples e profunda ao mesmo tempo: ajudar você a se sentir bem na própria pele. Não a pele que você imagina ter um dia — a pele que você já tem, cuidada, respeitada e amada como merece.</p>
      <p>Guiamos cada passo com <strong>honestidade</strong>, <strong>suavidade</strong> e <strong>propósito</strong>.</p>`
    },
    produto: {
      title: 'A Pele que Você Lembra — O Guia Completo',
      html: `<p>Você já recebeu as dicas gratuitas. Agora é hora de ir fundo.</p>
      <p>O Guia Completo foi criado para mulheres que querem entender a própria pele de verdade — e finalmente ter uma rotina que funcione, feita com ingredientes naturais, simples e acessíveis.</p>
      <h3>O que você vai encontrar</h3>
      <p>✦ Rotina completa manhã e noite para cada tipo de pele<br>✦ Lista de ingredientes naturais que funcionam — e os que evitar<br>✦ Receitas caseiras testadas com o que você já tem em casa<br>✦ Como identificar seu tipo de pele e o que ele precisa</p>
      <h3>Entrega & acesso</h3>
      <p>PDF digital · Acesso imediato por e-mail após confirmação do pagamento · Seu para sempre</p>
      <h3>🔒 Garantia de 7 dias</h3>
      <p>Se por qualquer motivo você não ficar satisfeita, devolvemos o seu dinheiro integralmente dentro de 7 dias. Após a solicitação de reembolso, o acesso ao conteúdo e às atualizações é encerrado imediatamente.</p>`
    },
    planos: {
      title: '',
      html: `
      <style>
        .plans-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300; color:var(--deep); text-align:center; margin-bottom:6px; }
        .plans-title em { font-style:italic; color:var(--terracotta); }
        .plans-divider { display:flex; align-items:center; gap:12px; margin-bottom:32px; justify-content:center; }
        .plans-divider::before, .plans-divider::after { content:''; flex:1; height:1px; background:rgba(196,104,62,0.2); }
        .plans-divider span { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(196,104,62,0.5); font-family:'DM Sans',sans-serif; }
        .plans-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:20px; }
        .plan-card { border:1.5px solid rgba(196,104,62,0.15); padding:28px 24px; position:relative; display:flex; flex-direction:column; gap:0; background:rgba(247,240,230,0.5); transition:border-color 0.3s, transform 0.3s; }
        .plan-card:hover { border-color:rgba(196,104,62,0.4); transform:translateY(-4px); }
        .plan-card.featured { border-color:var(--terracotta); background:var(--deep); }
        .plan-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--terracotta); color:white; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; font-family:'DM Sans',sans-serif; font-weight:600; padding:4px 14px; white-space:nowrap; }
        .plan-icon { font-size:32px; text-align:center; margin-bottom:14px; }
        .plan-name { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:400; color:var(--deep); text-align:center; margin-bottom:4px; }
        .plan-card.featured .plan-name { color:var(--cream); }
        .plan-tagline { font-size:11px; color:var(--terracotta); font-style:italic; text-align:center; margin-bottom:20px; font-family:'Cormorant Garamond',serif; }
        .plan-card.featured .plan-tagline { color:rgba(247,240,230,0.6); }
        .plan-price { text-align:center; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid rgba(196,104,62,0.15); }
        .plan-price-val { font-family:'Cormorant Garamond',serif; font-size:38px; font-weight:300; color:var(--deep); line-height:1; }
        .plan-card.featured .plan-price-val { color:var(--cream); }
        .plan-price-period { font-size:11px; color:rgba(107,87,68,0.5); letter-spacing:0.1em; text-transform:uppercase; font-family:'DM Sans',sans-serif; display:block; margin-top:4px; }
        .plan-card.featured .plan-price-period { color:rgba(247,240,230,0.4); }
        .plan-features { list-style:none; padding:0; margin:0 0 24px; display:flex; flex-direction:column; gap:10px; flex:1; }
        .plan-features li { display:flex; align-items:flex-start; gap:8px; font-size:12.5px; color:var(--mid); line-height:1.55; }
        .plan-card.featured .plan-features li { color:rgba(247,240,230,0.65); }
        .plan-features li .check { color:var(--sage); font-size:13px; flex-shrink:0; margin-top:1px; }
        .plan-features li strong { color:var(--terracotta); }
        .plan-card.featured .plan-features li strong { color:#f0c080; }
        .plan-cta { width:100%; padding:13px 16px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; transition:all 0.2s; }
        .plan-cta-outline { background:transparent; color:var(--terracotta); border:1.5px solid rgba(196,104,62,0.4); }
        .plan-cta-outline:hover { background:var(--terracotta); color:white; }
        .plan-cta-filled { background:var(--terracotta); color:white; box-shadow:0 4px 16px rgba(196,104,62,0.3); }
        .plan-cta-filled:hover { background:#a03a1e; box-shadow:0 6px 24px rgba(196,104,62,0.45); }
        .plans-guarantee { text-align:center; font-size:11px; color:rgba(107,87,68,0.4); letter-spacing:0.1em; display:flex; align-items:center; justify-content:center; gap:6px; padding-top:4px; }
        @media(max-width:580px){ .plans-grid{grid-template-columns:1fr;} }
      </style>
      <h2 class="plans-title">Escolha o seu <em>cuidado</em></h2>
      <div class="plans-divider"><span>Planos Refúgio da Pele</span></div>
      <div class="plans-grid">

        <!-- PLANO 1 - Assinatura R$9,90 -->
        <div class="plan-card">
          <div class="plan-icon">🌸</div>
          <div class="plan-name">Assinatura</div>
          <div class="plan-tagline">Dicas frescas toda semana</div>
          <div class="plan-price">
            <span class="plan-price-val">R$9,90</span>
            <span class="plan-price-period">por mês · cancele quando quiser</span>
          </div>
          <ul class="plan-features">
            <li><span class="check">✦</span> Guia básico semanal toda semana</li>
            <li><span class="check">✦</span> Dicas naturais com ingredientes caseiros</li>
            <li><span class="check">✦</span> Novos conteúdos toda semana</li>
            <li><span class="check">✦</span> Acesso enquanto a assinatura estiver ativa</li>
            <li><span class="check">✦</span> Cancele a qualquer momento</li>
          </ul>
          <button class="plan-cta plan-cta-outline" onclick="closeLegalModal();showToast('Em breve! Avisaremos quando o checkout estiver disponível. 🌿')">Quero este plano →</button>
        </div>

        <!-- PLANO 2 - Guia Completo R$19,90 -->
        <div class="plan-card">
          <div class="plan-icon">🌿</div>
          <div class="plan-name">Guia Completo</div>
          <div class="plan-tagline">O primeiro passo real para a sua pele</div>
          <div class="plan-price">
            <span class="plan-price-val">R$19,90</span>
            <span class="plan-price-period">compra única</span>
          </div>
          <ul class="plan-features">
            <li><span class="check">✦</span> PDF completo entregue por e-mail imediatamente</li>
            <li><span class="check">✦</span> Rotinas manhã e noite por tipo de pele</li>
            <li><span class="check">✦</span> Lista de ingredientes naturais que funcionam</li>
            <li><span class="check">✦</span> Receitas caseiras testadas</li>
            <li><span class="check">✦</span> <strong>1 mês de atualizações semanais incluso</strong></li>
            <li><span class="check">✦</span> Seu para sempre</li>
          </ul>
          <button class="plan-cta plan-cta-outline" onclick="closeLegalModal();showToast('Em breve! Avisaremos quando o checkout estiver disponível. 🌿')">Quero este plano →</button>
        </div>

        <!-- PLANO 3 - FEATURED -->
        <div class="plan-card featured">
          <div class="plan-badge">⭐ Mais completo</div>
          <div class="plan-icon">✨</div>
          <div class="plan-name">Cuidado ao Máximo</div>
          <div class="plan-tagline">A experiência completa do Refúgio</div>
          <div class="plan-price">
            <span class="plan-price-val">R$29,90</span>
            <span class="plan-price-period">por mês · cancele quando quiser</span>
          </div>
          <ul class="plan-features">
            <li><span class="check">✦</span> <strong>Guia Completo sempre atualizado</strong></li>
            <li><span class="check">✦</span> Rotinas e ingredientes por tipo de pele</li>
            <li><span class="check">✦</span> <strong>Atualizações semanais exclusivas</strong></li>
            <li><span class="check">✦</span> Todos os materiais mensais inclusos</li>
            <li><span class="check">✦</span> Acesso a todo conteúdo novo em primeira mão</li>
            <li><span class="check">✦</span> Cancele a qualquer momento</li>
          </ul>
          <button class="plan-cta plan-cta-filled" onclick="closeLegalModal();showToast('Em breve! Avisaremos quando o checkout estiver disponível. 🌿')">Começar agora →</button>
        </div>

      </div>
      <div class="plans-guarantee">🔒 Garantia de 7 dias em todos os planos · Sem perguntas</div>`
    },
    faq: {
      title: 'Perguntas Frequentes',
      html: `<h3>O diagnóstico é gratuito?</h3>
      <p>Sim. É um quiz de 6 perguntas — uma orientação inicial, não um aconselhamento médico. Cada pele é única e este é o seu ponto de partida.</p>
      <h3>O que recebo após o quiz?</h3>
      <p>Automaticamente no seu e-mail: o PDF gratuito da semana com 3 dicas naturais para aplicar em casa.</p>
      <h3>Meus dados estão seguros?</h3>
      <p>Totalmente. Usados apenas para entrega do conteúdo. Nunca compartilhamos com terceiros.</p>
      <h3>O PDF gratuito é igual ao Guia Completo?</h3>
      <p>Não. Os PDFs semanais são uma amostra — 3 dicas simples. O Guia Completo vai muito mais fundo com rotinas, ingredientes e receitas.</p>
      <h3>Como funciona a garantia?</h3>
      <p>7 dias após a compra. Reembolso integral sem perguntas. ⚠️ O acesso ao conteúdo é encerrado na data da solicitação.</p>
      <h3>Os ingredientes são fáceis de encontrar?</h3>
      <p>Sim — tudo natural, acessível, que você provavelmente já tem em casa ou encontra no mercado.</p>
      <h3>Posso cancelar a assinatura?</h3>
      <p>Sim, a qualquer momento. O acesso é encerrado na data do cancelamento.</p>`
    },
    contato: {
      title: 'Fale Conosco',
      html: `<p style="margin-bottom:24px;color:var(--mid);font-size:14px;line-height:1.7;">Adoramos ouvir você. Preencha o formulário abaixo e responderemos com carinho.</p>
      <div class="contact-form">
        <input type="text" placeholder="Seu nome" id="contactName"/>
        <input type="email" placeholder="Seu e-mail" id="contactEmail"/>
        <input type="tel" placeholder="Telefone (opcional)" id="contactPhone"/>
        <textarea placeholder="Como podemos ajudar?"></textarea>
        <button onclick="submitContact()">Enviar mensagem →</button>
      </div>`
    },
    privacidade: {
      title: 'Política de Privacidade',
      html: `<span class="legal-date">Última atualização: março de 2026</span>
      <p>Sua privacidade é tão importante para nós quanto o cuidado com a sua pele.</p>
      <h3>O que coletamos</h3>
      <p>Apenas o necessário: nome, e-mail e telefone — informações fornecidas voluntariamente ao preencher formulários ou adquirir nossos produtos.</p>
      <h3>Para que usamos</h3>
      <p>Exclusivamente para: entrega de conteúdos e produtos, envio de materiais solicitados e suporte quando necessário.</p>
      <h3>O que não fazemos</h3>
      <p>Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins comerciais. Nunca.</p>
      <h3>Seus direitos — LGPD</h3>
      <p>De acordo com a Lei 13.709/2018, você tem direito a acessar, corrigir, excluir seus dados e revogar consentimento a qualquer momento.</p>
      <h3>Contato</h3>
      <p>Dúvidas? Entre em contato pelo formulário no site.</p>`
    },
    termos: {
      title: 'Termos de Uso',
      html: `<span class="legal-date">Última atualização: março de 2026</span>
      <h3>Sobre o conteúdo</h3>
      <p>Todo o conteúdo é de propriedade intelectual do Refúgio da Pele. É proibida a reprodução ou comercialização sem autorização.</p>
      <h3>Sobre os produtos digitais</h3>
      <p>Produtos digitais são entregues por e-mail após confirmação do pagamento. Não nos responsabilizamos por e-mails incorretos fornecidos na compra.</p>
      <h3>Garantia</h3>
      <p>7 dias a partir da compra. Após solicitação de reembolso, o acesso ao conteúdo é encerrado imediatamente.</p>
      <h3>Assinaturas</h3>
      <p>Cobradas mensalmente. Podem ser canceladas a qualquer momento. O acesso é mantido até o fim do período pago.</p>
      <h3>Orientações de saúde</h3>
      <p>O conteúdo tem caráter informativo e educacional. Não substitui diagnóstico ou aconselhamento médico ou dermatológico.</p>`
    },
    cookies: {
      title: 'Política de Cookies',
      html: `<span class="legal-date">Última atualização: março de 2026</span>
      <p>Utilizamos cookies essenciais para o funcionamento do site. Nenhum dado é compartilhado com terceiros para fins publicitários.</p>
      <p>Ao continuar navegando, você concorda com o uso de cookies essenciais.</p>`
    }
  };

  function openLegal(key) {
    const data = legalContent[key];
    if (!data) return;
    document.getElementById('legalModalContent').innerHTML = `<h2>${data.title}</h2>${data.html}`;
    document.getElementById('legalModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal(e) {
    if (e && e.target !== document.getElementById('legalModal')) return;
    document.getElementById('legalModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function submitContact() {
    showToast('Mensagem enviada! Responderemos em breve. 💚');
    document.getElementById('legalModal').classList.remove('open');
    document.body.style.overflow = '';
  }
  const skinData = {
    'pele-clara': {
      tag: 'Tom porcelana · Pele sensível',
      title: 'Pele Clara & Barreira Delicada',
      desc: 'A pele de tom porcelana costuma ser mais sensível à luz solar e a ingredientes agressivos. A barreira cutânea tende a ser mais fina, o que significa que resseca e avermella com mais facilidade — mas quando bem cuidada, tem um brilho suave e delicado que é só dela.',
      tips: [
        'Água de rosas como tônico suave: acalma e equilibra o pH sem agredir',
        'Óleo de semente de rosa mosqueta diluído na hidratante — regenera a barreira durante a noite',
        'Protetor solar mineral (dióxido de titânio) todos os dias, mesmo dentro de casa',
        'Compressa de camomila gelada para acalmar vermelhidões repentinas',
        'Evite esfoliantes físicos — prefira ácido mandélico suave 1x por semana',
      ]
    },
    'skincare-natural': {
      tag: 'Ingredientes · Rituais puros',
      title: 'O Poder dos Ingredientes Naturais',
      desc: 'A natureza oferece tudo o que a pele sensível precisa — sem conservantes agressivos, sem fragrâncias sintéticas, sem promessas vazias. Ingredientes simples, colhidos com cuidado, que trabalham com a pele, não contra ela.',
      tips: [
        'Mel cru como máscara hidratante: 10 minutos, enxágue com água morna',
        'Óleo de coco virgem nas pontas dos cabelos e cotovelos — nunca direto no rosto se pele oleosa',
        'Argila verde ou caulim 1x/semana para limpeza profunda sem ressecar',
        'Gel de babosa (aloe vera) puro na geladeira: calmante instantâneo para pele irritada',
        'Óleo de gergelim com SPF natural leve — ideal para o dia a dia em regiões de sol moderado',
      ]
    },
    'pele-morena': {
      tag: 'Tom bronze · Rica em melanina',
      title: 'Pele Morena & Melanina Poderosa',
      desc: 'A pele morena tem uma proteção natural incrível graças à melanina — mas isso não significa que ela não precisa de cuidado. A hiperpigmentação, manchas pós-inflamatórias e ressecamento são os maiores desafios. Com os ingredientes certos, o glow natural dessa pele é incomparável.',
      tips: [
        'Óleo de semente de uva: leve, não comedogênico, rico em vitamina E — ama pele morena',
        'Niacinamida 5% para uniformizar o tom e reduzir manchas escuras gradualmente',
        'Protetor solar com cor adequada ao tom — evita o aspecto esbranquiçado dos filtros minerais',
        'Máscara de cúrcuma + mel + iogurte: ilumina o tom e suaviza manchas',
        'Vitamina C sérica pela manhã para potencializar a proteção solar e o brilho',
      ]
    },
    'limpeza-profunda': {
      tag: 'Rotina · Primeiro passo',
      title: 'A Limpeza que Não Agride',
      desc: 'Lavar o rosto parece simples — mas é o passo que mais gente erra. Produto errado, água quente, esfregar demais. Para a pele sensível, a limpeza ideal é aquela que remove o que precisa sair sem levar junto o que a pele precisa manter.',
      tips: [
        'Óleo de girassol como "cleansing oil" — dissolve maquiagem e protetor sem ressecar',
        'Água morna (nunca quente) para não dilatar poros excessivamente',
        'Leite de aveia feito em casa: misture aveia fina com água e use como sabonete suave',
        'Pat seco com toalha limpa — nunca esfregue o rosto após lavar',
        'Se usar sabonete, busque pH entre 4,5 e 5,5 — o mais próximo do natural da pele',
      ]
    },
    'ritual-de-pele': {
      tag: 'Aplicação · Cuidado consciente',
      title: 'O Ritual que a Sua Pele Merece',
      desc: 'Skincare não é sobre ter 12 produtos na prateleira. É sobre aqueles 5 minutos do dia que são completamente seus — onde você olha para a sua pele com carinho e intenção. Um ritual simples, feito com constância, transforma mais do que qualquer produto caro.',
      tips: [
        'Ordem: limpeza → hidratante → protetor (manhã) / limpeza → sérum → óleo (noite)',
        'Aplique produtos com movimentos ascendentes e suaves — nunca puxe para baixo',
        'Gua sha ou jade roller gelado após o sérum: drena, define e acalma',
        'Máscara de aveia + banana amassada 1x por semana: hidratação profunda natural',
        'Respire fundo durante o ritual — o cortisol alto também aparece na pele',
      ]
    },
    'serum-oleos': {
      tag: 'Ativos · Camadas de cuidado',
      title: 'Séruns & Óleos que Transformam',
      desc: 'Séruns vão fundo. Óleos selam. Juntos, são a dupla mais poderosa de qualquer rotina — desde que você saiba usar na ordem certa. Para pele sensível, menos concentração e mais consistência é sempre a melhor estratégia.',
      tips: [
        'Sérum de niacinamida 5% (não mais) pela manhã: poros, brilho e uniformidade',
        'Óleo de roseira brava à noite: regenera enquanto você dorme — 2 gotinhas bastam',
        'Centella asiatica em sérum aquoso: cicatrização e calmante natural incomparável',
        'Óleo de jojoba é quimicamente similar ao sebo da pele — ótimo para equilibrar oleosidade',
        'Evite misturar vitamina C com retinol na mesma camada — use um de manhã, outro à noite',
      ]
    },
    'pele-sardas': {
      tag: 'Pele única · Identidade natural',
      title: 'Pele com Sardas: Sua Assinatura',
      desc: 'Sardas são concentrações naturais de melanina — e são absolutamente lindas. A pele com sardas costuma ser mais clara e portanto mais sensível ao sol. O objetivo não é apagar o que faz você única, mas cuidar para que a sua pele se sinta tão boa quanto parece.',
      tips: [
        'FPS 50+ mineral todos os dias — sardinhas escurecem muito com exposição solar sem proteção',
        'Água de pepino caseira como tônico: refresca, hidrata e suaviza levemente manchas',
        'Vitamina E pura (óleo) nas sardas maiores à noite — não apaga, mas uniformiza o entorno',
        'Evite ácidos fortes como glicólico em altas concentrações — irritam facilmente',
        'Base leve ou BB cream com FPS para os dias que você preferir um tom mais uniforme',
      ]
    },
    'pele-madura': {
      tag: 'Hidratação · Anti-aging natural',
      title: 'Pele Madura: Sabedoria & Brilho',
      desc: 'A pele madura produz menos sebo, colágeno e ácido hialurônico — mas isso não significa que ela perdeu o brilho. Significa que ela precisa de mais atenção e ingredientes mais ricos. A boa notícia? Muitos dos melhores ingredientes anti-aging vêm direto da natureza.',
      tips: [
        'Óleo de argan como base sob a hidratante — extraordinário para firmeza e luminosidade',
        'Máscara de abacate + mel + gotinhas de limão: colágeno natural e hidratação profunda',
        'Massagem facial diária com movimentos circulares: estimula circulação e produção de colágeno',
        'Vitamina C sérica pela manhã: antioxidante poderoso que combate o envelhecimento oxidativo',
        'Dormir de barriga para cima quando possível — reduz marcas de travesseiro que viram rugas',
      ]
    },
    'pele-radiante': {
      tag: 'Tom médio · Glow natural',
      title: 'Pele Radiante: O Brilho de Dentro',
      desc: 'O glow natural não vem de iluminador — vem de uma pele bem hidratada, bem nutrida e bem descansada. A pele de tom médio tem uma versatilidade incrível: responde muito bem tanto a ingredientes leves quanto a óleos mais ricos.',
      tips: [
        'Água de rosas + glicerina vegetal: hidratante caseiro leve que dá luminosidade real',
        'Esfoliação suave com açúcar mascavo + mel 1x por semana — remove células mortas e ilumina',
        'Óleo de maracujá pela manhã: levíssimo, não obstrui poros e dá um glow sutil',
        'Hidratação interna: 2L de água por dia + alimentos ricos em ômega-3',
        'Gelo facial pela manhã: contrai poros, reduz inchaço e deixa a pele visivelmente mais firme',
      ]
    },
    'pele-morena-clara': {
      tag: 'Tom dourado · Sardas naturais',
      title: 'Pele Morena Clara: Tom Dourado',
      desc: 'A pele morena clara tem aquela tonalidade dourada que parece sempre estar com um bronzeado sutil. As sardas naturais aparecem mais com o sol. É uma pele que ama sol mas precisa de proteção — a hiperpigmentação é o principal cuidado a ter.',
      tips: [
        'Protetor solar FPS 30 mínimo com cor que combine com o tom dourado',
        'Óleo de cártamo: leve, rico em ômega-6 e ótimo para manter o tom uniforme',
        'Máscara de argila rosa: mais suave que a verde, ideal para peles mistas a secas',
        'Vitamina C + niacinamida de manhã: inibem melanina em excesso e uniformizam',
        'Evite sol direto entre 10h e 16h mesmo com protetor — o bronzeado excessivo acumula danos',
      ]
    },
    'serum-vitamina-c': {
      tag: 'Ativo iluminador · Pele madura',
      title: 'Vitamina C: O Ativo que Ilumina',
      desc: 'A vitamina C é um dos antioxidantes mais estudados para a pele. Ela uniformiza o tom, estimula colágeno, protege contra danos solares e deixa a pele com aquele glow de saúde. Para pele sensível, a chave é começar em baixa concentração e aumentar devagar.',
      tips: [
        'Comece com 5% de vitamina C — concentrações altas podem irritar peles reativas',
        'Aplicar pela manhã antes do protetor solar — potencializa a proteção solar em até 4x',
        'Suco de laranja diluído como tônico caseiro: vitamina C natural e suave para o rosto',
        'Guarde o sérum longe da luz — a vitamina C oxida e perde eficácia em contato com o sol',
        'Se sentir ardência, misture 1 gota do sérum na hidratante — diluição reduz irritação',
      ]
    },
    'ombro-pescoco': {
      tag: 'Cuidado além do rosto',
      title: 'Pescoço & Colo: Pele que também Fala',
      desc: 'O pescoço e o colo envelhecem quase tão rápido quanto o rosto — mas quase sempre são esquecidos na rotina. São regiões com pele mais fina, menos glândulas sebáceas e muito expostas ao sol. Incluí-las no ritual faz toda a diferença a longo prazo.',
      tips: [
        'Estenda toda a rotina do rosto até o colo — os mesmos produtos, os mesmos cuidados',
        'Óleo de amêndoas doces: absorção rápida, ótimo para o pescoço e colo à noite',
        'Protetor solar no colo todos os dias que usar decote — manchas seniis aparecem cedo aí',
        'Movimentos ascendentes ao aplicar produtos no pescoço — sempre de baixo para cima',
        'Máscara de argila branca no colo 1x/mês: limpa, refina a textura e uniformiza',
      ]
    },
    'ritual-roller': {
      tag: 'Técnica · Drenagem linfática',
      title: 'Roller de Quartzo: Ritual & Resultado',
      desc: 'O jade roller e o quartzo rosa não são só bonitos — são ferramentas reais de cuidado. A massagem com roller estimula a circulação sanguínea, drena o líquido linfático acumulado (o responsável pelo rosto inchado de manhã) e ajuda os produtos a penetrarem melhor na pele.',
      tips: [
        'Use sempre com óleo ou sérum — nunca em pele seca, para não puxar',
        'Guarde na geladeira: roller frio de manhã desinchaça, fecha poros e acorda a pele',
        'Movimentos sempre de dentro para fora e de baixo para cima — respeite a drenagem linfática',
        'Limpe com água morna + sabonete neutro após cada uso — acumula bactérias facilmente',
        '5 minutos por dia são suficientes — a constância importa mais que a duração',
      ]
    },
    'pele-negra': {
      tag: 'Tom ébano · Glow profundo',
      title: 'Pele Negra: Riqueza & Cuidado',
      desc: 'A pele negra tem a maior proteção natural contra o sol de todos os fototipos — mas ainda assim precisa de FPS, hidratação e atenção. Os principais desafios são a hiperpigmentação pós-inflamatória (manchas escuras após espinhas ou lesões) e o ressecamento, que deixa a pele com aparência opaca.',
      tips: [
        'Óleo de karité (manteiga de shea) pura: a hidratante mais poderosa para pele negra seca',
        'Niacinamida para hiperpigmentação: desfaz manchas escuras sem irritar',
        'FPS 30+ é essencial — melanina protege, mas não imuniza contra danos UV e câncer de pele',
        'Evite produtos muito alcalinos (sabonetes comuns) — ressecam e opacificam o tom',
        'Óleo de baobá: nutritivo, de absorção rápida e perfeito para o glow característico da pele negra',
      ]
    },
    'gua-sha': {
      tag: 'Técnica · Sculpting facial',
      title: 'Gua Sha: A Arte do Sculpting Natural',
      desc: 'O gua sha vem da medicina tradicional chinesa e é uma das técnicas de cuidado com a pele mais antigas do mundo. Feito com pedra de quartzo ou jade, o movimento deslizante estimula colágeno, desfaz tensão muscular facial e define os contornos do rosto com uso regular.',
      tips: [
        'Sempre aplique óleo antes — o gua sha precisa deslizar, não arrastar a pele',
        'Pressão leve a média — vermelhidão passageira é normal, dor não é',
        'Foco na linha da mandíbula e zigomático para definição; testa e olhos para desinchar',
        'Use 3-4x por semana para ver resultados — o efeito é acumulativo com o tempo',
        'Guarde na geladeira e use pela manhã: a pedra fria potencializa a drenagem linfática',
      ]
    },
    'ritual-natural': {
      tag: 'Ingredientes · Cuidado em casa',
      title: 'Ritual Natural: O Cuidado que Você Já Tem',
      desc: 'O melhor skincare muitas vezes está na sua cozinha. Aveia, mel, pepino, matcha, azeite — ingredientes simples que a pele reconhece, absorve e agradece. Criar um ritual natural em casa não é complicado — é, na verdade, um dos gestos mais carinhosos que você pode ter consigo mesma.',
      tips: [
        'Aveia fina + água morna = limpeza suave ideal para pele sensível e reativa',
        'Mel cru como máscara hidratante: 10 minutos e a pele fica macia e luminosa',
        'Pepino fatiado gelado nos olhos: desinchaça, refresca e acalma a área mais delicada do rosto',
        'Matcha em pó + iogurte natural: máscara antioxidante que uniformiza o tom',
        'Azeite extra virgem nas pontas secas e cutículas — nunca desperdiçado, sempre útil',
      ]
    },
    'pele-ruiva': {
      tag: 'Tom rosado · Sardas intensas',
      title: 'Pele Ruiva: Delicada & Marcante',
      desc: 'A pele ruiva é frequentemente associada ao fototipo mais sensível de todos — ama o sol de longe e avermella num instante. As sardas fazem parte da identidade e precisam de proteção constante. É uma pele que requer paciência, cuidado com ingredientes e muita proteção solar.',
      tips: [
        'FPS 50+ é o mínimo — reaplicação a cada 2h em dias de sol intenso',
        'Aceite as sardas como parte de você — produtos agressivos para "apagar" fazem mais mal que bem',
        'Calêndula como ingrediente-chave: anti-inflamatória natural, perfeita para pele ruiva reativa',
        'Evite álcool, fragrâncias e corantes em qualquer produto — a reatividade é real',
        'Leite frio em compressa: calmante imediato para pele após exposição solar',
      ]
    },
  };

  function openSkinModal(card) {
    const key = card.dataset.skin;
    const data = skinData[key];
    if (!data) return;

    // Populate
    document.getElementById('skinModalTag').textContent = data.tag;
    document.getElementById('skinModalTitle').textContent = data.title;
    document.getElementById('skinModalDesc').textContent = data.desc;

    const tipsList = document.getElementById('skinModalTips');
    tipsList.innerHTML = data.tips.map(t => `<li>${t}</li>`).join('');

    // Grab image from the card
    const img = card.querySelector('img');
    const modalImg = document.getElementById('skinModalImg');
    if (img) {
      modalImg.src = img.src;
      modalImg.alt = data.title;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }

    document.getElementById('skinModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSkinModal(e) {
    if (e && e.target !== document.getElementById('skinModal')) return;
    document.getElementById('skinModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeSkinModalAndOpenQuiz() {
    document.getElementById('skinModal').classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => openQuiz(), 300);
  }

