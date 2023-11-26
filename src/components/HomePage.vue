<script setup>
import { ref, computed } from 'vue';
import { projects, skills, aboutMe, softSkills, testimonials, communities } from '../data.js';

const projectsRef = ref(projects);
const testimonialsRef = ref(testimonials);
let currentTestimonials = computed(() => testimonialsRef.value);
let currentProjects = computed(() => projectsRef.value);
let coord;

const moveLeft = (category) => {
  if (category === 'projects') {
    projectsRef.value = [...currentProjects.value.slice(1), currentProjects.value.at(0)];
  } else {
    testimonialsRef.value = [...currentTestimonials.value.slice(1), currentTestimonials.value.at(0)];
  }
};

const moveRight = (category) => {
  if (category === 'projects') {
    projectsRef.value = [currentProjects.value.at(-1), ...currentProjects.value.slice(0, -1)];
  } else {
    testimonialsRef.value = [currentTestimonials.value.at(-1), ...currentTestimonials.value.slice(0, -1)];
  }
};

const dragStart = (start) => {
  coord = start.clientX
  document.querySelector(".projects-list").style.cursor = 'grabbing'
};

const dragEnd = (end) => {
  if (coord === end.clientX) return
  document.querySelector(".projects-list").style.cursor = 'grab'
  coord > end.clientX ? moveLeft('projects') : moveRight('projects')
};

const openCV = () => {
  window.open('ivona_josipovic_cv.pdf');
};

const addLineBreaks = (text) => {
  return text.replace(/\n/g, '<br>')
};

const toggleNavbar = () => {
  document.querySelector(".header-toggle").classList.toggle("header--active")  
  document.querySelector('.header-navWrapper').classList.toggle('gray') 
  document.getElementById('navTransitionEl').classList.toggle('hidden')
  document.querySelector('.header-nav').classList.toggle('hidden')
};
</script>

