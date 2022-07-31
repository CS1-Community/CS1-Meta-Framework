# Reflections
____

### The Developer Experience (DevEx)

  - [DevEx](https://microsoft.github.io/code-with-engineering-playbook/developer-experience/) should be a primary driver of CS1 development.
  - Largely influenced by the top-level API
    - Considerations:
        - await CS1.add.light() // adds light with default settings
        - await CS1.add.light(true)
          .configure(CS1.utils.spatial.positionRelativeTo('tree',[2,3,1]))
  - Greatly enhanced by complimentary tools.
  - Improved with a healthy community.

### End of Year 2021

We want to make easy for users:
  -  3d scene management
  -  shader design and implementaton
  -  particle system design and implementation
  -  animated model design and implementation
  -  user interface design and implementation
  -  data visualization
  -  persistent data storage/retrieval
  -  usere authentication
  -  role based system management
  -  group based system management
  -  reactive state management
  -  administrative server modules
  -  turn server data transport
  -  peer to peer data transport

   
   
User empowerment enabling them to think in terms of the ECS.

Questioning whether the global reactive app state should be directly accessible via something like   CS1.state

Think about shared state declarative API as:

<a-box shared="* color"></a-box>  -> shared with everyone
or maybe

<a-box shared="* color" group="groupname"></a-box> -> shared with security group

This implies we would have a group component that orchestrates an authentication/verification process governing the shared data.

My thoughts are to conduct all the internal network updates via a subset of the global store.

