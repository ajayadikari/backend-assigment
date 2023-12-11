# backend-assigment
ecommerce backend

*Instruction for building and running the assignment(For windows)
1. Follow the github repo link and download the zip file
2. Extract files on your local comp.
3. Open the root folder on VsCode
4. use win+shift+` for terminal
5. use "npm i" or "npm init" in terminal
6. use npm run dev to run assignment



*API's Documentation

Use postman for API testing

AUTH API's
1. Register Api(http://localhost:8000/api/auth/register)
   -> It is a post Api, set POST on postman
   -> In postman, click body tab, choose raw.
   -> send a body consisting, key-value pairs, name, email, password, confirmPassword, contact, isSeller: true(if you want to be seller, else false to login as buyer or can leave this field)

2. Login Api(http://localhost:8000/api/auth/login)
   -> It is a post Api, set POST on postman
   -> send a body consisting, key-value pairs, name, email, password, confirmPassword, contact, isSeller: true(if you want to be seller, else false or can leave this field)
   -> you will get userId, email, isSeller as response



SELLER API's
1. To create catalog(http://localhost:8000/api/seller/create-catalog/:id)
   -> It's a POST req
   -> For creating, you should logged in as a seller
   -> In the body object, send an array of object, which consists of multiple product objects with their name and price
     ex:-
       {
         "list": [
                   {
                     "name": "Apple",
                     "price": 20(DataType: Number)
                   },
                   {
                     ...
                   }  
                 ]
     }
   -> please, name the key name as "list" and array of products as value

   2. To see the orders made by buyers(http://localhost:8000/api/seller/orders/:seller_id)
      -> It's a GET req
      -> replace ":seller_id" in url with your id(you will get when you login)
      -> you will get a res with array of orders that users made to your catalog


CUSTOMER API's
1. Send a GET req to http://localhost:8000/api/buyer/list-of-sellers
   -> You will get the list seller as res

2. To get catalog of a seller(http://localhost:8000/api/buyer/seller-catalog/:seller_id)
   -> GET req
   -> replace ":seller_id" with sellerid, that you can fetch using above API

3. To order(http://localhost:8000/api/buyer/create-order/:seller_id)
   -> It's a POST req
   -> you should be logged in to use this API
   -> replace the ":seller_id" with seller id, for whom you want to place order
   -> send an array of product id, you can find product id's in catalog when you request catalog
   -> ex:- {
             "order": ["prod1_id", ....]
           }
   -> please name the key as "order"
