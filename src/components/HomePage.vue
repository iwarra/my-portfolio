<script setup>
import { ref, computed } from 'vue';
import { projects } from '../data.js';

const projectsRef = ref(projects);
let currentProjects = computed(() => projectsRef.value);

const moveLeft = () => {
  projectsRef.value = [...currentProjects.value.slice(1), currentProjects.value.at(0)];
};

const moveRight = () => {
  projectsRef.value = [currentProjects.value.at(-1), ...currentProjects.value.slice(0, -1)];
};

function setBorderColor(project) {
  const toolColors = {
    Vue: '#42b883',
    React: '#75dcfd',
  }

  for (let tool in toolColors) {
    if (project.tools.includes(tool)) return toolColors[tool]
  }  
  return 'transparent'
};
</script>

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
      <h2 class="projects-title">My projects</h2>
      <div class="projects-wrapper">
        <img src="arrow-left.svg" 
          alt="arrow pointing left" 
          aria-label="button" 
          class="arrow-icon"
          @click="moveLeft"
        >
          <ul class="projects-list">
            <li 
              class="project-card" 
              v-for="project in projectsRef"
              :style="`border: 2px solid ${setBorderColor(project)}`"
              :key="project.title"
            >
              <img class="project-img" :src="project.image" alt="screenshot of the projects user interface">
              <div class="project-text">
                <h3 class="project-title"> {{ project.title }}</h3>
                <ul class="project-tools"> Tools used:
                  <li v-for="(tool, index) in project.tools">
                    {{ tool }}{{index < project.tools.length - 1 ? ', ' : ' '}}
                  </li>
                </ul>
                <p class="project-description"> {{ project.description }} </p>
                <ul class="project-links">
                  <li>
                    <a :href="project.links.gitHub">GitHub</a> 
                  </li>
                  <li>
                    <a :href="project.links.liveDemo">Live Demo</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        <img 
          src="arrow-right.svg" 
          alt="arrow pointing right" 
          aria-label="button" 
          class="arrow-icon"
          @click="moveRight"
        >
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
    font-size: 2rem;
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
    font-size: 1.6rem;
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
      font-size: 3rem;
      max-width: 500px;
    }

    .hero-subtitle {
      font-size: 2rem;
    } 
  }
}

@media (min-width: 850px) {
  #header {
    padding-block: 3rem;
  }
}

#projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 3rem;

  .projects-title {
    margin-bottom: 1.5rem;
  }

  .projects-wrapper {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    max-width: 1200px;
    overflow: hidden;
  }

  .projects-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
  }

  .project-card {
    background-color: #e5e5e5;
    border-radius: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    max-height: 500px;
  }

  .project-text {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    flex: 1;
    line-height: 1.2;
  }

  .project-img {
    width: 100%;
    aspect-ratio: 2/1.5;
    object-fit: cover;
    object-position: 0 0;
  }

  .project-links {
    list-style: none;

    li {
      display: inline;
      margin-right: .8rem;
    }
  }

  .project-tools {
    list-style: none;
    font-weight: 600;
    color: var(--primary-accent);

    li {
      display: inline;
    }
  }

  .arrow-icon {
    max-width: 4rem;
    cursor: pointer; 
  }

  @media (min-width: 580px) {
    .projects-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 1rem;
    }
  }

  @media (min-width: 950px) {
    .projects-list {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1rem;
    }
  }
}

</style>
