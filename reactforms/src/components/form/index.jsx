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
    const [date, setDate] = useState(Date());
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
            emailNotifications,
            date
        };

        setName('');
        setEmail('');
        setPhone('');
        setPhoneType('');
        setStaff('');
        setBio('');
        setEmailNotifications('');
        setDate(Date())
        console.log('formData: ', formData)
    }

    useEffect(() => {
        const errors = {};
        if (name.length === 0) {
            errors['nameError'] = 'Name must be present.';
        };
        let atCount = 0;
        let validSuffix = false;
        for (let i = 0; i < email.length; i++) {
            if (email[i] === '@') {
                atCount++;
            }
            if (atCount > 0) {
                if (email[i] === '.') {
                    validSuffix = true;
                }
            }
        }

        if (atCount != 1 || !validSuffix) {
            errors['emailError'] = 'Email address must be present and valid.';
        }

        if (phone.length > 0) {
            let validIntegers = 0;
            for (let i = 0; i < phone.length; i++) {
                if (parseInt(phone[i]) != NaN) {
                    validIntegers++;
                }
            }
            if (validIntegers < 10) {
                errors['phoneError'] = 'Phone number must be valid.';
            }

            if (phoneType.length === 0 || phoneType === 'select') {
                errors['phoneTypeError'] = 'Phone type should be selected.';
            }
        }

        if (bio.length > 280) {
            errors['bioError'] = 'Bio cannot exceed 280 characters.'
        }


        setValidationErrors(errors)
        console.log('errors from errors function:', errors)
        console.log(validationErrors)
    }, [name, email, phone, phoneType, bio])


    return (
        <div>
            <h2>Form</h2>
            <form onSubmit={onSubmit}>
                <div className='input-container'>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" placeholder='Name' class={validationErrors['nameError'] ? 'error-input' : ""} onChange={e => setName(e.target.value)} />
                {validationErrors['nameError'] != null && (
                    <p className='error'>{validationErrors['nameError']}</p>
                )}
                </div>
                <br />

                <div className='input-container'>
                <label htmlFor="email">Email: </label>
                <input type="email" name='email' id='email' placeholder='Email' class={validationErrors['emailError'] ? 'error-input' : ""} onChange={e => setEmail(e.target.value)} />
                {validationErrors['emailError'] != null && (
                    <p className='error'>{validationErrors['emailError']}</p>
                )}
                </div>
                <br />

                <div className='input-container'>
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input type="text" name='phoneNumber' id='phoneNumber' placeholder='(555) 555 - 5555' class={validationErrors['phoneError'] ? 'error-input' : ""} onChange={e => setPhone(e.target.value)} />
                {validationErrors['phoneError'] != null && (
                    <p className='error'>{validationErrors['phoneError']}</p>
                )}
                </div>
                <br />

                {phone.length > 0&& (
                     <div className='input-container'>
                     <label htmlFor="phoneType">Phone Type: </label>
                     <select name="phoneType" id="phoneType" class={validationErrors['phoneTypeError'] ? 'error-input' : ""} onChange={e => setPhoneType(e.target.value)}>
                         <option value="select">--select--</option>
                         <option value="mobile">Mobile</option>
                         <option value="home">Home</option>
                         <option value="work">Work</option>
                     </select>
                     {validationErrors['phoneTypeError'] != null && (
                         <p className='error'>{validationErrors['phoneTypeError']}</p>
                     )}
                     </div>
                )}
                <br />
               

                <label htmlFor="staff">Staff? </label>
                <label htmlFor="staff-instructor">Instructor</label>
                <input name='staff' type="radio" value="instructor" id="staff-instructor" onChange={e => setStaff(e.target.value)} />
                <label htmlFor="staff-student">Student</label>
                <input name='staff' type="radio" value="student" id="staff-student" onChange={e => setStaff(e.target.value)} />
                <br />


                <div className='input-container' id='bio-container'>
                <label htmlFor="bio">Bio: </label>
                <textarea name="bio" id="bio" cols="30" rows="10" placeholder='Bio' onChange={e => setBio(e.target.value)} class={validationErrors['bioError'] ? 'error-input' : ""} ></textarea>
                {validationErrors['bioError'] != null && (
                    <p className='error'>{validationErrors['bioError']}</p>
                )}
                </div>
                <br />

                <label htmlFor="emailNotifications">Recieve email notifications? </label>
                <input type="checkbox" name="emailNotifications" id="emailNotifications"  onChange={e => setEmailNotifications(e.target.value)} />
                <br />
                <input type="Submit" name="" id="" />
            </form>

        </div>
    )
}



export default Form;