





import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { signUpValidation } from '../validations/yupValidation.tsx';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



let BASE_URL = 'http://localhost:3000/api/users'

const Register = () => {

    const navigate = useNavigate()


    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }


    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpValidation,

        onSubmit: async (values) => {

            try {
                console.log(values)
                const { username, email, password } = values;
                const response = await axios.post(`${BASE_URL}/register`, { email, username, password });
                console.log('Registration successful:', response.data);
                if (response.data) {
                    toast.success('Registration Successfull')
                    navigate('/login')
                }

            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                  } else {
                    toast.error('An unexpected error occurred');
                  }
            }
        },

    })



    return (
        <div className=' h-screen flex justify-center items-center'>


            <div className='w-[30%] border shadow-lg rounded-lg p-3'>
                <div className='p-3 flex justify-center font-bold text-xl text-blue-500'>
                    SignUp
                </div>
                <form onSubmit={handleSubmit}>
                    <span className="text-[15px] p-1 text-gray-700">Username</span>
                    <input
                        type="text"
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                        placeholder="username"
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                    {errors.username && touched.username && (
                        <div className="text-red-500 text-[12px]">{errors.username}</div>
                    )}
                    <span className="text-[15px] p-1 text-gray-700">Email</span>
                    <input
                        type="text"
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />{errors.email && touched.email && (
                        <div className="text-red-500 text-[12px]">{errors.email}</div>
                    )}
                    <span className="text-[15px] p-1 text-gray-700">Password</span>
                    <input
                        type="password"
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                    {errors.password && touched.password && (
                        <div className="text-red-500 text-[12px]">{errors.password}</div>
                    )}
                    <span className="text-[15px] p-1 text-gray-700">Confirm password</span>
                    <input
                        type="password"
                        name='confirmpassword'
                        value={values.confirmpassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="mb-[2px] text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    />
                    {errors.confirmpassword && touched.confirmpassword && (
                        <div className="text-red-500 text-[12px]">{errors.confirmpassword}</div>
                    )}
                    <div className="flex pt-4 justify-center flex-col gap-1 items-center" >
                        <button type='submit' className="bg-blue-500 rounded-md h-[40px] w-[110px]  text-white">SignUp</button>
                        <span className='text-[#C7C8CC]'>or</span>

                    </div>
                </form>
                <div className=" flex justify-center text-[13px] pt-2 ">
                    <span className="text-gray-600">
                        Already have an account ?<Link to='/login' className="text-blue-500"> SignIn</Link>
                    </span>
                </div>

            </div>
        </div>




    );
};

export default Register;