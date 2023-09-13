"use client"
import LibraryService from '@/services/services';
import { useSubscribeStore } from '@/store/SubscribeStore';
import { useBlurStore } from '@/store/storeBlur';
import cn from 'classnames';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import MiniCard from '../MiniCard/MiniCard';
import CloseLogo from './Close.svg';
import styles from './Search.module.css';
import SearchLogo from './Search.svg';

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
  const [dataState, setDataState] = useState<IServiceInterface[] | undefined>(undefined);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>()

  const { ref, ...rest } = register("searchString")

  const onSubmit = async (data: FormInputs) => {
    setDroDownState(true)
    setBlur(true);
    if(data.searchString.length > 0) {
      const fetch = await LibraryService.Search(data.searchString)
      .then((value) => {
        if(value.data[0].name) {
          setDataState(value.data.slice(0, 5))
        } else {
          setDataState(undefined)
        }
      })
      .catch(() => {
        setDataState(undefined)
      })
    } else {
      setDataState(undefined)
    }
  }
  
  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])
  const [popapState, setPopapState] = useSubscribeStore((state) => [state.popapState, state.setPopapState])

  const [droDownState, setDroDownState] = useState<boolean>(false);
  
  const dorpRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const path = usePathname()

  // useEffect(() => {
  //   setDroDownState(false)
  //   setBlur(false)
  //   setDataState(undefined)
  // }, [path])

  useEffect(() => {
    if(!droDownState) return

    const handleClick = (e:any) => {
      if(!dorpRef.current) return;
      if(!inputRef.current) return;
      if(!dorpRef.current.contains(e.target) && inputRef.current != e.target) {
        console.log(inputRef.current)
        console.log(dorpRef.current)
        console.log(e.target)
        console.log('cсработал хендлер')
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
        <Image src={SearchLogo} onClick={(e) => { submitRef.current?.click(); } } className={styles.searchLogo} alt={''}/>
        <Image src={CloseLogo} onClick={(e) => { resetRef.current?.click(); setDataState(undefined); } } alt={''} className={styles.closeLogo}/>
      </form>
      {
        droDownState && dataState && (
          <div className={styles.dropDownWrapper} ref={dorpRef}>
            {
              dataState.map((item, key) => (
                <Link href={`/service/${encodeURIComponent(item.name)}`} key={key} onClick={(i) => {setDroDownState(false); setBlur(false); setDataState(undefined)}}>
                  <MiniCard category={category} service={item} key={key}/>
                </Link>
              ))
            }
          </div>
        )
      }
    </div>
  );
}

