# [🌀 Aether](https://aether-zeta.vercel.app)
 ##### Aether is a fully-functioning website, deployed at [aether-zeta.vercel.app](aether-zeta.vercel.app).  
 ##### The project consists of 2 parts - [React Frontend](#frontend) and [.NET backend](#backend).  
 ##### Aether was originally built as a frontend-only project for SoftUni ReactJS October 2023 project defense,  using the SoftUni Practice Server.  
 ##### The Practice Server can still be found in the jsServer folder. 

----

## Table of Contents
### Frontend 
  1. [File Structure](#file-structure) 📁
  2. [Workflow](#workflow) 🔄
  3. [Routing](#routing) 🛣️
  4. [Error Handling](#error-handling) ⚠️ 
  5. [Custom Hooks](#custom-hooks) 🪝
  7. [Authentication](#authentication) 🔒
  8. [Context Handling with Context API](#context-handling) 🗂️
  9. [Styling](#styling) 🎨
  10. [Dependencies](#dependencies) 📦
  11. [Deployment](#deployment) 🚀
  12. [Future Optimizations](#future-optimizations) 🚀

### Backend
  1. asd
  2. sd
  3. 


-----

# Frontend ↓
            
### File Structure  
📁
- **components/**: Contains all the React components used in the application. Each component has its own directory for better modularization.
  - **Channel/**: Contains components related to the channel feature.
  - **Home/**: Components related to the home page.
  - ...

- **contexts/**: Contains context providers for managing global state using React's Context API.

- **hooks/**: Custom hooks for reusable logic across the application.

- **services/**: Contains service modules for handling API calls and business logic.

- **utils/**: Utility functions and helpers.
----

### Workflow  
🔄

-----

### Routing  
🛣️

  **Router** - Aether is using the default BrowserRouter, prodided by React-Router.  
  **Routes** - All routes are defined in the App.jsx component.  
  **Route Guards** : 
  - Non-existent routes :
    ```jsx
    <Route path='/*' element={<Page404 />} />
    ```
  - Unexpected errors :
    ```jsx
    <Route path="/error" element={<ErrorPage />}/>
    ```
-----

### Request Handling  
  **request.js**  
  An http request abstraction using the fetch api, that has the following structure:
  ```
    get(url, accessToken)
    post(url,accessToken,bodyData)
    put(url, accessToken, newData)
    Delete(url, accessToken, bodyData)
  ```
  Each of these methods returns the raw Response object. 
    
  ***record*Service.js**   
  - A collection of services for each of the database records 
  - Using the aforementioned *request.js* abstraction  
  - Main function is handling request routes and CRUD operations for the repspective record
  
-----

### Error Handling  
⚠️

  #### Local & Async    
  ```jsx
  const navigate = useNavigate();
  try{
    // ...do something, fetch, etc.
  }
  catch(e){
    navigate("/error");
  }
  ```
  #### Global
  
  ```jsx
    <GlobalErrorBoundary>
      // Routes, Components, etc
    </GlobalErrorBoundary>
    // wraps around components 
    // detects synchronious errors using the getDerivedStateFromError method on Component class
    // renders Error component
  ```
  
----
### Custom Hooks  
🪝

- #### useDebounce
    
    A utility used for rate-limiting (debouncing) a given function.
    
    ##### Parameters
    
    - `callback`: The callback function to be debounced.
    - `delay`: The debounce delay in milliseconds.
    - `dependency` (optional): Dependencies to watch for changes.
    
    ##### Returns
    
    - `debounceCallback`: Debounced callback function.
    
    ##### Example Usage
    
    ```jsx
    
      const handleSearch = async (query) => {
        const result = await searchFor(query);
        // ...do something with result
      };
    
      // Debounce the search function with a delay of 500ms
      const debouncedSearch = useDebounce(handleSearch, 500);
    
      useEffect(() => {
        const userInput = "Example Input";
        // Example usage: HandleSearch is executed only after 500ms of user input
        debouncedSearch(userInput);
      }, [debouncedSearch]);
    ```
    ***
- #### useDisabled
  The `useDisabled` hook is designed for managing the state of disabled operations in React components  
  Particularly useful for async operations like fetching data or submitting forms.
    ##### Parameters
    
    - `callback`: The asynchronous callback function to be executed.
    
    ##### Returns
    
    An array with the following elements:
    - `disabled`: A boolean state indicating whether the callback is currently disabled.
    - `callbackWithDisable`: A function that wraps the provided callback and manages the disabled state.
    - `setDisabled`: A function to manually set the disabled state.

    ##### Example Usage

    ```jsx
    import { useState } from 'react';
    import useDisabled from './useDisabled';
    
    const ExampleComponent = () => {
      const fetchData = async () => {
        // Simulate fetching data
        console.log('Fetching data...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
        console.log('Data fetched!');
      };
    
      const [disabled, callbackWithDisable, setDisabled] = useDisabled(fetchData);
    
      return (
        <div>
          <button onClick={() => callbackWithDisable()}>Fetch Data</button>
          <p>Button is {disabled ? 'disabled' : 'enabled'}</p>
          <button onClick={() => setDisabled(true)}>Disable</button>
          <button onClick={() => setDisabled(false)}>Enable</button>
        </div>
      );
    };
    ```
    ***
- #### useLoading
  This hook simplifies managing loading states and error handling for async operations in React components
  ##### Parameters
    - `callback`: The asynchronous callback function to be executed.
    - `errorCallback` (optional): A function to handle errors that occur during the callback execution.

  #### Returns

    An array containing:
      - `loadingSpinner`: A component function that displays a loading spinner based on the `isLoading` state.
      - `callbackWithLoading`: A function that wraps the provided callback, setting `isLoading` to `true` before execution and `false` afterwards.
      - `isLoading`: A boolean state indicating if an operation is currently loading.

  ##### Example Usage
  
  ```jsx
  import { useState } from 'react';
  import useLoading from './useLoading';
  
  const ExampleComponent = () => {
    const fetchData = async () => {
      // Simulate fetching data
      console.log('Fetching data...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      console.log('Data fetched!');
    };
  
    const handleFetch = async () => {
      try {
        await callbackWithLoading(fetchData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const [loadingSpinner, callbackWithLoading, isLoading] = useLoading(handleFetch);
  
    return (
      <div>
        {loadingSpinner({ size: 50 })}
        <button onClick={handleFetch} disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch Data'}
        </button>
      </div>
    );
  };
  ```
-----

### Authentication  
🔒
  - #### authService.js
    Responsible for API requests to the backend, expects an accessToken in return
  - #### LogIn.jsx & SignUp.jsx
    Responsible for taking in user input and executing a request through authService  
    Validation is internal
  
  - After successful authentication response from the server,  the userData, along with the accessToken (JWT) are stored inside a [Context](#context-handling)  
  - After a failed authentication there's instant feedback and limiting of sending wrong auth data requests
-----
### Context Handling  
🗂️

  - ####  UserData Context
    ##### Returns `[userData, setUserData]`
    ##### Authentication Management
      Stores and serves the accessToken needed for authenticated actions  
    
    ##### User Data Passing
      Makes userData accessible to all components  

  - ####  UserModal Context
    
    ##### Modal State Control
      Tracks and serves whether the modal is open or closed, allowing components to respond accordingly.

-----

### Styling  
🎨

#### Global Styles

Global styles and variables, such as font sizes, weights, and colors, are defined in `index.css` using CSS custom properties.

#### Component Styles
CSS Modules (`Component.module.css`) are used for component-specific styles.  
In every Component folder, there's a styles folder, containing the respective CSS module for each component

-----

### Dependencies   
📦
```json
  "@iconscout/react-unicons-solid": "^1.0.2",  
  "react": "^18.2.0",  
  "react-dom": "^18.2.0",  
  "react-router-dom": "^6.18.0"
```
-----

### Deployment
🚀

  Client-side code is deployed on Vercel, utilizing the `client-production` branch for production deployments.
  
------

### Future Optimizations
🚀

------
# Frontend ↑
# Backend  ↓ 
