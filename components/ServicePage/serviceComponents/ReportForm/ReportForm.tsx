
'use client'
import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";

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
    const [checkboxes, setCheckboxes] = useState<Checkbox[]>([
        { id: 1, label: "Information out of date", checked: false },
        { id: 2, label: "Information does not match the resource", checked: false },
        { id: 3, label: "Website link not clickable", checked: false },
        { id: 4, label: "Other", checked: false },
    ]);
  
    const handleCheckboxChange = (id: number) => {
        setCheckboxes((prevState) =>
          prevState.map((checkbox) =>
            checkbox.id === id
              ? { ...checkbox, checked: !checkbox.checked }
              : checkbox
          )
        );
      };
    
      const onSubmit = (data: any) => {
        console.log(data);
      };
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {checkboxes.map((checkbox) => (
              <label key={checkbox.id}>
                <input
                    type="checkbox"
                    checked={checkbox.checked}
                    // onChange={() => handleCheckboxChange(checkbox.id)}
                    {...register(`checkbox${checkbox.id}`)}
                />
                {checkbox.label}
              </label>
            ))}
          </div>
          <div>
            <textarea {...register("textarea" as const)}></textarea>
          </div>
          <div>
            <button type="submit">Отправить</button>
          </div>
        </form>
    );
  };

export default ReportForm;