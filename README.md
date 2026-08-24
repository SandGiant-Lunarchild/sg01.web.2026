# sg01.net Website

This repository contains the source code and assets for the future sg01.net website. The website is built using modern web technologies and is designed to provide information about the sg01.net project, its features, and how to get involved.

This repository is mainly used for personal training, so I can practice my web development skills and experiment with new technologies. The website will serve as a portfolio piece to showcase my abilities in front-end and back-end development.

## Current State

This repository is currently in the early stages of development. The website is not yet live, and the codebase is still being structured and organized. The main focus at this stage is on setting up the project structure, implementing basic features, and ensuring that the website is responsive and accessible.

In-progress:
* Set up the project structure and configure the development environment.

## TODOs

* Implement the main landing page.
* Choose which pages to include in the website (e.g., About, Features, Contact). While not normally necessary, I want to include some interactive content so I can practice cloud networking skills.
* Choose a general design for the website.
* Implement backend functionality.
* Apply design and styling to the various frameworks.
* Implement front-end functionality and interactivity.
* Look into testing frameworks and write unit tests for the website's components and features.
* Test the website across different browsers and devices to ensure compatibility and responsiveness.
* Deploy the website to a hosting platform and make it live for public access.

## Choices

Some of the choices I have made for this project include:

* Use Angular, React and Blazor to try out different front-end frameworks and compare their performance and ease of use. Angular and React are popular JavaScript frameworks, while Blazor is a newer framework that allows for building web applications using C# and .NET. This will allow me to gain experience with different front-end technologies and see which one works best for my needs.
* Use .NET Aspire to run everything. This allows for easy testing and debugging of all the different frameworks in one place, while also providing all logs and telemetry is one place.
* Use Tailwind for styling. It is a popular framework that a lot of companies use, so getting familiar with it is a plus.
* Use Tanstack Router for React. While not as popular as React Router or Next.js, I want to try it out and see how it compares to other routing libraries.
* For localization routes: Use route to determine language, default route is English, /nl prefix for Dutch.
* Blazor: Use ASP.NET built-in localization, to gain experience with it. After some trial and error managed to set up the routing to match.
* React: Use Paraglide, as it seems to be the most flexible library suggested by Tanstack which I use for routing. It has built-in support for the route setup.
* Angular: Tried to use the built-in localization, but ran into some problems (not supported with ngx-env, can't switch between languages in dev). Ended up using ngx-translate instead, since it is more flexible and supports live-reloading. Setup routes for language with common sub-routes for the normal pages.