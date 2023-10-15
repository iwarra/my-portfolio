<script setup></script>

<template>
  <header id="header">
    <div class="header-wrapper">
      <nav class="header-nav">
        <ul class="header-links">
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <section class="header-hero">
        <div class="hero-text">
          <h1 class="hero-title"> Hi, my name is Ivona! </h1>
          <h2 class="hero-subtitle"> I am a front-end developer based in Stockholm </h2>
          <div class="hero-buttons">
            <button 
              class="hero-primaryBtn" 
              type="submit" 
              onclick="window.open('ivona_josipovic_cv.pdf')"
              > Get my CV </button>
            <button class="hero-secondaryBtn"> Get in touch </button>
          </div>
        </div>
        <img 
          class="hero-img" 
          src="illustration.svg" 
          alt="illustration of girl sitting at a table with her laptop"
        >
      </section>
    </div>
  </header>
  <main>
    <section id="projects">
      <div class="projects-wrapper">

      </div>
    </section>
  </main>
  <footer></footer>
</template>

<style scoped lang="scss"> 
@import '../global.scss';

#header {
  background-image: url(../assets/grainy_texture.png), linear-gradient(var(--primary-peach), var(--primary-peach));

  .header-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    min-height: 50vh;
    justify-content: center;
    margin: 0 auto;

    .header-links {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: end;
    gap: 10px;
    margin-right: 2rem;

    a {
      text-decoration: none;
      color: var(--primary-accent);
    }
  }
  }

  .header-hero {
    display: flex; 
    justify-content: center;
    margin-inline: 2rem;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .hero-buttons {
    display: inline-block;

    .hero-primaryBtn {
      @extend %btn;
      align-self: start;
      background-color: var(--primary-accent);
      color: var(--primary-peach);
      margin-right: 10px;
    }

    .hero-secondaryBtn {
      @extend %btn;
      background-color: var(--primary-peach);
      color: var(--primary-accent);
    }
  }

  .hero-img {
    display: none;
  }

  .hero-title {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid transparent;
    font-size: 2em;
    width: 0;
    max-width: 350px;
    animation: typing 2s steps(30, end) forwards, blinking 2.5s 1;
  }
    
  @keyframes typing {
    from { width: 0 }
    to { width: 100% } 
  }

  @keyframes blinking {
    0% {border-color: transparent}
    50% {border-color: black}
    100% {border-color: transparent}
  }

  .hero-subtitle {
    font-size: 1.6em;
  }

  @media (min-width: 850px) {
    .header-wrapper {
      max-width: 1000px;
    }
    .header-hero{
      flex-direction: row;
      gap: 2rem;
    }

    .hero-img {
      display: flex;
      width: 300px;
      height: 300px;
    }

    .hero-title {
      font-size: 3em;
      max-width: 500px;
    }

    .hero-subtitle {
      font-size: 2em;
    } 
  }
}
</style>
