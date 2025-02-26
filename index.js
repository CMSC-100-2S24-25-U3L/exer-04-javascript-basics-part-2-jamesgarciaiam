import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import * as fs from 'fs';

function generateUniqueID(firstName, lastName){
    let createdID = "";

    let firstLetter = firstName.toLowerCase().charAt(0);
    let lastLetters = "";

    for(let i = 0; i < lastName.length; i++){
         lastLetters += lastName[i].toLowerCase();
    }
    
    let uuidDigit = uuidv4().split("-")[0];
    createdID = firstLetter + lastLetters + uuidDigit;

    return createdID;
}

function addAccount(firstName, lastName, email, age){
    let personal_info = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age
    }

    if(personal_info.first_name == undefined || personal_info.last_name == undefined || personal_info.email == undefined || personal_info.age == undefined){
        return;
    } else {
        const emailValid = validator.isEmail(personal_info.email);
        if(emailValid == false){
            return;
        } else {
            if(personal_info.age < 18){
                return;
            } else {
                let unique = generateUniqueID(personal_info.first_name, personal_info.last_name);
                fs.appendFileSync('users.txt', personal_info.first_name + ',' + personal_info.last_name + ',' + personal_info.email + ',' + personal_info.age + ',' + unique + '\n');
                return true;
            }
        }
    }
}

export { generateUniqueID, addAccount };

