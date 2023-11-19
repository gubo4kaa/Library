'use client'
import ButtonNew from "@/components/ButtonNew/ButtonNew";
import { verifyCaptcha } from "@/components/Recap4a/Recap4a";
import LibraryService from "@/services/services";
import { useSubscribeStore } from "@/store/SubscribeStore";
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import styles from './ReportForm.module.css';
import Preloader from "@/components/Preloader/Preloader";

interface Checkbox {
  id: number;
  label: string;
  checked: boolean;
}

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  idService: number;
}

const ReportForm = ({idService}:Props) => {
  const { register, handleSubmit } = useForm();
  
  const [loading, setLoading] = useState<boolean>(false)
  const [sent, setSent] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  
  async function handleCaptchaSubmission(token: string | null) {
    // Server function to verify captcha
    await verifyCaptcha(token)
    .then(() => setIsVerified(true))
    .catch(() => setIsVerified(false))
    }
    
    const [checkboxes, setCheckboxes] = useState<Checkbox[]>([
        { id: 1, label: "Information out of date", checked: false },
        { id: 2, label: "Information does not match the resource", checked: false },
        { id: 3, label: "Website link not clickable", checked: false },
        { id: 4, label: "Other", checked: false },
    ]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [valueTextarea, setValuesTextarea] = useState<string>()
    const handleCheckboxChange = (id: number) => {
        setCheckboxes((checkboxes) =>
          checkboxes.map((checkbox) => (
            checkbox.id === id ? { ...checkbox, checked: !checkbox.checked }
              : { ...checkbox, checked: false }
          )
          )
        );
      };

    useEffect(() => {
    }, [valueTextarea])
    
    const onSubmit = async (data: any) => {
      const dataNew =  {
        "idLibraryItemModel": idService,
        "reportText": data.textarea && checkboxes[3].checked ? data.textarea : checkboxes.filter((e) => e.checked)[0].label
      }
      setLoadingState(true)
      try {
        await LibraryService.Report(dataNew)
        setLoadingState(false)
        setAccessState(true)
        
      } catch (error) {
        console.log(error)
        setLoadingState(false)
        setErrorState(true)
      }
    };

    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [accessState, setAccessState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<boolean>(false)

    const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])
    return (
        popapState == 'report' && (
        <div className={styles.wrapper}>
              <h4>
                Report a problem
              </h4>
            {
                loadingState && !accessState && <Preloader/>
            }
            {
                !loadingState && accessState && <p className={styles.access}>Great! We will check this resource soon!</p>
            }
            {  !loadingState && !accessState && <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {checkboxes.map((checkbox) => (
                <label key={checkbox.id} onClick={() => handleCheckboxChange(checkbox.id)}className={cn(styles.wrapperChecked, {
                  [styles.activeReport]:  checkbox.checked
                })}>
                  
                    <span className={cn(styles.checkedCircle , {
                      [styles.checkedCircleActive]: checkbox.checked
                    })}>
                      <span></span>
                    </span>
                  
                    <input
                      type="checkbox"
                      checked={checkbox.checked}
                      {...register(checkbox.label, {
                        onChange: () => handleCheckboxChange(checkbox.id),
                      })}
                    />
                  {checkbox.label}
                </label>
              ))}
            {
              checkboxes[3].checked == true && (
                <div className={styles.textareaWrapper}>
                  <textarea value={valueTextarea} placeholder="Enter a discription" {...register("textarea",{
                    onChange: (value) => setValuesTextarea(value.target.value)
                  } )}></textarea>
                </div>
              )
            }
            <div className={styles.none}>
              <button type="submit" ref={buttonRef}>Отправить</button>
            </div>
            {
              !isVerified && <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
              />
            }    
            <ButtonNew disable={!isVerified} width="max" onClick={() => buttonRef.current?.click()}>Send a Message</ButtonNew>
          </form>
          }
        </div>
        )
    );
  };

export default ReportForm;
