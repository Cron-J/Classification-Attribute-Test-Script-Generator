Classification - Attribute Test Script Generator
=================================================

The purpose of this app is to generate the test script/database for Classification - Attribute project for performance testing.


### Install an app

Run the following command in root directory of an app in command prompt.

###### *Install node packages*

server/ node install

### Run an app

###### *Run Server*

Run the following command in root directory of an app in command prompt.

server/ node server.js

You can see the port number in command prompt after sucessfull run

You can change the settings in server/config/config.js file for server and database setting changes.

You can change the test data which is used to generate script in server/config/testData.js

### How to Generate Script

###### *Requires HTTP Request Visualizer and Constructor tool*

I prefer REST CONSOLE [Google crome plugin] (https://chrome.google.com/webstore/detail/rest-console/cokgbflfommojglbmbpenpphppikmonn?hl=en)

Screenshots to help use REST CONSOLE

https://www.dropbox.com/s/d039f0pqwvq8z1v/screenshot1.PNG?dl=0

https://www.dropbox.com/s/rwm0mr3cuylhub5/screenshot2.PNG?dl=0

https://www.dropbox.com/s/r1t6rkju7miuoy8/screenshot3.PNG?dl=0

URL used to generate data:

Need to call api in sequence given below to generate data, as each entry is dependent on previous

POST: /createAttributeSection

POST: /createAttribute

POST: /createTenants

POST: /createClassification

POST: /createClassificationGroup

POST: /createClassificationGroupChild

POST: /createClassificationGroupSubChild

On each successfull post request you will message in command prompt:

Wait until you see success message

You need to wait for few minutes sometime longer (around 5-10 minutes) for ClassificationGroup, ClassificationGroupChild, ClassificationGroupSubChild

After sucessfull data creation you will see message, which will confirm the data entry

Record Successfully created

Now you can go for next request