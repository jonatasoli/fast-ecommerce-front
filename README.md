# Fast Ecommerce Front


## Project Configuration

This project is configured to use environment variables and runtime configuration for various services and features. Below are the details on how to set up the necessary environment variables.

Environment Variables

### Make sure to set the following environment variables in your .env file:

    - SERVER_BASE_URL: The base URL of the server where the application is running.
    - MERCADO_PAGO_PUBLIC_KEY: The public key for integrating Mercado Pago payments.
    - RECAPTCHA_SECRET_KEY: The secret key for Google reCAPTCHA verification.
    - RECAPTCHA_KEY: The site key for Google reCAPTCHA used on the frontend.
    - WHATSAPP_NUMBER: The WhatsApp number used for contact and redirection.
    - GTAG_ID: The Google Analytics tracking ID.
    - NODE_ENV: Set this to 'production' when running in a production environment.
    - SENTRY_DSN: The DSN (Data Source Name) for Sentry error tracking.
    - SENTRY_ENV: The environment for Sentry (e.g., production, staging).


    Example __.env__ File

```bash
SERVER_BASE_URL=https://api.example.com
MERCADO_PAGO_PUBLIC_KEY=your-mercado-pago-public-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
RECAPTCHA_KEY=your-recaptcha-site-key
WHATSAPP_NUMBER=+1234567890
GTAG_ID=your-gtag-id
NODE_ENV=production
SENTRY_DSN=your-sentry-dsn
SENTRY_ENV=production
```

## Configuration Guide

### Mercado Pago Integration

To enable payments through Mercado Pago, make sure to set your public key under MERCADO_PAGO_PUBLIC_KEY. You can obtain this key from the Mercado Pago Developers Portal.

### Sentry Error Tracking

For error tracking, this application is integrated with Sentry. Make sure to set your SENTRY_DSN and the environment (SENTRY_ENV) to distinguish between environments (e.g., production, staging).

### WhatsApp Integration

To enable WhatsApp integration, set the phone number with the WHATSAPP_NUMBER environment variable. This will allow users to contact through WhatsApp via the provided number.

## Style Guide

[HTML / CSS](https://google.github.io/styleguide/htmlcssguide.html)

[Typescript](https://google.github.io/styleguide/tsguide.html)

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
