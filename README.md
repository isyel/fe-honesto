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

# _Solution Process_

- Analysed the existing code structure and the mock data available
- Mapped out the structure of data to be saved in context for feedbacks submitted
- Defined the types and state structure for the reviews given `ReviewerProvider.tsx`
- Added Questions (For giving reviews) and Reviews Page (to see reviews received)
- Populated feedbacks given and reviews received page with appropriate data
- Manage no data availability
- Redesign 404 page to match mockup
- Added dark theme color scheme and toggle functionality (persist on reloads using Localstorage)
- Added responsiveness to cover most screen sizes

### **GiveFeedback Page (Users List)**

- Updated existing component
- Filter out current user data from list
- Switch button to `View Submission` if submission submitted by current user
- Send query string in url for individual submissions view (to highlight the specific user click on in My Feedback Page)

### **My Feedback Page**

- Load data from context to populate page
- Perform filter for currentUser and mapping for feedback type to populate data
- Check for query string value to switch selected user if visited from `View Submission` link
- Defaults to user at index[0] if no query string passed on page load
- Find feedback of currently selected user
- Populate data to `ReviewsList` component (reused in My Reviews page)

### **My Reviews Page**

- Load data from context to populate page
- Perform filter for currentUser
- Defaults to user at index[0] on Page load
- Find feedback of currently selected user
- Populate data to `ReviewsList` component

### **Questions Page**

- Load questions from context
- Load questions data based on currentQuestion index
- Skip question updates answer with `skipped: true` flag
- Keep state of answers so user can go to previous question and update answer
- Disable `Next` button until answer is given for current question
- Submit all answers when it is last question
- Use `Scale` component for scale type questions

### **Important Components**

**Reviews List Component**

- Receives `userReviews`, `selectedUser`, `selectedFeedback`, `handleSelectUser` props to populate data and switch between users
- Map over usersReviews to populate users data
- Defaults to feedback at index[0] on first load

**Scale Component**

- Receives `scales`, `value` props and optional like `noAction`, `toolTipText` and `handleAddChangeAnswer` to cover for preview component state
- Populate number of boxes based on `scales` value use `[...Array(scales)].map`
- Shows scale based on index against value
- When used for Questions page use primary color for selected
- When used in reviews preview, add dynamic(warning, success and danger) color based on `value` against `scale` value
- Show tooltip when in preview and question type is `multiplechoice`
- Tooltip shows the text of the selected scale value, to help viewer understand what the given scale means

### **Strucure of ReviewContext State**

Using ReviewContext as the single source of truth so as to persist data across logins and logouts

_Sample Context Data_

```
[
    {
        "user": {
            "avatarUrl": "https://i.pravatar.cc/150?img=68",
            "id": "p0",
            "name": "John Smith"
        },
        "reviews": [
            {
                "reviewer": {
                    "avatarUrl": "https://i.pravatar.cc/150?img=48",
                    "id": "p1",
                    "name": "Martha Liberty"
                },
                "feedbacks": [
                    {
                        "question": {
                            "id": "q1",
                            "type": "scale",
                            "required": true,
                            "label": "How much do you trust this person to deliver high quality work?"
                        },
                        "feedback": 6,
                        "skipped": false
                    },
                    {
                        "question": {
                            "id": "q2",
                            "type": "multipleChoice",
                            "required": true,
                            "label": "Is this person up to date with the latest accounting regulations?",
                            "options": [
                                {
                                    "value": 1,
                                    "label": "Not fully. You should work on trying to stay more up to date with regulations"
                                },
                                {
                                    "value": 2,
                                    "label": "Yes, you are reasonably up to date with new regulations."
                                },
                                {
                                    "value": 3,
                                    "label": "Yes, you are the one I look up to when I need information about new regulations"
                                }
                            ]
                        },
                        "feedback": 3,
                        "skipped": false
                    },
                    {
                        "question": {
                            "id": "q3",
                            "type": "scale",
                            "required": true,
                            "label": "How well does this person understand the technical domain of our product?"
                        },
                        "feedback": 7,
                        "skipped": false
                    },
                    {
                        "question": {
                            "id": "q4",
                            "type": "text",
                            "required": false,
                            "label": "Have there been any situations where this person could have managed their emotions better? What happened?"
                        },
                        "feedback": "cwcee",
                        "skipped": false
                    },
                    ...
                ]
            }
        ]
    }
    ...
]
```

### **Bonus Tasks Completed**

- Create dark theme ✅
- Add responsiveness ✅
- Add reviews received page✅

### **Improvements to make**

- Update an already given feedback to a user
- Add tests (jest/React Testing Library)
- Enforce strong typechecks on all variables and objects
- Add async data management and add timeouts to simulate server delay (the skeleton loader wasn’t of any use, since the data was local and there was no delay in fetching) or link to an external API

### **Challenges**

- Types Management (had to refactor some type eg: merged QuestionT and Question2T into single QuestionT)
- Some Css styles were applied strictly, making it harder to add responsiveness