<template>
  <header id="header">  
    <div class="header-navWrapper">
       <div class="header-toggle">
        <div class="header-trigger"
          role="button"
          aria-label="Toggle"
          @click="toggleNavbar"
        >
          <span class="header-icon"></span>
        </div>
        <nav id="nav" class="header-nav hidden">
          <ul class="header-links">
            <li><a href="#projects">Projects</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <!-- <li><a href="#contact">Contact</a></li> -->
            <li><a href="https://thesmokedetector.net/category/coding/">Blog</a></li>
          </ul>
        </nav>
      </div>
      <div class="transition-decline hidden gray" id="navTransitionEl"></div>
    </div>
    <div class="header-wrapper">
      <section class="header-hero">
        <div class="hero-text">
          <h1 class="hero-title"> Hi, my name is Ivona! </h1>
          <h2 class="hero-subtitle"> I am a front-end developer based in Stockholm </h2>
          <div class="hero-buttons">
            <button 
            class="hero-primaryBtn" 
              @click="openCV"
            > Get my CV </button>
            <a href="#contact">
              <button class="hero-secondaryBtn"> Get in touch </button>
            </a>
          </div>
        </div>
        <img 
          class="hero-img" 
          src="/illustration.svg" 
          alt="illustration of girl sitting at a table with her laptop"
        >
      </section>
    </div>
    <div class="transition-incline pink"></div>
  </header>
  <main>
    <section id="projects">
      <h2 class="projects-title">My projects</h2>
      <div class="projects-wrapper">
        <img src="/arrow-left.svg" 
          alt="arrow pointing left" 
          role="button"
          aria-label="previous" 
          class="arrow-icon"
          @click="moveLeft('projects')"
        >
          <ul class="projects-list"
            @pointerdown.prevent="dragStart" 
            @pointerup.prevent="dragEnd">
            <li 
              class="project-card" 
              v-for="project in projectsRef"
              :key="project.title"
            >
              <img class="project-img" :src="project.image" :alt="`screenshot of the ${project.title} user interface`">
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
                  <span>|</span>
                  <li v-if="project.links.liveDemo !== ''">
                    <a :href="project.links.liveDemo">Live Demo</a>
                  </li>
                  <span v-else>In progress</span> 
                </ul>
              </div>
            </li>
          </ul>
        <img 
          src="/arrow-right.svg" 
          alt="arrow pointing right" 
          role="button"
          aria-label="next"  
          class="arrow-icon"
          @click="moveRight('projects')"
        >
      </div>
      <div class="transition-decline gray"></div>
    </section>
    <section id="about">
      <h2 class="about-title">About me</h2>
        <div class="about-wrapper">
          <div class="about-skills">
            <h3>My skills</h3>
            <ul class="skills-list">
                <li v-for="skill in skills"
                class="skills-item"
                >
                <font-awesome-icon
                  :icon="skill.icon"
                ></font-awesome-icon>
                <span> {{ skill.name }} </span>
              </li>
            </ul>
          </div>
          <div class="about-text">
            <h3>Get to know me</h3>
            <p>{{ aboutMe }}</p>
          </div>
          <div class="about-skills">
            <h3>My soft skills</h3>
            <ul class="skills-list">
                <li v-for="skill in softSkills"
                class="skills-item"
                >
                <img :src="`${skill.icon}`" alt="" class="skills-icon">
                <span> {{ skill.softSkill }} </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="transition-incline gray"></div>
    </section>
    <section id="communities">
      <h2 class="communities-title"> My communities </h2>
      <div class="communities-wrapper">
        <ul class="communities-list">
          <li v-for="com in communities">
          <img :src="com.logo" :alt="`logo of ${com.org}`" class="communities-logo"></li>
        </ul>
      </div>
      <div class="transition-decline gray"></div>
    </section>
    <section id="testimonials">
      <h2 class="testimonials-title">Others have said</h2>
      <div class="testimonials-wrapper">
        <img 
        src="/arrow-left.svg" 
        alt="arrow pointing left" 
        role="button"
        aria-label="previous"  
        class="arrow-icon"
        @click="moveLeft('testimonials')"
      >
        <ul class="testimonials-list">
          <li v-for="(testimonial) in testimonialsRef" 
          class="testimonial-card" 
          :key="testimonial.from"
          >
            <img class="testimonial-quoteLeft" src="/quote-left.png" alt="opening quotation mark">
            <em><p class="testimonial-text" v-html="addLineBreaks(testimonial.recommendation)"></p></em>
            <span class="testimonial-signature"> - {{ testimonial.from}}, {{ testimonial.workTitle }}</span>
            <img class="testimonial-quoteRight" src="/quote-right.png" alt="closing quotation mark">
          </li>
        </ul>
        <img 
          src="/arrow-right.svg" 
          alt="arrow pointing right" 
          role="button"
          aria-label="next"  
          class="arrow-icon"
          @click="moveRight('testimonials')"
        >
      </div>
      <div class="transition-incline pink"></div>
    </section>
    <section id="contact">
      <h2 class="contact-title">Let's connect</h2>
      <ul class="contact-list">
        <li>
          <a href="https://www.linkedin.com/in/ivona-josipovic/" target="_blank">
          <font-awesome-icon 
            icon="fa-brands fa-linkedin fa-lg"
            class="contact-icon"
          ></font-awesome-icon>
          <!-- <span class="contact-info"> ivona-josipovic</span> -->
        </a>
        </li>
        <li>
          <a href="mailto:josipovic.ivona@gmail.com" target="_blank">
            <font-awesome-icon 
              icon="fa-solid fa-envelope fa-lg"
              class="contact-icon"
            ></font-awesome-icon>
            <!-- <span class="contact-info"> josipovic.ivona[at]gmail.com</span> -->
          </a>
        </li>
        <li>
          <a href="https://github.com/iwarra" target="_blank">
            <font-awesome-icon 
              icon="fa-brands fa-github fa-lg"
              class="contact-icon"
            ></font-awesome-icon>
            <!-- <span class="contact-info"> iwarra</span> -->
          </a>
        </li>
      </ul>
    </section>
  </main>
  <footer id="footer">
    <div class="footer-wrapper">
      <small class="footer-copy">Copyright ©2023 Ivona Josipovic</small>
      <a href="#">
        <font-awesome-icon 
          icon="fa-solid fa-circle-chevron-up"
          class="footer-icon"
          role="button"
          aria-label="scroll up"
          aria-hidden="false"
        ></font-awesome-icon>
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss"> 
@import '../global.scss';

#header {
  background-image: url(../assets/grainy_texture.png), linear-gradient(var(--secondary-light), var(--secondary-light));

  .header-wrapper {
    display: flex;
    min-height: 40vh;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
  }

  .header-toggle {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: end;
    padding-right: 3rem;
    padding-top: 3rem;
    margin-bottom: -2rem;
  }

  .header-nav {
    order: 1;
  }

  .header-trigger {
    cursor: pointer;
    display: inline;
    width: 30px;
    height: 25px;
    order: 2;
  }

  .header-icon {
    display:inline-block;
    width:30px;
    height:5px;
    background-color: var(--primary-accent);
    transition-property: background-color, transform;
    transition-duration: 300ms;

    &:before,
    &:after {
      content:'';
      display:block;
      width:30px;
      height:5px;
      position: absolute;
      background: var(--primary-accent);
      transition-property: margin, transform;
      transition-duration: 300ms;
    }

    &:before {
      margin-top:-10px;
    }

    &:after {
      margin-top:10px;
    }
  }

  .header--active .header-icon {
    background: rgba(0,0,0,0.0);

    &:before {
      margin-top:0;
      transform:rotate(45deg);
    }

    &:after {
      margin-top:0;
      transform:rotate(-45deg);
    }
  }

  .header-links { 
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: .6rem;
    position: relative;
    z-index: 3;

    a {
      text-decoration: none;
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--primary-accent);
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
      color: var(--secondary-light);
      margin-right: 1rem;
    }

    .hero-secondaryBtn {
      @extend %btn;
      background-color: var(--secondary-light);
      color: var(--primary-accent);
    }

    a:hover {
      filter: none;
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
      margin: 0 auto;
      margin-top: 5rem;
    }

    .header-toggle {
      align-items: center;
    }
      
    .header-links {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
      gap: 1rem;
      list-style: none;      
        
      a {
        text-decoration: none;
        color: var(--primary-accent);
        font-size: 1.5rem;
      }  
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

  @media (min-width: 1200px) {
    .header-wrapper {
      margin-top: 6rem;
    }

    .header-toggle{
      padding-right: 12rem;
    }
    .header-hero {
      margin-inline: 0;
    }

    @media (min-width: 1600px) {
      .header-toggle{
        padding-right: 17rem;
      }
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
    cursor: grab;
  }

  .project-card {
    background-color: #e5e5e5;
    border-radius: var(--borderRadius-large);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 35rem;
  }

  .project-text {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    line-height: 1.2;
    flex: 1;
  }

  .project-img {
    width: 100%;
    aspect-ratio: 2/1.2;
    object-fit: cover;
    object-position: 0 0;
    border: 2px solid #e5e5e5;
    border-radius: var(--borderRadius-large) var(--borderRadius-large) 0 0;
  }

  .project-title {
    font-weight: 500;
    margin-bottom: 0;
  }

  .project-description {
    flex: 1;
  }

  .project-links {
    list-style: none;
    display: flex;
    gap: .8rem;
    
    a, a:visited {
      color: var(--primary-accent); 
    }

    span {
      color: gray;
    }
  }

  .project-tools {
    list-style: none;
    font-weight: 500;
    color: var(--secondary-accent);

    li {
      display: inline;
      font-size: 1rem;
    }
  }

  @media (min-width: 580px) {
    .projects-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 1rem;
    }
  } 

  @media (min-width: 1000px) {
    .project-text {
      padding: 2rem;
    }
    .projects-list {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1rem;
    }
  }
}

