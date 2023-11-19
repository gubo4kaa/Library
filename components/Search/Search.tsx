"use client"
import LibraryService from '@/services/services';
import { useSubscribeStore } from '@/store/SubscribeStore';
import { useBlurStore } from '@/store/storeBlur';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import MiniCard from '../MiniCard/MiniCard';
import styles from './Search.module.css';
import Image from "next/image";



interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  category: ICategory[];
}

type FormInputs = {
  searchString: string
}

export default function Search({category}:Props) {

  const submitRef = useRef<HTMLInputElement>(null);
  const resetRef = useRef<HTMLButtonElement>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [lengthSearch, setLengthSearch] = useState<boolean>(false);

  const [dataState, setDataState] = useState<IServiceInterface[] | undefined>(undefined);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>()

  const { ref, ...rest } = register("searchString")

  const onSubmit = async (data: FormInputs) => {
    setBlur(true);
    if(data.searchString.length > 1) {
      setLengthSearch(true);
      await LibraryService.Search(data.searchString)
      .then((value) => {
        if(value.data[0].name) {
          setDataState(value.data.slice(0, 5))
        } else {
          setDataState(undefined)
        }
      })
      .catch(() => {
        setLengthSearch(true);
        setDataState(undefined)
      })
    } else {
      setLengthSearch(false);
      setDataState(undefined)
    }
  }
  
  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
  const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  const [droDownState, setDroDownState] = useState<boolean>(false);
  
  const dorpRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname()

  useEffect(() => {
    setDroDownState(false)
    setBlur(false)
    setDataState(undefined)
  }, [path])

  useEffect(() => {
    if(!droDownState) return

    const handleClick = (e:any) => {
      if(!dorpRef.current) return;
      if(!inputRef.current) return;
      if(!dorpRef.current.contains(e.target) && inputRef.current != e.target) {
        // console.log(inputRef.current)
        // console.log(dorpRef.current)
        // console.log(e.target)
        // console.log('cсработал хендлер')
        setDroDownState(false);
        setBlur(false)
      };
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [droDownState]);

  return (
    <div className={cn(styles.wrapper, {
      [styles.inactive]: popapState
    })}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleSubmit(onSubmit)}
        onFocus={() => {setDroDownState(true);setBlur(true)}}
        className={styles.form}
      >
        <input autoComplete="off" {...register("searchString")} placeholder="Search" className={styles.mainInput} ref={(e) => {
          ref(e)
          inputRef.current = e // you can still assign to ref
        }} />
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input type="submit" hidden ref={submitRef}/>
        <button type="reset" hidden ref={resetRef} onClick={() => {setDroDownState(false); setBlur(false)}}/>
        <svg onClick={(e) => { submitRef.current?.click(); } } className={styles.searchLogo} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Search">
        <path id="Square" fillRule="evenodd" clipRule="evenodd" d="M2.75 9.625C2.75 5.82794 5.8283 2.74981 9.62535 2.75C13.4222 2.75019 16.5 5.82814 16.5 9.625C16.5 13.4219 13.4222 16.4998 9.62535 16.5C5.8283 16.5002 2.75 13.4221 2.75 9.625Z" stroke="#6E7A90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Vector 15" d="M17.9082 17.9077L14.6673 14.6668" stroke="#6E7A90" strokeWidth="1.46667" strokeLinecap="round"/>
        </g>
        </svg>
        {
          lengthSearch && (
            <svg onClick={(e) => { resetRef.current?.click(); setDataState(undefined); setLengthSearch(false) } } className={styles.closeLogo} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.4165 6.41675L10.9998 11.0001M10.9998 11.0001L6.4165 15.5834M10.9998 11.0001L15.5832 6.41675M10.9998 11.0001L15.5832 15.5834" stroke="#909DB3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        }
      </form>
      {
        droDownState && dataState && (
          <div className={styles.dropDownWrapper} ref={dorpRef}>
            {
              dataState.map((item, key) => (
                <Link href={`/services/${encodeURIComponent(item.name)}`} key={key} onClick={(i) => {setDroDownState(false); setBlur(false); setDataState(undefined)}}>
                  <MiniCard category={category} service={item} key={key}/>
                </Link>
              ))
            }
          </div>
        )
      }
      {
        droDownState && !dataState && lengthSearch && (
          <div className={cn(styles.dropDownWrapper, styles.notFoundDataWrapper)} ref={dorpRef}>
            <Image src={'/notFoundSearch.png'} width={144} height={144} alt=''/>
            <div>
              <h4>
                Nothing Found
              </h4>
              <p>
                Perhaps you made a mistake when typing or this <br /> resource has not yet been added.
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}

