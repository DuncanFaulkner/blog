import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { of } from 'rxjs';
import { PageHeaderComponent } from '../components/page-header/page-header.component';
import { PillComponent } from '../components/pill/pill.component';
import { PreviewCardComponent } from '../components/preview-card/preview-card.component';
import { RecentPostsComponent } from '../components/recent-posts/recent-posts.component';
import { SocialMediaComponent } from '../components/social-media/social-media.component';
import { ImagePipe } from '../pipes/image.pipe';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'certification-page',
  standalone: true,
  imports: [
    AsyncPipe,
    PageHeaderComponent,
    PreviewCardComponent,
    SocialMediaComponent,
    RecentPostsComponent,
    PillComponent,
    ImagePipe,
  ],
  template: `
    <section class="main"></section>
    <section class="certs">
      <h1>Angular Certifications</h1>
      Angular Level 1 Certification Exam
      <p>
        You've been working with Angular for a while and want to take your
        career to the next level. Obtaining a qualification is a step towards
        your goal and career progression.
      </p>
      <p>
        This entry level certification is aimed at junior developers who want to
        showcase their skills. This certification exam is to validate your
        skills as a new Angular Developer.
      </p>
      <div class="logo">
        <img src="images/cert-level-1.png" alt="level 1 logo" />
      </div>
      <ul>
        <li>Level 1: Junior developer</li>
        <li>Exam time: 25 minutes</li>
        <li>Format: Online quiz</li>
        <li>Attempts: 1 (no free retry)</li>
      </ul>
      <br />
      <a class="linkbtn" href="https://bit.ly/ng-cert-1" target="_blank"
        >Take Exam</a
      >
      <br /><br />
      <hr />
      Angular Level 2 Certification Exam
      <p>
        You've been working with Angular for a couple of years and want to
        showcase your skills. With this certification exam validate your
        experience as an Angular Developer.
      </p>
      <p>
        Certified developers can use their exam results as a reference when
        applying for a developers position. Our exam is meant to recognise
        Angular developers and help them progress to the next step in their
        careers.
      </p>
      <div class="logo">
        <img src="images/cert-level-2.png" alt="level 2 logo" />
      </div>
      <ul>
        <li>Level 2: Intermediate developer</li>
        <li>Exam duration: 3 to 5 hours</li>
        <li>Format: Online quiz, coding challenge and interview</li>
        <li>Attempts: 1 (no free retry)</li>
      </ul>
      <br />
      <a class="linkbtn" href="https://bit.ly/ng-cert-2" target="_blank"
        >Take Exam</a
      >
      <br /><br />
      <hr />
      Angular Level 3 Certification Exam
      <p>
        You know Angular very well and have working with it for several years
        and want to showcase your expertise. With this certification exam
        validate your experience as an expert Angular Developer.
      </p>
      <p>
        Certified developers can use their exam results as a reference when
        applying for a developers position. Our exam is meant to recognise
        Angular developers and help them progress to the next step in their
        careers.
      </p>
      <div class="logo">
        <img src="images/cert-level-3.png" alt="level 3 logo" />
      </div>
      <ul>
        <li>Level 3: Expert developer</li>
        <li>Exam duration: 3 to 5 hours</li>
        <li>Format: Online quiz, coding challenge and interview</li>
        <li>Attempts: 1 (no free retry)</li>
      </ul>
      <br />
      <a class="linkbtn" href="https://bit.ly/ng-cert-3" target="_blank"
        >Take Exam</a
      >
      <br /><br />
      <hr />
      <h2 class="title">Get your certificate!</h2>
      <ul>
        <li>Validate your skils as an Angular developer.</li>
        <li>
          Your own personalised certificate that can be verified by employers
          using our online certification checker.
        </li>
        <li>
          Use your exam result as a reference when applying for a developers
          position.
        </li>
      </ul>
      <div class="logo">
        <img src="images/certificate.webp" alt="level 3 logo" />
      </div>
    </section>
  `,
  styles: [
    `
      section.main {
        min-height: 20vh;
        background-size: cover;
        background-attachment: fixed;
        background-position: center right;
      }

      section.certs {
        position: relative;
        max-width: var(--max-page-width);
        margin: -80px auto 0;
        background-color: var(--color-primary);
        padding: 0 20px 20px;

        border: 10px solid;
        border-image-slice: 1;
        border-width: 5px;
        border-image-source: linear-gradient(to left, #ff66c4, #5170ff);
      }

      li {
        list-style-type: none;
      }

      .title {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 3.125rem;
        text-transform: uppercase;
      }
      .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    `,
  ],
})
export default class CertificationComponent {
  private content = inject(ContentService);
  certifications$ = of(this.content.certification);
}