#about {
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
    gap: 4rem;
    margin: 0 3rem 3rem 3rem;
  }

  .about-text p {
    font-size: 1.15rem;
  }

  .skills-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .skills-item {
      padding: .8rem 1.2rem;
      font-size: 1.2rem;
      background-color: var(--primary-background);
      color: var(--font-light);
      border-radius: var(--borderRadius-small);
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .skills-icon {
        height: 25px;
      }
      
      span {
        margin-left: .5rem;
        font-weight: 600;
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
  }
}

#communities {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: end;
  align-items: center;

  .communities-title {
    margin-bottom: 2rem;
    margin-top: 4rem;
  }

  .communities-wrapper {
    max-width: 1000px;
  }

  .communities-list {
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;

    img {
     max-height: 80px;
   }
  }

  // .communities-logo {
  //   filter: grayscale(1);
  // }

  // .communities-logo:hover {
  //   filter: grayscale(0);
  // }

  @media (min-width: 850px) {
    .communities-list {
      flex-direction: row;
      gap: 4rem;
    }
  }
}

#testimonials {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  .testimonials-title {
    margin-bottom: 2rem;
    margin-top: 5rem;
  }

  .testimonial-text {
    max-height: 300px;
    overflow: auto; 
    margin-bottom: 2.5rem;
    font-size: 1.1rem;
    scrollbar-color: var(--primary-accent) transparent;
    scrollbar-width: thin;
    padding-right: 1rem;
  }

  .testimonials-wrapper {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    max-width: 1200px;
    overflow: hidden;
    margin-bottom: 2rem;
  }

  .testimonial-card {
    border-radius: var(--borderRadius-large);
    border: 1px solid var(--primary-accent);
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 4rem 2.5rem;
    background-image: url(/src/assets/grainy_texture.png), linear-gradient(var(--primary-light), var(--primary-light));
  }
 
  .testimonials-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
  }

  // scrollbar style for older browsers
  ::-webkit-scrollbar {
    background: transparent;
    height: 8px;
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--primary-accent);
    border-radius: 6px;
  }


  .testimonial-quoteLeft {
    position: absolute;
    height: 40px;
    top: .8rem;
    left: 1rem;
  }

  .testimonial-quoteRight {
    position: absolute;
    height: 40px;
    bottom: .8rem;
    right: 1rem;
  }

  .testimonial-signature {
    font-weight: 600;
    position: absolute;
    bottom: 2rem;
    text-wrap: wrap;
    padding-right: 3.5rem;
  }

  @media (min-width: 850px) {
    .testimonials-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-column-gap: 1rem;
    }
  } 
}

#contact {
  .contact-title {
    text-align: center;
    margin-bottom: 1.5rem;
    margin-top: 5rem;
  }
  .contact-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    gap: 2.5rem;
    margin-bottom: 4rem;
  }

  .contact-icon {
    height: 4rem;
    color: var(--primary-accent);
  }

  .contact-info {
    font-size: 1.2rem;
    color: var(--primary-accent);
  }

//   @media (min-width: 850px) {
//   .contact-list {
//     flex-direction: row;
//     justify-content: center;
//     margin-bottom: 4rem;
//   }
// }
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
    padding-block: 1.8rem;
  }

  .footer-icon {
    height: 2.4rem;
    color: var(--primary-accent);
    cursor: pointer;
    margin-bottom: -3px;
  }
}
</style>

