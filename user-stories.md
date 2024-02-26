# Yelp-clone User Stories

## Users

### Sign Up

* Unregistered and unauthorized users are able to sign up for the website via a sign-up form.
  * A user accesses the sign-up form by clicking the profile button in the top right of the nav bar, openning a sign-up form modal.
    * A user is able to enter their first name, last name, email, username, password, and profile image (optional) on a clearly laid out form.
    * A user will be logged in upon successfully completing the sign-up form
    * When a user enters invalid data on the sign-up form, the app will display validation errors in the form, allowing the user to fix errors and resubmit. <br />

### Log in

* Registered but unauthorized users may log into the website via a login form.
  * A user accesses the sign-up form by clicking the profile button in the nav bar, then clicking the Log in button, at which point a modal appears:
    * A user is able to enter their email and password on a clearly laid out form. The user also has an option to login as demo user 1 or demo user 2.
    * A user will be logged in upon successful completion of the sign-up form <br />
    * When a user enters invalid data on the log-in form, 
    the form will display validation errors below the field where the error occured. 
   
### Demo User

* Unregistered and unauthorized users can login as a demo user via the link at the bottom of the login form.
Clicking the link logs the user in as a guest so they can use the site as a standard user.

### Log Out

* Logged-in users can end their session by clicking the user profile button in the nav bar, then by clicking the Log Out button.
  * Once the user has logged out, the user's workspace, channel, and direct message data are cleared from the UI.

## 1. Businesses

### Create a business
* Logged-in users can create a new business via a button in the nav bar. 
    * the button navigates them to /new-business, where they're able complete a form and create their new business

### View Businesses
* Logged-in users can view all businesses on the homepage of the site. Users can view their own businesses by clicking the 'manage my businesses' link in the navbar, which navigates them to 'business/current'
* Logged-in users can view a single business by clicking on the business' card, which navigates them to 'businesses/:id'
    * the 'businesses/:id' page shows details about a business, e.g. ratings and pictures

### Updating a business
* Logged-in users can update their businesses by clicking the 'manage my businesses' link in the nav bar, which navigates them to 'business/current'
    * on this page, users will see a cards of their owned business; at the bottom of each card will be an update and delete button.
        * clicking the update button will bring the user to 'businesses/id/edit', where they will see a pre-populated form to update their business.

### Delete a business
* Logged-in users can delete their businesses by clicking the 'manage my businesses' link in the nav bar, which navigates them to 'business/current'
    * on this page, users will see a cards of their owned business; at the bottom of each card will be an update and delete button.
        * clicking the delete button will open a modal, prompting the user to confirm (yes) or cancel (no) the deletion; 'yes' deletes the business and closes the modal, 'no' keeps the business and closes the modal

## 1. Reviews
### Create a review
* Logged-in users who are not the owner of the business can create a review via a "post your review" button on an business's page. (Users are limited to one review per business.)
    * clicking the "post your review button" opens a form in a modal wheree the user can leave a number of stars, a text review, and a photo

### View reviews
* Logged-in users can view a business's reviews on an individual business's page ('businesses/:id')

### Update reviews
* Logged-in users can update a review they own by clicking the 'update review' button below their review. The button does not appear on reviews the user does not own.
    * clicking the 'update review' button opens a form modal that's pre-populated with existing review data; the user can make their edits and submit

### Delete reviews
* Logged-in users can delete a review they own by clicking the 'delete review' button below their review. The button does not appear on reviews the user does not own.
    * clicking the 'delete review' button opens a modal that asks to user to confirm or cancel the deletion. Clicing 'yes' confirms the delettion and closes the modal. Clicking 'no' closes the modal; the review remains.




