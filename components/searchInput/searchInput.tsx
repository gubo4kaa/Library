"use client"
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react'
import styles from './searchInput.module.css'
import { useForm } from 'react-hook-form';
import Image from "next/image";
import SearchLogo from './Search.svg'
import CloseLogo from './Close.svg'
import LibraryService from '@/services/services';
import { useBlurStore } from '@/store/storeBlur';
import SearchCard from './SearchCard/SearchCard';


interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>,HTMLDivElement> {
  category: ICategory[];
}

type FormInputs = {
  searchString: string
}

export default function SearchInput({category}:Props) {

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

  const [blur, setBlur] = useBlurStore((state) => [state.blur, state.setBlur])


  const onSubmit = async (data: FormInputs) => {
    const fetch = await LibraryService.Search(data.searchString)
      .then((value) => {
        if(value.data[0].name) {
          setDataState(value.data)
        } else {
          setDataState(undefined)
        }
      })
      .catch(() => {
        setDataState(undefined)
      })
  }

  // useEffect(() => {
  //   if(dataState) {
  //     setBlur(true)
  //   } else {
  //     setBlur(false)
  //   }
  // },[dataState])


  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <input {...register("searchString")} placeholder="Search" className={styles.mainInput}/>
        {/* {errors.exampleRequired && <p>This field is required</p>} */}
        <input type="submit" hidden ref={submitRef}/>
        <button type="reset" hidden ref={resetRef}/>
        <Image src={SearchLogo} onClick={(e) => { submitRef.current?.click(); } } className={styles.searchLogo} alt={''}/>
        <Image src={CloseLogo} onClick={(e) => { resetRef.current?.click(); setDataState(undefined); } } alt={''} className={styles.closeLogo}/>
      </form>
      {
        dataState && (
          <div className={styles.dropDownWrapper}>
            {
              dataState.map((item, key) => (
                <SearchCard category={category} service={item} key={key}/>
              ))
            }
          </div>
        )
      }
      
    </div>
  );
}

