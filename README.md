# A forum SPA(reddit-like) built for the project defense of the React-October 2023 Softuni Course.
## Project Architecture:
  ### Client:
    - General Components in the components dir(eg. App.jsx, ModalPrototype.jsx)
    - Dirs based on relevant & similar features (/Channel, /Post /Comment)
        - styles folders with css modules for each component(if needed)
    - Helper directories - apis, utils, contexts
    - Custom hooks dir with simiral hooks inside, main one being useLoading 
  ### Server:
    - data dir, needed for the server to operate
    - server.js - Softuni Practice Server
  External Packages outside of react:
    - react-spinners
    - iconscout
    
