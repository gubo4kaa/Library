'use client'

import ButtonNew from "@/components/ButtonNew/ButtonNew";
import Preloader from "@/components/Preloader/Preloader";
import { verifyCaptcha } from "@/components/Recap4a/Recap4a";
import LibraryService from "@/services/services";
import { useSubscribeStore } from "@/store/SubscribeStore";
import { useBlurStore } from "@/store/storeBlur";
import cn from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import styles from './ReportForm.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  idService: number;
}

type Reason = {
  id: string;
  label: string;
};

type FormValues = {
  textarea: string;
};

const reasons: Reason[] = [
  { id: "outdated", label: "Information out of date" },
  { id: "mismatch", label: "Information does not match the resource" },
  { id: "link", label: "Website link not clickable" },
  { id: "other", label: "Other" },
];

function RadioIndicator({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(styles.radio, {
        [styles.radioChecked]: checked,
      })}
      aria-hidden="true"
    >
      {checked ? <span className={styles.radioDot} /> : null}
    </span>
  );
}

const ReportForm = ({ idService }: Props) => {
  const [, setBlur] = useBlurStore((state) => [state.blur, state.setBlur]);
  const [popapState, setPopapState] = useSubscribeStore((state) => [
    state.popapState,
    state.setPopapState,
  ]);
  const isOpen = popapState === 'report';

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      textarea: "",
    },
  });

  const [selectedReason, setSelectedReason] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [accessState, setAccessState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [valueTextarea, setValuesTextarea] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isOtherSelected = selectedReason === "other";

  const selectedLabel = useMemo(
    () => reasons.find((reason) => reason.id === selectedReason)?.label ?? "",
    [selectedReason],
  );

  const closeModal = () => {
    setPopapState(null);
    setBlur(false);
    setLoadingState(false);
    setAccessState(false);
    setErrorState(false);
    setIsVerified(false);
    setSelectedReason("");
    setValuesTextarea("");
    reset();
    recaptchaRef.current?.reset();
  };

  const showOff = () => {
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsVerified(true))
      .catch(() => setIsVerified(false));
  }

  const onSubmit = async (data: FormValues) => {
    if (!selectedLabel) {
      return;
    }

    const reportText =
      isOtherSelected && data.textarea.trim()
        ? data.textarea.trim()
        : selectedLabel;

    setLoadingState(true);
    setErrorState(false);

    try {
      await LibraryService.Report({
        idLibraryItemModel: idService,
        reportText,
      });
      setLoadingState(false);
      setAccessState(true);
      showOff();
    } catch (error) {
      setLoadingState(false);
      setErrorState(true);
    }
  };

  const submitForm = () => {
    void handleSubmit(onSubmit)();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h4>Report a problem</h4>

      {loadingState && !accessState ? <Preloader /> : null}

      {!loadingState && accessState ? (
        <p className={styles.access}>Great! We will check this resource soon!</p>
      ) : null}

      {!loadingState && !accessState ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitForm();
          }}
          className={styles.form}
        >
          <div className={styles.reasonList} role="radiogroup" aria-label="Report reason">
            {reasons.map((reason) => {
              const checked = selectedReason === reason.id;

              return (
                <label
                  key={reason.id}
                  className={cn(styles.reasonCard, {
                    [styles.reasonCardActive]: checked,
                  })}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason.id}
                    checked={checked}
                    onChange={() => setSelectedReason(reason.id)}
                    className={styles.nativeInput}
                  />
                  <RadioIndicator checked={checked} />
                  <span className={styles.reasonText}>{reason.label}</span>
                </label>
              );
            })}
          </div>

          <div
            className={cn(styles.textareaWrapper, {
              [styles.textareaWrapperVisible]: isOtherSelected,
            })}
          >
            <textarea
              value={valueTextarea}
              placeholder="Enter a description"
              {...register("textarea", {
                onChange: (value) => setValuesTextarea(value.target.value),
              })}
            />
          </div>

          {errorState ? (
            <p className={styles.errorText}>Unable to send report right now.</p>
          ) : null}

          {!isVerified ? (
            <div className={styles.recaptcha}>
              <ReCAPTCHA
                sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />
            </div>
          ) : null}

          <div className={styles.actions}>
            <ButtonNew
              type="Default Ghost"
              width="max"
              size="s"
              className={styles.actionButton}
              onClick={closeModal}
            >
              Cancel
            </ButtonNew>
            <ButtonNew
              disable={!isVerified || !selectedReason || (isOtherSelected && !valueTextarea.trim())}
              width="max"
              size="s"
              className={styles.actionButton}
              onClick={submitForm}
            >
              Send a Message
            </ButtonNew>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ReportForm;
