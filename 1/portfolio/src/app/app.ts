import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  portfolioData = {
    name: 'Ahmed Wael',
    jobTitle: 'Full Stack Developer',
    education: 'Bachelor of Computer Science - FCAI-CU',
    experience: 'Freelancing + Graduation Project',
    skills: [
      { name: 'Angular', level: 20 },
      { name: 'React', level: 85 },
      { name: 'Tailwind', level: 90 },
      { name: 'TypeScript', level: 75 }
    ],
    projects: [
      { title: 'Mintish Coffeehouse', description: 'Built with React Router, tailwind', image: 'https://lh3.googleusercontent.com/p/AF1QipPGiMYUGtkGEoZXeRYpSniYKtmJJK0yLT1BnOn_=w289-h312-n-k-no' },
      { title: 'Your Quote Of The Day', description: 'Built with react and tailwind', image: 'https://www.goodnet.org/photos/281x197/32952_hd.jpg' }
    ],
    socials: {
      facebook: 'https://facebook.com/notahmedwael',
      github: 'https://github.com/notahmedwael',
      linkedin: 'https://www.linkedin.com/in/ahmed-wael-9a6389284/'
    }
  };
}