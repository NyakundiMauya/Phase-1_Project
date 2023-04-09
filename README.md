# Bikeway App
This is a simple bike hiring system that allows users to rent bikes and pay based on the mileage covered. The system checks the odometer readings, before and after the requests to get values of mileage before and after use then calculate the amount to be charged.

## Goals

- Automate the motorbike hiring process in an institution.
- Accounting can view the usage statistics and revenue of the system.
- Convert the amount collected into different currencies for convinience if the guests want to pay in foreign currency.

## How to use
The solution requests one to enter the reqired details in the fields and submission can only be done when all the fields are filled. The conversion of the collected amount comes before the submission request because this would allow the user to let a client know the amount before submiting. The amount calculations are calculated from the distance the client covers i.e. subtracting the starting mileage from the mileage recorded once the motorcyle is returned. The time to be filled is validated and set to only allow values within the working hours i.e. 8am to 6pm. 

## API Endpoints
This system uses FASTFOREX public API (https://api.fastforex.io/fetch-all?from=kes&api_key=25ecda0ad8-25a0f25fa7-rsqxm2) in currency conversion.

