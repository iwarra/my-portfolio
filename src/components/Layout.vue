<template>
  <header id="header" :class="`${$attrs.headerBackground}`">
    <div class="header-navWrapper">
      <div class="header-toggle">
        <div class="header-trigger"
          role="button"
          aria-label="Toggle"
          @click="() => toggle($attrs.navBackgroundColor)"
        >
          <span class="header-icon"></span>
        </div>
        <nav id="nav" class="header-nav hidden">
          <slot name="navLinks">
          </slot>
        </nav>
      </div>
      <div :class="`transition-decline hidden ${$attrs.navBackgroundColor}`" id="navTransitionEl"></div>
    </div>
    <slot name="hero"></slot>
  </header>

  <slot></slot>

  <footer>
    <div class="footer-wrapper">
      <small class="footer-copy">Copyright ©2023 Ivona Josipovic</small>
      <a href="#">
        <component class="footer-icon" is="IconsCircle" />
      </a>
    </div>
  </footer> 
</template>

<script setup>
//Created a custom layout component to be able to use named slots
defineOptions({
  inheritAttrs: false
})
</script>

<style lang="scss">
@import '../global.scss';

#header {
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
    height: 2px;

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
      @extend %btn !optional;
      align-self: start;
      background-color: var(--primary-accent);
      color: var(--secondary-light);
      margin-right: 1rem;
    }

    .hero-secondaryBtn {
      @extend %btn !optional;
      background-color: var(--secondary-light);
      color: var(--primary-accent);
    }
    
    a {
      text-decoration: none;
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
      
    .header-links {
      flex-direction: row;
      justify-content: flex-end;
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

 footer {
  background-image: url(/grainy_texture.png), linear-gradient(#eee, #eee);

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
    font-size: 2.4rem;
    color: var(--primary-accent);
    cursor: pointer;
    margin-bottom: -3px;
  }
}
</style>



