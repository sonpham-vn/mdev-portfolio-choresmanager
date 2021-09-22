# ASSIGMENT REQUIREMENT

Test devices: iPhone 11 Max Pro, Android Pixel 3a
### 1.ONBOARDING:
- 3 page on boarding when launch app with next and skip button (can also swipe)
### 2.SIGN IN/ SIGN UP:
- Fully working sign in / sign up proccess using POST API hosted on AWS Lamda & DyamoDB
https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/sign-in
https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/sign-up

### 3.NAVIGATION:
- MainScreen: can switch between Home, Activity, Account by tabbed design
- Can move forward <> back between booking screen
### 4.BACKEND SERVER INTERGRATION
- Everytime Activity tab is tabbed, call GET to get activy list, show in Activity Screen
https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/get-activity
- In Map Screen, when tab confirm button, call POST to get technician info and rate (show in Matching screen)
https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-post-matching
- In Payment Screen, when tab process button, call POST to process payment and get full info of technician (show in final confirmation screen)
https://zjil8ive37.execute-api.ca-central-1.amazonaws.com/dev/cm-post-payment
### 5.APP ICON
- In asset/logo folder with all sizes for android and iOS

### 6.OTHERS:
- Map in Map screen can be pin and drag
- List View: activity screen, product screen (choose category from home screen)