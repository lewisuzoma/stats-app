# StatsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

# Angular Setup Instructions

This README provides step-by-step instructions on how to set up and run this Angular project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js and npm (or yarn):** Angular rely on Node.js for various development tasks. You can download and install the latest LTS version from [https://nodejs.org/](https://nodejs.org/). npm (Node Package Manager) comes bundled with Node.js. Alternatively, you can use yarn, which can be installed from [https://yarnpkg.com/](https://yarnpkg.com/).

    To verify your installation, open your terminal or command prompt and run:

    ```bash
    node -v
    npm -v  # or yarn --version
    ```

* **Git:** Git is a version control system used by many development workflows and is often required for project setup. You can download and install it from [https://git-scm.com/](https://git-scm.com/).

    To verify your installation, run:

    ```bash
    git --version
    ```

* **Angular CLI (Command Line Interface):** Angular projects leverage the Angular CLI for managing Angular-specific tasks. It's usually installed automatically as a dependency of an project, but if you encounter issues, you can install it globally:

    ```bash
    npm install -g @angular/cli
    # or
    yarn global add @angular/cli
    ```

    To verify your installation, run:

    ```bash
    ng --version
    ```

## Installation

Follow these steps to set up the project:

1.  **Clone the repository (if you haven't already):**

    If you have the project code in a Git repository (like the one you mentioned earlier: `https://github.com/lewisuzoma/stats-app.git`), clone it to your local machine:

    ```bash
    git clone [https://github.com/lewisuzoma/stats-app.git](https://github.com/lewisuzoma/stats-app.git)
    cd stats-app
    ```

2.  **Install project dependencies:**

    Navigate to the project directory in your terminal and install the necessary Node.js packages (Angular, and other dependencies) using npm or yarn:

    ```bash
    npm install --force
    # or
    yarn install
    ```

    This command will read the `package.json` file in the project and download all the listed dependencies into the `node_modules` folder.

## Running the Application

Once the dependencies are installed, you can run the Angular application using the Angular CLI:

1.  **Serve the application:**

    Run the following command in your terminal within the project directory:

    ```bash
    ng serve
    ```

    This command will build your application and start a development server. It will typically open your application in a web browser at `http://localhost:4200`. The `ng serve` command also provides live reloading, meaning that when you make changes to your code, the browser will automatically update.

## Component Architecture

The project's component architecture is organized to promote maintainability and separation of concerns:

* **`environments/`:** Contains configuration files for different environments (e.g., development, production), allowing you to manage API endpoints and other environment-specific settings.

* **`shared/`:** This module contains reusable components that are not specific to a particular feature. These components can be used across different parts of the application.
    * `components/`: Defines components for data structures used throughout the application.
    * `services/`: Holds singleton services that manage application logic, data fetching, and state.

This structured approach helps in organizing the codebase, making it easier to understand, maintain, and scale the application. Feature-specific components and modules would typically reside in other top-level folders (not explicitly listed here but common in Angular projects).

## Development

Now you have the application running locally, you can start developing and making changes to the codebase. Here are some useful commands:

* **Generating components, pages, services, etc.:** The Angular CLI provides commands to generate various parts of your application:

    ```bash
    ng generate component my-new-component
    ng generate service my-new-service
    # ... and more
    ```

    Refer to the Angular CLI documentation (`ng help generate`) for a full list of available schematics.

* **Building the application:** To build a production-ready version of your application:

    ```bash
    ng build --prod
    ```

* **Testing the application:** You can run unit tests and end-to-end tests (if configured):

    ```bash
    ng test
    ng e2e
    ```

## Further Information

For more detailed information and advanced features, refer to the official documentation for:

* **Angular:** [https://angular.io/docs](https://angular.io/docs)
* **Angular CLI:** [https://angular.io/cli](https://angular.io/cli)
* **Node.js:** [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
* **npm:** [https://docs.npmjs.com/](https://docs.npmjs.com/)
* **yarn:** [https://yarnpkg.com/getting-started](https://yarnpkg.com/getting-started)
* **Git:** [https://git-scm.com/doc](https://git-scm.com/doc)

Happy coding!
