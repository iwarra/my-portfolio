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
const { data: latestPosts } = await useAsyncData('latest', (() => queryContent('/')
.limit(5)
.without('body')
.find())) 

const projectsCarousel = ref(null);
const testimonialsCarousel = ref(null);
const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
  wrapAround: true,
};
const breakpointsProjects = {
  // 670px and up
  670: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 1020 and up
  1020: {
    itemsToShow: 3,
    snapAlign: 'start',
  }
};
const breakpointsTestimonials = {
  // 850px and up
  850: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
};
</script>

<template>
  <Layout navBackgroundColor="gray" headerBackground="pink">
    <template #hero>
      <div class="header-wrapper">
      <section class="header-hero">
        <div class="hero-text">
          <h1 class="hero-title"> Hi, my name is Ivona! </h1>
          <p class="hero-subtitle"> I am a front-end developer based in Stockholm </p>
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
    </template>

    <template #navLinks>
      <menu class="header-links">
        <li><a href="#projects">Projects</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <DevOnly><li><NuxtLink to="/blog">Blog</NuxtLink></li></DevOnly>
      </menu>
    </template>
    
    <main>
      <Separator styling="incline" />
      <section id="projects">
        <h2 class="projects-title">My projects</h2>
        <div class="carousel-container">
          <img src="/arrow-left.svg" 
            @click="() => projectsCarousel.prev()"
            class="arrow-icon"
            alt="arrow pointing left">
          <ExternalCarousel
            ref="projectsCarousel"
            v-bind="settings" 
            :breakpoints="breakpointsProjects"
            class="projects-wrapper"
          >
          <ExternalSlide 
            class="project-card" 
            v-for="project in projects"
            :key="project.title"
          >
          <div class="project-wrap">
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
          </div>
          </ExternalSlide>
          </ExternalCarousel>
          <img src="/arrow-right.svg" 
            alt="arrow pointing right" 
            class="arrow-icon"
            @click="() => projectsCarousel.next()">
        </div>
      </section>
      <Separator styling="decline" />
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
              <p style="text-align: justify;">{{ aboutMe }}</p>
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
      </section>
      <Separator styling="incline" />
      <section id="communities">
        <h2 class="communities-title"> My communities </h2>
        <div class="communities-wrapper">
          <ul class="communities-list">
            <li v-for="com in communities" :key="com.org">
            <img :src="com.logo" :alt="`logo of ${com.org}`" class="communities-logo"></li>
          </ul>
        </div>
      </section>
      <Separator styling="decline" />
      <section id="testimonials" >
        <h2 class="testimonials-title">Others have said</h2>
        <div class="carousel-container">
        <img src="/arrow-left.svg" 
          @click="() => testimonialsCarousel.prev()"
          class="arrow-icon"
          alt="arrow pointing left">
        <ExternalCarousel 
          class="testimonials-wrapper" 
          ref="testimonialsCarousel"
          v-bind="settings" 
          :breakpoints="breakpointsTestimonials"
        >
          <ExternalSlide v-for="(testimonial) in testimonials" 
            class="testimonial-card" 
            :key="testimonial.from"
          >
          <div class="testimonial-wrap">
            <img class="testimonial-quoteLeft" src="/quote-left.png" alt="opening quotation mark">
            <em><p class="testimonial-text"> {{ testimonial.recommendation }}</p></em>
            <span class="testimonial-signature"> - {{ testimonial.from}}, {{ testimonial.workTitle }}</span>
            <img class="testimonial-quoteRight" src="/quote-right.png" alt="closing quotation mark">
          </div>
          </ExternalSlide>
        </ExternalCarousel>
        <img src="/arrow-right.svg" 
          alt="arrow pointing right" 
          class="arrow-icon"
          @click="() => testimonialsCarousel.next()">
        </div> 
      </section>
      <Separator styling="incline" />
      <section id="blog">
        <h2>Latest posts</h2>
        <div class="blog-wrapper">
          <ul class="blog-list">
            <li v-for="post in latestPosts" class="blog-item"> 
              <NuxtLink :to="'blog' + post._path" class="blog-link"> 
                {{ post.title }} 
                <time class="post-date"> {{ new Date(post.date).getDate() }}/{{ new Date(post.date).getMonth() }}/{{ new Date(post.date).getFullYear() }}</time>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
      <Separator styling="decline" />
      <section id="contact" >
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
  position: relative;

  .projects-wrapper {
    // display: grid;
    // grid-auto-flow: column;
    //align-items: center;
    // overflow: hidden;
    max-width: 82vw;
    margin-bottom: 1rem;
    z-index: 2;
    text-align: start;
  }

  .project-wrap {
    margin-inline: .8rem ;
    background-color: var(--primary-light);
    border-radius: var(--borderRadius-large);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .project-card {
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
    background-color: rgba(229, 229, 229, 0.6901960784);
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
      color: var(--font-secondary);
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

  @media (min-width: 1200px) {
    .projects-wrapper {
      max-width: 1120px;
    }
  }
}

#about {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  .about-wrapper {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin: 0 3rem 3rem 3rem;
    z-index: 2;
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

  .communities-wrapper {
    max-width: 1000px;
    z-index: 2;
    margin-inline: 3rem;
  }

  .communities-list {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3rem;

    img {
     max-height: 80px;
   }
  }
}

#testimonials {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  position: relative;

  .testimonial-card {
    display: flex;
    flex-direction: column;
  }

  .testimonial-wrap {
    margin: 0 5px;
    border-radius: var(--borderRadius-large);
    border: 1px solid var(--primary-accent);
    flex: 1;
    position: relative;
    padding: 4rem 2.5rem;
    background-image: url(/grainy_texture.png), linear-gradient(var(--primary-light), var(--primary-light));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .testimonial-text {
    max-height: 300px;
    overflow: auto; 
    margin-bottom: 3rem;
    font-size: 1.1rem;
    text-align: start;
    scrollbar-color: var(--primary-accent) transparent;
    scrollbar-width: thin;
    padding-right: 1rem;
  }

  .testimonials-wrapper {
    display: flex;
    max-width: 85vw;
    overflow: hidden;
    margin-bottom: 2rem;
    z-index: 2;
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
    text-align: start;
  }

  @media (min-width: 1200px) {
    .testimonials-wrapper {
      max-width: 1110px;
    }
  }
}

#blog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  .blog-wrapper {
    max-width: 1000px;
  }

  .blog-list {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    list-style: none;
    margin-inline: 3rem;
  }
  
  .blog-link {
    text-decoration: none;
    padding-bottom: 5px;
    border-bottom: dotted 1px var(--primary-accent);
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: .8rem;
    align-items: center;
    text-align: center;
    color: #551a8b;
  }

  @media (min-width: 850px) {
    .blog-link {
      flex-direction: row;
      justify-content: space-between;
    }
    .blog-wrapper {
      width: 100%;
    }
  }
}

#contact {
  .contact-title {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .contact-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    gap: 2.5rem;
    padding-bottom: 4rem;
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

