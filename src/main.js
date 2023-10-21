import { createApp } from 'vue'
import './global.scss'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCode, faEnvelope, faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faJs, faHtml5, faReact, faVuejs, faCss3Alt, faSass, faGithub, faNpm, faBootstrap, faWordpress, faNode, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add( faJs, faHtml5, faReact, faVuejs, faCss3Alt, faSass, faGithub, faCode, faNpm, faBootstrap, faWordpress, faNode, faEnvelope, faLinkedin, faCircleChevronUp )

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
