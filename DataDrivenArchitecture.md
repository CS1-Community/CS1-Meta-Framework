# Data Driven Architecture
___

### What do I mean by Data Driven Architechture?

**These Q's are answered first.**
- What are the names and encapsulation of the prioritized data?
- How are the data capsules related?
- Where will these data capsules be stored?
- How will these data capsules be read from and written to?

**Choose the technologies next.**

**Implement initialized stores with read/write examples**

**Create a async update diagram**

**Procede with developing the rest of the system.**

___


<a href="https://drive.google.com/file/d/1EF49Px3UTch92wyKsbpLvf8moi7mI7_i/view?usp=sharing" rel="noopener noreferrer">
 DrawIO Chart
</a>


- Environment Store
  - /page
  - /scene 
- Items Store
- Avatar Store
   - Model avatar
   - Name 
- User Store

____

Events in the context of our data-driven architecture will often be administrated by the central server.  An example of this would be when a user attempts to interact with an item in the environment.  The user may or may not have permissions to exercise an interaction with said item.  A interaction request will be sent to the admin server. If the user has permission to interact with said item, the admin server will issue a socket update to all relevant clients, at which time downstream data reducing and view updating can unfold.


