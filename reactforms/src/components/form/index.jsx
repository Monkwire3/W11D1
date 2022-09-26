import React, { useState, useRef, useEffect } from 'react';
import Errors from '../errors';
function Form() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [staff, setStaff] = useState('');
    const [bio, setBio] = useState('');
    const [emailNotifications, setEmailNotifications] = useState('off');
    const [validationErrors, setValidationErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name, 
            email,
            phone,
            phoneType,
            staff,
            bio,
            emailNotifications
        };

        setName('');
        setEmail('');
        setPhone('');
        setPhoneType('');
        setStaff('');
        setBio('');
        setEmailNotifications('');
        console.log(formData)
    }

    useEffect( () =>{
        const errors = [];
        if (name.length === 0) {
            errors.push('Name must be present.');
        };
        let atCount = 0;
        let validSuffix = false;
        for(let i = 0; i < email.length; i++){
            if(email[i] === '@') {
                atCount++;
            }
            if(atCount > 0) {
                if(email[i] === '.') {
                    validSuffix = true;
                }
            }
        }
        
        if(atCount != 1 || !validSuffix ) {
            errors.push('Email address must be present and valid.');
        }

        let validIntegers = 0;
        for(let i = 0; i <phone.length; i++) {
            if(parseInt(phone[i]) != NaN) {
                validIntegers++;
            }
        }
        if (validIntegers < 10){
            errors.push('Phone number must be valid.');
        }
        setValidationErrors(errors)
        console.log('errors from errors function:', errors)
        console.log(validationErrors)
    },[name, email, phone])


    return (
        <div>
            <h2>Errors</h2>
            <ul>
                {validationErrors.map(error => {
                    <li>{error}</li>
                })}
            </ul>
            <h2>Form</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={e => setName(e.target.value)}/>
                <br />

                <label htmlFor="email">Email: </label>
                <input type="email" name='email' id='email' onChange={e => setEmail(e.target.value)}/>
                <br />

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input type="text" name='phoneNumber' id='phoneNumber' onChange={e => setPhone(e.target.value)}/>
                <br />

                <label htmlFor="phoneType">Phone Type: </label>
                <select name="phoneType" id="phoneType" onChange={e => setPhoneType(e.target.value)}>
                    <option value="select">--select--</option>
                    <option value="mobile">Mobile</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>   
                </select>
                <br />

                <label htmlFor="staff">Staff? </label>
                <label htmlFor="staff-instructor">Instructor</label>
                <input name='staff' type="radio" value="instructor" id="staff-instructor"  onChange={e => setStaff(e.target.value)}/>
                <label htmlFor="staff-student">Student</label>
                <input name='staff' type="radio" value="student" id="staff-student" onChange={e => setStaff(e.target.value)} />
                <br />


                <label htmlFor="bio">Bio: </label>
                <textarea name="bio" id="bio" cols="30" rows="10" onChange={e => setBio(e.target.value)}></textarea>
                <br />

                <label htmlFor="emailNotifications">Recieve email notifications? </label>
                <input type="checkbox" name="emailNotifications" id="emailNotifications" onChange={e => setEmailNotifications(e.target.value)} />
                <br />
                <input type="Submit" name="" id="" />
            </form>

        </div>
    )
}



export default Form;