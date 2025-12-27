document.querySelector('#app').innerHTML = `
  <main class="main-content-index">
    <section id="accueil" class="hero">
      <div class="hero-content">
        <h1>Votre boîte à outils mathématiques</h1>
        <p>Des calculs rapides, simples et efficaces. SWMATH simplifie vos opérations mathématiques du quotidien sans prise de tête.</p>
        <a href="#outils" class="cta-button">Découvrir les outils</a>
      </div>
    </section>

    <section id="outils" class="features">
      <h2>Nos Outils</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">∞</div>
          <h3>PGCD & PPCM</h3>
          <p>Calculez instantanément le Plus Grand Commun Diviseur et le Plus Petit Commun Multiple de vos nombres. Rapide et précis.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">½</div>
          <h3>Simplification de fractions</h3>
          <p>Simplifiez vos fractions en un clic et obtenez la forme irréductible. Simple et efficace.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">∑</div>
          <h3>Plus d'outils à venir</h3>
          <p>Une plateforme en évolution constante qui accueillera de nouveaux outils mathématiques adaptés à vos besoins.</p>
        </div>
      </div>
    </section>

    <section id="apropos" class="about">
      <div class="about-content">
        <h2>À propos de SWMATH</h2>

        <div class="about-section">
          <h3>Pourquoi ce site ?</h3>
          <p>Que vous soyez étudiant, enseignant, parent ou simplement quelqu'un qui veut aller droit au but, les mathématiques peuvent parfois devenir un frein pour avancer. Calculer un PGCD, simplifier une fraction, comprendre un PPCM… ce sont des opérations simples, mais souvent fastidieuses.</p>
          <p>SWMATH est né pour rendre tout cela rapide, clair et accessible, sans prise de tête.</p>
        </div>

        <div class="about-section">
          <h3>Ce que vous trouverez ici</h3>
          <ul>
            <li>Un outil interactif pour calculer le PGCD et le PPCM en quelques secondes.</li>
            <li>Un module de simplification de fractions simple, précis et instantané.</li>
            <li>Une interface intuitive pour apprendre, comprendre et manipuler des concepts mathématiques essentiels.</li>
            <li>Une plateforme en évolution constante, conçue pour accueillir de nouveaux outils au fil du temps.</li>
          </ul>
        </div>

        <div class="about-section">
          <h3>Qui sommes-nous ?</h3>
          <p>SWMATH est un projet personnel créé par un passionné de développement web et de logique mathématique. L'objectif est simple : proposer un outil gratuit, pratique et agréable pour tous ceux qui souhaitent calculer vite et bien.</p>
        </div>

        <div class="about-section">
          <h3>Nos valeurs</h3>
          <ul>
            <li><strong>Accessibilité :</strong> Les mathématiques doivent être à la portée de tous.</li>
            <li><strong>Simplicité :</strong> Un design clair, moderne et sans superflu.</li>
            <li><strong>Efficacité :</strong> Vous offrir des résultats fiables, instantanément.</li>
          </ul>
        </div>

        <p style="margin-top: 2rem; text-align: center; font-style: italic;">Merci de visiter SWMATH. Le site continue de grandir, et vos suggestions sont toujours les bienvenues.</p>
      </div>
    </section>
  </main>
`

const navLinks = document.querySelector('.header-right-content')

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active')
  })
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})
