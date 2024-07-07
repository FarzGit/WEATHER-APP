
import { useFormik } from 'formik';

import { toast } from 'react-toastify';
import { signInValidation } from '../validations/yupValidation.tsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';





let BASE_URL = 'http://localhost:3000/api/users'

const Login = () => {



    const initialValues = {
        email: '',
        password: ''
    }
    const navigate = useNavigate()

    const { values, handleSubmit, handleChange, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signInValidation,
        onSubmit: async (values) => {
            try {

                const { email, password } = values
                const response = await axios.post(`${BASE_URL}/login`, { email, password });
                const { token } = response.data;
                console.log('Login successful:', token);

                if (token) {
                    localStorage.setItem('jwt', token);
                    navigate('/dashboard')

                }
            } catch (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    toast.error('An unexpected error occurred');
                }
            }
        }


    })

    return (
        <div className=' h-screen flex justify-center items-center'>
            <div className='w-[30%] border shadow-lg rounded-lg p-3'>
                <div className='p-3 flex justify-center font-bold text-xl text-blue-500'>
                    SignUp
                </div>
                <form onSubmit={handleSubmit}>
                    <span className="text-[15px] p-1 text-gray-700">Email</span>
                    <input
                        type="text"
                        value={values.email}
                        name='email'
                        onChange={handleChange}
                        placeholder="Email"
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                    {errors.email && touched.email && (
                        <div className="text-red-500 text-[12px]">{errors.email}</div>
                    )}
                    <span className="text-[15px] p-1 text-gray-700">Password</span>
                    <input
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        name='password'
                        onChange={handleChange}
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                    {errors.password && touched.password && (
                        <div className="text-red-500 text-[12px]">{errors.password}</div>
                    )}
                    <div className="flex flex-col items-center pt-4 justify-center gap-5">
                        <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]   text-white">SignIn</button>
                    </div>
                </form>
                <div className="flex justify-center text-[13px] pt-2 ">
                    <span className="text-gray-600">
                        Don’t have an account ?<Link to='/register' className="text-blue-500 cursor-pointer "> SignUp</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;