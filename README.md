# AWS serverless fullstack app - https://empathix-aws-serverless-app.vercel.app/

![image](https://github.com/user-attachments/assets/4a81e3eb-2193-4978-9e90-2d6236316e39)

A fullstack AWS serverless fullstack app utilising API Gateway, Lambda, DynamoDB and Next.js (React)

## How to run the app
1. Clone this repository into your preferred folder
2. `cd` into your cloned repository
3. Run `npm install`
4. Run `npm run dev`

## CRUD Features:
1. Creating an item in DynamoDB
    - You may add a new candidate in the table via a form.
    - ![image](https://github.com/user-attachments/assets/93be6ce3-6ecc-4ecc-8f3c-3e614e93d8d5)

2. Reading an item from DynamoDB
    - All candidates in the table are fetched from DynamoDB through an api.
    - ![image](https://github.com/user-attachments/assets/fd128789-23fb-4755-94f9-0a335321c0c6)

3. Updating an item in DynamoDB
    - Moving a candidate to a different column will update the candidate's status
    - ![image](https://github.com/user-attachments/assets/55ab4c2d-aa0f-4ef0-a0bd-ed957fd15eb4)

4. Deleting an item in DynamoDB  
    - Clicking the trash button will delete a candidate from DynamoDB
    - ![image](https://github.com/user-attachments/assets/ca3baa00-e782-414a-83ee-48237dc6edf8)

## API endpoints:

1. `https://6xmoqd1f7c.execute-api.ap-southeast-2.amazonaws.com/api/v1/candidates/all` will fetch all candidates from DynamoDB
2. `https://6xmoqd1f7c.execute-api.ap-southeast-2.amazonaws.com/api/v1/candidates/{id}` will fetch one candidate from DynamoDB
3. `https://6xmoqd1f7c.execute-api.ap-southeast-2.amazonaws.com/api/v1/candidates/new` will create a new candidate in DynamoDB given a request body like the following:
   `{
    "userId": "2",
    "fullName": "Ricjohn Genoguin",
    "email": "ricjohn.genoguin@gmail.com",
    "status": "in-progress"
}`

4. `https://6xmoqd1f7c.execute-api.ap-southeast-2.amazonaws.com/api/v1/candidates/delete/{id}` will delete a candidate from DynamoDB
5. `https://6xmoqd1f7c.execute-api.ap-southeast-2.amazonaws.com/api/v1/candidates/update` will update an existing candidate in DynamoDB given a request body like the following:
   `{
    "userId": "2",
    "fullName": "Ricjohn Genoguin",
    "email": "ricjohn.genoguin@gmail.com",
    "status": "in-progress"
}`

## Notes:
- The code for lambda handlers have been written directly through AWS Lambda console
- Due to time restriction (1hr) no validation/tests have been written



