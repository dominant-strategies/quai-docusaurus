---
title: Setting Up Postman
description: How to set up Postman for use with the Quai Network API.
sidebar_position: 1
keywords:
  - postman
  - api
  - json-rpc
  - setup
---

# Setting Up Postman

Our team has created a [Postman collection for Quai Network](https://documenter.getpostman.com/view/19820580/2s935iv7GU), which includes **all of the publicly available API calls for go-quai** bundled with documentation, examples, and environment variables. Postman provides a user-friendly interface for making API requests to a go-quai node without having to deal with long `curl` commands or JSON-RPC payloads. A JSON formatted version of the Quai Postman collection can be found in the [`quai-postman-collection` repository](https://github.com/dominant-strategies/quai-postman-collection).

## Introduction to Postman

Postman is a popular API client that makes it easy to send requests, test endpoints, and share collections of methods through a unified and scalable interface. Postman is available as both a **desktop application** and **web application** available on Linux, MacOS, and Windows. _The desktop application is the most feature-rich and is recommended for most users_.

The Quai Postman collection ships with a **full library of API request templates and commonly used environment variables** so you don't have to constantly re-write requests or variable definitions. Using the Quai Postman collection, you can interact with any Quai Network client _with minimal code and configuration_.

## Configuration

### Install Postman

As mentioned above, Postman is available as both a desktop application and web application. While the web application is convenient for quick access, **we recommend using the desktop application** for access to all features and better performance.

To download the Postman desktop application, visit the [Postman website](https://www.postman.com/downloads/) and download the version for your operating system. Once downloaded, it is recommended that you sign up with an email address to save and sync your collections across devices and platforms.

![Postman Download](/img/Postman/PostmanDownload.jpg)

### Import Quai API Collection

Postman supports raw collection imports from a URL or a local file. To import the Quai Postman collection, click the `Import` button in the top left corner of the Postman application:

![Postman Import](/img/Postman/PostmanImportButton.png)

This will open the import options modal:

![Postman Import URL](/img/Postman/PostmanImportModal.png)

To import the Quai Postman collection, paste the following URL into the `Paste cURL, Raw Text, or URL...` field:

```
https://raw.githubusercontent.com/dominant-strategies/quai-postman-collection/main/go-quai.postman_collection.json
```

Once the import has completed, you'll see the **Quai Postman Collection** in the left sidebar of the Postman application:

![Postman Collection](/img/Postman/PostmanCollection.png)

### Import Environment Variables

Now that we have the Quai Postman collection imported, we need to import the environment variables. To import the Quai Postman environment variables, click the `Import` button in the top left corner of Postman like before, but this time, **paste the URL to the environment variables file**:

```
https://raw.githubusercontent.com/dominant-strategies/quai-postman-collection/main/example-quai-environment.postman_environment.json
```

Postman will automatically recognize the format of the environment variables file. When the import is complete, you should see this modal in the left right corner of the Postman application:

![Postman Import Success](/img/Postman/PostmanImportSuccess.png)

Lastly, you'll need to select the `Example Quai Postman Environment` from the dropdown in the top right corner of the Postman application:

![Postman Environment Select](/img/Postman/PostmanEnvironmentSelect.png)

Your environment variables are now **set as the active environment** and ready to use. When set as the active environment, the Quai Postman collection will be correctly configured with RPC endpoints, addresses, and hashes!

## Conclusion

Now that you've installed Postman, imported the Quai API collection, and configured environment variables, **you're ready to start making requests to a go-quai node**. _Further documentation and tutorials_ on how to use the Quai Postman collection can be found below:

**Quai Postman Guides**

- [Environment Variables Guide](/develop/go-quai-postman/environment-variables/)
- [Making Requests Guide](/develop/go-quai-postman/using-quai-api)

**API Specification**

- Pre-packaged specs and examples inside of the Quai Postman Collection
- [Quai Postman Collection Documentation](https://documenter.getpostman.com/view/19820580/2s935iv7GU)
- [JSON-RPC API Documentation](/develop/apis/json-rpc)
