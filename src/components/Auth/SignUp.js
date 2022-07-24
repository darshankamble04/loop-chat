import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../context/DataContext';
import db from '../../Firebase';
import './css/login.css'
export default function SignUp({ isNewUser, setIsNewUser }) {
    const { allUser, getAllUsers,setMY_USERID } = useContext(DataContext);
    const [isAlreadyExists, setIsAlreadyExists] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const [passMatch, setPassMatch] = useState(false)
    const [isChange, setIsChange] = useState(false)
    const nameRef = useRef();
    const idRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();

    const handleChange = (e) => {
        setIsAlreadyExists(false)
        setIsInValid(false)
        // eslint-disable-next-line
        allUser.map(userId => {
            userId === e.target.value && setIsAlreadyExists(true)
        })
        if (!isAlreadyExists && e.target.value.length > 5) { setIsInValid(true) }
    }
    const handlePassConfirmation=(e)=>{
        setPassMatch(false)
        setIsChange(true)
        if(passRef.current.value === e.target.value && e.target.value.length >=2){
            setPassMatch(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAlreadyExists && passMatch) {
            if (passMatch) {
                db.collection("Users").doc(idRef.current.value).set({
                    profile: [
                        { name: nameRef.current.value },
                        { PASSWORD: passRef.current.value },
                    ],
                    contacts: []
                })
                setMY_USERID(idRef.current.value)
                setIsAlreadyExists(false)
                window.localStorage.setItem("Chat-loop-Id",idRef.current.value)
                setIsInValid(false)
                idRef.current.value = nameRef.current.value = cpassRef.current.value = passRef.current.value = ""
            }
            else{
                setIsInValid(true)
            }
        }
    }

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
    }, [])
    return (
        <div className={`loginInline ${isNewUser ? "" : "d-none"}`}>
            <h3 className="title d-hcenter px-3">Register</h3>
            <form onSubmit={handleSubmit} action="#">
                <div className="input-box d-vcenter flex-column">
                    <label htmlFor="">Username</label>
                    <input onChange={handleChange} ref={idRef} type="text" placeholder="" required className={`form-control ${isInValid && "is-valid"} ${isAlreadyExists && "is-invalid"}`} id="validationServer01" />
                    <div style={{ minHeight: "21px" }} className={`valid-feedback ${isInValid && " valid-feedback"} ${isAlreadyExists && " invalid-feedback"}`} >
                        {isAlreadyExists && "Already exists !"}
                        {isInValid && !isAlreadyExists && "Available !"}
                    </div>
                </div>
                <div className="input-box my-5 d-vcenter flex-column">
                    <label htmlFor="">Name</label>
                    <input ref={nameRef} type="text" placeholder="" required />
                    {/* <div className="option3"><a href='/forgotpassword'>Forgot Password?</a></div> */}
                </div>
                <div className="input-box my-5 d-vcenter flex-column">
                    <label htmlFor="">Password</label>
                    <input ref={passRef} name="password" type="password" placeholder="" required />
                    {/* <div className="option3"><a href='/forgotpassword'>Forgot Password?</a></div> */}
                </div>
                <div className="input-box my-5 d-vcenter flex-column">
                    <label htmlFor="">Confirm Password</label>
                    <input onChange={(e)=>{handlePassConfirmation(e)}} ref={cpassRef} name="password" type="password" placeholder="" required className={`form-control ${isChange ? !passMatch ? "is-invalid":"is-valid":""}`}/>
                    <div style={{ minHeight: "21px" }} className={`valid-feedback ${isChange?!passMatch ? " invalid-feedback":"valid-feedback":""}`} >
                        {!passMatch && isChange && "Password does't match !"}
                        {passMatch && isChange && "Password match !"}
                    </div>
                </div>
                <div style={{ marginTop: '30px' }} className="d-flex align-items-center justify-content-between">
                    <div className="input-box button">
                        <button type="submit" name="" >Continue</button>
                    </div>
                </div>
                <div className="option2">Already Have Account? <span onClick={() => { setIsNewUser(false) }} className="c-pointer">Login</span></div>
            </form>
        </div>
    )
}
