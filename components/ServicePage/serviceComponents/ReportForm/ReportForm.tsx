
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
            {
                loadingState && !accessState && <Preloader/>
            }
            {
                !loadingState && accessState && <p className={styles.access}>Great! Your resource will be added soon</p>
            }
          {  !loadingState && !accessState && <form onSubmit={handleSubmit(onSubmit)}>
              <h4>
                Report a problem
              </h4>
              {checkboxes.map((checkbox) => (
                <label key={checkbox.id} onClick={() => handleCheckboxChange(checkbox.id)}className={cn(styles.wrapperChecked, {
                  [styles.activeReport]:  checkbox.checked
                })}>
                  { checkbox.checked && 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Radio" filter="url(#filter0_ddi_8181_2650)">
                    <rect x="2" y="2" width="20" height="20" rx="10" fill="#0DCB86"/>
                    <circle id="Ellipse 8" cx="12" cy="11.9999" r="4.16667" fill="white"/>
                    </g>
                    <defs>
                    <filter id="filter0_ddi_8181_2650" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="0.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0509804 0 0 0 0 0.796078 0 0 0 0 0.52549 0 0 0 0.4 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8181_2650"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_8181_2650"/>
                    <feOffset/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0509804 0 0 0 0 0.796078 0 0 0 0 0.52549 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_8181_2650" result="effect2_dropShadow_8181_2650"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_8181_2650" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.49 0"/>
                    <feBlend mode="normal" in2="shape" result="effect3_innerShadow_8181_2650"/>
                    </filter>
                    </defs>
                    </svg>
                  }
                  {
                    !checkbox.checked && 
                      <span className={cn(styles.checkedCircle)}></span>
                  }
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
