import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../../context/DataContext';
import db from '../../Firebase';
import './css/login.css'
import SignUp from './SignUp';
export default function Login() {
    const { MY_USERID, allUser, getAllUsers, setMY_USERID } = useContext(DataContext);
    const [isValid, setIsValid] = useState(false)
    const [isInValid, setIsInValid] = useState(false)
    const [data, setData] = useState([])
    const [isNewUser,setIsNewUser] = useState(false)

    const idRef = useRef();
    const passRef = useRef();

    const handleChange = (e) => {
        setIsValid(false)
        setIsInValid(false)
        // eslint-disable-next-line
        allUser.map(userId => {
            userId === e.target.value && setIsValid(true)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            db.collection("Users").doc(idRef.current.value).onSnapshot(snapshot => {
                setData(snapshot.data().profile)
            })
            console.log(data)
            
        }
    }

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line
        data.map(e => {
            if (e.PASSWORD) {
                if (passRef.current.value === e.PASSWORD) {
                    console.log(passRef.current.value, e.PASSWORD, passRef.current.value === e.PASSWORD)
                    // setUserProfile(e)
                    setMY_USERID(idRef.current.value)
                    window.localStorage.setItem("Chat-loop-Id",idRef.current.value)
                    setIsValid(false)
                    setIsInValid(false)
                    console.log(MY_USERID)
                    // getUserProfile(idRef.current.value);
                    idRef.current.value = ""
                    passRef.current.value = ""
                }
                else {
                    setIsValid(true)
                }
            }
        })
        // eslint-disable-next-line
    }, [data])
    return (
        <div className='d-center authForm container'>
            <div className="loginOutline d-center" style={{ minHeight: "72vh" }}>
                <div className={`loginInline ${isNewUser?"d-none":""}`}>
                    <h3 className="title d-hcenter px-3">Login</h3>
                    <form onSubmit={handleSubmit} action="#">
                        <div className="input-box d-vcenter flex-column">
                            <label htmlFor="">Username</label>
                            <input onChange={handleChange} ref={idRef} type="text" placeholder="" required className={`form-control ${isValid && "is-valid"} ${isInValid && "is-invalid"}`} id="validationServer01" />
                            <div style={{ minHeight: "21px" }} className={`valid-feedback ${isValid && " valid-feedback"} ${isInValid && " invalid-feedback"}`} >
                                {isValid && "Id found !"}
                            </div>
                        </div>
                        <div className="input-box my-5 d-vcenter flex-column">
                            <label htmlFor="">Password</label>
                            <input ref={passRef} name="password" type="password" placeholder="" required />
                            <div style={{ minHeight: "21px" }} className={`valid-feedback ${isValid && " valid-feedback"} ${isInValid && " invalid-feedback"}`} >
                                {isInValid && "Worng Password !!"}
                            </div>
                            {/* <div className="option3"><a href='/forgotpassword'>Forgot Password?</a></div> */}
                        </div>
                        <div style={{ marginTop: '30px' }} className="d-flex align-items-center justify-content-between">
                            <div className="input-box button">
                                <button disabled={!isValid} type="submit" name="" >Continue</button>
                            </div>
                        </div>
                        <div className="option2">New User? <span onClick={()=>{setIsNewUser(true)}} className="c-pointer">Register</span></div>
                    </form>
                </div>
                    <SignUp isNewUser={isNewUser} setIsNewUser={setIsNewUser}/>
            </div>

        </div>
    )
}
