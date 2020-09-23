# F28WP-Online-Game

# Summary of changes
- Added example backend (`Node.js`)
- API folder contains `express` (node package/module) to build a REST(ful) API
- `Nodemon` to make restarting server/node console easier
- Added test/sample data - _need to connect with `MongoDB`_
- API folder contains `Joi` (node package/module) for HTML request validation *NEW*

# API
- `express`
- `Joi` *NEW*

# How To Access/View "Server"
download and install `node.js`
open `node console`
change the directory to be within the folder that contains `index.js`
run `index.js` with command `node index.js`

# URLs:
- `localhost:3000`
- `localhost:3000/api/scores`
- `localhost:3000/api/scores/:id`
  - _`:id`_ is a parameter. The test object only contains 3 entries/elements. Only 0, 1 and 2 work
  - example usage `localhost:3000/api/scores/0`
- `localhost:3000/api/date/:day/:month/:year` - _REMOVED_
  - only returns an object with the values from parameters
  - example usage `localhost:3000/api/date/6/12/2030` will display an object with those values
- `localhost:3000/api/date/:day/:month/:year?sortBy=name` - _REMOVED_
  - query parameters have been commented out because of a conflict with other parameters
  - you can still view this by going into the `index.js` file and commenting out the `res.send(req.params)` and removing the comments from `res.send(req.query)`
    - you can enter anything after _`?`_ since no proper support has been implemented for this
  - example usage: `localhost:3000/api/date/1/2/2030?<name>=<value>`
  
# HTML Requests *NEW*
Added functionality to `PUT`, `POST` and `DELETE` HTML requests
- `PUT`_ manipulates_ the data
- `POST` _adds_ new data
- `DELETE` _deletes_ data

Some data validation is in place when handling the requests. Using `Joi` a schema has been implemented.
Schema rules :
Field |      Type     |  Min   |  Required   |
------|---------------|--------|-------------|
name  |  String       |    3   |    Yes      |
score |  Number(Int)  |    0   |    Yes      |

To test the HTML request
- download `Postman`, a chrome application, you _do not_ need to create an account
- change to the type of HTML request to test by clicking on the dropdown menu where `GET` is
  - only supports `GET`, `POST`, `PUT` and `DELETE`
- enter the URL
- enter the data in the `Body` if needed

example `GET` request
- make sure the request is `GET`
- enter URL `http://localhost:3000/api/scores`
- `Send`

result:
`[
  {
    "id": 0,
    "name": "user1",
    "score": 1
   },
    {
        "id": 1,
        "name": "user2",
        "score": 2
    },
    {
        "id": 2,
        "name": "user3",
        "score": 3
    }
]`

example `POST` request
- make sure the request is `POST`
- enter URL `http://localhost:3000/api/scores`
- go into `Body`
- choose `raw`
- change `Text` to `JSON(application/json)`
- enter data to add using the schema above
  - e.g.: `{
    "name":"user4",
    "score":3
  }`
- `Send`

result:
`{
    "id": 4,
    "name": "user4",
    "score": 3
}`

example `PUT` request
- make sure the request is `PUT`
- enter URL `http://localhost:3000/api/scores/:id`
  - _`:id`_ is the parameter corresponding to the object `"id"`
  - e.g.: `http://localhost:3000/api/scores/0`
- go into `Body`
- choose `raw`
- change `Text` to `JSON(application/json)`
- enter data to change using the schema above
  - e.g.: `{
    "name":"user1",
    "score":10
  }`
- `Send`

result:
`{
    "id": 0,
    "name": "user1",
    "score": 20
}`
_You can see the data changed by openining a new tab and requesting `GET`_

example `DELETE` request
- make sure the request is `DELETE`
- enter URL `http://localhost:3000/api/scores/:id`
  - _`:id`_ is the parameter corresponding to the object `"id"`
  - in this case _`:id`_ is the entery to be _deleted_
  - e.g.: `http://localhost:3000/api/scores/0`
- `Send`

result:
_You can see the data deleted by openining a new tab and requesting `GET`_

# How to stop "server"
In the node console press `CTRL+C` twice to stop the server from running

_NOTE_: this is _not_ the finalised build. Future updates will _remove_ test data in replace of handling `MongoDB` data. URLs will most likely change as well.
