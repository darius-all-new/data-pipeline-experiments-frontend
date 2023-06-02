# Experimenting with Data Pipelines (Frontend)

This is intended to provide industrial engineers and others interested in the field with a solid starting point for exploring data acquisition, storage, and visualization in the context of Industry 4.0 (I4.0) and Industrial Internet of Things (IIoT) applications.

## Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Instructions](#instructions)
- [Disclaimer](#disclaimer-experimental-and-prototyping-use-only)

## Overview

Two repos make up the standard project providing an end-to-end pipeline going from a Raspberry Pi to a React-based frontend interface.

This is the frontend repo and contains a simple interface with numerical displays and line graphs (single parameter).

For the backend scripts see the [scripts repo](https://github.com/darius-all-new/data-pipeline-experiments-scripts).

## Why use this? 🤷‍♂️

There are loads of platforms and tools that connect to assets and handle data. They are all very capable and many are even free (or have a free tier). All of these platforms have loads of features and often learning curves that go along with that.

Sometimes though, when you're experimenting with I4.0 type projects, what you really need is something simple and under your control. That is the purpose of this pipeline.

I made this pipeline for my own experiments and thought I'd open it up in case anyone else also finds it useful! I'll also be adding functionality periodically.

## Requirements

You will need:

- Node.js installed

## Instructions

This repo contains the frontend React application for visualising data produced by the scripts repo.

Here's how to get it running:

1. Clone the repository to your local machine.

   ```
   git clone https://github.com/darius-all-new/data-pipeline-experiments-frontend.git
   ```

2. Navigate to the project directory.

   ```
   cd data-pipeline-experiments-frontend
   ```

3. Install the necessary dependencies.

   ```
   npm install
   ```

4. Set your Cloudflare worker URL:

In `src/pages/Dashboard.tsx` replace the placeholder with your Cloudflare worker URL.

```
const dataEndpoint = "REPLACE WITH YOUR CLOUDFLARE ENDPOINT";
```

5. Start up the development server.

   ```
   npm run dev
   ```

6. Open your web browser and visit `http://localhost:5174`. You should see 3 numerical displays and 3 line graphs (all empty until you start the data streams!).

If you encounter any issues or have any questions, please don't hesitate to reach out.

## Disclaimer: Experimental and Prototyping Use Only

Please note that the code in this repository is intended solely for experimentation and prototyping purposes. It is not intended for use in production environments or critical systems. By accessing or using the code in this repository, you acknowledge and agree that:

The code provided is for educational and exploratory purposes only. It may contain errors, bugs, or other issues that could affect its functionality, reliability, or security.

The code may not have undergone rigorous testing, validation, or verification processes required for production-ready software.

The code may not adhere to best practices, coding standards, or industry-specific regulations applicable to production systems.

The code is provided "as is" without any warranties or guarantees of any kind. The author(s) of this repository shall not be held liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the code.

It is your responsibility to review, modify, and adapt the code according to your specific needs and requirements, taking into consideration the necessary safety, security, and performance considerations.

It is highly recommended that you exercise caution and prudence when using the code in this repository. If you intend to use the concepts, techniques, or code in a production or critical system, it is essential to conduct thorough testing, validation, and verification processes to ensure its suitability, reliability, and security.

By using this repository, you agree to indemnify and hold harmless the author(s) from any claims, damages, or liabilities arising out of the use, misuse, or reliance on the code provided.

Remember, always prioritize safety, security, and reliability when implementing code in production or critical systems.
