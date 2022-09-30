# TODOS

- First Steps

  - `CS1.cam.lookAt(entity)`
    - Good case to examine options for branching based upon the current
    renderer, ecs, ...
    
  - Need to decide how users are going to add state stores (MST Models) and how
  are they going to fit into the global state topology.
  
  - Think about, blog about, entities and how they will be accessed and activated.
    - npc's like a tower defense cannon
    - rpg player that is of class goblin vs class knight
    
  - ~~Review CS1 API boundary concept in context of CS1 app design~~
  - Create basic CS1 reactive store API wrapping redux
    - Review state management progress
    - Decide on API methods for first version
      - add StateManager.setInitialState()
      - add some sort of state props discovery API
  - Create simple app using reactive store API
    - Review and edit, where needed , the app development and build processes.
    - Create component handling click to change state.
    - Apply this component to a simple cube.
  - CS1Scene handle no a-scene in html with state subscriber
  - Explore CS1.scene.add function signature overloading and parameterization options

- Data Transport
  - Raw WebRTC
  - Socket turn server
- Data Persistence API
  - What kind of data we want to presist?
  - Adapters (dbs)
- Define Plugable
  - feature extends plugable
  - A plugable will implement one or more of the core engine APIs.
  - What are these APIs?
  - What are the needs driving these APIs?


## Blog Posts to Write

  - Breadth first state tree driven development
    - justification
    - examples


## Exercise

- Admin socket api
- Door open /close aframe

# Primitives

- gltf
- state
- box, plane
- responsive perfromance component (system to keep track of performing, fps)

