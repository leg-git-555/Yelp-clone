# Yelpoli

Yelpoli is a Sopranos-themed, partial clone of 'Yelp', a site where users can review businesses. 

# Live Link
https://yelp-clone-odti.onrender.com

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

 # Index
 [Database Schema](https://github.com/leg-git-555/Yelp-clone/wiki/DB-Schema) | [User Stories](https://github.com/leg-git-555/Yelp-clone/wiki/User-Stories) | [Wireframes](https://github.com/leg-git-555/Yelp-clone/wiki/Wireframes)

# Endpoints
## Auth
### GET /api/auth

* Description: Fetch to validate if a user has an active session. If a user has an active session, they can access parts of the site that require authentication (i.e., all pages except the landing page)
* Return value: 
```json
{
    "email": "artie@aa.io",
    "first_name": "Artie",
    "id": 6,
    "last_name": "Bucco",
    "profile_image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/artie.jpg",
    "username": "ArtieBucco"
}
```
### POST /api/auth/login 

* Description: Login a user
* Return value: 
```json
{
    "email": "artie@aa.io",
    "first_name": "Artie",
    "id": 6,
    "last_name": "Bucco",
    "profile_image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/artie.jpg",
    "username": "ArtieBucco"
}
```
### Post /api/auth/signup

* Description: Logout a user, ending their session
* Return value: 
```json
{
    "message": "User logged out"
}
```
### Post /api/auth/logout 

* Description: Logout a user, ending their session
* Return value: 
```json
{
    "message": "User logged out"
}
```
## User
### GET /api/users

* Description: Get all site users so that reviews and users can be associated on the frontend. (Having to fetch users to properly display reviews is not ideal, but user lookup is O(1))
* Return value: 
```json
{
    "1": {
        "email": "demo@aa.io",
        "first_name": "demo",
        "id": 1,
        "last_name": "user",
        "profile_image_url": "url",
        "username": "Demo"
    },
    "2": {
        "email": "tony@aa.io",
        "first_name": "Tony",
        "id": 2,
        "last_name": "Soprano",
        "profile_image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/tony.jpg",
        "username": "TonySoprano"
    },
}
```
## Business
### GET /api/businesses

* Description: get all businesses
* Return value: 
```json
{
    "businesses": [
        {
            "address": "1 Seed Street",
            "category": "fast casual",
            "city": "Newark",
            "country": "USA",
            "id": 1,
            "image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/pizzaland.jpg",
            "name": "d",
            "owner_id": 2,
            "price": 1,
            "state": "New Jersey"
        },
        {
            "address": "2 Seed Street",
            "category": "fast casual",
            "city": "Newark",
            "country": "USA",
            "id": 2,
            "image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/centannis.jpeg",
            "name": "Centanni's Meat Market",
            "owner_id": 4,
            "price": 2,
            "state": "New Jersey"
        }
    ]
}
```
### POST /api/businesses/new

* Description: create a new business
* Return value: 
```json
{
    "address": "100 Seed St.",
    "category": "fine dining",
    "city": "Newark",
    "country": "USA",
    "id": 7,
    "image_url": "https://aa-image-bucket.s3.amazonaws.com/611499c48bee4723809767e54c4f4941.jpg",
    "name": "olive garden44",
    "owner_id": 6,
    "price": 3,
    "state": "New Jersey"
}
```
### GET /api/businesses/current

* Description: Get all businesses owned by the current user
* Return value: 
```json
[
    {
        "address": "3 Seed Street",
        "category": "fine dining ",
        "city": "Newark",
        "country": "USA",
        "id": 3,
        "image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/vesuvio.jpg",
        "name": "Bucco's Vesuvio",
        "owner_id": 6,
        "price": 3,
        "state": "New Jersey"
    },
    {
        "address": "4 Seed Street",
        "category": "fine dining ",
        "city": "New York",
        "country": "USA",
        "id": 4,
        "image_url": "https://aa-image-bucket.s3.us-east-2.amazonaws.com/palm-court.jpg",
        "name": "The Palm Court",
        "owner_id": 6,
        "price": 3,
        "state": "New York"
    }
]
```
### PUT /api/businesses/:id

* Description: Update a business by id; business must be owned by the current user
* Return value: 
```json
{
    "biz": {
        "address": "22 Seed st.",
        "category": "fine dining",
        "city": "Newark",
        "country": "USA",
        "id": 7,
        "image_url": "https://aa-image-bucket.s3.amazonaws.com/611499c48bee4723809767e54c4f4941.jpg",
        "name": "il camino2",
        "owner_id": 6,
        "price": 1,
        "state": "NJ"
    }
}
```
### DELETE /api/businesses/:id

* Description: Delete a business by id; business must be owned by the current user
* Return value: 
```json
{
    "message": "Successfully deleted Bucco's Vesuvio"
}
```
## Review

### GET /api/reviews

* Description: get all reviews
* Return value: 
```json
[
    {
        "business_id": 1,
        "id": 1,
        "owner_id": 3,
        "rating": 5,
        "review": "Pizzaland is a revelation! The crust is perfectly thin and crispy, the sauce is bursting with fresh flavor, and the toppings are always generous and top-notch. From the classic margherita to their adventurous gourmet options, Sal's never disappoints. It's become my go-to pizza spot, hands down!"
    },
    {
        "business_id": 2,
        "id": 2,
        "owner_id": 3,
        "rating": 5,
        "review": "Stepping into Centanni's is like stepping back in time to a butcher shop of the highest quality. The knowledgeable staff, many of whom are family, are eager to help you find the perfect cut, and their homemade sausages are legendary. From prime steaks to custom cuts for your freezer, Centanni's is a haven for meat lovers seeking an exceptional experience."
    }
]
```
### POST /api/reviews/new

* Description: create a new review
* Return value: 
```json
{
    "business_id": 2,
    "id": 7,
    "owner_id": 6,
    "rating": 3,
    "review": "Olive Garden is a reliable choice for a familiar Italian meal. The portions are generous, the atmosphere is casual, and the service is friendly. While the flavors won't blow you away, it's a good spot for a decent meal at a reasonable price."
}
```
### PUT /api/reviews/:id

* Description: Update a review by id; review must be owned by the current user
* Return value: 
```json
{
    "business_id": 2,
    "id": 7,
    "owner_id": 6,
    "rating": 3,
    "review": "UPDATE Olive Garden is a reliable choice for a familiar Italian meal. The portions are generous, the atmosphere is casual, and the service is friendly. While the flavors won't blow you away, it's a good spot for a decent meal at a reasonable price."
}
```
### DELETE /api/reviews/:id

* Description: Delete a review by id; review must be owned by the current user
* Return value: 
```json
{
    "message": "Successfully deleted review"
}
```

# Feature List
1. Business(CRUD)
2. Reviews(CRUD)

# Future Implementation Goals
1. Display review images
2. Search businesses

# Connect
[LinkedIn](https://www.linkedin.com/in/nick-leger-a3523a109/)

