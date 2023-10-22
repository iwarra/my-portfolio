<script setup>
import { ref, computed } from 'vue';
import { projects, skills, aboutMe } from '../data.js';

const projectsRef = ref(projects);
let currentProjects = computed(() => projectsRef.value);

const moveLeft = () => {
  projectsRef.value = [...currentProjects.value.slice(1), currentProjects.value.at(0)];
};

const moveRight = () => {
  projectsRef.value = [currentProjects.value.at(-1), ...currentProjects.value.slice(0, -1)];
};

const openCV = () => {
  window.open('ivona_josipovic_cv.pdf');
};

const scrollToContact = () => {
  document.querySelector('#contact').scrollIntoView();
};

// function setBorderColor(project) {
//   const toolColors = {
//     Vue: '#42b883',
//     React: '#75dcfd',
//   }

//   for (let tool in toolColors) {
//     if (project.tools.includes(tool)) return toolColors[tool]
//   }  
//   return 'transparent'
// };

// Applied in the component with  :style="`border: 2px solid ${setBorderColor(project)}`" 
</script>

<template>
  <header id="header">
    <div class="header-wrapper">
      <nav class="header-nav">
        <ul class="header-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <!-- <li><a href="#blog">Blog</a></li> -->
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
              @click="openCV"
            > Get my CV </button>
            <button 
              class="hero-secondaryBtn" 
              @click="scrollToContact"
            > Get in touch </button>
          </div>
        </div>
        <img 
          class="hero-img" 
          src="illustration.svg" 
          alt="illustration of girl sitting at a table with her laptop"
        >
      </section>
    </div>
    <div class="transition-skew pink"></div>
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
      <div class="transition-unskew gray"></div>
    </section>
    <section id="about">
      <h2 class="about-title">About me</h2>
        <div class="about-wrapper">
          <div class="about-skills">
            <h3>My Skills</h3>
            <u class="skills-list">
               <li v-for="skill in skills"
                class="skills-item"
               >
                <font-awesome-icon
                  :icon="skill.icon"
                ></font-awesome-icon>
                <span> {{ skill.name }} </span>
              </li>
            </u>
          </div>
          <div class="about-text">
            <h3>Get to know me</h3>
            <p>{{ aboutMe }}</p>
          </div>
        </div>
        <div class="transition-skew gray"></div>
    </section>
    <section id="contact">
      <h2 class="contact-title">Let's connect</h2>
      <ul class="contact-list">
        <li><a href="https://www.linkedin.com/in/ivona-josipovic/" target="_blank">
          <font-awesome-icon 
            icon="fa-brands fa-linkedin fa-lg"
            class="contact-icon"
          ></font-awesome-icon>
          <span class="contact-info"> ivona-josipovic</span></a>
        </li>
        <li>
          <a href="mailto:josipovic.ivona@gmail.com" target="_blank">
            <font-awesome-icon 
              icon="fa-solid fa-envelope fa-lg"
              class="contact-icon"
            ></font-awesome-icon>
            <span class="contact-info"> josipovic.ivona[at]gmail.com</span></a>
        </li>
        <li>
          <a href="https://github.com/iwarra" target="_blank">
            <font-awesome-icon 
              icon="fa-brands fa-github fa-lg"
              class="contact-icon"
            ></font-awesome-icon>
            <span class="contact-info"> iwarra</span></a>
        </li>
      </ul>
    </section>
  </main>
  <footer id="footer">
    <div class="footer-wrapper">
      <small class="footer-copy">Copyright ©2023 Ivona Josipovic</small>
      <a class="footer-scrollUp" href="#">
        <font-awesome-icon 
          icon="fa-solid fa-circle-chevron-up"
          class="footer-icon"
        ></font-awesome-icon>
      </a> 
    </div>
  </footer>
</template>

<style scoped lang="scss"> 
@import '../global.scss';

#header {
  background-image: url(../assets/grainy_texture.png), linear-gradient(var(--primary-peach), var(--primary-peach));
  padding-top: 2rem;
  
  .header-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    min-height: 40vh;
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
    margin-inline: 3rem;
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
      margin-right: 12px;
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
      padding-top: 3rem;
    }
    .header-hero{
      flex-direction: row;
      justify-content: space-evenly;
      gap: 2rem;
    }

    .hero-img {
      display: flex;
      width: 300px;
      height: 300px;
    }

    .hero-title {
      font-size: 2.8rem;
      max-width: 500px;
    }

    .hero-subtitle {
      font-size: 2rem;
    } 
  }
}

#projects {
  display: flex;
  flex-direction: column;
  align-items: center;

  .projects-title {
    margin-bottom: 2rem;
    margin-top: 5rem;
  }

  .projects-wrapper {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    max-width: 1200px;
    overflow: hidden;
    margin-bottom: 2rem;
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
    max-height: 32rem;
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

#about {
  background-image: url(../assets/grainy_texture.png), linear-gradient(var(--primary-peach), var(--primary-peach));
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  .about-title {
    margin-bottom: 2rem;
    margin-top: 5rem;
  }

  .about-wrapper {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin: 0 3rem 3rem 3rem;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    gap: 1rem;
    text-decoration: none;

    .skills-item {
      padding: .8rem 1.2rem;
      font-size: 1.2rem;
      // background: rgba(172, 172, 172, 0.238);
      background-color: #f3bea252;
      border-radius: 5px;
      font-weight: 600;
      color: #666;
      
      span {
        margin-left: .5rem;
      }
    }
  }
  
  @media (min-width: 850px) {
    .about-text, .about-skills {
      flex: 1
    }

    .about-text {
      order: 1
    }
    .about-skills {
      order: 2
    }

    .about-wrapper {
      flex-direction: row;
    }
  }
}

#contact {
  .contact-title {
    text-align: center;
    margin-bottom: 1.2rem;
    margin-top: 3rem;
  }
  .contact-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1.2rem;
    align-items: center;
    margin-bottom: 3rem;
  }

  .contact-icon {
    height: 1.2rem;
    color: var(--primary-accent);
  }

  .contact-info {
    font-size: 1.2rem;
    color: var(--primary-accent);
  }

  @media (min-width: 850px) {
  .contact-list {
    flex-direction: row;
    justify-content: center;
  }
}
}

#footer {
  background-image: url(../assets/grainy_texture.png), linear-gradient(#eee, #eee);
  .footer-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-block: 1.2rem;
  }

  .footer-icon {
    height: 2.1rem;
    color: var(--primary-accent);
  }
}

</style>
