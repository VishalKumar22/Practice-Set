import { useState } from "react"
import { login } from "../axios/actions"
import { useNavigate } from "react-router-dom"

function Login () {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=> {
          e.preventDefault()
        const response = await login(formData)
        console.log(response)
        localStorage.setItem("Token", (response.token))
        navigate("/profile")
        
    }

    return (
        <>
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={(e)=> handleOnChange(e)}
                    required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e)=> handleOnChange(e)}
                    required />
                </div>

                <button type="submit" className="submit-btn">Sign In</button>
            </form>
        </div>
        </>
    )
}

export default Login