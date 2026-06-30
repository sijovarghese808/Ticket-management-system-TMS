import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { useToast } from '../../components/toaster/toastContext'
import { useEffect, useState } from 'react';
import { EmailIcon, PasswordIcon, UserIcon, GoogleIcon} from '../../assets/iconList';
import { GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase-config';




export default function Login() {

    // const handleGoogleLogin = async () => {
    //   try {
    //     const result = await signInWithPopup(auth, provider);
    //     const user = result.user;
    //     console.log('Logged in user:', user);
    //     localStorage.setItem('user', JSON.stringify(user));
    //   } catch (err) {
    //     console.error('Login failed:', err);
    //   }
    // };
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async () => {
        provider.setCustomParameters({
            prompt: "select_account", // forces account selection every time
        });

        setPersistence(auth, inMemoryPersistence) // doesn't persist session at all
            .then(() => {
                return signInWithPopup(auth, provider);
            })
            .then((result) => {
                const user = result.user;
                console.log("Signed in user:", user);
                const data = {
                    username: user.email,
                    password: user.uid,
                    name: user.displayName,
                    confirmPassword: user.uid,

                }
                if (isLoggin) {
                    onLoginSubmit(data);
                }
                else {
                    onRegisterSubmit(data);
                }


            })
            .catch((error) => {
                console.error("Login error:", error);
                //   addToast('Login failed. Please check your credentials and try again.', 'error');

            });
    }
    const navigate = useNavigate();
    const { loginUser, createUser } = useAuth();
    const { addToast } = useToast();
    const [isLoggin, setLogging] = useState(true);
    const [userData, setUserData] = useState('Again');

    const handleToggle = () => {
        setLogging(!isLoggin);
        reset();
    };
    useEffect(() => {
        const user = localStorage?.getItem('user');
        if (user) {
            debugger;
            const parsedUser = JSON.parse(user); // convert JSON string to object
            console.log(parsedUser.userName);    // now you can safely access userName
            //   setUserData(parsedUser);             // if you need to store it in state
        }
    }, []);


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();


    const onLoginSubmit = async (data: any) => {
        const res = await loginUser(data.username, data.password);
        if (res) {
            navigate('/dashboard');
            addToast('Login successful!', 'success');
        } else {
            addToast('Login failed. Please check your credentials and try again.', 'error');
        }
    };
    const onInvalid = (errors: any) => {
        addToast('Please fill out all required fields correctly.', 'error');
    };

    const onRegisterSubmit = async (data: any) => {
        if (data.password !== data.confirmPassword) {
            addToast("Passwords do not match", 'error');
            return;
        }
        const res = await createUser(data.name, data.username, data.password, data.confirmPassword);
        if (res) {
            addToast('Account created successfully!. Please log in.', 'success');
            localStorage.setItem('user', JSON.stringify({ username: data.username }));
            setLogging(true);
            reset();
        } else {
            addToast('Error occurred. Please try again.', 'error');
        }
    };

    return (
        <div className="h-screen flex">
            {/* Left image panel */}
            <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center bg-no-repeat bg-center h-full bg-cover">
                <div className="bg-black opacity-20 inset-0 z-0"></div>
                <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                    <h1 className="text-white font-bold text-4xl font-sans">Simple App</h1>
                    <p className="text-white mt-1">The simplest app to use</p>
                    <div className="flex justify-center lg:justify-start mt-6">
                        <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Get Started</a>
                    </div>
                </div>
            </div>




            {/* Right form panel */}
            <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                <div className="w-full px-8 md:px-32 lg:px-24">
                    <form onSubmit={handleSubmit((isLoggin ? onLoginSubmit : onRegisterSubmit), onInvalid)} className="bg-white rounded-md shadow-2xl p-5">
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello {userData}!</h1>
                        <p className="text-sm font-normal text-gray-600 mb-8">{isLoggin ? 'Welcome Back' : 'Start a new journey!'}</p>

                        {/* Global error message */}
                        {/* {Object.keys(errors).length > 0 && (
                            <p className="text-red-500 text-sm mb-4">Form is not valid, please fill all required fields.</p>
                        )} */}

                        <button type="button" onClick={handleGoogleLogin} aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
                            <GoogleIcon />
                            <p className="text-base font-medium ml-4 text-gray-700">{isLoggin ? 'Continue' : 'Sign in'} with Google</p>
                        </button>
                        <div className="w-full flex items-center justify-between py-5">
                            <hr className="w-full bg-gray-400" />
                            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                            <hr className="w-full bg-gray-400" />
                        </div>

                        {/* Name (Register only) */}
                        {!isLoggin && (
                            <>
                                <div className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${errors.name ? 'border-red-500 relative' : ''}`}>
                                    <UserIcon />
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        className="pl-2 w-full outline-none border-none"
                                        type="text"
                                        placeholder="Your Name"
                                    />

                                    {errors.name && <p className="text-red-500 text-xs absolute -bottom-4">{String(errors.name.message)}</p>}
                                </div>

                            </>
                        )}

                        {/* Username */}
                        <div className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${errors.username ? 'border-red-500 relative' : ''}`}>
                            <EmailIcon />
                            <input
                                {...register('username', { required: 'Username is required' })}
                                className="pl-2 w-full outline-none border-none"
                                type="text"
                                placeholder="Email Address"
                            />
                            {errors.username && <p className="text-red-500 text-xs absolute -bottom-4">{String(errors.username.message)}</p>}
                        </div>


                        {/* Password */}

                        <div className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${errors.password ? 'border-red-500 relative' : ''}`}>
                            <PasswordIcon />
                            <input
                                {...register('password', { required: 'Password is required' })}
                                className="pl-2 w-full outline-none border-none"
                                type="password"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-xs absolute -bottom-4 ">{String(errors.password.message)}</p>}
                        </div>


                        {/* Confirm Password (Register only) */}
                        {!isLoggin && (
                            <>
                                <div className={`flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ${errors.confirmPassword ? 'border-red-500 relative' : ''}`}>
                                    <PasswordIcon />
                                    <input
                                        {...register('confirmPassword', { required: 'Please confirm your password' })}
                                        className="pl-2 w-full outline-none border-none"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-xs absolute -bottom-4">{String(errors.confirmPassword.message)}</p>}
                                </div>

                            </>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                        >
                            {isLoggin ? 'Login' : 'Register'}
                        </button>

                        <div className="flex justify-between mt-4">
                            {isLoggin && (
                                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password?</span>
                            )}
                            <p
                                onClick={() => handleToggle()}
                                className="text-sm hover:text-blue-500 cursor-pointer ml-auto"
                            >
                                {isLoggin ? "Don't have an account yet?" : 'Have an account already?'}
                            </p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
