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
import styles from './AddServiceForm.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
    
}

export default function AddServiceForm({}:Props) {

    const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
    const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])
    
    useEffect(()=> {
        if(!blur) {
            setPopapState(null)
        }
    }, [blur])

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [accessState, setAccessState] = useState<boolean>(false)

    const showOff = () => {
        setTimeout(() => {setPopapState(null); setBlur(false)}, 2000)
    }

    const onSubmit = async (data: any) => {
        // // console.log(data)
        setLoadingState(true)
        try {
          const submit = await LibraryService.OfferService(data);
          setLoadingState(false);
          setAccessState(true);
          showOff();
        } catch (error: any) {
            setLoadingState(false)
            setError("root.random", {
                type: "random",
            })             
        }
    };
    
   
    const refButton = useRef<HTMLInputElement>(null)

    const focusInput = () => {
        refButton.current?.click();
    };
    
    const recaptchaRef = useRef<ReCAPTCHA>(null)
    const [isVerified, setIsverified] = useState<boolean>(false)

    async function handleCaptchaSubmission(token: string | null) {
        // Server function to verify captcha
        await verifyCaptcha(token)
        .then(() => setIsverified(true))
        .catch(() => setIsverified(false))
    }
    
    return ( popapState == 'addForm' && (
         <div className={cn(styles.wrapper)}>
            <h4>
            Submit Resource
            </h4>
            <p>
                Send us a link to a resource if you would like <br /> to see it in our library. 
            </p>
            {
                loadingState && !accessState && <Preloader/>
            }
            {
                !loadingState && accessState && <p className={styles.access}>Great! Your resource will be added soon</p>
            }
            {   !loadingState && !accessState &&
                <form onSubmit={handleSubmit(onSubmit)} method="post" className={styles.form}> 
                   <svg className={styles.searchLogo} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M12.6639 6.45101L7.69943 11.4155C6.72021 12.3947 6.72021 13.9823 7.69943 14.9615C8.67864 15.9407 10.2663 15.9407 11.2455 14.9615L16.2099 9.99706C17.9725 8.23447 17.9725 5.37676 16.2099 3.61417C14.4474 1.85159 11.5896 1.85159 9.82705 3.61417L4.86259 8.57864C2.31664 11.1246 2.31664 15.2524 4.86259 17.7984C7.40855 20.3443 11.5364 20.3443 14.0823 17.7984L19.0468 12.8339" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input type="text" placeholder="https://uiscore.io"
                    {...register(
                            "url", 
                            { 
                                // pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                                required: true 
                            }
                        )
                    }
                    className={cn(styles.field, {
                        [styles.errorField]: errors.email
                    })}/>
                    {/* {errors.email && <p>This email is required</p>} */}
                    <input ref={refButton} onClick={() => {
                    setError("url", { type: "focus" });
                    }} 
                    type="submit" 
                    className={styles.submit} 
                    // disabled={false} 
                    disabled={!isVerified} 
                    />
                    {
                        !isVerified && <ReCAPTCHA
                            sitekey='6Le-ohQoAAAAACpwGxCOvqbx-HWFctzoLWQmCM2T'
                            ref={recaptchaRef}
                            onChange={handleCaptchaSubmission}
                        />
                    }
                    <span onClick={focusInput}>
                        <ButtonNew 
                        disable={!isVerified} 
                        // disable={false} 
                        preventDefault width='max' iconPosition={'iconRight'} type='Primary' size='s'>
                            Submit Resource
                            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Arrow Right">
                                <path id="Vector 190" d="M18.8327 11L12.6452 17.4167M18.8327 11L12.6452 4.58337M18.8327 11L4.16602 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </svg>
                        </ButtonNew>
                    </span>
                </form>
            }
        </div>
    )
         
    )
}

