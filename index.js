import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import * as fs from 'fs';

function generateUniqueID(firstName, lastName){
    let createdID = ""; //Created empty string

    let firstLetter = firstName.toLowerCase().charAt(0); //only get the first letter of first name
    let lastLetters = ""; //Created empty string

    for(let i = 0; i < lastName.length; i++){
         lastLetters += lastName[i].toLowerCase();
    } //Get all letters of last name and put them in lower case
    
    let uuidDigit = uuidv4().split("-")[0]; //Create random string and limit to the first dash
    createdID = firstLetter + lastLetters + uuidDigit; //concatenate all strings

    return createdID;
}

function addAccount(firstName, lastName, email, age){
    let personal_info = { //create array
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age
    }

    if(personal_info.first_name == undefined || personal_info.last_name == undefined || personal_info.email == undefined || personal_info.age == undefined){
        return; //if any fields are empty, return
    } else {
        const emailValid = validator.isEmail(personal_info.email);
        if(emailValid == false){
            return; //if email is not valid, return
        } else {
            if(personal_info.age < 18){
                return; //if underaged, return
            } else {
                let unique = generateUniqueID(personal_info.first_name, personal_info.last_name); //create unique ID
                fs.appendFileSync('users.txt', personal_info.first_name + ',' + personal_info.last_name + ',' + personal_info.email + ',' + personal_info.age + ',' + unique + '\n'); //append to text file
                return true; //return true if saved
            }
        }
    }
}

export { generateUniqueID, addAccount }; //export to test.js

