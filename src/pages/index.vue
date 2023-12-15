<script setup>
useHead({
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
});

import { aboutMe } from '../data/content.js';

const { data: projects } = await useFetch('/api/projects')
const { data: skills } = await useFetch('/api/skills/technical')
const { data: softSkills } = await useFetch('/api/skills/soft')
const { data: communities } = await useFetch('/api/communities')
const { data: testimonials } = await useFetch('/api/testimonials', {
  transform: (testimonials) => testimonials.map(testimonial => {
    return {
      ...testimonial, 
      recomendation: testimonial.recommendation.replace(/\n/g, '<br>')
    }
  })
})

</script>

<template>
  <Layout navBackgroundColor="gray" headerBackground="pink">
    <template #hero>
      <div class="header-wrapper">
      <section class="header-hero">
        <div class="hero-text">
          <h1 class="hero-title"> Hi, my name is Ivona! </h1>
          <h2 class="hero-subtitle"> I am a front-end developer based in Stockholm </h2>
          <div class="hero-buttons">
            <a href="/ivona_josipovic_cv.pdf" target="_blank"               class="hero-primaryBtn">Get my CV</a>
            <a href="#contact" class="hero-secondaryBtn">Get in touch</a>
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
    </template>

    <template #navLinks>
      <menu class="header-links">
        <li><a href="#projects">Projects</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <!-- <li><NuxtLink to="/blog">Blog</NuxtLink></li> -->
      </menu>
    </template>
    
    <main>
      <section id="projects">
        <h2 class="projects-title">My projects</h2>
        <Carousel 
          class="projects-wrapper"
          selector="projects-list"
          @arrowClicked="(direction) => projects = slide(projects, direction)"
          @dragged="(direction) => projects = slide(projects, direction)"
        >
          <li 
            class="project-card" 
            v-for="project in projects"
            :key="project.title"
          >
            <img class="project-img" :src="project.image" :alt="`screenshot of the ${project.title} user interface`">
            <div class="project-text">
              <h3 class="project-title"> {{ project.title }}</h3>
              <span class="project-tools"> Tools used: 
                {{ listFormatter.format(project.tools) }}
              </span>
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
        </Carousel>
        <div class="transition-decline gray"></div>
      </section>
      <section id="about">
        <h2 class="about-title">About me</h2>
          <div class="about-wrapper">
            <div class="about-skills">
              <h3>My skills</h3>
              <ul class="skills-list">
                <Box v-for="skill in skills" 
                  :key="skill.name"
                  :name="skill.name"
                  :icon="skill.icon"
                  iconType="component"
                />
              </ul>
            </div>
            <div class="about-text">
              <h3>Get to know me</h3>
              <p>{{ aboutMe }}</p>
            </div>
            <div class="about-skills">
              <h3>My soft skills</h3>
              <ul class="skills-list">
                <Box v-for="skill in softSkills" 
                  :key="skill.name"
                  :name="skill.name"
                  :icon="skill.icon"
                  iconType="img"
                />
              </ul>
            </div>
          </div>
          <div class="transition-incline gray"></div>
      </section>
      <section id="communities">
        <h2 class="communities-title"> My communities </h2>
        <div class="communities-wrapper">
          <ul class="communities-list">
            <li v-for="com in communities" :key="com.org">
            <img :src="com.logo" :alt="`logo of ${com.org}`" class="communities-logo"></li>
          </ul>
        </div>
        <div class="transition-decline gray"></div>
      </section>
      <section id="testimonials">
        <h2 class="testimonials-title">Others have said</h2>
        <Carousel 
          class="testimonials-wrapper" 
          selector="testimonials-list"
          @arrowClicked="(destination) => testimonials = slide(testimonials, destination)"
          @dragged="(destination) => testimonials = slide(testimonials, destination)"
        >
          <li v-for="(testimonial) in testimonials" 
            class="testimonial-card" 
            :key="testimonial.from"
          >
            <img class="testimonial-quoteLeft" src="/quote-left.png" alt="opening quotation mark">
            <em><p class="testimonial-text"> {{ testimonial.recommendation }}</p></em>
            <span class="testimonial-signature"> - {{ testimonial.from}}, {{ testimonial.workTitle }}</span>
            <img class="testimonial-quoteRight" src="/quote-right.png" alt="closing quotation mark">
          </li>
        </Carousel>
        <div class="transition-incline pink"></div>
      </section>
      <section id="contact">
        <h2 class="contact-title">Let's connect</h2>
        <ul class="contact-list">
          <li>
            <a href="https://www.linkedin.com/in/ivona-josipovic/" target="_blank">
            <component is="IconsLinkedin" class="contact-icon" />
          </a>
          </li>
          <li>
            <a href="mailto:josipovic.ivona@gmail.com" target="_blank">
              <component is="IconsMail" class="contact-icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/iwarra" target="_blank">
              <component is="IconsGithub" class="contact-icon" />
            </a>
          </li>
        </ul>
      </section>
    </main>
  </Layout>

</template>

<style scoped lang="scss"> 
@import '../global.scss';

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

  @media (min-width: 1000px) {
    .project-text {
      padding: 2rem;
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

  @media (min-width: 1000px) {
    .communities-list {
      flex-direction: row;
      gap: 3.8rem;
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
    background-image: url(/grainy_texture.png), linear-gradient(var(--primary-light), var(--primary-light));
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
    font-size: 4rem;
    color: var(--primary-accent);
  }

  .contact-info {
    font-size: 1.2rem;
    color: var(--primary-accent);
  }

}
</style>

