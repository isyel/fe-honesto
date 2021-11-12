# Honesto - Frontend Practical Exercise

Honesto is an application allowing peers to leave feedback for other team members. For this exercise, you are to
implement the required tasks below, along with any bonus tasks you also have time to complete.

Designs for all tasks are [available in Figma](https://www.figma.com/file/P5D3PIAyzSfu3zOTjR2vnU/Practical-FE-Exercise-Honesto), please follow these designs for all tasks.

The application has a few small changes from Figma to help in development of the following tasks:

- The login page allows you to quickly login as a different user to see the data from the perspective of that user.
- The time period for giving reviews is intentionally absent from the application, so for this exercise treat the feedback as a one time event rather than per time period. There is an optional task to extend this functionality to monthly reports.

## Task 1: Gather Feedback

A user can provide feedback on other team members (_"Share Feedback" in Figma_). For a selected team member, they will answer a series of questions.

- The questions to ask are already stored in the React context.
- Create the user interface needed to ask and collect answers for each question for a selected team member.
- Update the app to save the results of the feedback. _The saved results do not need to persist through a page refresh but the app should allow full navigation without data loss._
- Your data model should support feedback from/to various users.

## Task 2: Display Feedback Given

After having given feedback, a user can review all the feedback they have given to other team members (_"My Feedback" in Figma_).

- Display all feedback given by the current user.
- Include the case of when no feedback has been given.

## Task 3: Display Received Feedback

Besides giving feedback, a user can also see feedback received from their team (_This does not exist in Figma other than the navigation item "Team Feedback", but you can model it after the layout of the previous task._).

- Display the feedback received by the current user from other team members.
- Include the case of when no feedback has been received.

## Bonus Tasks (optional)

Feel free to also implement any the following task if you are just getting warmed up:

- [ ] Add Accessibility (A11y) testing and update components to comply
- [ ] Create a dark theme for the project
- [ ] Make the app more responsive on various devices
- [ ] Update the app to have multiple feedback collections (per month) for each user
- [ ] Write some tests (jest, cypress, react testing library, etc)
- [ ] Add documentation about your tasks to help other developers understand decisions you made

## _Solution Process_

- Analysed the data from Rick and Morty character API endpoints, to understand the structure of the data
- Built out the redux structure for the various states to be managed, corresponding actions and reducers
- Linked the redux action calls with the API fetch functions by use of thunk middleware
- Managed query string generation using saved state for query parameters
- Manage API loading, and error response using redux actions and state (show loading and error status on UI)
- No external Icon Library used, to keep app simple (alternatively used, css content icons and SVG icons)

### **Home Page (Characters List)**

- Built out components like Character, CharacterList, Sidebar etc.
- Built out the Pagination component to manage page navigation, managing page number state with redux (page number needed to be used for query parameters as well)
- Built out SideBar component with input box for search and select input for gender and status, use custom useDebounce hook in calling redux action for filter API calls
- Built the Header component to house Logo and mobile navigation

### **Single Character Page**

- Load character details from the saved characters list in Redux if data exists, if not call API to fetch character data (to reduce uneccessary API call)
- Generate the Episode tabs(limit to 5 using array slice), use string functions to get Episode number from links Array
- Load Episode data for each Tab change

### **Managing State Data**

I used REDUX to manage state data across the application, having store slices for characters, episode, pages/query parameters and api loading state

Used Redux Thunk middleware to manage API endpoints loading, response and error

**Characters List Page**
Use browser disk cache for API requests and reponses (using the default header: cache-control: max-age=259200)

### **Pages**

**Characters List Page**

- Grid view of characters per page
- Link to individual character page (Page routing is achieved using `react-router-dom`)
- Side bar with filters for name, gender and status

**Single Character Page**

- Character details and Image
- Episode tabs and episode details

### _Suggestions on API_

The episodes array were only links to API and the episode numbers were not part of the array elements, it required me to perform some string functions on the Url while generating Episode `Tabs` to get the episode numbers
