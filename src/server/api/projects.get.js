export default defineEventHandler(() => {
  return [
    {
      title: 'Habit Tracker',
      description: 'Habit tracking website built with React. Under construction.',
      image: 'ht.png',
      tools: ['React', 'JavaScript', 'SCSS'],
      links: {
        gitHub: 'https://github.com/iwarra/habit-tracker',
        liveDemo: ''
      }
    },
    {
      title: 'Vue Dashboard',
      description: 'A user system developed with Vue3 and Vite. State managed with Pinia.',
      image: 'vue.png',
      tools: ['Vue', 'Vite', 'Pinia', 'JavaScript'],
      links: {
        gitHub: 'https://github.com/iwarra/vue-system', 
        liveDemo: 'https://vue-system-dashboard.netlify.app/'
      }
    },
    {
      title: 'Quiz App',
      description: 'A quiz app built with Typescript and React. Styled with styled components.',
      image: 'quiz.png',
      tools: ['React', 'TypeScript', 'Styled Components'],
      links: {
        gitHub: 'https://github.com/iwarra/quiz-app',
        liveDemo: 'https://fun-trivia-night.netlify.app/'
      }
    },
    {
      title: 'Poditory',
      description: 'A project built with vanilla JS, HTLM and CSS. The coding challenge was to fetch and display ten podcasts from Sveriges Radio API.',
      image: 'poditory.png',
      tools: ['HTML', 'JavaScript', 'CSS'],
      links: {
        gitHub: 'https://github.com/iwarra/podcast-project',
        liveDemo: 'https://poditory.ivona.se/'
      }
    },
    {
      title: 'Exerciser',
      description: 'Fullstack MERN app with all CRUD operations.',
      image: 'exerciser.png',
      tools: ['React', 'Node', 'Express', 'MongoDB'],
      links: {
        gitHub: 'https://github.com/iwarra/excercise-app',
        liveDemo: 'https://exerciser.netlify.app/'
      }
    },
  ]
})