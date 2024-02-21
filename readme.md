# William Li Hack the North Backend Challenge
## API endpoints
Base path: ```http://localhost:PORT/ ``` PORT = 3000 by default

No auth required for any request (didn't implement)

Email is what identifies a user
### User Endpoints: 
#### Get all users
```GET '/users'```

Retrieves information on all users

```
[
  {
    id: 101,
    name: "John Doe",
    company: "FAANG",
    email: "someone@example.com",
    phone: "123 456 789",
    skills: [
	  {
	    skill: "Express",
	    rating: 4,
	  }
	]
  },
  {
    id: 102,
    name: "Jane Doe",
    company: "FAANG",
    email: "person@example.com",
    phone: "987 654 321",
    skills: [
	  {
	    skill: "SQL",
	    rating: 4,
	  }
	]
  }
]   
```
#### Single user search
```GET '/users/:email'```

Retrieves user info associated to email

```
Example: GET '/users/someone@example.com'
{
  id: 101,
  name: "John Doe",
  company: "FAANG",
  email: "someone@example.com",
  phone: "123 456 789",
  skills: [
   {
      skill: "Express",
	  rating: 4,
   }
  ]
}
```

#### Create user
```POST '/users'```
```
Example Body:
{
  "name": <string>,
  "company": <string>,
  "email": <string>,
  "phone": <string>,
  "skills": [
	{
	  "skill": <string>,
	  "rating": <int>
	}
  ]
}
```

#### Update a user's info
```PUT '/users'```
```
Example Body:
(everything is optional, except for email)
(anything put here will be updated)
{
  "name": <string>,
  "company": <string>,
  "email": <string>,
  "phone": <string>,
  "skills": [
	{
	  "skill": <string>,
	  "rating": <int>
	}
  ]
}
```
Example flow:  
1. If ```body.name``` exists in PUT request
2. name will be updated to account with email ```user@example.com```

**Note**: updating skill will completely replace with whatever is newly put

### Skill Endpoints
#### Get all skills
```GET '/skills'```

Retrieves all skills with their frequency

```
[
  {
	"id":  18246,
	"skill":  "Swift",
	"frequency":  28
  },
  {
	"id":  18247,
	"skill":  "OpenCV",
	"frequency":  33
  }
]
```
#### Get all skills with frequency filter
```GET '/skills/?min_frequency=x&max_frequency=y``` where x and y are int

(same response as above but returns skills that match filter)

### Seed Data
#### Wipe
Wipes the whole database 🤯

```GET '/seed/wipe'```

#### Populate
Populates the database with given data

```GET '/seed/populate'```

#### Reset
Wipes the database, the populates the database with given data

```GET '/seed/reset'```