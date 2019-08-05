# Backend Assessment - Blog Posts
This project could provide some posts search service for you. By using the endpoints we provide here, you could get the posts you are interested from tons of posts by searching posts' tags, also, the result you get was sorted by post ID in ascending order by default. Not only that, you could sort the result by more properties of the posts, for example, "likes", "reads", and "popularity" in ascending (default) or descending order.

## How to start the server
1. After unzip the folder, open your terminal and navigate to the direction of the folder. For example:
  ```
  cd C:\Users\username\Desktop\Backend Assessment
  ```
2. Under this folder direction, type in the following command to install dependencies:
  ```
  npm install --save
  or 
  yarn install
  ```
_Note_: Before the folder was zipped, `node-modules` folder was removed. You have to install all the dependencies which are listed in `package.json` before you could start the server.

3. After installed all the dependencies, type the command in terminal:
  ```
  node server.js
  or
  nodemon server.js
  ```
_Note_: Now the server is running on `localhost: 5000`. You could see `server listen on 5000` from the terminal. Or if you open `http://localhost:5000/api/ping` in the browser or **Postman**, you could see `{ success: true}`.

## APIs
### Route 1
* **Route**: `/api/ping`

* **Method**: `GET`

* **Success Response**: 
  * Body: 
    ```
    {
      "success": true
    }
    ```
  * Status: 200

* **Notes**: If the server is listening on 5000, you could get success response from `localhost:5000/api/ping`, with _body_ message `{"success": true}` and _status_ code `200`.

### Route 2
* **Route**: `/api/posts`

* **Method**: `GET`

* **Query Parameters**:
  * **Required**
    | Field|  Type   |  Description       |  Default   |   Example   |
    |------|:-------:|:-------------------|:-------------:|:-------:|
    | tags |  String | A comma separated list of tags | NA |tech, health|
  * **Optional**
    | Field|  Type   |  Description       |  Default   |   Example   |
    |------|:-------:|:-------------------|:-------------:|:-------:|
    | sortBy |  String | The field to sort the posts by. The acceptable fields are: 'id', 'reads', 'likes', 'popularity' | id |likes|
    | direction |  String | The direction for sorting. The acceptable fields are: 'desc', 'asc' | asc |asc|

* **Success Response**: 
  * Body: 
    ```
    {
      "posts": [
        {
          "id": 1,
          "author": "Rylee Paul",
          "authorId": 9,
          "likes": 960,
          "popularity": 0.13,
          "reads": 50361,
          "tags": [ "tech", "health" ]
        },
        {
          "author": "Zackery Turner",
          "authorId": 12,
          "id": 2,
          "likes": 469,
          "popularity": 0.68,
          "reads": 90406,
          "tags": [
            "startups",
            "tech",
            "history"
          ]
        },
      ...
      ]
    }
    ```
  * Status: 200

* **Error Response**:
  * If `tags` parameter is not present:
    * Body: 
        ```
        {
          "error": "Tags parameter is required"
        }
        ```
    * Status: 400
  * If a `sortBy` or `direction` are invalid values, specify an error like below:
    * Body: 
        ```
        {
          "error": "sortBy parameter is invalid"
        }
        ```
    * Status: 400

* **Sample Call**:
  * `http://localhost:5000/api/posts`
    * _Note_: Will receive **Error Response** with message `"error": "Tags parameter is required"`.
  * `http://localhost:5000/api/posts?tags=tech,history&sortBy=ID`
    * _Note_: Will receive **Error Response** with message `"error": "sortBy parameter is invalid"`.
  * `http://localhost:5000/api/posts?tags=tech,history`
    * _Note_: Will receive **Success Response** with posts searched by `tags: tech and history` without duplicates, and sorted by _default_ `id` with _default_ sorting `direction: asc`.
  * `http://localhost:5000/api/posts?tags=tech,health&direction=desc`
    * _Note_: Will receive **Success Response** with posts searched by `tags: tech and health` without duplicates, and sorted by _default_ `id` with sorting `direction: desc`.
  * `http://localhost:5000/api/posts?tags=tech,health,history&sortBy=likes&direction=desc`
    * _Note_: Will receive **Success Response** with posts searched by `tags: tech, health and history` without duplicates, and sorted by `likes` with sorting `direction: desc`.