import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { provideFileRouter } from '@analogjs/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { withPrismHighlighter } from "@analogjs/content/prism-highlighter";

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(),
    // provideClientHydration(),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
  ],
};
