'use client'
import LibraryService from '@/services/services';
import { useSubscribeStore } from '@/store/SubscribeStore';
import { useBlurStore } from '@/store/storeBlur';
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import ButtonNew from '../ButtonNew/ButtonNew';
import Preloader from '../Preloader/Preloader';
import { verifyCaptcha } from '../Recap4a/Recap4a';
import styles from './SubscribeForm.module.css';
import Error from 'next/error';
import { Axios } from 'axios';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    
}

export default function SubscribeForm({}:Props) {

    const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
    const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])
    
    useEffect(()=> {
        if(!blur) {
            setPopapState(null)
        }
    }, [blur])

    // useEffect(()=> {
    //     setLoadingState(false);
    //     setPopapState(null); 
    //     setBlur(false);
    // }, [])

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [accessState, setAccessState] = useState<boolean>(false)

    const showOff = () => {
        setTimeout(() => {setPopapState(null); setBlur(false); setAccessState(false)}, 2000)
    }

    const refButton = useRef<HTMLInputElement>(null)

    const focusInput = () => {
        refButton.current?.click();
    };
    
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsverified] = useState<boolean>(true)

    async function handleCaptchaSubmission(token: string | null) {
        // Server function to verify captcha
        await verifyCaptcha(token)
        .then(() => setIsverified(true))
        .catch(() => setIsverified(false))
    }

    const onSubmit = async (data: object) => {
        // console.log(data)
        setLoadingState(true)
        try {
          await LibraryService.EmailService(data)
          .then(() => {
            setLoadingState(false);
            setAccessState(true);
            showOff();
          })
            .catch((e) => {
                setLoadingState(false);
                setError("email", {
                    type: "random",
                    message: e.message
                }) 
                console.log('catchTry')
                console.log(e.response.status)
                console.log(e.response.data.err)
          });
        } catch (error: any) {
            setLoadingState(false)
            setError("email", {
                type: "random",
                message: error.message
            })             
        }
    };
    
    return ( popapState == 'subscribe' && (
         <div className={cn(styles.wrapper)}>
            <h4>
                Subscribe Newsletter
            </h4>
            {/* <SignupForm /> */}
            {
                loadingState && !accessState && <Preloader/>
            }
            {
                !loadingState && accessState && <p className={styles.access}>Great! Your resource will be added soon</p>
            }
            {   !loadingState && !accessState &&
                <form onSubmit={handleSubmit(onSubmit)} method="post" className={styles.form}>
                    <svg className={styles.searchLogo} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Inbox">
                        <path id="Square" fillRule="evenodd" clipRule="evenodd" d="M2.29102 11C2.29102 4.58329 4.12435 3.66663 10.9998 3.66663C17.8752 3.66663 19.7077 4.58329 19.7077 11C19.7077 17.4166 17.8752 18.3333 10.9998 18.3333C4.12435 18.3333 2.29102 17.4166 2.29102 11Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path id="Stroke 1" d="M16.5 7.78785C16.5 7.78785 12.8333 11 11 11C9.16667 11 5.5 7.79167 5.5 7.79167" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                    <input type="email" placeholder="email"
                    {...register(
                            "email", 
                            { 
                                pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i, 
                                required: true 
                            }
                        )
                    }
                    className={cn(styles.field, {
                        [styles.errorField]: errors.email
                    })}/>
                    {/* {errors.email && <p>This email is required</p>} */}
                    <input ref={refButton} onClick={() => {
                    setError("email", { type: "focus" });
                    }} type="submit" className={cn(styles.submit)} 
                    disabled={!isVerified} 
                    // disabled={false}
                    />
                    {
                        !isVerified && <ReCAPTCHA
                        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                        ref={recaptchaRef}
                        onChange={handleCaptchaSubmission}
                        />
                    }
                    <span onClick={focusInput}>
                        <ButtonNew 
                        disable={!isVerified}
                        // disable={false} 
                        preventDefault width='max' iconPosition={'iconRight'} type='Primary' size='s'>
                            Subscribe
                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Arrow Right">
                                <path id="Vector 190" d="M18.8327 11L12.6452 17.4167M18.8327 11L12.6452 4.58337M18.8327 11L4.16602 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </ButtonNew>
                    </span>
                </form>
            }
            <p>
                No spam, only updates and releases. 
            </p>
        </div>
        )
    )
}

